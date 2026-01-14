# Public Assets Directory

This directory contains static files that will be served directly by the application.

## Profile Photo

To add your profile photo:

1. Save your photo in this directory as `profile.jpg`, `profile.png`, or any other common image format
2. Update the `avatar` field in `constants.ts` to reference your photo:
   ```typescript
   avatar: "/profile.jpg"  // or /profile.png, etc.
   ```

**Recommended specifications:**
- Format: JPG or PNG
- Size: 800x800 pixels (square format works best)
- File size: Keep under 1MB for optimal loading

## Resume/CV

To add your resume:

1. Save your resume PDF in this directory as `resume.pdf`
2. The application is already configured to use `/resume.pdf`

**Note:** Files in this directory are publicly accessible and will be included in your deployed site.
