# Score Tracker

![CI](https://github.com/Zakyaru/Project_Score-Tracker/actions/workflows/ci.yml/badge.svg)

REST API to track board game results within groups of friends: record matches, keep a history, and see who wins the most.

## Features (V1)

- Account registration and login (JWT)
- Groups of friends, managed by their owner
- Games registered per group
- Match recording with participants, winners and optional scores
- Match history with filters and pagination
- Group leaderboard (wins, matches played, win rate)

Detailed user stories: [docs/user-stories.md](docs/user-stories.md)

## Tech stack

- **Runtime**: Node.js 22, TypeScript, Express
- **Validation**: Zod
- **Testing**: Vitest
- **Quality**: ESLint, Prettier, GitHub Actions CI
- **Planned**: PostgreSQL, Prisma, Docker, deployment on a VPS behind Nginx

## Getting started

Prerequisites: Node.js 22

```bash
npm ci
cp .env.example .env
npm run dev
```

## Scripts

| Script                 | Description                       |
| ---------------------- | --------------------------------- |
| `npm run dev`          | Start the server in watch mode    |
| `npm run build`        | Compile TypeScript to `dist/`     |
| `npm start`            | Run the compiled server           |
| `npm test`             | Run the tests once                |
| `npm run test:watch`   | Run the tests in watch mode       |
| `npm run lint`         | Lint the code                     |
| `npm run typecheck`    | Type-check without emitting files |
| `npm run format`       | Format the code                   |
| `npm run format:check` | Check formatting                  |

## Roadmap

### V1 — in progress

- [x] Project setup (TypeScript, Express, ESLint, Prettier)
- [x] Test setup and CI
- [x] Scoping (user stories)
- [ ] Data model and database (PostgreSQL + Prisma)
- [ ] Authentication
- [ ] Groups and members
- [ ] Games and matches
- [ ] Stats and leaderboard
- [ ] API documentation (OpenAPI)
- [ ] Docker
- [ ] Deployment (VPS + Nginx + HTTPS)

### V2 — ideas, deliberately out of V1 scope

- Match result validation by other participants
- Group invitations with acceptance
- Game nights (grouping matches by evening)
- Player stats across all groups
- Other scoring types (lowest score wins, teams, co-op games)
- Multiple roles within a group
- Password reset, user profiles, avatars

## Commit conventions

- `feat:` a new feature
- `fix:` a bug fix
- `refactor:` code restructuring without behavior change
- `test:` adding or updating tests
- `docs:` documentation changes
- `style:` formatting only
- `chore:` configuration, dependencies, tooling
