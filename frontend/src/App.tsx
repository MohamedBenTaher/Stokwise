import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
function App() {


  return (
    <QueryClientProvider client={queryClient}>
      <div>hello world</div>
    </QueryClientProvider>
  );
}

export default App;
