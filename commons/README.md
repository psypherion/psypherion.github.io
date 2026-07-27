# § commons — a small public room

A two-room "commons" for a static site:
- **notes.html** — a public sticky-notes wall
- **chat.html** — real-time group chat, one room per name
- **index.html** — landing page

Same paper aesthetic as psypherion.github.io and the arcade. No backend of yours — just static HTML/CSS/JS + one Firebase Realtime Database on the free tier.

---

## What's honest about this

- **Everything is public.** Anyone with your Firebase database URL can read what's in it. There is no login. This is a *public* room by design.
- **"Your" note or message is bound to your browser session.** Since there's no login, the site knows you by an anonymous session id. Delete a note while you're still on the page, or lose the ability to delete it yourself. That's when the admin key exists.
- **The admin key is client-side.** Whoever has the admin key can delete anything. Keep the key private; if it ever leaks, rotate it (change `ADMIN_KEY_HASH`).
- **The Firebase config is public.** That's normal for client-side Firebase — security lives in the **Database Rules**, not the config. Follow the rules block in `firebase-config.js` exactly.

---

## Setup (one time, ~5 minutes)

### 1. Create a Firebase project
1. Go to https://console.firebase.google.com and click **Add project**.
2. Any name. Skip Google Analytics.

### 2. Register a web app
1. Inside the project, click the **`</>` Web app** icon.
2. Give it a nickname. **Skip Firebase Hosting** — you're using GitHub Pages.
3. Firebase shows a code snippet with `firebaseConfig = { ... }`. Copy that object.

### 3. Paste the config
Open `firebase-config.js` and replace the `COMMONS_FIREBASE_CONFIG` placeholder object with the one Firebase gave you.

### 4. Create the Realtime Database
1. Sidebar → **Build → Realtime Database → Create Database**.
2. Pick any location. **Start in locked mode.**

### 5. Set the security rules
1. Realtime Database → **Rules** tab.
2. Replace everything with the rules block found at the bottom of `firebase-config.js` (between the `RULES START` and `RULES END` markers).
3. Click **Publish**.

### 6. Enable anonymous auth
1. Sidebar → **Build → Authentication → Get started**.
2. Under sign-in providers, enable **Anonymous**. Save.

### 7. (Optional) Set up the admin key

The admin key lets you delete any note or any message from your browser. Skip this if you don't need it.

1. Open any `/commons/` page in your browser.
2. Open the developer console (F12).
3. Pick a strong secret string, e.g. `commonsHunter42Paper!` — this is your admin secret.
4. In the console, run:
   ```js
   await commonsHashAdminKey("commonsHunter42Paper!")
   ```
   The console prints a 64-character hex hash. Copy it.
5. In `firebase-config.js`, set:
   ```js
   const ADMIN_KEY_HASH = "the-hex-hash-you-just-copied";
   ```
6. In your browser console, run:
   ```js
   commonsSetAdminKey("commonsHunter42Paper!")
   ```
   Refresh. You should see a small `◆ admin` badge on the identity strip and delete buttons on every note.

Anyone else who doesn't have both the plain-text key stored in their browser **and** access to your published `ADMIN_KEY_HASH` will not get admin power — even if the code and the hash are both public, the plain key is the only thing that unlocks it, and you keep that.

### 8. Push to GitHub Pages
Drop the `commons/` folder into your GitHub-Pages repo. It works at `psypherion.github.io/commons/` (or wherever you put it).

---

## Files
- `index.html` — landing page
- `notes.html` + `notes.js` — sticky notes wall
- `chat.html` + `chat.js` — chat rooms
- `commons.js` — shared runtime (auth, identity, admin, toasts)
- `firebase-config.js` — **you edit this**
- `style.css` — shared paper/phosphor stylesheet
- `README.md` — this file

## Firebase free-tier limits
As of writing, Firebase Realtime Database's Spark (free) plan allows:
- 1 GB of stored data
- 10 GB / month of downloads
- 100 simultaneous connections

For a small commons that's plenty. If it ever gets close, tell me and we can add message limits or auto-pruning.
