import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { SignInButton } from "@/components/ui/signin.tsx";

export function LandingNav() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b bg-white/80 backdrop-blur-lg dark:bg-gray-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link to="/landing" className="flex items-center gap-3">
          <img
            src="https://cdn.hercules.app/file_n1wHwb8O3RpaBvvNN8Ed9RBI"
            alt="Budget Teen Logo"
            className="size-10"
          />
          <span className="text-xl font-bold text-emerald-600">Budget Teen</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/about">
            <Button variant="ghost" className="text-base">
              About Us
            </Button>
          </Link>
          <Link to="/mission">
            <Button variant="ghost" className="text-base">
              Our Mission
            </Button>
          </Link>
          <Link to="/join-team">
            <Button variant="ghost" className="text-base">
              Join Our Team
            </Button>
          </Link>
          <SignInButton
            size="lg"
            signInText="Get Started"
            showIcon={false}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 font-semibold shadow-lg hover:from-emerald-600 hover:to-teal-600"
          />
        </div>
      </div>
    </nav>
  );
}
