import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DefaultProviders } from "./components/providers/default.tsx";
import AuthCallback from "./pages/auth/Callback.tsx";
import Index from "./pages/Index.tsx";
import QuizPage from "./pages/quiz/page.tsx";
import LearnPage from "./pages/learn/page.tsx";
import World1Page from "./pages/learn/world/1/page.tsx";
import World2Page from "./pages/learn/world/2/page.tsx";
import World3Page from "./pages/learn/world/3/page.tsx";
import World4Page from "./pages/learn/world/4/page.tsx";
import NotFound from "./pages/NotFound.tsx";

export default function App() {
  return (
    <DefaultProviders>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/learn/world/1" element={<World1Page />} />
          <Route path="/learn/world/2" element={<World2Page />} />
          <Route path="/learn/world/3" element={<World3Page />} />
          <Route path="/learn/world/4" element={<World4Page />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </DefaultProviders>
  );
}
