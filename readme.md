# Vite React TS Social Media

A frontend-only social media application built with Vite, React, TypeScript, and TailwindCSS. Supports thread creation, replies, storing IP (mock), device info, timestamps in localStorage, and export to JSON/Excel.

---

## 📦 Prerequisites

* Node.js (>=14.x)
* Yarn (>=1.22.x)

---

## 🚀 Installation

Clone the repository or extract the provided `.zip`:

```bash
git clone <your-repo-url>
# or unzip
unzip vite-react-ts-social-media-complete.zip -d vite-react-ts-social-media
cd vite-react-ts-social-media
```

Install dependencies:

```bash
yarn install
```

Install additional UI & export libraries:

```bash
yarn add react-router-dom uuid xlsx file-saver lucide-react @radix-ui/react-icons @shadcn/ui
```

Install development types (TypeScript typings):

```bash
yarn add -D @types/react-router-dom @types/file-saver
```

---

## 🎨 Available Scripts

In project directory, you can run:

| Script         | Description                       |
| -------------- | --------------------------------- |
| `yarn dev`     | Runs the app in development mode. |
| `yarn build`   | Bundles the app for production.   |
| `yarn preview` | Locally preview production build. |

---

## 📁 Project Structure

```
vite-react-ts-social-media/
├─ node_modules/
├─ public/
│  └─ favicon.ico
├─ src/
│  ├─ pages/
│  │  ├─ ThreadListPage.tsx
│  │  ├─ NewThreadPage.tsx
│  │  └─ ThreadDetailPage.tsx
│  ├─ utils/
│  │  ├─ storage.ts
│  │  ├─ helpers.ts
│  │  └─ types.ts
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ index.css
├─ .gitignore
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
├─ postcss.config.js
└─ tailwind.config.js
```

---

## ✨ Features

* **Thread Creation**: Create new discussion threads with title and content.
* **Replies**: Post replies under each thread.
* **Data Storage**: Uses `localStorage` for persisting threads and replies.
* **Meta Info**: Mock IP address, browser device info, ISO timestamp.
* **Export**: Buttons to export data as JSON (`threads.json`) and Excel (`threads.xlsx`).
* **Responsive UI**: Beautiful card-based layout, mobile-first design.

---

## ⚙️ Deployment

1. Build the production bundle:

   ```bash
   yarn build
   ```

2. Serve `dist/` folder or deploy to GitHub Pages:

   * Install `gh-pages`:

     ```bash
     yarn add -D gh-pages
     ```
   * Add to `package.json`:

     ```jsonc
     "scripts": {
       "predeploy": "yarn build",
       "deploy": "gh-pages -d dist"
     }
     ```
   * Deploy:

     ```bash
     yarn deploy
     ```

---

## 🤝 Contributing

Feel free to open issues or submit pull requests.

---

## 📝 License

MIT © Your Name
