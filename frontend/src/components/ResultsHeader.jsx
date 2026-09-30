import { ArrowDownUp } from "lucide-react";

const ResultsHeader = ({ count, searchQuery, pincode }) => {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-sm font-medium text-slate-500">
          Search results
        </p>

        <h2 className="mt-1 text-xl font-bold text-slate-900">
          {searchQuery}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Available in {pincode}
        </p>
      </div>

      <div className="flex items-center gap-2 self-start rounded-full bg-white px-3 py-2 text-xs font-medium text-slate-500 shadow-sm ring-1 ring-slate-200 sm:self-auto">
        <ArrowDownUp size={14} />
        Lowest final price first
      </div>
    </div>
  );
};

export default ResultsHeader;