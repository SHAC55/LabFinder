import { BadgeCheck, Clock3, Home, Building2 } from "lucide-react";

const inr = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

const LabCard = ({ lab }) => {
  const isPackage = lab.item_type === "package";

  const {
    provider_name,
    item_name,
    included_tests = [],
    pricing,
    logistics,
    nabl_accredited,
  } = lab;

  const savings = pricing.mrp - pricing.offer_price;
  const hasSavings = savings > 0;

  return (
    <article className="overflow-hidden rounded-xl border border-[#DDE3DC] bg-white transition-colors hover:border-[#0F3B3A]/40 md:flex">
      {/* Details */}
      <div className="flex-1 p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[#5B6E70]">
          <span className="font-medium text-[#14282C]">{provider_name}</span>

          {nabl_accredited && (
            <span className="inline-flex items-center gap-1 text-[#0E6B5C]">
              <BadgeCheck size={15} aria-hidden="true" />
              NABL accredited
            </span>
          )}
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <h3 className="text-lg font-semibold leading-snug text-[#14282C]">
            {item_name}
          </h3>

          <span className="rounded border border-[#DDE3DC] bg-[#F5F6F2] px-2 py-0.5 text-xs font-medium text-[#5B6E70]">
            {isPackage ? "Package" : "Single test"}
          </span>
        </div>

        {isPackage && included_tests.length > 0 && (
          <p className="mt-3 max-w-prose text-sm leading-relaxed text-[#5B6E70]">
            <span className="font-medium text-[#14282C]">
              {included_tests.length} tests included:{" "}
            </span>
            {included_tests.join(", ")}
          </p>
        )}

        <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#14282C]">
          <div className="flex items-center gap-2">
            <dt className="sr-only">Sample collection</dt>
            <dd className="flex items-center gap-2">
              {logistics.home_collection ? (
                <>
                  <Home size={16} className="text-[#5B6E70]" aria-hidden="true" />
                  {logistics.home_collection_fee === 0
                    ? "Free home collection"
                    : `Home collection ${inr(logistics.home_collection_fee)}`}
                </>
              ) : (
                <>
                  <Building2
                    size={16}
                    className="text-[#5B6E70]"
                    aria-hidden="true"
                  />
                  Lab visit only
                </>
              )}
            </dd>
          </div>

          <div className="flex items-center gap-2">
            <dt className="sr-only">Report time</dt>
            <dd className="flex items-center gap-2">
              <Clock3 size={16} className="text-[#5B6E70]" aria-hidden="true" />
              Report in {logistics.report_tat_hours} hours
            </dd>
          </div>
        </dl>
      </div>

      {/* Price */}
      <div className="border-t border-[#DDE3DC] bg-[#EEF4F1] p-5 md:flex md:w-60 md:shrink-0 md:flex-col md:justify-center md:border-l md:border-t-0 md:p-6">
        <p className="text-sm text-[#5B6E70]">Final price</p>

        <p className="text-3xl font-bold tracking-tight text-[#0F3B3A]">
          {inr(pricing.total_final_price)}
        </p>

        <p className="mt-2 text-sm text-[#5B6E70]">
          {inr(pricing.offer_price)}
          {pricing.mrp > pricing.offer_price && (
            <span className="ml-1.5 text-[#8A9A9B] line-through">
              {inr(pricing.mrp)}
            </span>
          )}
        </p>

        {hasSavings && (
          <p className="mt-1 text-sm font-medium text-[#0E6B5C]">
            You save {inr(savings)}
          </p>
        )}
      </div>
    </article>
  );
};

export default LabCard;