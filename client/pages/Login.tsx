import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Key } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 800);
    // mock login
    alert("Logged in (mock)");
  };

  return (
    <main className="min-h-[70svh] flex items-center justify-center bg-background py-12">
      <div className="w-full max-w-xl px-6">
        <div className="rounded-lg border bg-card p-8 shadow-sm">
          <h1 className="text-2xl font-extrabold">Donor Login</h1>
          <p className="mt-2 text-foreground/80">
            Sign in to manage donations, view receipts, and track impact.
          </p>

          <form className="mt-6 space-y-4" onSubmit={submit}>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="mt-1 w-full rounded-md border px-3 py-2"
                placeholder="you@domain.com"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="mt-1 w-full rounded-md border px-3 py-2"
                placeholder="Enter your password"
              />
            </div>

            <Button
              type="submit"
              className="w-full uppercase bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {loading ? "Signing in..." : "Login"}
            </Button>
          </form>

          <div className="my-4 flex items-center gap-3">
            <div className="h-px flex-1 bg-[rgba(0,0,0,0.06)]" />
            <div className="text-sm text-foreground/70">or continue with</div>
            <div className="h-px flex-1 bg-[rgba(0,0,0,0.06)]" />
          </div>

          <div className="flex gap-3">
            <Button
              className="flex-1 bg-white border text-foreground hover:bg-secondary"
              asChild
            >
              <button onClick={() => alert("Google sign-in (mock)")}>
                <div className="flex items-center justify-center gap-2">
                  <User />
                  Continue with Google
                </div>
              </button>
            </Button>
          </div>

          <p className="mt-4 text-sm text-foreground/80 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="font-medium hover:text-primary">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
