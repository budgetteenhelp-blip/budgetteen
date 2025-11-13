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
import World5Page from "./pages/learn/world/5/page.tsx";
import World6Page from "./pages/learn/world/6/page.tsx";
import World7Page from "./pages/learn/world/7/page.tsx";
import World8Page from "./pages/learn/world/8/page.tsx";
import ProfilePage from "./pages/profile/page.tsx";
import BudgetsPage from "./pages/budgets/page.tsx";
import NotFound from "./pages/NotFound.tsx";

export default function App() {
  return (
    <DefaultProviders>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/learn/world/1" element={<World1Page />} />
          <Route path="/learn/world/2" element={<World2Page />} />
          <Route path="/learn/world/3" element={<World3Page />} />
          <Route path="/learn/world/4" element={<World4Page />} />
          <Route path="/learn/world/5" element={<World5Page />} />
          <Route path="/learn/world/6" element={<World6Page />} />
          <Route path="/learn/world/7" element={<World7Page />} />
          <Route path="/learn/world/8" element={<World8Page />} />
          <Route path="/budgets" element={<BudgetsPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </DefaultProviders>
  );
}
