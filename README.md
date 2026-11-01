<div align="center">

  <img src="https://ik.imagekit.io/tvaz27dnm/bookecho_git_banner" alt="BookEcho AI project banner" width="100%" />

  <br />

  <p>
    <img src="https://img.shields.io/badge/-Next.js_16-black?style=for-the-badge&logoColor=white&logo=next.js&color=black" alt="Next.js 16" />
    <img src="https://img.shields.io/badge/React-19-149ECA?style=for-the-badge&logo=react&logoColor=blue" alt="React 19" />
    <img src="https://img.shields.io/badge/Clerk-Authentication-6C47FF?style=for-the-badge&logo=clerk&logoColor=white" alt="Clerk" />
    <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Vapi-Voice_AI-5B06E5?style=for-the-badge&logo=soundcharts&logoColor=white" alt="Vapi AI" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=blue" alt="Tailwind CSS 4" />
    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=blue" alt="TypeScript 5" />
    <br />
    <img src="https://img.shields.io/badge/Vercel_Blob-Storage-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel Blob" />
    <img src="https://img.shields.io/badge/React_Hook_Form-Forms-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white" alt="React Hook Form" />
    <img src="https://img.shields.io/badge/Zod-Validation-3E67B1?style=for-the-badge&logo=zod&logoColor=blue" alt="Zod" />
    <img src="https://img.shields.io/badge/shadcn%2Fui-Components-000000?style=for-the-badge&logo=shadcnui&logoColor=black" alt="shadcn/ui" />
    <img src="https://img.shields.io/badge/License-Apache_2.0-blue.svg?style=for-the-badge" alt="Apache 2.0 License" />
  </p>
</div>

---

# 🎙️ BookEcho AI

**BookEcho AI** is an interactive, voice-enabled reading companion that turns any book or document into a real-time conversational partner. Upload any PDF, choose a customized AI voice persona, and start talking to your books naturally using cutting-edge voice intelligence.

## Table of Contents

1. [🌟 Introduction](#-introduction)
2. [🛠 Tech Stack](#-tech-stack)
3. [🧩 Features](#-features)
4. [🚀 Quick Start](#-quick-start)
5. [🔑 Environment Variables](#-environment-variables)
6. [📐 Available Commands](#-available-commands)
7. [📜 License](#-license)

---

## 🌟 Introduction

BookEcho bridges the gap between passive reading and active learning. By indexing PDF documents into searchable semantic segments and integrating ultra-low latency voice agents, BookEcho allows users to speak directly with the author's voice persona, ask deep conceptual questions, request chapter summaries, or quiz themselves on complex topics.

All user sessions, uploaded books, transcripts, and voice duration limits are securely tracked and protected through resource-level Clerk authentication and MongoDB.

## 🛠 Tech Stack

- **[Next.js 16](https://nextjs.org/)** & **[React 19](https://react.dev/)**: Next-generation App Router architecture featuring Server Components, Server Actions, and Turbopack.
- **[TypeScript 5](https://www.typescriptlang.org/)**: End-to-end type safety across database schemas, actions, hooks, and UI components.
- **[Clerk](https://clerk.com/)**: Resource-based server authentication, session management, and user profiles.
- **[MongoDB](https://www.mongodb.com/)** & **[Mongoose](https://mongoosejs.com/)**: Scalable document storage for users, books, chapter segments, transcripts, and voice sessions.
- **[Vapi AI](https://vapi.ai/)** & **[ElevenLabs](https://elevenlabs.io/)**: Real-time voice intelligence, custom voice personas, and streaming audio synthesis.
- **[Vercel Blob](https://vercel.com/docs/storage/vercel-blob)**: Cloud storage for book cover art and uploaded PDF documents.
- **[PDF.js](https://mozilla.github.io/pdf.js/) (`pdfjs-dist`)**: Client and server-side PDF parsing and content extraction.
- **[Tailwind CSS 4](https://tailwindcss.com/)** & **[shadcn/ui](https://ui.shadcn.com/)**: Modern typography, Radix UI primitives, and a liquid glassmorphic transparency design.
- **[React Hook Form](https://react-hook-form.com/)** & **[Zod](https://zod.dev/)**: Robust form state management and schema validation.
- **[Framer Motion](https://motion.dev/)**, **[Lucide React](https://lucide.dev/)**, & **[Sonner](https://sonner.emilkowal.ski/)**: Fluid micro-animations, icons, and toast feedback.

## 🧩 Features

- **🎙️ Real-Time Voice Conversations**: Low-latency voice dialogue powered by Vapi AI and ElevenLabs voice models.
- **📄 Instant PDF Ingestion & Parsing**: Automatically extracts text, divides content into structured segments, and indexes them for real-time question answering.
- **🗣️ Customizable Voice Personas**: Select different voice personalities (e.g., Daniel, Nova, Rachel) tailored to the genre and tone of your book.
- **📜 Live Spoken Transcripts**: Word-by-word streaming transcript viewer with history persistence, smooth auto-scrolling, and instant clear options.
- **🔒 Resource-Level Authentication**: Strict route protection via Clerk ensuring all dashboard, book, and subscription paths require authentication, while allowing public webhooks.
- **🔍 Semantic Book Search**: Fast text queries across your personal library with dynamic filtering.
- **⏱️ Session & Usage Tracking**: Real-time timer enforcement, session duration monitoring, and automatic error handling for credit limits or device permissions.
- **🎨 Liquid Glass UI**: Modern literary aesthetic with warm tones, frosted glass backdrop filters, and responsive Shadcn empty-state tabs.

## 🚀 Quick Start

### Requirements

- **Node.js** 20.x or higher
- **npm** or **pnpm**
- **MongoDB** database instance (e.g. MongoDB Atlas)
- **Clerk** application credentials
- **Vapi AI** API key and Assistant ID
- **Vercel Blob** storage token

### Install and Run

1. **Clone the repository:**
   ```bash
   git clone https://github.com/TheHarmanCodes/BookEcho-AI.git
   cd BookEcho-AI
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add your credentials (see below).

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open the application:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Environment Variables

Create a `.env.local` file in your root folder with the following variables:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key for client-side authentication. |
| `CLERK_SECRET_KEY` | Clerk secret key for server-side auth verification. |
| `MONGODB_URI` | MongoDB connection string (including credentials & database name). |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob read/write token for storing PDFs and covers. |
| `NEXT_PUBLIC_VAPI_API_KEY` | Vapi AI public API key for initializing the client voice SDK. |
| `NEXT_PUBLIC_ASSISTANT_ID` | Vapi Assistant identifier configured with book search tools. |

Example `.env.local`:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Database
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/bookecho?retryWrites=true&w=majority

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...

# Vapi Voice AI
NEXT_PUBLIC_VAPI_API_KEY=your_vapi_api_key
NEXT_PUBLIC_ASSISTANT_ID=your_vapi_assistant_id
```

## 📐 Available Commands

```bash
npm run dev    # Start the local development server (with Turbopack)
npm run build  # Create an optimized production build
npm run start  # Start the production server
npm run lint   # Run ESLint checks across the codebase
```

## 📜 License

This project is licensed under the [Apache License, Version 2.0](LICENSE). You may use, distribute, and modify the software under the terms and conditions defined in the license.
