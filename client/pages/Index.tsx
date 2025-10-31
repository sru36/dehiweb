import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, BarChart3, ShieldCheck, ArrowRight } from "lucide-react";

const HERO_IMAGE =
  "https://cdn.builder.io/api/v1/image/assets%2Fc4cd4783faee4d4a852d9c690354555a%2Fec32dddb588a48a58e936ca9bc7a4e88?format=webp&width=2000";

export default function Index() {
  return (
    <main className="bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Community impact"
            className="w-full h-[520px] object-cover"
          />
          <div className="absolute inset-0 bg-secondary/70" />
        </div>

        <div className="container relative z-10 mx-auto flex min-h-[520px] items-center px-4">
          <div className="max-w-3xl">
            <div className="inline-block rounded-md bg-secondary/90 px-3 py-1 text-sm font-medium">
              Trusted • Transparent • Local
            </div>
            <h1 className="mt-6 text-4xl md:text-5xl font-extrabold leading-tight">
              dehi (देहि) — Help real people, see real impact
            </h1>
            <p className="mt-4 text-lg text-foreground/90 max-w-2xl">
              Find verified projects, donate securely, and track exactly how
              funds are used with visual updates from the field.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/explore">
                <Button
                  size="lg"
                  className="uppercase bg-primary text-primary-foreground hover:bg-primary/90 px-6"
                >
                  Donate
                </Button>
              </Link>
              <Link to="/register-ngo">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-foreground text-foreground hover:bg-secondary px-6"
                >
                  Register your NGO
                </Button>
              </Link>
            </div>

            <p className="mt-4 text-sm text-foreground/80">
              Already a donor?{" "}
              <Link to="/login" className="hover:text-primary font-medium">
                Log in
              </Link>{" "}
              to view your dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* Give Monthly / Featured Projects */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold">Give Monthly</h2>
        <p className="mt-2 text-foreground/80">
          Support ongoing work with a small monthly contribution. Change happens
          over time.
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <article
              key={i}
              className="rounded-lg border bg-card overflow-hidden"
            >
              <img
                src={`https://source.unsplash.com/collection/190727/800x600?sig=${i}`}
                alt={`project ${i}`}
                className="h-40 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Project title {i + 1}</h3>
                <div className="mt-1 text-sm text-foreground/70">
                  Organization Name
                </div>
                <p className="mt-3 text-sm text-foreground/80">
                  Short one-line summary of the project and who it helps.
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="w-2/3">
                    <div className="h-2 w-full rounded-full bg-[rgba(0,0,0,0.06)]">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${30 + i * 10}%` }}
                      />
                    </div>
                    <div className="mt-1 text-xs text-foreground/70">
                      {30 + i * 10}% funded
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Donate
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Support a Fundraiser */}
      <section className="bg-secondary">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold">Support a fundraiser</h3>
              <p className="mt-2 text-foreground/80 max-w-xl">
                Donate directly to causes started by individuals and NGOs.
                Hand-picked campaigns from verified organizations.
              </p>
            </div>
            <Link to="/explore">
              <Button className="uppercase bg-primary text-primary-foreground hover:bg-primary/90">
                See Fundraisers
              </Button>
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <article key={i} className="rounded-lg border bg-card p-4">
                <div className="flex gap-3">
                  <img
                    src={`https://source.unsplash.com/collection/190727/200x160?sig=${i + 10}`}
                    alt="fundraiser"
                    className="h-20 w-28 object-cover rounded-md"
                  />
                  <div>
                    <h4 className="font-semibold">Fundraiser {i + 1}</h4>
                    <div className="text-sm text-foreground/70">
                      by Volunteer
                    </div>
                    <p className="mt-2 text-sm text-foreground/80">
                      Brief one-line description of the fundraiser.
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-foreground/70">
                    ₹{1000 * (i + 1)} raised
                  </div>
                  <Button
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Donate
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted NGO partners */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-2xl font-bold">Our trusted NGO partners</h3>
        <p className="mt-2 text-foreground/80">
          Verified organizations working with communities across India.
        </p>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-6 gap-6 items-center">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-center rounded-md border bg-white p-4"
            >
              <img
                src={`https://placehold.co/120x40?text=NGO+${i + 1}`}
                alt={`ngo ${i}`}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Stats + CTA strip */}
      <section className="bg-card">
        <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex gap-8">
            <div>
              <div className="text-3xl font-extrabold">2.7M+</div>
              <div className="text-sm text-foreground/70">Donations</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold">15M+</div>
              <div className="text-sm text-foreground/70">People helped</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold">3000+</div>
              <div className="text-sm text-foreground/70">NGOs</div>
            </div>
          </div>

          <div>
            <Link to="/donate">
              <Button className="uppercase bg-primary text-primary-foreground hover:bg-primary/90">
                Start donating
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* News & Testimonials */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h4 className="text-xl font-bold">In the news</h4>
            <div className="mt-4 space-y-4">
              <NewsCard />
              <NewsCard />
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xl font-bold">What people say about Dehi</h4>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              <Testimonial />
              <Testimonial />
              <Testimonial />
              <Testimonial />
            </div>
          </div>
        </div>
      </section>

      {/* Simple blog CTA */}
      <section className="bg-secondary">
        <div className="container mx-auto px-4 py-12 flex items-center justify-between gap-6">
          <div>
            <h4 className="text-2xl font-bold">Subscribe to our newsletter</h4>
            <p className="mt-2 text-foreground/80">
              Get stories from the field and updates about your donations.
            </p>
          </div>
          <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              aria-label="email"
              type="email"
              placeholder="Your email"
              className="rounded-md border px-3 py-2"
            />
            <Button className="bg-primary text-primary-foreground">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}

function NewsCard() {
  return (
    <article className="rounded-lg border bg-card p-4 flex gap-4">
      <img
        src="https://placehold.co/120x80"
        alt="news"
        className="h-20 w-28 object-cover rounded-md"
      />
      <div>
        <div className="text-sm font-semibold">Headline</div>
        <div className="mt-1 text-xs text-foreground/70">
          Short summary of the news article.
        </div>
      </div>
    </article>
  );
}

function Testimonial() {
  return (
    <blockquote className="rounded-lg border bg-card p-6">
      <p className="text-sm text-foreground/80">
        “I donated and could see exactly where funds went — photos and updates
        made it real.”
      </p>
      <footer className="mt-4 text-sm font-semibold">— A donor</footer>
    </blockquote>
  );
}
