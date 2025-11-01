import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore" },
  { to: "/about", label: "About" },
  { to: "/login", label: "Login" },
];

export function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          to="/"
          className="flex items-center gap-2 font-extrabold text-xl text-foreground"
          aria-label="Dehi (देहि) home"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2Fc4cd4783faee4d4a852d9c690354555a%2F5e56da7edc3a4058a7f87fb10f000c34?format=webp&width=800"
            alt="Dehi logo"
            className="h-6 w-6 rounded-full"
          />
          Dehi
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            if (item.label === "Login") {
              return (
                <Link key={item.to} to={item.to}>
                  <Button className="uppercase tracking-wide bg-primary text-primary-foreground hover:bg-primary/90">
                    {item.label}
                  </Button>
                </Link>
              );
            }

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive ? "text-primary" : "text-foreground",
                  )
                }
              >
                {item.label}
              </NavLink>
            );
          })}
        </div>

        <button
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-input"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <Menu className="text-foreground" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t bg-background">
          <div className="container px-4 py-3 flex flex-col gap-3">
            {navItems.map((item) => {
              if (item.label === "Login") {
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                  >
                    <Button className="w-full uppercase tracking-wide bg-primary text-primary-foreground hover:bg-primary/90">
                      {item.label}
                    </Button>
                  </Link>
                );
              }

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "py-2 text-base font-medium hover:text-primary",
                      isActive ? "text-primary" : "text-foreground",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
