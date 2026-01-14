# GitHub Deployment Guide for Your Portfolio

## Step-by-Step Setup

### Step 1: Initialize Git Repository (if not already done)
```bash
cd d:\xampp\htdocs\Portfolio
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### Step 2: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `Portfolio` (or your-username.github.io for main site)
3. Description: "Personal portfolio website showcasing projects and skills"
4. Make it **Public** (required for GitHub Pages)
5. Click "Create repository"

### Step 3: Add Remote and Push Code
```bash
# Add remote (copy the HTTPS URL from GitHub)
git remote add origin https://github.com/YOUR_USERNAME/Portfolio.git

# Add all files
git add .

# First commit
git commit -m "Initial commit: Portfolio website"

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Install Dependencies & Create Build
```bash
# Install all dependencies (including @types/node)
npm install

# Build for production
npm run build

# This creates a 'dist' folder with optimized files
```

### Step 5: Choose Your Deployment Method

---

## **Option A: GitHub Pages (Recommended for Simplicity)**

### Setup GitHub Actions for Automatic Deployment

1. Create folder: `.github/workflows/`
2. Create file: `.github/workflows/deploy.yml`

**Copy this content:**

```yaml
name: Deploy Portfolio

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm install
    
    - name: Build
      run: npm run build
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v4
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
        cname: yourdomain.com  # Remove this if not using custom domain
```

### Enable GitHub Pages

1. Go to Repository → Settings → Pages
2. Under "Build and deployment":
   - Source: Select **Deploy from a branch**
   - Branch: Select **gh-pages** (created automatically by GitHub Actions)
3. Your site will be live at: `https://YOUR_USERNAME.github.io/Portfolio/`

---

## **Option B: Vercel (Easiest - Recommended)**

### Automatic Deployment via Vercel

1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Select the Portfolio repo
5. Configure:
   - Framework: **Vite**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Click **Deploy**

✅ **Done!** Your site is live and auto-deploys on every push!

**URL:** `https://portfolio-yourusername.vercel.app`

---

## **Option C: Netlify**

### Connect with Netlify

1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub
4. Select Portfolio repository
5. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click **Deploy**

✅ **Done!** Site is live

**URL:** `https://your-portfolio.netlify.app`

---

## Important Files You Still Need to Add

### 1. Create Public Folder
```bash
mkdir public
```

### 2. Add Your Resume
Save your CV as: `public/resume.pdf`

### 3. Update Profile Picture
Edit `constants.ts` line 14:
```typescript
avatar: "YOUR_IMAGE_URL_HERE" // Replace with your image URL
```

Options:
- Upload to Imgur and use the URL
- Use a cloud service (Cloudinary, AWS S3)
- Add image to public folder: `public/profile.jpg`

### 4. Update Project Links
Edit `constants.ts` projects section to link to your actual projects

---

## Verify Everything Works

### Local Testing
```bash
npm run build
npm run preview
# Visit http://localhost:4173
```

### After Deployment
1. Visit your live URL
2. Check:
   - [ ] All sections load properly
   - [ ] Dark mode toggle works
   - [ ] Responsive on mobile
   - [ ] Animations smooth
   - [ ] Links work
   - [ ] Admin dashboard accessible

---

## Environment Variables (If Needed)

If you add GEMINI API key in future:

1. Create `.env` file (local only - don't commit!)
   ```
   VITE_GEMINI_API_KEY=your_key_here
   ```

2. For GitHub/Vercel:
   - Go to Settings → Secrets and Variables → Actions
   - Add new secret: `GEMINI_API_KEY`
   - Update your workflow to use it

---

## Custom Domain (Optional)

To use your own domain instead of github.io:

1. In repository Settings → Pages
2. Add custom domain in "Custom domain" field
3. Update your DNS:
   ```
   CNAME record: your-domain.com → YOUR_USERNAME.github.io
   ```

Or use Vercel/Netlify's custom domain feature (easier!)

---

## Troubleshooting

### Build Fails with "Cannot find node types"
```bash
npm install
npm run build
```

### Site shows 404
- Ensure you pushed to `main` branch
- GitHub Actions workflow completed successfully
- Check build logs in Actions tab

### Images not loading
- Update image URLs in `constants.ts`
- Ensure they're publicly accessible

### Dark mode not working
- Clear browser cache
- Check localStorage in DevTools

---

## Your Deployment Checklist

- [ ] Create GitHub repository
- [ ] Push code to GitHub
- [ ] Run `npm install` locally
- [ ] Create `public/resume.pdf`
- [ ] Add profile picture URL to constants.ts
- [ ] Choose deployment method (GitHub Pages/Vercel/Netlify)
- [ ] Complete deployment setup
- [ ] Test live site
- [ ] Share your portfolio!

---

## Support

If you have issues:
1. Check the build logs in GitHub Actions
2. Run `npm run build` locally to debug
3. Check browser console for errors (F12)
4. Verify all URLs are correct in constants.ts

Good luck launching your portfolio! 🚀
