
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LinkCreation from "./pages/LinkCreation";
import Acceptance from "./pages/Acceptance";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import LeadCapture from "./pages/LeadCapture";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/link-creation" element={<LinkCreation />} />
          <Route path="/acceptance" element={<Acceptance />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/get-integration" element={<LeadCapture />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
