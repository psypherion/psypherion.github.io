/* ============================================================
   commons — Firebase config
   ============================================================
   HOW TO SET UP (one-time, ~5 minutes):

   1. Go to https://console.firebase.google.com and click
      "Add project". Give it any name. Skip Google Analytics.

   2. Inside the project, click the </> "Web app" icon to
      register a web app. Give it a nickname. Skip "Firebase
      Hosting" — you'll host on GitHub Pages.

   3. Firebase shows a snippet with `firebaseConfig = { ... }`.
      Copy the object and PASTE IT into COMMONS_FIREBASE_CONFIG
      below, replacing the placeholder values.

   4. In the left sidebar → Build → Realtime Database →
      "Create Database". Pick any location. Start in "locked
      mode" (safer default).

   5. Go to the "Rules" tab of Realtime Database. Replace the
      rules with the block written at the bottom of this file
      (inside the /* RULES START ... RULES END *\/ comment).
      Click "Publish".

   6. In the sidebar → Build → Authentication → "Get started" →
      pick "Anonymous" and enable it. Save.

   That's it. Refresh the pages under /commons/ and things work.

   ADMIN KEY
   ---------
   The commons has admin power (delete anyone's note or message).
   To claim it on your own device, open the browser console on
   any /commons/ page and run:
      commonsSetAdminKey("some-long-secret-string")
   Then set the same string as ADMIN_KEY_HASH below (SHA-256
   hashed for safety — use the helper to hash it: run
   `await commonsHashAdminKey("some-long-secret-string")` in
   the console after loading the page).
   ============================================================ */

// ── PASTE YOUR FIREBASE CONFIG HERE ─────────────────────────
const firebaseConfig = {
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
   RULES START — paste these in Realtime Database → Rules tab
   ============================================================

   ============================================================
   RULES END
   ============================================================ */
