# Docuhub Frontend

Next.js frontend service.

## Local Run

```bash
npm ci
npm run dev
```

## GitHub Actions CI/CD

Workflow file: `.github/workflows/ci-cd.yml`

On push to `main`, GitHub Actions will:

1. Run build and lint.
2. Upload a deployment bundle.
3. SSH into your Google Cloud VM.
4. Rebuild and restart Docker container `docuhub-frontend`.

## Required GitHub Secrets

- `GCP_VM_HOST`: VM external IP or DNS
- `GCP_VM_USER`: SSH username
- `GCP_VM_SSH_KEY`: private SSH key (PEM/OpenSSH)
- `GCP_VM_PORT`: optional, default `22`
- `FRONTEND_ENV_FILE`: full `.env` content for frontend (multiline secret)

## VM Prerequisites

- Docker installed
- SSH key added to `~/.ssh/authorized_keys` for `GCP_VM_USER`
- User can run Docker commands

Deployment target directory on VM: `/opt/docuhub-frontend`
