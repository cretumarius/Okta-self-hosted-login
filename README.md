# Okta Self-Hosted Login

A React application demonstrating a custom, self-hosted login experience using Okta authentication — as opposed to the default Okta-hosted login page.

## Overview

This project implements the Okta PKCE authorization flow with a fully custom login UI. Users authenticate via a username/password form, receive a session token from Okta, and are redirected through the standard OAuth callback to access protected routes.

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite 4 |
| Authentication | `@okta/okta-react` + `@okta/okta-auth-js` |
| UI | Material-UI 5, Semantic UI React |
| Routing | React Router (createBrowserRouter) |

## Prerequisites

- Node.js 16+
- An Okta developer account with an application configured for:
  - **Sign-in redirect URI:** `http://localhost:8080/login/callback`
  - **Grant type:** Authorization Code with PKCE

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repo-url>
   cd Okta-self-hosted-login
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Copy `.env.example` to `.env` and fill in your Okta application details:

   ```bash
   cp .env.example .env
   ```

   | Variable | Description |
   |---|---|
   | `VITE_OKTA_DOMAIN` | Your Okta domain, e.g. `dev-xxxxxxxx.okta.com` |
   | `VITE_CLIENT_ID` | Client ID from your Okta application |
   | `VITE_CALLBACK_PATH` | OAuth callback path — `/login/callback` |
   | `VITE_ISSUER` | Authorization server URL, e.g. `https://dev-xxxxxxxx.okta.com/oauth2/default` |
   | `VITE_HOST` | App host — `window.location.host` |
   | `VITE_SCOPES` | Requested scopes — `openid profile email` |

4. **Start the development server**

   ```bash
   npm run dev
   ```

   The app runs on [http://localhost:8080](http://localhost:8080).

## Application Routes

| Route | Access | Description |
|---|---|---|
| `/login` | Public | Custom username/password sign-in form |
| `/login/callback` | Public | Okta OAuth callback handler |
| `/dashboard` | Protected | Main dashboard with contact list |
| `/profile` | Protected | Displays the authenticated user's ID token claims |

## Authentication Flow

1. User submits credentials on `/login`
2. App calls `oktaAuth.signInWithCredentials()` — Okta validates credentials and returns a session token
3. App calls `oktaAuth.signInWithRedirect()` with the session token — Okta exchanges it for an authorization code
4. Browser is redirected to `/login/callback` where the auth code is exchanged for tokens
5. User lands on `/dashboard`

## Scripts

```bash
npm run dev       # Start development server (port 8080)
npm run build     # Type-check and build for production
npm run preview   # Preview the production build locally
```

## Security Notes

- Never commit `.env` — it is listed in `.gitignore`
- Use `.env.example` as a template; it contains no real credentials
- Rotate your Okta Client ID if it has ever been exposed in version control
