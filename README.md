# Zen Zoom Tab Closer

A lightweight, privacy-focused Firefox extension that automatically closes Zoom tabs ending with `#success` after 5 seconds.

## Why This Extension?

When you join a Zoom meeting from your browser, Zoom opens a tab that redirects to launch the desktop app, then leaves behind a tab ending with `#success`. This extension automatically closes those unnecessary tabs for you.

## Features

- **Minimal Permissions**: Only requires `tabs` permission - no access to page content or network requests
- **Lightweight**: Simple background script with no dependencies
- **Configurable Delay**: 5-second delay before closing (easily adjustable)
- **Privacy-First**: No data collection, no external communication, completely local
- **Open Source**: Fully auditable code for your security

## Installation

### Option 1: Temporary Installation (For Testing)

1. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
2. Click **"Load Temporary Add-on..."**
3. Navigate to the extension folder and select the `manifest.json` file
4. The extension will be active until you restart Firefox

**Note**: This is perfect for testing but will need to be reloaded after each Firefox restart.

### Option 2: Permanent Installation (Unsigned)

For personal use without Mozilla signing:

1. **Firefox Developer Edition or Nightly** (recommended for unsigned extensions):
   - Download [Firefox Developer Edition](https://www.mozilla.org/firefox/developer/)
   - Navigate to `about:config`
   - Search for `xpinstall.signatures.required`
   - Set it to `false`

2. **Create a ZIP file** of the extension:
   ```bash
   cd /path/to/zen_zoomAppTabCloser
   zip -r zen-zoom-tab-closer.xpi manifest.json background.js icons/
   ```

3. **Install the extension**:
   - Open Firefox and go to `about:addons`
   - Click the gear icon ⚙️ and select **"Install Add-on From File..."**
   - Select your `zen-zoom-tab-closer.xpi` file
   - Click **"Add"** when prompted

### Option 3: Sign with Mozilla (For Distribution)

If you want to share this extension or use it permanently in regular Firefox:

1. Create an account at [addons.mozilla.org](https://addons.mozilla.org)
2. Go to [Developer Hub](https://addons.mozilla.org/developers/)
3. Submit the extension for signing (self-distribution)
4. Mozilla will sign it and you can install the signed version

## How It Works

The extension monitors all tab URL changes in Firefox. When it detects a tab with:
- URL containing `zoom.us` AND
- URL ending with `#success`

It waits 5 seconds, then automatically closes that tab.

## Customization

### Change the Close Delay

Edit `background.js` and modify the `CLOSE_DELAY` constant:

```javascript
const CLOSE_DELAY = 5000; // Change to desired milliseconds (e.g., 10000 = 10 seconds)
```

### Change the URL Pattern

Edit the condition in `background.js`:

```javascript
if (tab.url && tab.url.includes("zoom.us") && tab.url.endsWith("#success")) {
```

For example, to also close tabs with `/launch/` in the URL:
```javascript
if (tab.url && tab.url.includes("zoom.us") && (tab.url.endsWith("#success") || tab.url.includes("/launch/"))) {
```

## Privacy & Security

This extension is built with privacy and security as top priorities:

- ✅ **Minimal Permissions**: Only `tabs` permission (required to monitor and close tabs)
- ✅ **No Network Access**: Cannot make network requests or send data anywhere
- ✅ **No Content Access**: Cannot read or modify page content
- ✅ **No Data Collection**: No analytics, tracking, or data storage
- ✅ **Local Only**: Everything runs locally in your browser
- ✅ **Open Source**: Full source code available for audit

## Permissions Explained

- **`tabs`**: Required to monitor tab URLs and close tabs. This is the absolute minimum permission needed for this functionality.

## Troubleshooting

**Extension doesn't close tabs:**
- Check that the tab URL ends exactly with `#success`
- Open the Browser Console (`Ctrl+Shift+J` or `Cmd+Shift+J`) to see debug logs
- Look for messages starting with `[Zen Zoom Tab Closer]`

**Extension stops working after Firefox restart:**
- If using temporary installation, you need to reload the extension via `about:debugging` after each restart
- Consider using Option 2 (Developer Edition) for permanent installation

## License

MIT License - Feel free to modify and use as you wish!

## Version History

- **1.0.0** - Initial release
  - Automatically closes Zoom `#success` tabs after 5 seconds
  - Minimal permissions (tabs only)
  - Console logging for debugging

