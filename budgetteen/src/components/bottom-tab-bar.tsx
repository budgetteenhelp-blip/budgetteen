import { Home, Wallet, GraduationCap, MoreHorizontal } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  icon: typeof Home;
  path: string;
}

const tabs: Tab[] = [
  { id: "home", label: "Home", icon: Home, path: "/" },
  { id: "money", label: "Money", icon: Wallet, path: "/money" },
  { id: "learn", label: "Learn", icon: GraduationCap, path: "/learn" },
  { id: "more", label: "More", icon: MoreHorizontal, path: "/more" },
];

export function BottomTabBar() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-16 max-w-screen-xl items-center justify-around px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = isActive(tab.path);

          return (
            <Link
              key={tab.id}
              to={tab.path}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-4 py-2 transition-colors",
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5", active && "fill-primary/20")} />
              <span className="text-xs font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
