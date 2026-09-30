import { Search, MapPin } from "lucide-react";

const SearchBar = ({
  searchQuery,
  pincode,
  setSearchQuery,
  setPincode,
  onSearch,
  loading,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-2xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-200/40"
    >
      <div className="flex flex-col gap-3 md:flex-row">
        {/* Test Name */}
        <div className="relative flex-1">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search test or health package"
            className="h-14 w-full rounded-xl bg-slate-50 pl-12 pr-4 text-sm font-medium outline-none transition focus:bg-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Pincode */}
        <div className="relative md:w-52">
          <MapPin
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={pincode}
            onChange={(e) =>
              setPincode(e.target.value.replace(/\D/g, ""))
            }
            placeholder="Pincode"
            className="h-14 w-full rounded-xl bg-slate-50 pl-12 pr-4 text-sm font-medium outline-none transition focus:bg-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Search */}
        <button
          type="submit"
          disabled={loading}
          className="h-14 rounded-xl bg-slate-900 px-7 font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Searching..." : "Search Labs"}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;