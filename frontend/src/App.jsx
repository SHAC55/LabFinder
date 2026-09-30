import { useState } from "react";
import { AlertCircle, Home, Search, ShieldCheck, Tag } from "lucide-react";

import SearchBar from "./components/SearchBar";
import LabCard from "./components/LabCard";
import ResultsHeader from "./components/ResultsHeader";
import EmptyState from "./components/EmptyState";
import LoadingState from "./components/LoadingState";

import { searchLabs } from "./services/api";

const POPULAR_TESTS = [
  "CBC",
  "Thyroid profile",
  "HbA1c",
  "Vitamin D",
  "Lipid profile",
  "Liver function test",
];

const STEPS = [
  {
    icon: Search,
    title: "Search a test",
    text: "Enter the test or package name and your area's pincode.",
  },
  {
    icon: Tag,
    title: "Compare final prices",
    text: "See what each lab charges, side by side, before you commit.",
  },
  {
    icon: Home,
    title: "Book with the lab",
    text: "Pick the lab that fits your budget and schedule.",
  },
];

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [pincode, setPincode] = useState("");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    const query = searchQuery.trim();
    const code = pincode.trim();

    setError("");

    if (!query) {
      setError("Enter a test name to search.");
      return;
    }

    if (!/^\d{6}$/.test(code)) {
      setError("Enter a valid 6-digit pincode.");
      return;
    }

    try {
      setLoading(true);

      const response = await searchLabs({
        searchQuery: query,
        pincode: code,
      });

      setResults(response.data.results);
      setSearched(true);
    } catch (error) {
      console.error("Search failed:", error);

      setResults([]);
      setSearched(true);

      setError(
        error.response?.data?.message ||
          "We couldn't reach the lab search. Check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#F5F6F2] text-[#14282C] antialiased"
      style={{ fontFamily: "'Onest', system-ui, -apple-system, sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700;800&display=swap');`}</style>

      {/* Header */}
      <header className="bg-[#0F3B3A] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
          <a
            href="/"
            className="flex items-center gap-2.5 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 32 32"
              fill="none"
              aria-hidden="true"
            >
              <rect width="32" height="32" rx="8" fill="#F2B84B" />
              <path
                d="M13 7h6M14.5 7v6.2L9.6 22a2 2 0 0 0 1.7 3h9.4a2 2 0 0 0 1.7-3l-4.9-8.8V7"
                stroke="#0F3B3A"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-lg font-bold tracking-tight">LabFinder</span>
          </a>

          <p className="hidden items-center gap-2 text-sm text-white/70 sm:flex">
            <ShieldCheck size={16} aria-hidden="true" />
            Prices shown are final prices
          </p>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="bg-[#0F3B3A] pb-28 text-white sm:pb-32">
          <div className="mx-auto max-w-6xl px-5 pb-4 pt-10 sm:pt-14 lg:px-8 lg:pt-20">
            <h2 className="max-w-3xl text-[2.25rem] font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.5rem]">
              Compare diagnostic test prices before you book
            </h2>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              Search a test or health package, enter your pincode, and see what
              labs near you charge.
            </p>
          </div>
        </section>

        {/* Search panel overlaps the hero */}
        <section className="relative z-10 mx-auto -mt-20 max-w-6xl px-5 sm:-mt-24 lg:px-8">
          <div className="rounded-2xl border border-[#DDE3DC] bg-white p-4 shadow-[0_12px_40px_-16px_rgba(15,59,58,0.35)] sm:p-6">
            <SearchBar
              searchQuery={searchQuery}
              pincode={pincode}
              setSearchQuery={setSearchQuery}
              setPincode={setPincode}
              onSearch={handleSearch}
              loading={loading}
            />

            {error && (
              <div
                role="alert"
                className="mt-4 flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-800"
              >
                <AlertCircle
                  size={17}
                  className="mt-0.5 shrink-0"
                  aria-hidden="true"
                />
                <span>{error}</span>
              </div>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-[#EDF0EA] pt-4">
              <span className="mr-1 text-sm text-[#5B6E70]">Common tests:</span>
              {POPULAR_TESTS.map((test) => (
                <button
                  key={test}
                  type="button"
                  onClick={() => setSearchQuery(test)}
                  className="rounded-md border border-[#DDE3DC] bg-[#F5F6F2] px-3 py-1.5 text-sm font-medium text-[#14282C] transition-colors hover:border-[#0F3B3A] hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F3B3A] focus-visible:ring-offset-2"
                >
                  {test}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="mx-auto max-w-4xl px-5 py-12 lg:px-8 lg:py-16">
          {loading ? (
            <LoadingState />
          ) : !searched ? (
            <EmptyState searched={false} />
          ) : results.length === 0 ? (
            <EmptyState searched />
          ) : (
            <>
              <ResultsHeader
                count={results.length}
                searchQuery={searchQuery}
                pincode={pincode}
              />

              <div className="space-y-4">
                {results.map((lab) => (
                  <LabCard key={lab.id} lab={lab} />
                ))}
              </div>
            </>
          )}
        </section>

        {/* How it works: only before the first search */}
        {!searched && !loading && (
          <section className="border-t border-[#DDE3DC] bg-white">
            <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-16">
              <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
                How LabFinder works
              </h3>

              <ol className="mt-8 grid gap-8 sm:grid-cols-3 sm:gap-10">
                {STEPS.map(({ icon: Icon, title, text }, i) => (
                  <li key={title} className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E4EFEB] text-[#0F3B3A]">
                      <Icon size={19} aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-semibold">
                        {i + 1}. {title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-[#5B6E70]">
                        {text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#DDE3DC] bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-6 text-sm text-[#5B6E70] sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <span className="font-semibold text-[#14282C]">LabFinder</span>
          <span>
            Demo project. Prices are for comparison and may differ at the lab.
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;