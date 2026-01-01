# Portfolio Client - AI Coding Instructions

## Architecture Overview

A **React 19 + TypeScript + Vite** SPA for managing and displaying a portfolio/resume. The frontend communicates with multiple backend services via proxied API endpoints.

### Backend Services (via Vite proxy)

- `/api/portfolio/*` → Portfolio service (`:9090`) - Resume CRUD, validation, publishing
- `/api/auth/*` → Auth service (`:8080`) - JWT-based authentication
- `/api/bos/images/*` → Image storage service (`:8000`)

### Data Flow

```
React Query (TanStack) → src/api/queries.ts (hooks) → src/api/requests.ts (fetch) → Backend
```

## Key Conventions

### State Management

- **TanStack React Query** for all server state - no Redux/Zustand
- Custom hooks in `src/api/queries.ts` wrap all API calls with `useQuery`/`useSuspenseQuery`/`useMutation`
- Auth state stored in `sessionStorage` and synced via React Query (`useAuth` hook in [use-auth.ts](src/sites/login/use-auth.ts))

### Styling

- **Tailwind CSS** with CSS custom properties for theming
- Theme variables defined in [index.css](src/index.css): `--background`, `--surface`, `--border`, `--foreground`, `--foreground-muted`
- Dark mode via `.dark` class on root element
- Always use `var(--*)` for colors, not hardcoded values

### i18n Pattern

- All user-facing text uses `react-i18next` with `useTranslation()` hook
- Translation files: `src/locales/{en,pl}/translation.json`
- Keys are dot-notated and organized by feature: `"editOverview.portfolioPublished"`
- Run `node scripts/translation-audit.mjs` to find missing/unused keys

### Form Validation

- Use `ValidatedTextInput` component with `min`/`max` props for length validation
- Field constraints fetched from backend via `useConstraint()` hook
- Pattern: validate locally, then call backend validation endpoint before save

### Component Patterns

- Shared components in `src/shared/` - reusable UI primitives
- Site/page components in `src/sites/{feature}/` - feature-specific views
- Dialogs use native `<dialog>` with `ThemedDialog` wrapper ([ThemedDialog.tsx](src/shared/ThemedDialog.tsx))
- All routes lazy-loaded via `React.lazy()` in [LazyRoutes.tsx](src/route/LazyRoutes.tsx)

### API Layer Structure

- **[model.ts](src/api/model.ts)**: TypeScript interfaces/types for all domain entities
- **[requests.ts](src/api/requests.ts)**: Raw fetch functions with error handling
- **[queries.ts](src/api/queries.ts)**: React Query hooks that call requests

## Developer Workflows

```bash
npm run dev          # Start dev server with API proxies
npm run build        # TypeScript check + Vite build
npm run lint         # ESLint with zero warnings policy
```

### Docker

```bash
docker build -t portfolio-client .   # Build image
docker compose up                     # Run with compose
```

## Code Style

- **No semicolons** (Prettier configured)
- Prefer `type` over `interface` for simple types
- Use `type JSX.Element` return types on components
- Functional components only - no class components
- Enum values use `ts-enum-util` (`$enum()`) for iteration

## File Organization

When adding new features:

1. Add types to `src/api/model.ts`
2. Add fetch functions to `src/api/requests.ts`
3. Add React Query hooks to `src/api/queries.ts`
4. Add translation keys to both `en/translation.json` and `pl/translation.json`
5. Create components in appropriate `src/sites/{feature}/` directory
