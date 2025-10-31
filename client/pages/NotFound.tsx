import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[60svh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold mb-3">404</h1>
        <p className="text-lg text-foreground/70 mb-6">Oops! Page not found.</p>
        <Link
          to="/"
          className="inline-block px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
