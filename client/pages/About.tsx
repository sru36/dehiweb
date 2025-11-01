import { Link } from "react-router-dom";
import Stack from "@/components/Stack";
import TextType from "@/components/TextType";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";

const ABOUT_IMAGE =
  "/about.jpg";

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
          <div className="flex justify-center">
            <Stack
              randomRotation={true}
              sensitivity={180}
              sendToBackOnClick={false}
              cardDimensions={{ width: 400, height: 400 }}
              cardsData={[
                { id: 1, img: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format" },
                { id: 2, img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format" },
                { id: 3, img: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format" },
                { id: 4, img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format" }
              ]}
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">About Dehi (देहि)</h2>
            <div className="text-foreground/90 leading-relaxed space-y-4">
              <TextType
                text={[
                  "At Dehi (देहि), we believe that every contribution deserves a story. Our platform bridges the gap between donors, NGOs, and real-world impact — ensuring that every rupee donated can be traced, tracked, and trusted.",
                  "Built for transparency and engagement, Dehi (देहि) allows donors to explore verified NGO projects, contribute securely, and see the tangible outcomes of their generosity — whether it's meals served, trees planted, or children educated.",
                  "For NGOs, Dehi (देहि) simplifies project management by offering a space to share progress updates, upload impact visuals, and generate automated reports — building trust through clarity and accountability.",
                  "Unlike traditional donation portals, our platform goes beyond transactions — it's about building relationships and trust through impact storytelling, real-time dashboards, and community engagement features like donor badges and milestone achievements."
                ]}
                typingSpeed={30}
                pauseDuration={2000}
                showCursor={true}
                cursorCharacter="|"
                as="p"
                className="text-foreground/90 leading-relaxed"
                loop={true}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h3>
        <div style={{ minHeight: '100vh' }}>
          <ScrollStack useWindowScroll={true}>
            <ScrollStackItem>
              <h4 className="font-semibold text-gray-900 mb-3 text-xl">How are NGOs verified on Dehi?</h4>
              <p className="text-gray-700 leading-relaxed">
                NGOs undergo a verification process that includes document checks,
                field validation, and in some cases third-party vetting to ensure
                legitimacy and accountability.
              </p>
            </ScrollStackItem>
            <ScrollStackItem>
              <h4 className="font-semibold text-gray-900 mb-3 text-xl">Can I donate anonymously?</h4>
              <p className="text-gray-700 leading-relaxed">
                Yes. During checkout you can choose to hide your name from public
                listings. Donation receipts will still be available to you for
                your records.
              </p>
            </ScrollStackItem>
            <ScrollStackItem>
              <h4 className="font-semibold text-gray-900 mb-3 text-xl">How can NGOs share impact updates?</h4>
              <p className="text-gray-700 leading-relaxed">
                NGOs can post progress updates, photos, and reports from their
                dashboard. Donors who contributed to the project will receive
                notifications of updates.
              </p>
            </ScrollStackItem>
            <ScrollStackItem>
              <h4 className="font-semibold text-gray-900 mb-3 text-xl">Is there a minimum donation amount?</h4>
              <p className="text-gray-700 leading-relaxed">
                No. You can donate any amount that works for you, from as little
                as ₹10 to larger contributions. Every rupee makes a difference.
              </p>
            </ScrollStackItem>
          </ScrollStack>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="rounded-lg border-2 border-[#FF5E5E] bg-white p-8">
          <h3 className="text-2xl font-bold text-black text-center">Contact Us</h3>
          <p className="mt-3 text-black/80 text-center">
            For inquiries, partnerships, or support, reach out to us:
          </p>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 items-start">
            <div>
              <div className="font-semibold text-black">Email</div>
              <a
                href="mailto:support@dehi.org"
                className="inline-block mt-1 text-black hover:text-[#FF5E5E] font-medium"
              >
                support@dehi.org
              </a>
            </div>
            <div className="text-right">
              <div className="font-semibold text-black">Phone</div>
              <a
                href="tel:+911234567890"
                className="inline-block mt-1 text-black hover:text-[#FF5E5E] font-medium"
              >
                +91-1234567890
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
