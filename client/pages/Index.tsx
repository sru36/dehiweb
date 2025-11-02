import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Carousel } from "@/components/Carousel";
import { DonationCard } from "@/components/DonationCard";
import { donationCampaigns } from "@/data/donationCampaigns";
import { BannerCarousel } from "@/components/BannerCarousel";
import { Eye, BarChart3, ShieldCheck, ArrowRight } from "lucide-react";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import "@/components/ScrollStack.css";
import { fundraisers } from "@/data/funraiser";
import { LogoLoop } from "@/components/LogoLoop";

import { recordDonationIntent, isAuthenticated } from "@/utils/auth";
import FundraiserDonate from "@/components/FundraiserDonate";
import CardSwap, { Card } from "@/components/CardSwap";
import { useState, useEffect } from 'react';
import { useDonationModal } from '@/components/DonationModal';
import { useNavigate } from 'react-router-dom';
import {ngoPartners} from "@/components/ngopartners";


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
    imageUrl: "https://tse4.mm.bing.net/th/id/OIP.53W4VYz71uFjmegne7xAhAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
    link: "/donate?cause=environment",
  },
];

export default function Index() {
  const [localFundraisers, setLocalFundraisers] = useState(fundraisers);
  const navigate = useNavigate();
  const { open } = useDonationModal();

  useEffect(() => {
    const h = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail || !detail.title || !detail.amount) return;
      setLocalFundraisers((prev) => prev.map((f) => {
        if (f.name === detail.title || detail.title.includes(f.name) || f.name.includes(detail.title)) {
          return { ...f, raised: f.raised + detail.amount };
        }
        return f;
      }));
    };
    window.addEventListener('donation:added', h as EventListener);
    return () => window.removeEventListener('donation:added', h as EventListener);
  }, []);

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

      {/* Donors Club */}
      <section className="py-16 bg-gradient-to-b from-orange-50 to-white relative">
        <div className="container mx-auto px-4 mb-10">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Donors Club
            </h2>
            <p className="mt-3 text-lg text-gray-700 max-w-2xl mx-auto">
              Join Our Exclusive Executive Committee – Donors Club
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div>
              <div className="max-w-2xl">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Donate ₹10,000 for 12 months to become a member of our Executive Donors Club, where you'll enjoy the following perks:
                </p>
                <div className="space-y-4 mb-6">
                  <p className="text-sm text-gray-600">
                    • 1% waiver on your child's tuition fees
                  </p>
                  <p className="text-sm text-gray-600">
                    • 1% discount on automobile purchases within your zonal region
                  </p>
                  <p className="text-sm text-gray-600">
                    • 1% discount on life and health insurance premiums
                  </p>
                  <p className="text-sm text-gray-600">
                    • Diwali shopping vouchers
                  </p>
                  <p className="text-sm text-gray-600">
                    • One complimentary meal at any of our NGO partners' franchise outlets
                  </p>
                </div>
                <p className="text-sm text-gray-600 italic mb-4">
                  All these benefits are made possible by our generous NGO partners.
                </p>
                <p className="text-xs text-gray-500">
                  (T&C apply)
                </p>
              </div>
            </div>

            {/* Right side - CardSwap */}
            <div className="relative w-full" style={{ height: '600px', minHeight: '500px' }}>
              <CardSwap
                width={400}
                height={300}
                cardDistance={60}
                verticalDistance={70}
                delay={5000}
                pauseOnHover={false}
              >
                <Card className="bg-white border border-gray-200 shadow-lg">
                  <div className="h-full flex flex-col justify-center">
                    <div className="text-4xl font-bold text-primary mb-3">1%</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Tuition Fee Waiver</h3>
                    <p className="text-gray-600">1% waiver on your child's tuition fees</p>
                  </div>
                </Card>
                <Card className="bg-white border border-gray-200 shadow-lg">
                  <div className="h-full flex flex-col justify-center">
                    <div className="text-4xl font-bold text-primary mb-3">1%</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Auto Discount</h3>
                    <p className="text-gray-600">1% discount on automobile purchases within your zonal region</p>
                  </div>
                </Card>
                <Card className="bg-white border border-gray-200 shadow-lg">
                  <div className="h-full flex flex-col justify-center">
                    <div className="text-4xl font-bold text-primary mb-3">1%</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Insurance Discount</h3>
                    <p className="text-gray-600">1% discount on life and health insurance premiums</p>
                  </div>
                </Card>
                <Card className="bg-white border border-gray-200 shadow-lg">
                  <div className="h-full flex flex-col justify-center">
                    <div className="text-4xl font-bold text-primary mb-3">🎁</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Diwali Vouchers</h3>
                    <p className="text-gray-600">Diwali shopping vouchers</p>
                  </div>
                </Card>
                <Card className="bg-white border border-gray-200 shadow-lg">
                  <div className="h-full flex flex-col justify-center">
                    <div className="text-4xl font-bold text-primary mb-3">🍽️</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Complimentary Meal</h3>
                    <p className="text-gray-600">One complimentary meal at any of our NGO partners' franchise outlets</p>
                  </div>
                </Card>
              </CardSwap>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted NGO partners */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-2xl font-bold text-gray-900">Our trusted NGO partners</h3>
        <p className="mt-2 text-gray-700">
          Verified organizations working with communities across India.
        </p>

        <div className="mt-6">
          <LogoLoop
            logos={ngoPartners}
            speed={80}
            direction="left"
            logoHeight={40}
            gap={48}
            pauseOnHover={true}
            fadeOut={true}
            fadeOutColor="#fdfbf9"
            scaleOnHover={true}
            ariaLabel="NGO partner logos"
          />
        </div>
      </section>

      {/* Support a Fundraiser (reactive) */}
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
            {localFundraisers.map((fundraiser, i) => {
              const percent = Math.min(100, Math.floor((fundraiser.raised / fundraiser.goal) * 100));
              return (
                <article key={i} className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-md transition-shadow">
                  <div className="flex gap-3">
                    <div className="h-20 w-28 bg-gradient-to-br from-orange-100 to-red-100 rounded-md flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">{fundraiser.name}</h4>
                      <div className="text-sm text-gray-600">
                        by {fundraiser.volunteer}
                      </div>
                      <p className="mt-2 text-sm text-gray-700">
                        {fundraiser.description}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-red-500 to-red-600"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="mt-1 text-xs text-gray-600">
                      {percent}% funded
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm font-semibold text-red-600">
                      ₹{fundraiser.raised.toLocaleString()} raised
                    </div>
                    <div>
                      <FundraiserDonate
                        onClick={() =>
                          recordDonationIntent({
                            id: fundraiser.name,
                            title: fundraiser.name,
                            amount: undefined,
                            source: 'fundraiser'
                          })
                        }
                        title={fundraiser.name}
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
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
            <Link to="/explore">
              <Button className="uppercase bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-md">
                Start donating
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
