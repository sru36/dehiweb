import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  "All Causes",
  "Children",
  "Elderly",
  "Animal",
  "Health",
  "Poverty",
  "Education",
  "Differently Abled",
];

const SAMPLE_PROJECTS = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  title:
    i % 3 === 0
      ? "No Child Orphaned"
      : i % 3 === 1
        ? "Feed the Hungry"
        : "Protect Abandoned Elders",
  ngo: i % 2 === 0 ? "Asha Foundation" : "LearnWell",
  image: `https://source.unsplash.com/collection/190727/800x600?sig=${i + 5}`,
  raised: Math.floor(Math.random() * 8000000) + 100000,
  goal: 10000000,
  category: CATEGORIES[i % CATEGORIES.length],
}));

export default function Explore() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All Causes");

  const filtered = useMemo(() => {
    return SAMPLE_PROJECTS.filter((p) => {
      const matchesCat = category === "All Causes" || p.category === category;
      const matchesQ =
        query.trim() === "" ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.ngo.toLowerCase().includes(query.toLowerCase());
      return matchesCat && matchesQ;
    });
  }, [query, category]);

  return (
    <main className="container mx-auto px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold">Hello, Changemaker!</h1>
        <p className="mt-2 text-foreground/80">
          Ready to make an impact? Browse through verified fundraisers and
          donate to make a difference.
        </p>
      </header>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3 overflow-auto pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${category === cat ? "bg-primary text-primary-foreground" : "border bg-white text-foreground"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <input
            aria-label="Search projects"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search NGOs or fundraisers"
            className="rounded-md border px-3 py-2 w-64"
          />
          <Button variant="outline">More Filters</Button>
        </div>
      </div>

      {/* Monthly Impact Grid */}
      <section>
        <h2 className="text-xl font-semibold">
          Donate every month for longer impact
        </h2>
        <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(0, 6).map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
        <div className="mt-6 text-right">
          <Link to="/explore">
            <Button variant="outline">View More Missions</Button>
          </Link>
        </div>
      </section>

    </main>
  );
}

function ProjectCard({ project }: { project: any }) {
  const percent = Math.min(
    100,
    Math.floor((project.raised / project.goal) * 100),
  );
  return (
    <article className="rounded-lg border bg-white shadow-sm overflow-hidden">
      <img
        src={project.image}
        alt={project.title}
        className="h-44 w-full object-cover"
      />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <div className="text-xs text-foreground/70">{project.category}</div>
        </div>
        <div className="mt-1 text-sm text-foreground/70">by {project.ngo}</div>
        <p className="mt-3 text-sm text-foreground/80">
          Support this important work and help the community.
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="w-2/3">
            <div className="h-2 w-full rounded-full bg-[rgba(0,0,0,0.06)]">
              <div
                className="h-2 rounded-full bg-primary"
                style={{ width: `${percent}%` }}
              />
            </div>
            <div className="mt-1 text-xs text-foreground/70">
              {percent}% funded
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="text-sm font-semibold">
              ₹{project.raised.toLocaleString()}
            </div>
            <Link to="/donate">
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Donate
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
