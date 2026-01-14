# How to Add Your Profile Photo

Your profile photo is not showing because it needs to be added to this repository.

## Steps to Fix:

### Option 1: Add Photo to Repository (Recommended)

1. **Save your photo** in this `public` directory
   - Rename it to: `profile.jpg` (or `profile.png`)
   - Recommended size: 800x800 pixels (square)
   - Keep file size under 1MB

2. **Update `constants.ts`** (in the root directory)
   - Find line 14 (the `avatar:` field)
   - Change it from:
     ```typescript
     avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&q=80",
     ```
   - To:
     ```typescript
     avatar: "/profile.jpg",
     ```

3. **Commit and push** your changes
   ```bash
   git add public/profile.jpg constants.ts
   git commit -m "Add profile photo"
   git push
   ```

### Option 2: Use an Image URL

If you prefer to host your image elsewhere:

1. Upload your photo to an image hosting service (Imgur, Cloudinary, etc.)
2. Get the direct image URL
3. Update the `avatar` field in `constants.ts` with your URL

## Current Issue

The Unsplash placeholder URL in `constants.ts` is showing instead of your photo because:
- Photos uploaded via the Admin Dashboard are stored in browser localStorage only
- localStorage doesn't persist when deployed or in different browsers
- You need to add your photo directly to the repository

## Need Help?

If you already uploaded your photo via the Dashboard, you can:
1. Open your portfolio site where you uploaded the photo
2. Right-click on your photo and select "Save Image As..."
3. Save it to this `public` folder
4. Follow Option 1 above to update the code
