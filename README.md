**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## Project Status (as of 2025-09-27)

This project is currently under active development. The backend has been significantly built out to match the `API_SPECIFICATION.md`, and the frontend authentication has been connected to the backend.

### Backend Status

The following API sections have been implemented in the Flask backend:
-   User Management (`/api/user`)
-   App Security & Locking (`/api/apps`) - *Mock implementation*
-   Hidden Files Management (`/api/files`)
-   Notifications (`/api/notifications`)
-   Activity Logging (`/api/activity`)
-   Analytics & Reports (`/api/analytics`) - *Mock implementation*
-   Device Management (`/api/devices`) - *Mock implementation*
-   System Settings (`/api/settings`) - *Mock implementation*

The backend now includes a `requirements.txt` file for managing Python dependencies.

### Frontend Status

-   The login form (`AuthForm.tsx`) has been connected to the backend's `/api/auth/login` endpoint.
-   An `AuthContext` has been created to manage user sessions across the application.

### Biometric Authentication (Windows Hello)

The biometric authentication feature is currently being implemented using the **WebAuthn/FIDO2 standard**. This will allow for secure, passwordless authentication using platform authenticators like Windows Hello, Touch ID, and Android's biometric systems.

The implementation will involve:
1.  **Frontend**: Integrating a WebAuthn client library to handle the registration and authentication ceremonies in the browser.
2.  **Backend**: Using a FIDO2 server library (like `fido2` for Python) to manage the server-side logic of the WebAuthn protocol, including challenge generation and response verification.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/d537c996-7737-4a43-a7b4-b837827b473f) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)