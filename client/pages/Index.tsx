import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/Carousel";
import { DonationCard } from "@/components/DonationCard";
import { donationCampaigns } from "@/data/donationCampaigns";
import { BannerCarousel } from "@/components/BannerCarousel";
import { Eye, BarChart3, ShieldCheck, ArrowRight } from "lucide-react";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import "@/components/ScrollStack.css";


// Banner data with 5 banners
const banners = [
  {
    id: 1,
    title: "Help Blind and other\ndisabled children with shelter,\neducation and care",
    description: "Support children with disabilities to lead independent and dignified lives.",
    imageUrl: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop",
    link: "/donate?cause=disability",
  },
  {
    id: 2,
    title: "Education for Every\nChild - Breaking Barriers\nto Learning",
    description: "Empower underprivileged children with quality education and opportunities.",
    imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop",
    link: "/donate?cause=education",
  },
  {
    id: 3,
    title: "Healthcare Access for\nRural Communities\nin Need",
    description: "Bringing medical care and health services to remote villages.",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop",
    link: "/donate?cause=healthcare",
  },
  {
    id: 4,
    title: "Feed the Hungry\nProviding Meals to\nThose in Need",
    description: "Your donation helps us serve nutritious meals to thousands every day.",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop",
    link: "/donate?cause=food",
  },
  {
    id: 5,
    title: "Environmental\nConservation - Plant\nTrees, Save Earth",
    description: "Join us in our mission to create a greener and healthier planet.",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
    link: "/donate?cause=environment",
  },
];

export default function Index() {
  return (
    <main className="bg-background text-foreground">
      {/* Moving Banner Carousel */}
      <BannerCarousel banners={banners} autoPlayInterval={15000} />

      {/* Dynamic Donation Carousel */}
      <section className="py-16 bg-gradient-to-b from-white to-orange-50">
        <div className="container mx-auto px-4 mb-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Make an Impact Today
            </h2>
            <p className="mt-3 text-lg text-gray-700 max-w-2xl mx-auto">
              Choose a cause that moves your heart. Every donation brings hope
              and change to someone's life.
            </p>
            <p className="mt-2 text-base text-red-600 font-semibold" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
              आपका छोटा सा योगदान किसी का जीवन बदल सकता है।
            </p>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <Carousel
            pauseOnHover={true}
            repeat={2}
            duration={120}
            gap={24}
          >
            {donationCampaigns.map((campaign) => (
              <DonationCard key={campaign.id} campaign={campaign} />
            ))}
          </Carousel>

          {/* Fade indicators */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-orange-50 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-orange-50 to-transparent pointer-events-none" />
        </div>

        {/* Trust statement */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600">
            ✓ Verified NGOs • ✓ Transparent Impact • ✓ Secure Donations
          </p>
        </div>
      </section>

      {/* Support a Fundraiser */}
      <section className="bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Support a fundraiser</h3>
              <p className="mt-2 text-gray-700 max-w-xl">
                Donate directly to causes started by individuals and NGOs.
                Hand-picked campaigns from verified organizations.
              </p>
            </div>
            <Link to="/explore">
              <Button className="uppercase bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-md">
                See Fundraisers
              </Button>
            </Link>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <article key={i} className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow">
                <div className="flex gap-3">
                  <div className="h-20 w-28 bg-gradient-to-br from-orange-100 to-red-100 rounded-md flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Fundraiser {i + 1}</h4>
                    <div className="text-sm text-gray-600">
                      by Volunteer
                    </div>
                    <p className="mt-2 text-sm text-gray-700">
                      Brief one-line description of the fundraiser.
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm font-semibold text-red-600">
                    ₹{1000 * (i + 1)} raised
                  </div>
                  <Link to="/donate">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700"
                    >
                      Donate
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted NGO partners */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-2xl font-bold text-gray-900">Our trusted NGO partners</h3>
        <p className="mt-2 text-gray-700">
          Verified organizations working with communities across India.
        </p>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-6 gap-6 items-center">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-center rounded-md border border-gray-200 bg-white p-4"
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
      <section className="bg-gradient-to-r from-red-50 to-orange-50">
        <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex gap-8">
            <div>
              <div className="text-3xl font-extrabold text-gray-900">2.7M+</div>
              <div className="text-sm text-gray-700">Donations</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-gray-900">15M+</div>
              <div className="text-sm text-gray-700">People helped</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-gray-900">3000+</div>
              <div className="text-sm text-gray-700">NGOs</div>
            </div>
          </div>

          <div>
            <Link to="/donate">
              <Button className="uppercase bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-md">
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
            <h4 className="text-xl font-bold text-gray-900">In the news</h4>
            <div className="mt-4 space-y-4">
              <NewsCard />
              <NewsCard />
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xl font-bold text-gray-900">What people say about Dehi</h4>
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
      <section className="bg-gradient-to-b from-orange-50 to-white">
        <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-2xl font-bold text-gray-900">Subscribe to our newsletter</h4>
            <p className="mt-2 text-gray-700">
              Get stories from the field and updates about your donations.
            </p>
          </div>
          <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
            <input
              aria-label="email"
              type="email"
              placeholder="Your email"
              className="rounded-md border border-gray-300 px-3 py-2 bg-white text-gray-900 placeholder-gray-500"
            />
            <Button className="bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-md">
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
    <article className="rounded-lg border border-gray-200 bg-white p-4 flex gap-4 hover:shadow-md transition-shadow">
      <div className="h-20 w-28 bg-gradient-to-br from-orange-100 to-red-100 rounded-md flex-shrink-0" />
      <div>
        <div className="text-sm font-semibold text-gray-900">Headline</div>
        <div className="mt-1 text-xs text-gray-600">
          Short summary of the news article.
        </div>
      </div>
    </article>
  );
}

function Testimonial() {
  return (
    <blockquote className="rounded-lg border border-gray-200 bg-white p-6 hover:shadow-md transition-shadow">
      <p className="text-sm text-gray-800">
        “I donated and could see exactly where funds went — photos and updates
        made it real.”
      </p>
      <footer className="mt-4 text-sm font-semibold text-gray-900">— A donor</footer>
    </blockquote>
  );
}
