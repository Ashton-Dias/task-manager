# Task Manager

A simple task manager where you can register, log in, and manage your own to-do list.

## What it does

- Email/password authentication (register, log in, log out) via Supabase Auth.
- Once logged in, users can add, view, edit, mark complete, and delete their own tasks.
- Each task has a title and an optional due date.
- Row Level Security ensures every user can only see and modify their own tasks.

## Technologies used

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Supabase](https://supabase.com/) (auth + database)
- [Netlify](https://www.netlify.com/) (deployment)
- [Claude Code](https://claude.com/claude-code)

## Setup

1. Clone the repo:

   ```bash
   git clone https://github.com/Ashton-Dias/task-manager.git
   cd task-manager
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and fill in your Supabase project's URL and anon key:

   ```bash
   cp .env.example .env
   ```

4. In the Supabase SQL Editor, run the contents of [`supabase/schema.sql`](supabase/schema.sql) to create the `tasks` table and its Row Level Security policies.

5. Start the dev server:

   ```bash
   npm run dev
   ```

## Deployed app

[TODO: add deployed link]

## Demo video

[TODO: add demo video link]
