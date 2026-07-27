/* ============================================================
   commons — sticky notes wall
   Uses Firebase Realtime Database:
     /notes/{noteId} = { text, authorName, authorUid, createdAt, color, rot }
   ============================================================ */

(function () {
  "use strict";

  const COLORS = ["yellow", "pink", "blue", "green", "lilac", "tan"];
  let selectedColor = "yellow";
  let isAdmin = false;
  let notesCache = {};   // noteId → note

  const nameInput = document.getElementById("displayNameInput");
  const textArea  = document.getElementById("noteText");
  const anonCheck = document.getElementById("anonCheck");
  const postBtn   = document.getElementById("postBtn");
  const wall      = document.getElementById("notesWall");
  const emptyWall = document.getElementById("emptyWall");
  const charCount = document.getElementById("charCount");
  const identityStrip = document.getElementById("identityStrip");

  // ── identity ──
  nameInput.value = Commons.getDisplayName();
  nameInput.addEventListener("input", () => {
    Commons.setDisplayName(nameInput.value);
  });

  Commons.isAdmin().then(v => {
    isAdmin = v;
    if (v) identityStrip.classList.add("is-admin");
    // re-render existing notes so delete buttons appear
    renderWall();
  });

  // ── colour picker ──
  document.querySelectorAll("#colorPicks button").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#colorPicks button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      selectedColor = btn.dataset.color;
    });
  });

  // ── char count & post enable ──
  function updateCompose() {
    const t = textArea.value.trim();
    const len = textArea.value.length;
    charCount.textContent = len + " / 800";
    charCount.style.color = len > 700 ? "var(--red)" : "var(--ink-faint)";
    postBtn.disabled = t.length === 0 || len > 800;
  }
  textArea.addEventListener("input", updateCompose);
  updateCompose();

  // ── firebase wiring ──
  Commons.onAuthReady((user) => {
    const db = Commons.db();
    if (!db) return;
    const notesRef = db.ref("notes").limitToLast(300);

    notesRef.on("child_added", snap => {
      notesCache[snap.key] = snap.val();
      renderWall();
    });
    notesRef.on("child_removed", snap => {
      delete notesCache[snap.key];
      renderWall();
    });
  });

  // ── post ──
  postBtn.addEventListener("click", async () => {
    const uid = Commons.getUid();
    if (!uid) { Commons.toast("still connecting…", "error"); return; }
    const text = textArea.value.trim();
    if (!text) return;
    const anon = anonCheck.checked;
    const name = anon ? "" : (Commons.getDisplayName().trim() || "");

    const note = {
      text,
      authorName: name,
      authorUid: uid,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      color: selectedColor,
      rot: (Math.random() * 6 - 3)   // small random tilt for wall feel
    };

    postBtn.disabled = true;
    try {
      await Commons.db().ref("notes").push(note);
      textArea.value = "";
      updateCompose();
      Commons.toast("pinned.");
    } catch (e) {
      Commons.toast("could not pin — " + e.message, "error");
      postBtn.disabled = false;
    }
  });

  // ── delete ──
  async function deleteNote(noteId, note, byAdmin) {
    const label = byAdmin ? "as admin" : "your note";
    if (!confirm("Pull this note down (" + label + ")?")) return;
    try {
      await Commons.db().ref("notes/" + noteId).remove();
      Commons.toast("removed.");
    } catch (e) {
      Commons.toast("could not remove — " + e.message, "error");
    }
  }

  // ── render ──
  function renderWall() {
    const uid = Commons.getUid();
    const ids = Object.keys(notesCache).sort((a, b) => {
      const ta = notesCache[a].createdAt || 0;
      const tb = notesCache[b].createdAt || 0;
      return tb - ta;  // newest first
    });

    if (ids.length === 0) {
      wall.innerHTML = "";
      emptyWall.style.display = "";
      return;
    }
    emptyWall.style.display = "none";

    wall.innerHTML = ids.map(id => {
      const n = notesCache[id];
      const canDelete = (uid && n.authorUid === uid) || isAdmin;
      const isMine = uid && n.authorUid === uid;
      const byAdminOnly = !isMine && isAdmin;
      const author = n.authorName && n.authorName.trim()
        ? '<span class="author">' + Commons.escapeHtml(n.authorName) + '</span>'
        : '<span class="anon">anon</span>';
      const when = n.createdAt ? Commons.timeAgo(n.createdAt) : "";
      const rot = typeof n.rot === "number" ? n.rot : 0;
      const color = COLORS.includes(n.color) ? n.color : "yellow";
      const classes = ["note", "c-" + color];
      if (canDelete) classes.push("can-delete");
      if (byAdminOnly) classes.push("by-admin-only");
      return `
        <div class="${classes.join(' ')}" style="transform: rotate(${rot.toFixed(2)}deg);" data-id="${id}">
          <div>${Commons.escapeHtml(n.text)}</div>
          <div class="note-meta">
            ${author}<span>· ${Commons.escapeHtml(when)}</span>
          </div>
          <button class="note-del" data-del="${id}">× remove</button>
        </div>`;
    }).join("");

    wall.querySelectorAll("[data-del]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.dataset.del;
        const note = notesCache[id];
        if (!note) return;
        const isMine = uid && note.authorUid === uid;
        deleteNote(id, note, !isMine && isAdmin);
      });
    });
  }

  // refresh "time ago" labels every 60s
  setInterval(renderWall, 60 * 1000);
})();
