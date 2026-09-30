import labs from "../data/labs.json" with { type: "json" };

const normalize = (value) => value.trim().toLowerCase();

export const searchLabs = ({ searchQuery, pincode }) => {
  const normalizedQuery = normalize(searchQuery);
  const normalizedPincode = pincode.trim();

  const results = labs
    // Step 1: Filter by pincode
    .filter((lab) =>
      lab.available_pincodes.includes(normalizedPincode)
    )

    // Step 2: Match test/package
    .filter((lab) => {
      const itemNameMatches = normalize(lab.item_name).includes(
        normalizedQuery
      );

      const includedTestMatches = lab.included_tests.some((test) =>
        normalize(test).includes(normalizedQuery)
      );

      return itemNameMatches || includedTestMatches;
    })

    // Step 3: Calculate final price
    .map((lab) => {
      const offerPrice = lab.pricing.offer_price;
      const homeCollectionFee =
        lab.logistics.home_collection_fee;

      const totalFinalPrice =
        offerPrice + homeCollectionFee;

      return {
        ...lab,
        pricing: {
          ...lab.pricing,
          total_final_price: totalFinalPrice
        }
      };
    })

    // Step 4: Lowest final price first
    .sort(
      (a, b) =>
        a.pricing.total_final_price -
        b.pricing.total_final_price
    );

  return results;
};