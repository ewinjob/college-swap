import { useState } from "react";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";


/* ---------- Data ---------- */
const CATEGORIES = [
  { name: "Furniture", count: "1.2k items", hint: "Study tables, chairs, beds" },
  { name: "Books", count: "3.4k items", hint: "Textbooks, notes, novels" },
  { name: "Electronics", count: "890 items", hint: "Laptops, phones, monitors" },
  { name: "Hostel essentials", count: "2.1k items", hint: "Coolers, kettles, mattresses" },
  { name: "Cycles & rides", count: "310 items", hint: "Bicycles, scooters" },
  { name: "Lab & stationery", count: "640 items", hint: "Lab coats, drafters, calculators" },
];

const LISTINGS = [
  { title: "Wooden study table with shelf", price: 1800, was: 4500, campus: "DU North Campus", tag: "Furniture", tone: "bg-amber-100" },
  { title: "Engineering Mathematics III, 2nd ed.", price: 220, was: 650, campus: "COEP Pune", tag: "Books", tone: "bg-sky-100" },
  { title: "Table fan, 3 speed, barely used", price: 700, was: 1900, campus: "VNIT Nagpur", tag: "Hostel", tone: "bg-emerald-100" },
  { title: "24-inch IPS monitor", price: 3900, was: 9000, campus: "JNU Delhi", tag: "Electronics", tone: "bg-violet-100" },
  { title: "Single mattress, 4 inch foam", price: 900, was: 2800, campus: "MIT-WPU Pune", tag: "Hostel", tone: "bg-rose-100" },
  { title: "Casio fx-991EX calculator", price: 650, was: 1500, campus: "IIIT Nagpur", tag: "Stationery", tone: "bg-orange-100" },
];

const STEPS = [
  { title: "Sign up with your college email", body: "We check that you are a student, so every buyer and seller on your campus is real." },
  { title: "List what you no longer need", body: "Add photos, set a price, and post in under two minutes. Listing is free." },
  { title: "Chat and meet on campus", body: "Message the buyer in the app and hand over the item at a spot you both know." },
];

const REASONS = [
  { title: "Verified students only", body: "Every account is tied to a college email, so you trade with classmates, not strangers." },
  { title: "Free to list and browse", body: "No listing fees and no commission. What you price is what you get." },
  { title: "Close to your hostel", body: "Filter by campus and pick up the same day, without courier charges." },
  { title: "Made for semester cycles", body: "Seniors graduate, juniors move in. Stuff moves from one to the other." },
];

const CITIES = ["Delhi NCR", "Pune", "Nagpur", "Bengaluru", "Hyderabad", "Jaipur", "Chandigarh", "Kolkata"];

const FAQ = [
  { q: "Is Campus Swap really free?", a: "Yes. Browsing, listing and chatting cost nothing. We do not take a cut of any sale." },
  { q: "Who can join?", a: "Anyone with a valid college email. This keeps the marketplace limited to students." },
  { q: "How do payments work?", a: "You pay the seller directly when you meet, by UPI or cash. Inspect the item first." },
  { q: "My city is not listed. Can I still use it?", a: "Join the waitlist for your campus. We open a city once enough students sign up." },
];

/* ---------- Small pieces ---------- */
const Logo = () => (
  <a href="#top" className="flex items-center gap-2 font-extrabold text-xl tracking-tight text-slate-900">
    <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600 text-white">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M7 7h11l-3-3" />
        <path d="M17 17H6l3 3" />
      </svg>
    </span>
    Campus Swap
  </a>
);

const Check = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-blue-600" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const rupee = (n) => "\u20B9" + n.toLocaleString("en-IN");

/* ---------- Sections ---------- */


function Hero() {
  const [query, setQuery] = useState("");
  const quick = ["Study table", "Cooler", "Engineering books", "Mattress", "Laptop"];
  return (
    <section id="top" className="relative overflow-hidden bg-blue-600 text-white">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-blue-500/60" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-blue-700/50" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.15fr_1fr] md:py-24">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium">
            <span className="h-2 w-2 rounded-full bg-amber-300" />
            Now live in Delhi NCR, Pune and Nagpur
          </p>
          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Buy and sell used college stuff with students on your campus.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-blue-50">
            Furniture, books, gadgets and hostel essentials from verified students near you. Free to list, free to browse.
          </p>


          <div className="mt-4 flex flex-wrap gap-2">
            {quick.map((t) => (
              <button key={t} onClick={() => setQuery(t)} className="rounded-full border border-white/30 px-3 py-1 text-sm text-blue-50 hover:bg-white/10">
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Hero listing stack */}
        <div className="relative mx-auto w-full max-w-sm" aria-hidden="true">
          <div className="absolute -left-4 top-6 w-64 -rotate-6 rounded-2xl bg-white p-4 text-slate-900 shadow-lg">
            <div className="mb-3 h-28 rounded-xl bg-sky-100" />
            <p className="text-sm font-semibold">Engineering Mathematics III</p>
            <p className="text-sm text-slate-500">COEP Pune</p>
            <p className="mt-1 font-bold text-blue-600">{rupee(220)}</p>
          </div>
          <div className="relative ml-auto w-64 rotate-3 rounded-2xl bg-white p-4 text-slate-900 shadow-2xl">
            <div className="mb-3 h-36 rounded-xl bg-amber-100" />
            <p className="text-sm font-semibold">Wooden study table with shelf</p>
            <p className="text-sm text-slate-500">DU North Campus</p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-bold text-blue-600">{rupee(1800)}</span>
              <span className="text-sm text-slate-400 line-through">{rupee(4500)}</span>
            </div>
          </div>
          <div className="relative -mt-6 ml-6 flex w-56 items-center gap-3 rounded-2xl bg-slate-900 px-4 py-3 text-white shadow-xl">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-emerald-500 text-sm font-bold">A</span>
            <div className="text-sm">
              <p className="font-semibold">Aman, Sem 6</p>
              <p className="text-slate-300">Can you meet at the canteen?</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    ["12,000+", "verified students"],
    ["25,000+", "items listed"],
    ["60+", "campuses"],
    ["\u20B90", "listing fee"],
  ];
  return (
    <section className="border-b border-slate-200 bg-white">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-6 px-4 py-8 sm:px-6 md:grid-cols-4">
        {stats.map(([n, label]) => (
          <div key={label} className="text-center">
            <dt className="text-3xl font-extrabold text-slate-900">{n}</dt>
            <dd className="text-sm text-slate-500">{label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Categories() {
  return (
    <section id="browse" className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Browse by category</h2>
            <p className="mt-2 text-slate-600">Everything a hostel room or a semester needs.</p>
          </div>
          <a href="#all" className="font-semibold text-blue-600 hover:underline">See all items</a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((c) => (
            <a key={c.name} href={`#${c.name}`} className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-blue-600 hover:shadow-md">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900">{c.name}</h3>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">{c.count}</span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{c.hint}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Listings() {
  const [saved, setSaved] = useState([]);
  const toggle = (t) => setSaved((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));
  return (
    <section id="all" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Fresh on campus this week</h2>
        <p className="mt-2 text-slate-600">Recent listings from students near you.</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LISTINGS.map((item) => {
            const isSaved = saved.includes(item.title);
            const off = Math.round(((item.was - item.price) / item.was) * 100);
            return (
              <article key={item.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className={`relative h-44 ${item.tone}`}>
                  <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">{item.tag}</span>
                  <button
                    onClick={() => toggle(item.title)}
                    aria-pressed={isSaved}
                    aria-label={isSaved ? "Remove from saved" : "Save item"}
                    className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill={isSaved ? "#2563eb" : "none"} stroke="#2563eb" strokeWidth="2" strokeLinejoin="round">
                      <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9Z" />
                    </svg>
                  </button>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{item.campus}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-extrabold text-blue-600">{rupee(item.price)}</span>
                      <span className="text-sm text-slate-400 line-through">{rupee(item.was)}</span>
                    </div>
                    <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">{off}% off</span>
                  </div>
                  <button className="mt-4 w-full rounded-xl border border-blue-600 py-2.5 text-sm font-semibold text-blue-600 hover:bg-blue-600 hover:text-white">
                    Chat with seller
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="bg-blue-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">How Campus Swap works</h2>
        <p className="mt-2 max-w-xl text-slate-600">List your items for free, connect with students on your campus, and trade safely.</p>
        <ol className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="rounded-2xl bg-white p-7 shadow-sm">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-blue-600 font-bold text-white">{i + 1}</span>
              <h3 className="mt-5 text-lg font-bold text-slate-900">{s.title}</h3>
              <p className="mt-2 text-slate-600">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function WhyStudentsLove() {
  return (
    <section id="why" className="bg-white py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Why students love Campus Swap</h2>
          <p className="mt-3 text-slate-600">
            Retail prices are tough on a student budget. Buying from a senior who is leaving costs less and keeps good things in use.
          </p>
          <ul className="mt-8 space-y-5">
            {REASONS.map((r) => (
              <li key={r.title} className="flex gap-3">
                <Check />
                <div>
                  <h3 className="font-bold text-slate-900">{r.title}</h3>
                  <p className="text-slate-600">{r.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-slate-900 p-8 text-white">
          <p className="text-sm text-slate-400">Typical hostel room, bought new vs. on Campus Swap</p>
          <div className="mt-6 space-y-5">
            {[
              ["Bought new", 15900, "w-full", "bg-slate-600"],
              ["On Campus Swap", 5200, "w-1/3", "bg-amber-400"],
            ].map(([label, amt, w, color]) => (
              <div key={label}>
                <div className="mb-2 flex justify-between text-sm">
                  <span>{label}</span>
                  <span className="font-bold">{rupee(amt)}</span>
                </div>
                <div className="h-4 rounded-full bg-slate-800">
                  <div className={`h-4 rounded-full ${w} ${color}`} />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-2xl font-extrabold">You save about {rupee(10700)} a year.</p>
          <p className="mt-1 text-sm text-slate-400">Table, chair, fan, mattress and textbooks. Figures are illustrative.</p>
        </div>
      </div>
    </section>
  );
}

function Cities() {
  return (
    <section id="cities" className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Find your campus</h2>
        <p className="mx-auto mt-2 max-w-xl text-slate-600">
          Live in Delhi NCR, Pune and Nagpur, with more cities opening soon.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {CITIES.map((c, i) => (
            <span
              key={c}
              className={`rounded-full px-5 py-2 text-sm font-semibold ${
                i < 3 ? "bg-blue-600 text-white" : "border border-slate-300 bg-white text-slate-600"
              }`}
            >
              {c}
              {i >= 3 && <span className="ml-2 text-xs font-normal text-slate-400">soon</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section id="faq" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-slate-900">Questions students ask</h2>
        <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200">
          {FAQ.map((f, i) => {
            const open = openIndex === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-semibold text-slate-900"
                >
                  {f.q}
                  <span className={`text-blue-600 transition-transform ${open ? "rotate-45" : ""}`} aria-hidden="true">+</span>
                </button>
                {open && <p className="px-6 pb-5 text-slate-600">{f.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}





/* ---------- Page ---------- */
export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Categories />
        <Listings />
        <HowItWorks />
        <WhyStudentsLove />
        <Cities />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}