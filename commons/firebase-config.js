/* ============================================================
   commons — Firebase config
   ============================================================
   This file is loaded as a plain <script>, so it CANNOT use
   `import` statements. If you paste the modular snippet from
   Firebase's setup wizard, delete the `import` lines — the
   compat SDK (loaded by each HTML page) reads this config
   object directly.
   ============================================================ */

// ── PASTE YOUR FIREBASE CONFIG HERE ─────────────────────────
const COMMONS_FIREBASE_CONFIG = {
  apiKey: "AIzaSyDb4hQdii-Wdt_s_PctOjvJl0zVnxuryio",
  authDomain: "stickynotes-2084e.firebaseapp.com",
  databaseURL: "https://stickynotes-2084e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "stickynotes-2084e",
  storageBucket: "stickynotes-2084e.firebasestorage.app",
  messagingSenderId: "265003065483",
  appId: "1:265003065483:web:e87aa485d181af423cb48e",
  measurementId: "G-1VNEC736ZH"
};

// ── ADMIN KEY (SHA-256 hash of the secret string) ───────────
// Set to null to disable admin power entirely.
const ADMIN_KEY_HASH = null;
// Example, hashed via commonsHashAdminKey("hunter2"):
// const ADMIN_KEY_HASH = "f52fbd32b2b3b86ff88ef6c490628285f482af15ddcb29541f94bcf526a3f6c7";

/* ============================================================
   REALTIME DATABASE RULES
   ============================================================
   Go to Firebase Console → Realtime Database → Rules tab and
   PASTE THE BLOCK BELOW (between the two ==== lines). Click
   "Publish".
   ============================================================

{
  "rules": {
    "notes": {
      ".read": true,
      ".write": "auth != null",
      "$noteId": {
        ".validate": "newData.hasChildren(['text', 'createdAt', 'authorUid']) && newData.child('text').isString() && newData.child('text').val().length < 800",
        "text":       { ".validate": "newData.isString()" },
        "authorName": { ".validate": "newData.isString() && newData.val().length < 40" },
        "authorUid":  { ".validate": "newData.isString()" },
        "createdAt":  { ".validate": "newData.isNumber()" },
        "color":      { ".validate": "newData.isString() && newData.val().length < 20" },
        "rot":        { ".validate": "newData.isNumber()" }
      }
    },
    "rooms": {
      ".read": true,
      ".write": "auth != null",
      "$roomId": {
        "meta": {
          ".validate": "newData.hasChildren(['createdAt'])"
        },
        "messages": {
          "$msgId": {
            ".validate": "newData.hasChildren(['text', 'createdAt', 'authorUid']) && newData.child('text').isString() && newData.child('text').val().length < 600",
            "text":       { ".validate": "newData.isString()" },
            "authorName": { ".validate": "newData.isString() && newData.val().length < 40" },
            "authorUid":  { ".validate": "newData.isString()" },
            "createdAt":  { ".validate": "newData.isNumber()" }
          }
        }
      }
    }
  }
}

   ============================================================ */
