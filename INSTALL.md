# Quick Installation Guide

## For Testing (Temporary - Until Firefox Restart)

1. Open Firefox
2. Navigate to: `about:debugging#/runtime/this-firefox`
3. Click **"Load Temporary Add-on..."**
4. Select the `manifest.json` file from this folder
5. Done! Test by joining a Zoom meeting

---

## For Personal Use (Permanent)

### Step 1: Clone or Download the Repository

```bash
git clone https://github.com/austinbjohnson/zen_autoTabCloser.git
cd zen_autoTabCloser
```

### Step 2: Build the Extension Package

**Note**: The `.xpi` file is not included in the repository to prevent corruption. You need to build it yourself:

```bash
zip -r zen-auto-tab-closer.xpi manifest.json background.js icons/
```

### Step 3: Install in Firefox

1. Open Firefox and go to `about:addons`
2. Click the gear icon ⚙️ (top right)
3. Select **"Install Add-on From File..."**
4. Choose the `zen-auto-tab-closer.xpi` file
5. Click **"Add"** when prompted

**Note**: Firefox may warn about unsigned extensions. This is normal for self-made extensions.

### Step 4: Test It

1. Join a Zoom meeting from your browser - watch as the `#success` tab automatically closes after 5 seconds
2. Open a Slack thread link - watch as it automatically closes after 10 seconds

---

## Troubleshooting

**"This add-on could not be installed because it has not been verified"**

- Use **Firefox Developer Edition** or **Firefox Nightly**
- In `about:config`, set `xpinstall.signatures.required` to `false`
- Or use the temporary installation method above

**Extension not working?**

- Check the Browser Console: `Ctrl+Shift+J` (Windows/Linux) or `Cmd+Shift+J` (Mac)
- Look for `[Zen Auto Tab Closer]` messages

---

## Quick Settings

Want to change the delays? Edit `background.js`:

```javascript
const ZOOM_CLOSE_DELAY = 5000; // Zoom tabs (in milliseconds)
const SLACK_CLOSE_DELAY = 10000; // Slack tabs (in milliseconds)
```

After changes, reload the extension in `about:debugging` or reinstall.
