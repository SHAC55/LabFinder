import { searchLabs } from "../services/search.service.js";

export const searchLabsController = (req, res, next) => {
  try {
    const { search_query, pincode } = req.query;

    // Validate required fields
    if (!search_query || !search_query.trim()) {
      return res.status(400).json({
        success: false,
        message: "Search query is required"
      });
    }

    if (!pincode || !pincode.trim()) {
      return res.status(400).json({
        success: false,
        message: "Pincode is required"
      });
    }

    // Basic pincode validation
    if (!/^\d{6}$/.test(pincode.trim())) {
      return res.status(400).json({
        success: false,
        message: "Pincode must be a valid 6-digit number"
      });
    }

    const results = searchLabs({
      searchQuery: search_query,
      pincode
    });

    return res.status(200).json({
      success: true,
      data: {
        results,
        count: results.length,
        search_query: search_query.trim(),
        pincode: pincode.trim()
      }
    });
  } catch (error) {
    next(error);
  }
};