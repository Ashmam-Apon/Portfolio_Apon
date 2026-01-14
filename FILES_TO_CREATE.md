# Files You Need to Create/Add

## Essential Files to Create Now

### 1. Create the Public Folder
```
Portfolio/
└── public/
    └── resume.pdf  (← Add your CV file here)
```

**How to create:**
- Create a folder named `public` in your Portfolio root directory
- Add your CV/Resume as `resume.pdf` in this folder

---

### 2. Create GitHub Workflow (For Auto Deployment)
```
Portfolio/
└── .github/
    └── workflows/
        └── deploy.yml  (← Paste the deployment workflow)
```

**How to create:**
- Create `.github` folder (note the dot)
- Create `workflows` subfolder inside it
- Create `deploy.yml` file with this content:

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
```

---

### 3. Update vite.config.ts (For GitHub Pages)

If deploying to GitHub Pages with repo name "Portfolio":

**Change this line in vite.config.ts:**
```typescript
// Add base path before plugins:
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      base: '/Portfolio/',  // ← Add this line
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      // ... rest remains same
    };
});
```

⚠️ **Skip this** if using Vercel or Netlify (they handle it automatically)

---

## Complete Updated Folder Structure

After adding everything, your project should look like:

```
Portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml              (← NEW: Auto-deployment)
│
├── public/
│   └── resume.pdf                  (← NEW: Your CV file)
│
├── components/
│   ├── About.tsx
│   ├── AdminLogin.tsx
│   ├── ContactModal.tsx
│   ├── Dashboard.tsx
│   ├── Experience.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Miscellany.tsx
│   ├── NavBar.tsx
│   ├── Projects.tsx
│   ├── Section.tsx
│   ├── Skills.tsx
│   ├── Slideshow.tsx
│   └── ThemeToggle.tsx
│
├── context/
│   └── PortfolioContext.tsx
│
├── node_modules/                   (← Created after npm install)
├── dist/                          (← Created after npm run build)
│
├── .gitignore
├── App.tsx
├── constants.ts
├── index.html
├── index.tsx
├── metadata.json
├── package.json
├── tsconfig.json
├── types.ts
├── vite.config.ts
├── README.md
├── ERROR_REPORT_AND_FIXES.md        (← NEW: Error details)
└── GITHUB_DEPLOYMENT_GUIDE.md       (← NEW: Deployment steps)
```

---

## Content You Need to Provide

### Resume/CV
- Save as: `public/resume.pdf`
- Format: PDF document with your work experience and skills
- Size: Keep under 5MB for best performance

### Profile Picture
Choose one option:

**Option 1: Use Online Image URL**
- Upload to: Imgur, Google Photos, Cloudinary, etc.
- Get shareable link
- Update in `constants.ts` line 14:
  ```typescript
  avatar: "https://your-image-url.jpg"
  ```

**Option 2: Use Local File**
- Save image as: `public/profile.jpg`
- Update `constants.ts`:
  ```typescript
  avatar: "/profile.jpg"
  ```

### Project Links (Optional but Recommended)
- Update each project URL in `constants.ts`
- Currently set to `"#"` (placeholder)
- Link to GitHub repos or live demos

---

## Quick Setup Commands

Run these in order:

```bash
# 1. Navigate to portfolio folder
cd d:\xampp\htdocs\Portfolio

# 2. Install all dependencies (fixes TypeScript error)
npm install

# 3. Verify it builds without errors
npm run build

# 4. Test locally
npm run preview
# Visit http://localhost:4173

# 5. Add everything to git
git add .

# 6. First commit
git commit -m "Initial commit: portfolio website"

# 7. Push to GitHub
git push -u origin main
```

---

## After Each Update

Whenever you update `constants.ts`:

```bash
# 1. Test locally
npm run dev

# 2. Build for production
npm run build

# 3. Commit and push
git add .
git commit -m "Update portfolio content"
git push
```

The site will auto-deploy within 2-5 minutes!

---

## Files You Can Delete (Safe to Remove)

- `.vscode/` folder (will be recreated if needed)
- `dist/` folder (will be regenerated on build)
- `node_modules/` folder (will be recreated with npm install)

These are already in `.gitignore` so they won't be committed.

---

## Still Have Issues?

See: [ERROR_REPORT_AND_FIXES.md](ERROR_REPORT_AND_FIXES.md)

Need deployment help? See: [GITHUB_DEPLOYMENT_GUIDE.md](GITHUB_DEPLOYMENT_GUIDE.md)
