
### Acknowledgements

This project was inspired by [NotionNext](https://github.com/tangly1024/NotionNext), originally developed by [tangly1024](https://github.com/tangly1024), which is based on Next.js Page Router system. The original project is available under the MIT License.

# Norkive (Notion Blog Starter with Next.js 15 + TypeScript)

<img width="1715" alt="image" src="https://private-user-images.githubusercontent.com/53728519/398549831-c9b21e55-cae3-4ef2-8aa8-174aadc1ff0f.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzUxMjAzOTksIm5iZiI6MTczNTEyMDA5OSwicGF0aCI6Ii81MzcyODUxOS8zOTg1NDk4MzEtYzliMjFlNTUtY2FlMy00ZWYyLThhYTgtMTc0YWFkYzFmZjBmLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDEyMjUlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQxMjI1VDA5NDgxOVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTU5NzFiMjk0Y2VmMDA2OWUwNjBiZWQ3MmQxOTg2ZTg4Mzg1YjVkMzU1ZDA2MDIyMzUzNzczMWExMTBhNzI4MGEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.oEEuCjS3sFDUotn0JRECHg3IFnKZ7AHlq18w9nbB7sg">

A minimal, fast, and extensible blog starter powered by [Next.js 15 App Router](https://nextjs.org/docs/app), [TypeScript](https://www.typescriptlang.org/), and [Notion API](https://developers.notion.com/).  
Norkive is a static Gitbook-themed web blog application that archives all your records in Notion, built with Next.js 15 App Router system and the Notion API.
Built to turn your Notion workspace into a fully customizable blog ✨

> 🛠 Built with performance, modularity, and simplicity in mind.

---

## 🚀 Demo

- Live: [notion-blog.vercel.app](https://notion-blog.vercel.app) ← (change to your deployed link)
- Notion Source Page: [📒 Notion DB Example](https://www.notion.so/your-notion-db-link)

---

## ✨ Features

- ✅ Type-safe & Modular Architecture
- ⚡️ Built with Next.js 15 App Router
- 📖 Fetch blog records directly from Notion DB
- 🧱 Onion Architecture with clean layering
- 🧩 Easily extensible with your UI library or state manager (Recoil/Jotai)
- 🌗 Dark mode ready
- 📱 Fully responsive design

---

## 🧱 Folder Structure

```bash
src/
├── domain/                         # Pure business logic & type rules
│   └── post/
│       ├── types.ts                # Domain-level Post type
│       └── validators.ts          # Input validation, pure logic
│
├── app/                            # Next.js App Router entry points
│   └── blog/
│       ├── page.tsx               # Blog main page
│       └── layout.tsx             # Blog-specific layout
│
├── features/
│   └── blog/
│       ├── model/                 # State (Recoil/Jotai etc.)
│       ├── hooks/                 # Business logic (e.g., useBlogrecords)
│       ├── services/              # Use cases / data access layer
│       └── ui/                    # Pure UI components
│
├── shared/
│   └── api/notion/                # External API logic (fetch & normalize)
│   └── ui/atoms/                  # Reusable small components
│
├── app/providers/                 # Context Providers (e.g., Recoil)
│
├── lib/utils/                     # Utility functions
```

## 📦 Tech Stack

| Category           | Technology                                |
|--------------------|--------------------------------------------|
| Language           | [TypeScript](https://www.typescriptlang.org/) |
| Framework          | [Next.js 15](https://nextjs.org/) (App Router) |
| CMS / DB           | [Notion API](https://developers.notion.com/) |
| State Management   | [Recoil](https://recoiljs.org/) or [Jotai](https://jotai.org/) (optional) |
| Styling            | [Tailwind CSS](https://tailwindcss.com/) (or other CSS-in-JS) |
| Deployment         | [Vercel](https://vercel.com/) or Netlify |
| Testing            | [Jest](https://jestjs.io/) / [Vitest](https://vitest.dev/) (optional) |
| Lint / Format      | ESLint, Prettier                          |
| Package Manager    | [pnpm](https://pnpm.io/) or npm / yarn     |

---

## 🛠 Getting Started

### 1. Clone this repo

```bash
git clone https://github.com/your-username/notion-blog-starter.git
cd notion-blog-starter
pnpm install
```
### 2. Configure Notion API

Create a .env.local file with the following:
```env
NOTION_DATABASE_ID=your_notion_database_id
NOTION_TOKEN=your_secret_token
```
👉 How to create a Notion integration

### 3. Run locally
```bash
pnpm dev 
```

### 🧪 Testing (Optional)
```bash
pnpm test 
```
Supports Jest or Vitest depending on your preference.


## 📄 License
This project is licensed under the MIT License.


## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

	•	📄 See CONTRIBUTING.md to get started
	•	📃 Follow the Code of Conduct

## 🔮 Roadmap
	•	Add RSS feed support
	•	SSG/ISR enhancements
	•	Integrate Giscus or Utterances for comments
	•	Post search and tag filtering
	•	i18n (internationalization) support

## 🙌 Acknowledgements
This project is inspired by:

	•	Notion API
	•	Vercel’s Next.js examples
	•	SWC

💡 If you find this project helpful, give it a ⭐️ to show your support!