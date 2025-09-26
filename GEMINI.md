# GEMINI.md

## Project Overview

This project is a React-based web application, likely serving as a design system or user interface for a security product named "App Guard". It is built with a modern frontend stack that includes TypeScript, Vite for bundling and development, and Tailwind CSS for styling. The component library from `shadcn/ui` is heavily used, indicating a focus on a pre-designed, accessible, and composable component architecture.

The application features a comprehensive routing system managed by `react-router-dom`, with distinct pages for features like a dashboard, app security, settings, and user profiles. State management appears to be handled through a combination of React context (`ThemeProvider`, `NotificationProvider`) and `tanstack/react-query` for asynchronous server state.

## Building and Running

The project uses `npm` as its package manager. The following scripts are defined in `package.json`:

*   **`npm run dev`**: Starts the Vite development server for local development. The server runs on `http://localhost:8080`.
*   **`npm run build`**: Bundles the application for production.
*   **`npm run lint`**: Lints the codebase using ESLint to enforce code quality.
*   **`npm run preview`**: Serves the production build locally to preview it.

To get started, run `npm i` to install dependencies, followed by `npm run dev`.

## Development Conventions

*   **Component-Based Architecture**: The project follows a strict component-based architecture. Reusable UI components are located in `src/components/ui`, and larger, more complex components are in `src/components`.
*   **Styling**: Styling is managed by Tailwind CSS. Custom theme configurations (colors, fonts, etc.) are defined in `tailwind.config.ts`. The use of `shadcn/ui` implies a utility-first CSS approach with pre-built component styles.
*   **Routing**: All application routes are defined in `src/App.tsx` using `react-router-dom`. Pages are located in the `src/pages` directory.
*   **Path Aliases**: A path alias `@{` is configured to point to the `src` directory for cleaner import statements.
*   **State Management**: Global state and theming are handled via React Context (`src/contexts`). Asynchronous server state is managed by `tanstack/react-query`.
*   **TypeScript**: The entire codebase is written in TypeScript, ensuring type safety.
