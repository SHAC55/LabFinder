import { SearchX } from "lucide-react";

const EmptyState = ({ searched }) => {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
        <SearchX className="text-slate-500" size={26} />
      </div>

      <h3 className="mt-5 text-lg font-bold text-slate-900">
        {searched ? "No labs found" : "Search for a diagnostic test"}
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
        {searched
          ? "We couldn't find any matching tests or packages available at this pincode."
          : "Enter a test name and pincode to compare available labs and prices."}
      </p>
    </div>
  );
};

export default EmptyState;