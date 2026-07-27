/* ============================================================
   commons — chat rooms
   Firebase RTDB shape:
     /rooms/{roomId}/meta        = { createdAt, name }
     /rooms/{roomId}/messages/{msgId} = { text, authorName, authorUid, createdAt }
   Room id = URL-safe slug of the display name.
   ============================================================ */

(function () {
  "use strict";

  const nameInput  = document.getElementById("displayNameInput");
  const identityStrip = document.getElementById("identityStrip");
  const roomInput  = document.getElementById("roomInput");
  const joinBtn    = document.getElementById("joinBtn");
  const roomList   = document.getElementById("roomList");
  const roomTitle  = document.getElementById("roomTitle");
  const shareBtn   = document.getElementById("shareBtn");
  const chatStream = document.getElementById("chatStream");
  const msgInput   = document.getElementById("msgInput");
  const sendBtn    = document.getElementById("sendBtn");

  let isAdmin = false;
  let currentRoomId = null;
  let currentRoomName = null;
  let msgsRef = null;
  let messagesCache = {};   // msgId → msg
  let messageOrder = [];    // ordered ids
  let roomsCache = {};      // roomId → meta

  // ── identity ──
  nameInput.value = Commons.getDisplayName();
  nameInput.addEventListener("input", () => {
    Commons.setDisplayName(nameInput.value);
  });

  Commons.isAdmin().then(v => {
    isAdmin = v;
    if (v) identityStrip.classList.add("is-admin");
    if (currentRoomId) renderStream();
  });

  // ── slug ──
  function slugify(s) {
    return String(s || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\-_]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40);
  }

  // ── init: subscribe to room list ──
  Commons.onAuthReady(() => {
    Commons.db().ref("rooms").on("child_added", snap => {
      roomsCache[snap.key] = snap.child("meta").val() || { createdAt: 0, name: snap.key };
      renderRoomList();
    });
    Commons.db().ref("rooms").on("child_changed", snap => {
      roomsCache[snap.key] = snap.child("meta").val() || roomsCache[snap.key];
      renderRoomList();
    });
    Commons.db().ref("rooms").on("child_removed", snap => {
      delete roomsCache[snap.key];
      renderRoomList();
    });

    // if the URL has a room hash, join it
    const hashRoom = location.hash.startsWith("#") ? location.hash.slice(1) : "";
    if (hashRoom) joinRoom(hashRoom, hashRoom.replace(/-/g, " "));
  });

  // ── join a room ──
  async function joinRoom(rawName, displayName) {
    const uid = Commons.getUid();
    if (!uid) { Commons.toast("still connecting…", "error"); return; }
    const id = slugify(rawName);
    if (!id) { Commons.toast("give the room a name first"); return; }

    // upsert meta if missing
    const metaRef = Commons.db().ref("rooms/" + id + "/meta");
    const snap = await metaRef.once("value");
    if (!snap.exists()) {
      await metaRef.set({
        name: (displayName || rawName).toString().slice(0, 40),
        createdAt: firebase.database.ServerValue.TIMESTAMP
      });
    }

    // detach previous
    if (msgsRef) msgsRef.off();
    messagesCache = {}; messageOrder = [];

    currentRoomId = id;
    currentRoomName = (snap.exists() ? snap.val().name : (displayName || rawName)) || rawName;
    roomTitle.textContent = "# " + currentRoomName;
    shareBtn.style.display = "";
    msgInput.disabled = false;
    sendBtn.disabled = false;
    location.hash = id;
    renderRoomList();

    msgsRef = Commons.db().ref("rooms/" + id + "/messages").limitToLast(200);
    msgsRef.on("child_added", msnap => {
      messagesCache[msnap.key] = msnap.val();
      messageOrder.push(msnap.key);
      appendMessage(msnap.key, msnap.val(), true);
    });
    msgsRef.on("child_removed", msnap => {
      delete messagesCache[msnap.key];
      messageOrder = messageOrder.filter(x => x !== msnap.key);
      const el = chatStream.querySelector('[data-mid="' + CSS.escape(msnap.key) + '"]');
      if (el) el.remove();
      if (messageOrder.length === 0) renderStream();
    });

    // start empty
    chatStream.innerHTML = '<div class="chat-empty">say hello.</div>';
    msgInput.focus();
  }

  joinBtn.addEventListener("click", () => {
    const v = roomInput.value.trim();
    if (v) joinRoom(v, v);
  });
  roomInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") joinBtn.click();
  });

  // ── send ──
  async function send() {
    const uid = Commons.getUid();
    if (!uid || !currentRoomId) return;
    const text = msgInput.value.trim();
    if (!text) return;
    const name = (Commons.getDisplayName().trim()) || "";
    const msg = {
      text,
      authorName: name,
      authorUid: uid,
      createdAt: firebase.database.ServerValue.TIMESTAMP
    };
    msgInput.value = "";
    try {
      await Commons.db().ref("rooms/" + currentRoomId + "/messages").push(msg);
    } catch (e) {
      Commons.toast("could not send — " + e.message, "error");
    }
  }
  sendBtn.addEventListener("click", send);
  msgInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  });

  // ── share ──
  shareBtn.addEventListener("click", async () => {
    const url = location.href;
    try {
      await navigator.clipboard.writeText(url);
      Commons.toast("link copied.");
    } catch (e) {
      prompt("Copy this link:", url);
    }
  });

  // ── render ──
  function renderRoomList() {
    const uid = Commons.getUid();
    const ids = Object.keys(roomsCache).sort((a, b) => {
      const ta = (roomsCache[a] && roomsCache[a].createdAt) || 0;
      const tb = (roomsCache[b] && roomsCache[b].createdAt) || 0;
      return tb - ta;
    });
    if (ids.length === 0) {
      roomList.innerHTML = '<div style="color:var(--ink-faint); font-family:\'IBM Plex Mono\', monospace; font-size:0.7rem; padding: 10px 4px;">no rooms yet</div>';
      return;
    }
    roomList.innerHTML = ids.map(id => {
      const meta = roomsCache[id];
      const name = (meta && meta.name) || id;
      const cls = id === currentRoomId ? "room-item active" : "room-item";
      return `<div class="${cls}" data-room="${Commons.escapeHtml(id)}"><span class="room-name">#${Commons.escapeHtml(name)}</span></div>`;
    }).join("");
    roomList.querySelectorAll("[data-room]").forEach(el => {
      el.addEventListener("click", () => {
        const id = el.dataset.room;
        const meta = roomsCache[id];
        joinRoom(id, (meta && meta.name) || id);
      });
    });
  }

  function renderStream() {
    if (messageOrder.length === 0) {
      chatStream.innerHTML = '<div class="chat-empty">say hello.</div>';
      return;
    }
    chatStream.innerHTML = "";
    messageOrder.forEach(mid => appendMessage(mid, messagesCache[mid], false));
    chatStream.scrollTop = chatStream.scrollHeight;
  }

  function appendMessage(mid, m, autoscroll) {
    if (!m) return;
    // remove empty placeholder if present
    const empty = chatStream.querySelector(".chat-empty");
    if (empty) empty.remove();

    const uid = Commons.getUid();
    const mine = uid && m.authorUid === uid;
    const canDelete = mine || isAdmin;
    const el = document.createElement("div");
    el.className = "msg" + (mine ? " mine" : "") + (canDelete ? " can-delete" : "");
    el.setAttribute("data-mid", mid);

    const author = m.authorName && m.authorName.trim()
      ? Commons.escapeHtml(m.authorName)
      : "anon";
    const time = m.createdAt ? Commons.formatClock(m.createdAt) : "";
    el.innerHTML = `
      <div class="msg-head">
        <span class="author">${author}</span>
        <span>· ${Commons.escapeHtml(time)}</span>
      </div>
      <div class="msg-body">${Commons.escapeHtml(m.text)}</div>
      <button class="msg-del" title="remove">×</button>
    `;
    el.querySelector(".msg-del").addEventListener("click", (e) => {
      e.stopPropagation();
      if (!confirm("Remove this message?")) return;
      Commons.db().ref("rooms/" + currentRoomId + "/messages/" + mid).remove()
        .then(() => Commons.toast("removed."))
        .catch(err => Commons.toast("could not remove — " + err.message, "error"));
    });
    chatStream.appendChild(el);
    if (autoscroll) chatStream.scrollTop = chatStream.scrollHeight;
  }
})();
