# BookShelf Frontend

Vite + React + TypeScript UI for a role-based book catalog and personal reading library, styled with **shadcn/ui** and an **Ink & Sage** theme.

## Personas

| Persona | What they can do |
| ------- | ---------------- |
| **Admin** | Manage the shared catalog (create / edit / delete books); also use My Library like any user |
| **User** | Browse the catalog, add books to My Library, update reading status, remove from library |

Statuses: **Want to read**, **Reading**, **Completed**.

## Stack

- React 18, TypeScript, Vite
- React Router, TanStack Query, Axios
- Tailwind CSS 3 + **shadcn/ui** (Radix primitives)
- **next-themes** for light / dark / system
- Fonts: Fraunces (display) + Figtree (body)
- notistack for toasts

## UI & theme

- Brand: **BookShelf**
- Design tokens live in `src/index.css` as CSS variables (`:root` / `.dark`)
- Theme toggle is in the navbar and on auth pages
- Add more shadcn components with:

```bash
npx shadcn@latest add <component>
```

Config: `components.json`. Shared helpers: `src/lib/utils.ts` (`cn`).

## Setup

```bash
npm install
```

Create `.env.local`:

```env
VITE_APP_API_BASE_URL=http://localhost:5000/api/v1
```

Start the backend first (see `be-book-store` README), seed an admin if needed, then:

```bash
npm run dev
```

App defaults to [http://localhost:5173](http://localhost:5173).

## Routes

| Path | Access | Purpose |
| ---- | ------ | ------- |
| `/login`, `/register` | guests | Auth |
| `/` | signed-in | Catalog (table/card); admins see CRUD; everyone can add to library |
| `/library` | signed-in | My Library with status filter / update / remove |
| `/books/details/:bookId` | signed-in | Book detail + add / status |
| `/books/create`, `/books/edit/:id`, `/books/delete/:id` | admin | Catalog management |

JWT and user are stored in `localStorage`. The Axios client attaches `Authorization: Bearer …` automatically.

## Scripts

```bash
npm run dev       # Vite dev server
npm run build     # Typecheck + production build
npm run preview   # Preview production build
npm run lint      # ESLint
```

## Project layout

```
src/
  components/ui/   # shadcn primitives
  components/      # navbar, theme-toggle, page-header, guards, catalog
  pages/
  context/         # AuthProvider
  hooks/
  services/
  routes/
  lib/utils.ts
```
