# Modern Developer Portfolio & CMS

A high-performance, fully responsive personal portfolio website built with **React 19**, **TypeScript**, and **Tailwind CSS**.

This project goes beyond a static site by integrating a comprehensive **Admin Dashboard**, allowing for real-time content management, project updates, and message handling without needing to modify the codebase.

## 🚀 Key Features

### 🎨 UI/UX & Design
*   **Modern Aesthetic:** Clean, minimalist interface with a focus on typography and whitespace.
*   **Dark/Light Mode:** Fully supported theming with system preference detection and manual toggle persistence.
*   **Smooth Animations:** Powered by **Framer Motion** for engaging scroll reveals, page transitions, and interactive elements.
*   **Responsive Layout:** Mobile-first design ensuring a pixel-perfect experience across phones, tablets, and desktops.

### ⚡ Technical Capabilities
*   **Dynamic Content Engine:** All data (Profile, Experience, Projects, Skills) is state-managed and editable.
*   **Integrated Admin Panel:** A password-protected dashboard to manage the entire portfolio:
    *   **CRUD Operations:** Add, edit, or delete projects, work experience, education, and slides.
    *   **Inbox Management:** View, mark as read, and delete messages sent via the contact form.
    *   **JSON Editor:** Advanced mode for bulk data updates and backup.
    *   **Security:** Client-side authentication for admin access.
*   **Media Management:** Support for image URLs and PDF resume uploads (via Data URL encoding).
*   **Social Connectivity:** Configurable social links including GitHub, LinkedIn, Twitter, Gmail, and WhatsApp.

## 🛠️ Tech Stack

*   **Frontend Library:** React 19
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Animations:** Framer Motion
*   **Icons:** Lucide React
*   **Build/Runtime:** ESM (ECMAScript Modules)

## 📦 Getting Started

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/portfolio.git
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm start
    ```

4.  **Add Your Profile Photo** ⚠️ **IMPORTANT**
    - Photos uploaded via Dashboard don't persist in deployment
    - Follow instructions in [HOW_TO_ADD_PROFILE_PHOTO.md](HOW_TO_ADD_PROFILE_PHOTO.md)
    - Add your photo to `public/` folder and update `constants.ts`

## 🔐 Admin Access

To access the CMS dashboard:
1.  Click the **Lock icon** in the footer of the website.
2.  Enter the default password (configurable in `components/AdminLogin.tsx` or via LocalStorage).
3.  Start customizing your content instantly.

---

**License**
MIT