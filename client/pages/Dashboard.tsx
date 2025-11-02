import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import {
  getDisplayName,
  getDonationHistory,
  getDonorsClubProgress,
  getFirstDonationIntent,
  getMemberId,
  isDonorsClubEligible,
  isAuthenticated,
} from "@/utils/auth";
import { useDonationModal } from "@/components/DonationModal";
import { donationCampaigns } from "@/data/donationCampaigns";

function formatINR(n: number) {
  return `₹${Math.round(n).toLocaleString()}`;
}

function monthKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export default function Dashboard() {
  useEffect(() => {
    if (!isAuthenticated()) {
      window.location.href = '/login';
    }
  }, []);

  const [refreshKey, setRefreshKey] = useState(0);
  useEffect(() => {
    const h = () => setRefreshKey((v) => v + 1);
    window.addEventListener('donation:added', h as EventListener);
    return () => window.removeEventListener('donation:added', h as EventListener);
  }, []);

  const name = getDisplayName();
  const history = useMemo(() => getDonationHistory(), [refreshKey]);
  const firstIntent = getFirstDonationIntent();
  const club = getDonorsClubProgress();
  const eligible = isDonorsClubEligible();
  const memberId = getMemberId();

  const { open } = useDonationModal();
  const suggested = useMemo(() => {
    if (!firstIntent) return donationCampaigns.slice(0, 3);
    const baseAmount = firstIntent.amount ?? 0;
    const titleWords = (firstIntent.title || '').toLowerCase().split(/\s+/).filter(Boolean);

    const scored = donationCampaigns.map((c) => {
      const words = c.titleEn.toLowerCase().split(/\s+/);
      const wordScore = titleWords.reduce((s, w) => s + (words.includes(w) ? 1 : 0), 0);
      const amountScore = baseAmount ? Math.max(0, 10 - Math.abs((c.suggestedAmount - baseAmount) / 200)) : 0;
      return { c, score: wordScore * 2 + amountScore };
    });
    return scored.sort((a, b) => b.score - a.score).slice(0, 3).map((x) => x.c);
  }, [firstIntent]);

  const monthly = useMemo(() => {
    // Last 6 months aggregation
    const now = new Date();
    const months: { key: string; label: string; total: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = monthKey(d);
      const label = d.toLocaleString('en-IN', { month: 'short' });
      months.push({ key, label, total: 0 });
    }
    history.forEach((h) => {
      const d = new Date(h.date);
      const k = monthKey(new Date(d.getFullYear(), d.getMonth(), 1));
      const idx = months.findIndex((m) => m.key === k);
      if (idx >= 0) months[idx].total += h.amount;
    });
    const max = Math.max(1, ...months.map((m) => m.total));
    return { months, max };
  }, [history]);

  const impact = useMemo(() => {
    // Compute impact from last 12 months
    const windowStart = new Date();
    windowStart.setMonth(windowStart.getMonth() - 12);
    const recent = history.filter((d) => new Date(d.date) >= windowStart);
    const total = recent.reduce((s, d) => s + d.amount, 0);
    return {
      total,
      people: Math.floor(total / 200),
      meals: Math.floor(total / 50),
      trees: Math.floor(total / 150),
      children: Math.floor(total / 500),
      consistency: recent.length, // number of donations in window
    };
  }, [history]);

  return (
    <main className="container mx-auto px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold">
          Namaste {name}!
        </h1>
        <p className="mt-2 text-foreground/90 max-w-3xl" style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}>
          Thank you! आपकी एक पहल किसी की मुस्कान और हर donation को एक नई कहानी बन��ती है — आप ही हैं DEHI के असल�� hero!
        </p>
      </header>

      {/* Suggested for you */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl md:text-2xl font-bold">Suggested for you</h2>
          <Link to="/explore"><Button variant="outline">Explore all</Button></Link>
        </div>
        {firstIntent && (
          <p className="text-sm text-foreground/70 mb-2">Based on your interest in “{firstIntent.title}”.</p>
        )}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {suggested.map((c) => (
            <article key={c.id} className="rounded-lg border bg-card p-4 shadow-sm">
              <div className="font-semibold">{c.titleEn}</div>
              <div className="text-sm text-foreground/80 mt-1">{c.descriptionEn}</div>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-red-600 font-bold">{formatINR(c.suggestedAmount)}</div>
                <Button size="sm" onClick={() => open({ id: c.id, title: c.titleEn, amount: c.suggestedAmount, source: 'campaign' })}>Donate</Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Contributions overview */}
      <section className="grid lg:grid-cols-2 gap-8 mb-12">
        <div className="rounded-lg border bg-card p-5 shadow-sm">
          <h3 className="font-bold text-lg mb-4">Past contributions (last 6 months)</h3>
          {history.length === 0 ? (
            <div className="text-sm text-foreground/70">No donations yet. Start with your first contribution today.</div>
          ) : (
            <div className="flex items-end gap-3 h-40">
              {monthly.months.map((m, i) => {
                const h = Math.max(8, Math.round((m.total / monthly.max) * 100));
                return (
                  <div key={m.key} className="flex flex-col items-center justify-end flex-1">
                    <div className="w-full bg-gradient-to-t from-red-200 to-red-500 rounded-t-md" style={{ height: `${h}%` }} />
                    <div className="mt-2 text-xs text-foreground/70">{m.label}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="rounded-lg border bg-card p-5 shadow-sm">
          <h3 className="font-bold text-lg mb-4">Your donations at work</h3>
          {history.length === 0 ? (
            <div className="text-sm text-foreground/70">Once you donate, you will see how projects progress to completion here.</div>
          ) : (
            <div className="space-y-4">
              {history.slice(0, 3).map((d) => {
                const start = new Date(d.date);
                const daysElapsed = Math.floor((Date.now() - start.getTime()) / (1000 * 60 * 60 * 24));
                const etaDays = 90; // assumed project duration
                const pct = Math.max(0, Math.min(100, Math.floor((daysElapsed / etaDays) * 100)));
                const eta = new Date(start);
                eta.setDate(eta.getDate() + etaDays);
                return (
                  <div key={d.id}>
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-medium">{d.title}</div>
                      <div className="text-foreground/70">ETA {eta.toLocaleDateString()}</div>
                    </div>
                    <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-2 bg-gradient-to-r from-emerald-500 to-emerald-600" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="mt-1 text-xs text-foreground/70">{pct}% complete</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Donors Club progress */}
      <section className="mb-12">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-xl font-extrabold">Exclusive Executive Committee – Donors Club</h3>
              <p className="text-sm text-foreground/80 mt-1">Reach {formatINR(club.target)} within 12 months to unlock your exclusive e‑card.</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-foreground/70">Progress</div>
              <div className="text-2xl font-extrabold text-red-600">{club.progress}%</div>
            </div>
          </div>

          <div className="mt-4 h-4 w-full bg-muted rounded-full overflow-hidden ring-2 ring-red-200">
            <div className="h-4 bg-gradient-to-r from-red-500 to-red-600" style={{ width: `${club.progress}%` }} />
          </div>
          <div className="mt-2 text-sm flex items-center justify-between text-foreground/80">
            <span>Contributed: {formatINR(club.total)}</span>
            <span>Remaining: {formatINR(club.remaining)}</span>
          </div>

          {eligible && (
            <div className="mt-6 grid md:grid-cols-2 gap-6 items-start">
              <div className="rounded-xl p-5 bg-gradient-to-br from-red-600 to-red-500 text-white shadow-md">
                <div className="flex items-center justify-between">
                  <div className="uppercase tracking-wider text-xs opacity-90">DEHI Donors Club</div>
                  <div className="text-xs opacity-90">Valid thru {new Date(club.windowEnd).toLocaleDateString()}</div>
                </div>
                <div className="mt-6 text-3xl font-extrabold">Executive Member</div>
                <div className="mt-1 text-sm opacity-90">Exclusive Digital E‑Card</div>
                <div className="mt-8">
                  <div className="text-sm opacity-90">Member</div>
                  <div className="text-xl font-bold">{name}</div>
                </div>
                {memberId && (
                  <div className="mt-4 text-sm opacity-90">ID: {memberId}</div>
                )}
              </div>
              <div className="text-sm text-foreground/80">
                You’ve unlocked your exclusive membership by contributing {formatINR(club.target)} within the last 12 months. Enjoy special perks and recognition for your generosity.
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Impact metrics */}
      <section className="mb-12">
        <h3 className="text-xl md:text-2xl font-bold mb-2">Your Impact</h3>
        <p className="text-sm text-foreground/80 mb-4">Turning your rupees into real‑world impact — see the change you create.</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="text-sm text-foreground/70">Total Donated</div>
            <div className="text-2xl font-extrabold">{formatINR(impact.total)}</div>
          </div>
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="text-sm text-foreground/70">People Impacted</div>
            <div className="text-2xl font-extrabold">{impact.people.toLocaleString()}</div>
          </div>
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="text-sm text-foreground/70">Meals Served</div>
            <div className="text-2xl font-extrabold">{impact.meals.toLocaleString()}</div>
          </div>
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="text-sm text-foreground/70">Children Educated</div>
            <div className="text-2xl font-extrabold">{impact.children.toLocaleString()}</div>
          </div>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="text-sm text-foreground/70">Trees Planted</div>
            <div className="text-2xl font-extrabold">{impact.trees.toLocaleString()}</div>
          </div>
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="text-sm text-foreground/70">Donation Consistency</div>
            <div className="text-2xl font-extrabold">{impact.consistency} times</div>
          </div>
        </div>
      </section>

      {/* Transaction history */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold">Recent donations</h3>
          <Link to="/explore"><Button variant="outline" size="sm">Donate again</Button></Link>
        </div>
        {history.length === 0 ? (
          <div className="text-sm text-foreground/70">You haven't donated yet. Explore verified NGOs and start your journey.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-foreground/70">
                  <th className="py-2">Date</th>
                  <th className="py-2">Project</th>
                  <th className="py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {history.slice().reverse().slice(0, 8).map((d) => (
                  <tr key={d.id} className="border-t">
                    <td className="py-2">{new Date(d.date).toLocaleDateString()}</td>
                    <td className="py-2">{d.title}</td>
                    <td className="py-2 font-medium">{formatINR(d.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
