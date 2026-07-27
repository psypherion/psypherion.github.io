/* ============================================================
   commons — shared runtime used by every page under /commons/

   Depends on the Firebase compat SDK v10 loaded via <script> in
   each page (auth + database).
   ============================================================ */

(function (global) {
  "use strict";

  // Local storage keys
  const K_NAME  = "commons.displayName.v1";
  const K_ADMIN = "commons.adminKey.v1";

  // ── Firebase init ──
  let firebaseReady = false;
  let auth, db, currentUid = null;
  const authReadyCallbacks = [];

  function initFirebase() {
    if (firebaseReady) return;
    if (typeof firebase === "undefined") {
      showBanner("Firebase SDK not loaded — check the <script> tags.");
      return;
    }
    if (!global.COMMONS_FIREBASE_CONFIG || COMMONS_FIREBASE_CONFIG.apiKey === "REPLACE_ME") {
      showBanner("Firebase not configured — open firebase-config.js and paste your project's config.");
      return;
    }
    try {
      firebase.initializeApp(COMMONS_FIREBASE_CONFIG);
    } catch (e) {
      // already initialised — fine
    }
    auth = firebase.auth();
    db   = firebase.database();
    firebaseReady = true;

    auth.onAuthStateChanged(user => {
      if (user) {
        currentUid = user.uid;
        authReadyCallbacks.splice(0).forEach(cb => cb(user));
      }
    });
    auth.signInAnonymously().catch(err => {
      showBanner("Anonymous sign-in failed: " + err.message +
                 " · Enable 'Anonymous' in Firebase → Authentication.");
    });
  }

  function onAuthReady(cb) {
    if (currentUid) cb({ uid: currentUid });
    else authReadyCallbacks.push(cb);
  }

  // ── identity ──
  function getDisplayName() {
    try {
      const v = localStorage.getItem(K_NAME);
      if (v) return v;
    } catch (e) {}
    // fall back to arcade Profiles if present
    if (global.Profiles && typeof Profiles.getCurrent === "function") {
      const p = Profiles.getCurrent();
      if (p && p !== "guest") return p;
    }
    return "";
  }
  function setDisplayName(raw) {
    const clean = (raw || "").toString().trim().slice(0, 30).replace(/[\x00-\x1f\x7f]/g, "");
    try { localStorage.setItem(K_NAME, clean); } catch (e) {}
    return clean;
  }

  function getUid() { return currentUid; }

  // ── admin ──
  async function sha256Hex(text) {
    const enc = new TextEncoder().encode(text);
    const buf = await crypto.subtle.digest("SHA-256", enc);
    return Array.from(new Uint8Array(buf))
      .map(b => b.toString(16).padStart(2, "0")).join("");
  }
  async function isAdmin() {
    if (!global.ADMIN_KEY_HASH) return false;
    let key;
    try { key = localStorage.getItem(K_ADMIN); } catch (e) { return false; }
    if (!key) return false;
    const hash = await sha256Hex(key);
    return hash === global.ADMIN_KEY_HASH;
  }
  function setAdminKey(k) {
    try { localStorage.setItem(K_ADMIN, k); } catch (e) {}
    return true;
  }
  function clearAdminKey() {
    try { localStorage.removeItem(K_ADMIN); } catch (e) {}
  }

  // Expose helpers to the console so setup is easier
  global.commonsSetAdminKey = setAdminKey;
  global.commonsClearAdminKey = clearAdminKey;
  global.commonsHashAdminKey = sha256Hex;

  // ── UI helpers ──
  function showBanner(msg) {
    let el = document.getElementById("commonsBanner");
    if (!el) {
      el = document.createElement("div");
      el.id = "commonsBanner";
      el.className = "commons-banner";
      document.body.prepend(el);
    }
    el.textContent = msg;
    el.style.display = "block";
  }
  function toast(msg, tone) {
    const t = document.createElement("div");
    t.className = "commons-toast" + (tone ? " tone-" + tone : "");
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => { t.classList.add("hide"); }, 2200);
    setTimeout(() => { t.remove(); }, 2900);
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, ch => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[ch]));
  }
  function timeAgo(t) {
    const now = Date.now();
    const s = Math.max(0, (now - t) / 1000);
    if (s < 45) return "just now";
    if (s < 90) return "a minute ago";
    const m = Math.round(s / 60);
    if (m < 45) return m + " min ago";
    const h = Math.round(m / 60);
    if (h < 24) return h + " hr ago";
    const d = Math.round(h / 24);
    if (d < 30) return d + " d ago";
    const mo = Math.round(d / 30);
    if (mo < 12) return mo + " mo ago";
    return Math.round(mo / 12) + " yr ago";
  }
  function formatClock(t) {
    const d = new Date(t);
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    return hh + ":" + mm;
  }

  // ── expose ──
  global.Commons = {
    initFirebase,
    onAuthReady,
    getDisplayName,
    setDisplayName,
    getUid,
    isAdmin,
    showBanner,
    toast,
    escapeHtml,
    timeAgo,
    formatClock,
    db: () => db,
    auth: () => auth
  };

  // auto-init on load
  document.addEventListener("DOMContentLoaded", initFirebase);
})(window);
