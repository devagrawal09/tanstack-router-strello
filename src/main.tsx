import { RouterProvider, createRouter } from "@tanstack/solid-router";
import { render } from "solid-js/web";
import * as Sentry from "@sentry/solid";

import { routeTree } from "./routeTree.gen";
import "./styles.css";
import "virtual:uno.css";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
});

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [Sentry.replayIntegration()],

  // Setting a sample rate is required for sending performance data.
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control.
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 1.0, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0,
});

declare module "@tanstack/solid-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

const rootElement = document.getElementById("app")!;
render(() => <App />, rootElement!);
