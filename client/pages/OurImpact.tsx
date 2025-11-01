import { Link } from "react-router-dom";
import GlassSurface from "@/components/GlassSurface";

export default function OurImpact() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <header className="border-b bg-card/50">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-extrabold">Our Impact</h1>
          <nav className="mt-2 text-sm text-foreground/70">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span>Our Impact</span>
          </nav>
        </div>
      </header>

      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Making a Difference Together</h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">
            See how your contributions are creating real change in communities across the country.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          <GlassSurface 
            width="100%" 
            height={200}
            borderRadius={24}
            className="my-custom-class"
          >
            <div className="text-center p-6">
              <h3 className="text-2xl font-bold mb-2">Glass Surface Content</h3>
              <p className="text-sm opacity-90">Basic glass morphism effect</p>
            </div>
          </GlassSurface>

          <GlassSurface
            width="100%"
            height={200}
            borderRadius={24}
            displace={15}
            distortionScale={-150}
            redOffset={5}
            greenOffset={15}
            blueOffset={25}
            brightness={60}
            opacity={0.8}
            mixBlendMode="screen"
          >
            <div className="text-center p-6">
              <h3 className="text-2xl font-bold mb-2">Advanced Glass</h3>
              <p className="text-sm opacity-90">With custom distortion effects</p>
            </div>
          </GlassSurface>

          <GlassSurface
            width="100%"
            height={200}
            borderRadius={24}
            blur={15}
            brightness={70}
            opacity={0.9}
          >
            <div className="text-center p-6">
              <h3 className="text-2xl font-bold mb-2">Enhanced Blur</h3>
              <p className="text-sm opacity-90">Extra blur effect for depth</p>
            </div>
          </GlassSurface>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-16">
          <GlassSurface 
            width="100%" 
            height={300}
            borderRadius={32}
            className="flex flex-col items-center justify-center"
          >
            <div className="text-center p-8">
              <div className="text-5xl font-bold mb-4">1,234</div>
              <h3 className="text-xl font-semibold mb-2">Projects Funded</h3>
              <p className="text-sm opacity-90">Active community initiatives</p>
            </div>
          </GlassSurface>

          <GlassSurface
            width="100%"
            height={300}
            borderRadius={32}
            displace={20}
            distortionScale={-200}
            mixBlendMode="multiply"
          >
            <div className="text-center p-8">
              <div className="text-5xl font-bold mb-4">₹12.5M</div>
              <h3 className="text-xl font-semibold mb-2">Total Donated</h3>
              <p className="text-sm opacity-90">Collective impact achieved</p>
            </div>
          </GlassSurface>
        </div>

        <section className="py-12">
          <h2 className="text-2xl font-bold mb-8 text-center">Impact Stories</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <GlassSurface
              width="100%"
              height={250}
              borderRadius={20}
              backgroundOpacity={0.1}
            >
              <div className="p-6 h-full flex flex-col">
                <h4 className="text-xl font-semibold mb-3">Education for All</h4>
                <p className="text-sm opacity-90 mb-4 flex-grow">
                  Supporting underprivileged children with quality education and learning resources.
                </p>
                <div className="text-2xl font-bold">5,000+</div>
                <div className="text-xs opacity-75">Children Educated</div>
              </div>
            </GlassSurface>

            <GlassSurface
              width="100%"
              height={250}
              borderRadius={20}
              displace={10}
              distortionScale={-180}
              mixBlendMode="screen"
            >
              <div className="p-6 h-full flex flex-col">
                <h4 className="text-xl font-semibold mb-3">Healthcare Access</h4>
                <p className="text-sm opacity-90 mb-4 flex-grow">
                  Providing medical care and health services to rural communities.
                </p>
                <div className="text-2xl font-bold">2,500+</div>
                <div className="text-xs opacity-75">Lives Impacted</div>
              </div>
            </GlassSurface>

            <GlassSurface
              width="100%"
              height={250}
              borderRadius={20}
              blur={18}
              brightness={75}
              opacity={0.95}
            >
              <div className="p-6 h-full flex flex-col">
                <h4 className="text-xl font-semibold mb-3">Environmental Care</h4>
                <p className="text-sm opacity-90 mb-4 flex-grow">
                  Tree planting and environmental conservation initiatives.
                </p>
                <div className="text-2xl font-bold">50,000+</div>
                <div className="text-xs opacity-75">Trees Planted</div>
              </div>
            </GlassSurface>
          </div>
        </section>

        <section className="py-12 mt-16">
          <GlassSurface
            width="100%"
            height={400}
            borderRadius={32}
            displace={25}
            distortionScale={-220}
            redOffset={8}
            greenOffset={18}
            blueOffset={28}
            brightness={65}
            opacity={0.85}
            mixBlendMode="overlay"
            className="flex items-center justify-center"
          >
            <div className="text-center p-12 max-w-2xl">
              <h2 className="text-4xl font-bold mb-6">Join Our Mission</h2>
              <p className="text-lg opacity-90 mb-8">
                Every contribution creates ripples of positive change. Together, we can build a better future 
                for communities in need. Your support makes all the difference.
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  to="/explore"
                  className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
                >
                  Explore Projects
                </Link>
                <Link
                  to="/donate"
                  className="px-6 py-3 rounded-lg border border-foreground/20 font-semibold hover:bg-foreground/5 transition-colors"
                >
                  Make a Donation
                </Link>
              </div>
            </div>
          </GlassSurface>
        </section>
      </section>
    </main>
  );
}

