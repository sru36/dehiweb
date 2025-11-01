import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) return alert("Please accept the Terms of Service");
    if (password !== confirm) return alert("Passwords do not match");
    
    // Set user token in localStorage to mark user as authenticated
    localStorage.setItem('userToken', 'authenticated');
    localStorage.setItem('userSession', JSON.stringify({ 
      name, 
      email, 
      signedUpAt: new Date().toISOString() 
    }));
    
    // Redirect to donate page after signup (user's dashboard)
    window.location.href = '/donate';
  };

  return (
    <main className="min-h-[70svh] flex items-center justify-center bg-background py-12">
      <div className="w-full max-w-lg px-6">
        <div className="rounded-lg border bg-card p-8 shadow-sm">
          <h1 className="text-2xl font-extrabold">Donor Sign Up</h1>
          <p className="mt-2 text-foreground/80">
            Create an account to donate, track your impact, and manage receipts.
          </p>

          <form className="mt-6 space-y-4" onSubmit={submit}>
            <div>
              <label className="text-sm font-medium">Full name</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="mt-1 w-full rounded-md border px-3 py-2"
                placeholder="Your full name"
              />
            </div>

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

            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Password</label>
                <input
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="mt-1 w-full rounded-md border px-3 py-2"
                  placeholder="Create a password"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Confirm password</label>
                <input
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  type="password"
                  className="mt-1 w-full rounded-md border px-3 py-2"
                  placeholder="Confirm password"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                id="tos"
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <label htmlFor="tos" className="text-sm text-foreground/80">
                I agree to the{" "}
                <a className="underline hover:text-primary" href="#">
                  Terms of Service
                </a>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full uppercase bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Sign up
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
              <button onClick={() => alert("Google sign-up (mock)")}>
                <div className="flex items-center justify-center gap-2">
                  <User />
                  Continue with Google
                </div>
              </button>
            </Button>
          </div>

          <p className="mt-4 text-sm text-foreground/80 text-center">
            Already have an account?{" "}
            <Link to="/login" className="font-medium hover:text-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
