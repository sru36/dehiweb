import { Link } from "react-router-dom";

const ABOUT_IMAGE =
  "https://cdn.builder.io/api/v1/image/assets%2Fc4cd4783faee4d4a852d9c690354555a%2F349f4bdeec77459fa1f1548c83a0e366?format=webp&width=1200";

export default function About() {
  return (
    <main className="bg-background text-foreground">
      <header className="border-b bg-card/50">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-extrabold">About Us</h1>
          <nav className="mt-2 text-sm text-foreground/70">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>About Us</span>
          </nav>
        </div>
      </header>

      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div>
            <img
              src={ABOUT_IMAGE}
              alt="About Dehi - community impact"
              className="rounded-lg shadow-sm w-full object-cover"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">About Dehi (देहि)</h2>
            <p className="text-foreground/90 leading-relaxed">
              At Dehi (देहि), we believe that every contribution deserves a
              story. Our platform bridges the gap between donors, NGOs, and
              real-world impact — ensuring that every rupee donated can be
              traced, tracked, and trusted. Built for transparency and
              engagement, Dehi (देहि) allows donors to explore verified NGO
              projects, contribute securely, and see the tangible outcomes of
              their generosity — whether it's meals served, trees planted, or
              children educated.
            </p>

            <p className="mt-4 text-foreground/90 leading-relaxed">
              For NGOs, Dehi (देहि) simplifies project management by offering a
              space to share progress updates, upload impact visuals, and
              generate automated reports — building trust through clarity and
              accountability. Unlike traditional donation portals, our platform
              goes beyond transactions — it's about building relationships and
              trust through impact storytelling, real-time dashboards, and
              community engagement features like donor badges and milestone
              achievements.
            </p>

            <div className="mt-6 p-6 rounded-lg bg-secondary">
              <h3 className="text-xl font-semibold">Our Mission</h3>
              <p className="mt-2 text-foreground/90">
                To create a transparent, tech-driven donation ecosystem where
                generosity meets accountability — empowering donors and
                organizations to see good, do good, and feel good.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="rounded-lg border bg-card p-8">
          <h3 className="text-2xl font-bold">Contact Us</h3>
          <p className="mt-3 text-foreground/90">
            For inquiries, partnerships, or support, reach out to us:
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 items-start">
            <div>
              <div className="font-semibold">Email</div>
              <a
                href="mailto:support@dehi.org"
                className="text-foreground/80 hover:text-primary"
              >
                support@dehi.org
              </a>
            </div>
            <div>
              <div className="font-semibold">Phone</div>
              <a
                href="tel:+911234567890"
                className="text-foreground/80 hover:text-primary"
              >
                +91-1234567890
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4 max-w-2xl">
          <details className="rounded-md border bg-card p-4 cursor-pointer group">
            <summary className="font-semibold flex items-center justify-between">
              How are NGOs verified on Dehi?
              <span className="group-open:rotate-180 transition-transform">
                ▼
              </span>
            </summary>
            <p className="mt-3 text-foreground/80">
              NGOs undergo a verification process that includes document checks,
              field validation, and in some cases third-party vetting to ensure
              legitimacy and accountability.
            </p>
          </details>

          <details className="rounded-md border bg-card p-4 cursor-pointer group">
            <summary className="font-semibold flex items-center justify-between">
              Can I donate anonymously?
              <span className="group-open:rotate-180 transition-transform">
                ▼
              </span>
            </summary>
            <p className="mt-3 text-foreground/80">
              Yes. During checkout you can choose to hide your name from public
              listings. Donation receipts will still be available to you for
              your records.
            </p>
          </details>

          <details className="rounded-md border bg-card p-4 cursor-pointer group">
            <summary className="font-semibold flex items-center justify-between">
              How can NGOs share impact updates?
              <span className="group-open:rotate-180 transition-transform">
                ▼
              </span>
            </summary>
            <p className="mt-3 text-foreground/80">
              NGOs can post progress updates, photos, and reports from their
              dashboard. Donors who contributed to the project will receive
              notifications of updates.
            </p>
          </details>

          <details className="rounded-md border bg-card p-4 cursor-pointer group">
            <summary className="font-semibold flex items-center justify-between">
              How do I withdraw funds as an NGO?
              <span className="group-open:rotate-180 transition-transform">
                ▼
              </span>
            </summary>
            <p className="mt-3 text-foreground/80">
              Verified NGOs can withdraw funds directly to their registered bank
              account. Dehi processes withdrawals within 3-5 business days after
              verification.
            </p>
          </details>

          <details className="rounded-md border bg-card p-4 cursor-pointer group">
            <summary className="font-semibold flex items-center justify-between">
              Is there a minimum donation amount?
              <span className="group-open:rotate-180 transition-transform">
                ▼
              </span>
            </summary>
            <p className="mt-3 text-foreground/80">
              No. You can donate any amount that works for you, from as little
              as ₹10 to larger contributions. Every rupee makes a difference.
            </p>
          </details>
        </div>
      </section>
    </main>
  );
}
