# 📸 IMPORTANT: How to Add Your Profile Photo

## Why isn't my uploaded photo showing?

Photos uploaded through the **Admin Dashboard** are stored in your browser's **localStorage** only. This means:
- ✅ They work on your local browser where you uploaded them
- ❌ They DON'T work when deployed to GitHub Pages or other hosting
- ❌ They DON'T work in different browsers or devices
- ❌ They are NOT saved in the repository

## Solution: Add Your Photo to the Repository

Follow these steps to make your photo show everywhere:

### Step 1: Get Your Photo File

If you already uploaded your photo via the Dashboard:
1. Open your portfolio where the photo is showing
2. Right-click on your profile photo in the Hero section
3. Select "Save Image As..." or "Open Image in New Tab" then save it
4. Save it with a simple name like `profile.jpg`

OR use your original photo file directly.

### Step 2: Add Photo to Repository

1. Place your photo in the `public/` folder
2. Rename it to: `profile.jpg` (or `profile.png`)

### Step 3: Update constants.ts

1. Open `constants.ts` in the root directory
2. Find line 14 (the `avatar:` field in the `profile` object)
3. Change from:
   ```typescript
   avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&q=80",
   ```
4. To:
   ```typescript
   avatar: "/profile.jpg",
   ```

### Step 4: Commit and Deploy

```bash
git add public/profile.jpg constants.ts
git commit -m "Add profile photo"
git push
```

## Quick Checklist

- [ ] Photo file is in `public/` folder
- [ ] Photo is named `profile.jpg` or `profile.png`
- [ ] `constants.ts` avatar field updated to `"/profile.jpg"`
- [ ] Changes committed and pushed to GitHub
- [ ] Deployment rebuilt (GitHub Pages, Vercel, etc.)

## Alternative: Use Image Hosting

If you prefer to use an external image hosting service:

1. Upload your photo to: Imgur, Cloudinary, Google Photos, etc.
2. Get the direct image URL (must end in .jpg, .png, etc.)
3. Update the `avatar` field in `constants.ts` with your URL
4. No need to add file to `public/` folder

## Recommended Photo Specs

- **Format:** JPG or PNG
- **Dimensions:** 800x800 pixels (square works best)
- **File Size:** Under 1MB for fast loading
- **Quality:** High resolution for sharp display

## Still Having Issues?

1. Clear your browser cache
2. Check browser console for errors (F12 → Console)
3. Verify the image path is correct
4. Make sure the image file is actually in the `public/` folder
5. Rebuild your deployment

---

**Note:** This issue only affects the profile photo in `constants.ts`. Any changes made via the Admin Dashboard (including photo uploads) are temporary and browser-specific unless you export the data and update the code directly.
