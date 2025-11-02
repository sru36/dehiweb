import React, { createContext, useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { getDonateRedirect, addDonation, getUserSession, recordDonationIntent } from "@/utils/auth";

type Intent = {
  id?: number | string;
  title?: string;
  amount?: number;
  source?: string;
  cause?: string;
};

type DonationModalContextValue = {
  open: (intent?: Intent) => void;
  close: () => void;
};

const DonationModalContext = createContext<DonationModalContextValue | null>(null);

export function useDonationModal() {
  const ctx = useContext(DonationModalContext);
  if (!ctx) throw new Error("useDonationModal must be used within DonationModalProvider");
  return ctx;
}

export function DonationModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [intent, setIntent] = useState<Intent | undefined>(undefined);
  const [showSuccess, setShowSuccess] = useState(false);

  const open = (i?: Intent) => {
    if (i) recordDonationIntent({ id: i.id, title: i.title, amount: i.amount, source: (i.source as any) || 'other', cause: i.cause });
    setIntent(i);
    setOpen(true);
  };
  const close = () => setOpen(false);

  return (
    <DonationModalContext.Provider value={{ open, close }}>
      {children}
      {isOpen && (
        <PaymentModal
          intent={intent}
          onClose={close}
          onSuccess={() => {
            // show fun success animation then close
            setShowSuccess(true);
            setTimeout(() => {
              setShowSuccess(false);
            }, 2200);
          }}
        />
      )}
      {showSuccess && <SuccessOverlay />}
    </DonationModalContext.Provider>
  );
}

function PaymentModal({ intent, onClose, onSuccess }: { intent?: Intent; onClose: () => void; onSuccess: () => void }) {
  const session = getUserSession();
  const [amount, setAmount] = useState<number | "">(intent?.amount ?? "");
  const [name, setName] = useState(session?.name ?? "");
  const [email, setEmail] = useState(session?.email ?? "");
  const [method, setMethod] = useState<"UPI" | "CARD" | "NETBANKING">("UPI");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    const num = typeof amount === 'number' ? amount : parseFloat(String(amount || 0));
    if (!num || num <= 0) return setError('Please enter a valid amount');

    setLoading(true);
    setTimeout(() => {
      // create donation record
      const id = `don_${Date.now()}`;
      const title = intent?.title || "General Donation";
      const record = {
        id,
        title,
        ngo: undefined,
        cause: intent?.cause,
        amount: num,
        date: new Date().toISOString(),
      };
      try {
        addDonation(record as any);
        // notify other parts of app
        try {
          window.dispatchEvent(new CustomEvent('donation:added', { detail: record }));
        } catch {
          // ignore
        }
      } catch (err) {
        // ignore
      }

      setLoading(false);
      onSuccess();
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <form onSubmit={submit} className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h3 className="text-xl font-bold">Secure Donation (MVP)</h3>
        <p className="text-sm text-foreground/70 mt-1">A quick, mock payment popup. Choose amount and confirm. This is a demo payment flow for India (UPI, Card, Netbanking).</p>

        <div className="mt-4 grid gap-3">
          <label className="text-xs">Name</label>
          <input className="w-full rounded-md border px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} />

          <label className="text-xs">Email</label>
          <input className="w-full rounded-md border px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label className="text-xs">Amount (INR)</label>
          <input
            className="w-full rounded-md border px-3 py-2"
            value={amount}
            onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
            type="number"
            min={1}
            placeholder="Enter amount in ₹"
          />

          <label className="text-xs">Payment method</label>
          <select className="w-full rounded-md border px-3 py-2" value={method} onChange={(e) => setMethod(e.target.value as any)}>
            <option value="UPI">UPI (dehi@upi - mock)</option>
            <option value="CARD">Card (mock)</option>
            <option value="NETBANKING">Netbanking (mock)</option>
          </select>

          {error && <div className="text-sm text-destructive">{error}</div>}

          <div className="mt-3 flex gap-2">
            <Button type="submit" className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white" disabled={loading}>
              {loading ? 'Processing...' : `Pay ${typeof amount === 'number' ? `₹${amount}` : ''}`}
            </Button>
            <Button variant="outline" onClick={onClose} type="button">Cancel</Button>
          </div>

          <div className="text-xs text-foreground/70 mt-2">This is a demo payment modal to validate MVP flows. No real payment is processed.</div>
        </div>
      </form>
    </div>
  );
}

function SuccessOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div className="animate-bounce text-6xl">🎉</div>
        <div className="text-2xl font-bold">Thank you for your donation!</div>
        <div className="text-sm text-foreground/80">You just made someone's day brighter ✨</div>
      </div>
      <Confetti />
    </div>
  );
}

function Confetti() {
  // A very simple confetti-like animation using falling emojis
  const pieces = Array.from({ length: 18 });
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      {pieces.map((_, i) => (
        <div
          key={i}
          className="absolute text-2xl"
          style={{
            left: `${(i * 7) % 98}%`,
            top: `-${10 + (i % 5) * 8}%`,
            animation: `fall 1.8s ${i * 60}ms linear forwards`
          }}
        >
          {['🎊','🎉','💐','🌟','❤️'][i % 5]}
        </div>
      ))}
      <style>{`@keyframes fall { to { transform: translateY(120vh) rotate(360deg); opacity: 0; } }`}</style>
    </div>
  );
}
