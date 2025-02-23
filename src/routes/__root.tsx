import { Outlet, createRootRouteWithContext } from "@tanstack/solid-router";
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";

import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";

import Header from "../components/Header";

const queryClient = new QueryClient();

export const Route = createRootRouteWithContext<{}>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Outlet />
        {/* <TanStackRouterDevtools /> */}

        <SolidQueryDevtools buttonPosition="bottom-right" />
      </QueryClientProvider>
    </>
  );
}
