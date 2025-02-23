import { Outlet, createRootRouteWithContext } from "@tanstack/solid-router";
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";

import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";

const queryClient = new QueryClient();

export const Route = createRootRouteWithContext<{}>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Outlet />
        {/* <TanStackRouterDevtools /> */}

        <SolidQueryDevtools buttonPosition="bottom-right" />
      </QueryClientProvider>
    </>
  );
}
