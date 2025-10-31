import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="mt-8 border-t border-[rgba(0,0,0,0.06)] bg-transparent">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div>
          <div className="mb-0 text-sm font-medium">© 2025 Dehi</div>
        </div>
        <div className="flex items-center justify-end gap-6">
          <nav className="hidden md:flex gap-4 text-sm">
            <Link to="/our-impact" className="hover:text-primary">
              Our Impact
            </Link>
            <Link to="/explore" className="hover:text-primary">
              Explore
            </Link>
            <Link to="/about" className="hover:text-primary">
              About
            </Link>
          </nav>

          <div className="flex items-center gap-4 text-sm text-foreground/80">
            <span className="text-sm text-foreground/70">
              Made with ❤️ for communities
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
