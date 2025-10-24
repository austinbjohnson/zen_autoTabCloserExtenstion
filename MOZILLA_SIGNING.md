# Mozilla Add-on Signing Guide

This guide will help you get your extension officially signed by Mozilla so you can use it permanently in regular Firefox.

## Step 1: Create Mozilla Account

1. Go to: https://addons.mozilla.org
2. Click **"Sign In"** in the top right
3. Click **"Register"** 
4. Follow the prompts to create a free account
5. Verify your email

## Step 2: Submit Your Extension

1. **Go to the Developer Hub**: https://addons.mozilla.org/developers/
2. Click **"Submit a New Add-on"** (or similar button)
3. You'll see two options:
   - **"On this site"** - Public listing on Mozilla's add-on store
   - **"On your own"** - Self-hosted, just get it signed
   
   👉 **Choose "On your own"** (this keeps it private, just for you)

## Step 3: Upload Your Extension

1. **Upload the file**: `/Users/ajohnson/Code/zen_autoTabCloser/zen-auto-tab-closer.xpi`
2. Mozilla will automatically validate it (this takes a few seconds)
3. If there are any errors, they'll tell you what needs fixing

## Step 4: Fill Out Basic Info

You'll need to provide:

- **Extension Name**: Zen Auto Tab Closer
- **Version**: 1.1.0
- **Description**: Automatically closes Zoom '#success' tabs (5s) and Slack thread tabs (10s). Minimal permissions for maximum security.
- **Category**: Privacy & Security (or Productivity)
- **License**: MIT (or your preference)

**Privacy Policy**: Since this extension doesn't collect any data, you can write:
```
This extension does not collect, store, or transmit any user data. 
It operates entirely locally in your browser with no external communications.
```

## Step 5: Automated Review

- Mozilla will **automatically review** your extension
- Since it's simple with minimal permissions, it should be **auto-approved within minutes**
- You'll get an email when it's ready
- More complex extensions might take 1-2 days for manual review

## Step 6: Download Signed Version

1. Once approved, go back to the Developer Hub
2. Find your extension in **"My Add-ons"**
3. Click on it
4. Download the **signed .xpi file**
5. This signed version has a unique ID from Mozilla

## Step 7: Install Signed Version

1. **Remove the temporary version** first:
   - Go to `about:addons`
   - Find "Zen Auto Tab Closer"
   - Click **"Remove"**

2. **Install the signed version**:
   - Go to `about:addons`
   - Gear icon ⚙️ → "Install Add-on From File..."
   - Select the **signed .xpi** you downloaded from Mozilla
   - Click **"Add"**

3. **Done!** It will now work permanently in regular Firefox (survives restarts)

## Troubleshooting

**"Your add-on failed validation"**
- Check the error message - it will tell you exactly what needs fixing
- Common issues: missing permissions, invalid manifest fields
- Fix the issue, rebuild the .xpi, and resubmit

**"Pending review"**
- If it goes into manual review, it may take 1-2 business days
- You'll receive an email when it's approved
- Mozilla reviewers are looking for malicious code or privacy issues

**Need to update the extension later?**
- Make your changes locally
- Increment the version number in `manifest.json` (e.g., 1.0.0 → 1.0.1)
- Rebuild the .xpi
- Submit as an update through the Developer Hub

## Benefits of Signing

✅ Works in regular Firefox (no Developer Edition needed)
✅ Survives browser restarts
✅ Automatic updates (if you set them up)
✅ Peace of mind that Mozilla reviewed it
✅ Can share with others easily

## Source Code

You can optionally provide a link to your GitHub repo during submission:
https://github.com/austinbjohnson/zen_autoTabCloser

This helps Mozilla reviewers and shows transparency.

---

**Need Help?**
If you run into any issues, Mozilla's documentation is here:
https://extensionworkshop.com/documentation/publish/submitting-an-add-on/



