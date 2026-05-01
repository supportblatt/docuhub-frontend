# Docuhub Frontend

Next.js frontend service.

## Local Run

```bash
npm ci
npm run dev
```

## Authentication UI

Implemented pages:

- `/login` (username/password + Microsoft SSO)
- `/login/totp` (second factor for local auth only)
- `/login/callback` (Microsoft OAuth callback handoff)

Set:

- `NEXT_PUBLIC_API_BASE_URL` to backend API origin (for example `http://localhost:4100/api`)
- `NEXT_PUBLIC_CSRF_COOKIE_NAME` to the backend CSRF cookie name (default `docuhub_csrf`)

## Frontend Production Env

Create production env from example and update values:

```bash
cp .env.example /tmp/frontend.prod.env
```

Required production values:

- `NODE_ENV=production`
- `PORT=3100`
- `NEXT_PUBLIC_API_BASE_URL=https://app.docuhub.com.au/api`
- `NEXT_PUBLIC_CSRF_COOKIE_NAME=docuhub_csrf` (or match backend `AUTH_CSRF_COOKIE_NAME`)

Then upload as multiline GitHub secret in `docuhub-frontend`:

```bash
gh secret set FRONTEND_ENV_FILE < /tmp/frontend.prod.env
```

## GitHub Actions CI/CD

Workflow file: `.github/workflows/ci-cd.yml`

On push to `main`, GitHub Actions will:

1. Run build and lint.
2. Upload a deployment bundle.
3. SSH into your Google Cloud VM.
4. Rebuild and restart Docker container `docuhub-frontend`.

Runtime topology on the VM:

- public URL: `https://app.docuhub.com.au`
- Caddy proxies `/` to frontend (`127.0.0.1:3100`)
- Caddy proxies `/api/*` to backend (`127.0.0.1:4100`)

## Required GitHub Secrets

- `GCP_VM_HOST`: VM external IP or DNS
- `GCP_VM_USER`: SSH username
- `GCP_VM_SSH_KEY`: private SSH key (PEM/OpenSSH)
- `GCP_VM_PORT`: optional, default `22`
- `FRONTEND_ENV_FILE`: full `.env` content for frontend (multiline secret)

Note:

- Deployment rewrites `/opt/docuhub-frontend/.env` from `FRONTEND_ENV_FILE` on every push to `main`.

## VM Prerequisites

- Docker installed
- SSH key added to `~/.ssh/authorized_keys` for `GCP_VM_USER`
- User can run Docker commands
- Caddy installed on host

Deployment target directory on VM: `/opt/docuhub-frontend`
