import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen.ts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider, useAuth } from './auth'
import { ThemeProvider } from "./components/theme/ThemeProvider.tsx";

const queryClient = new QueryClient()

const router = createRouter({
  routeTree,
  context: {
    queryClient,
    auth: undefined!
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
})

function InnerApp() {
  const auth = useAuth()
  return <RouterProvider router={router} context={{ auth }} />
}


declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <QueryClientProvider client={queryClient}>
  
     <AuthProvider>
      <InnerApp />
       <App />
      </AuthProvider>
       <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>  
    
    </ThemeProvider>
  </React.StrictMode>,
);
