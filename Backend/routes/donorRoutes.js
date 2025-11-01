import express from "express";
import { supabase } from "../config/supabaseClient.js";

const router = express.Router();

/**
 * 🧩 POST /api/donors
 * Add or update donor info
 */
router.post("/", async (req, res) => {
  const { full_name, email, phone, location } = req.body;

  if (!email || !full_name) {
    return res.status(400).json({ success: false, message: "Full name and email are required." });
  }

  try {
    // 🔍 Check if donor already exists
    const { data: existingDonor, error: checkError } = await supabase
      .from("donors")
      .select("*")
      .eq("email", email)
      .single();

    if (checkError && checkError.code !== "PGRST116") throw checkError; // Ignore "No record found" errors

    let result;
    if (existingDonor) {
      // 🛠 Update existing donor
      const { data, error } = await supabase
        .from("donors")
        .update({
          full_name,
          phone,
          location,
          updated_at: new Date().toISOString(),
        })
        .eq("email", email)
        .select();

      if (error) throw error;
      result = data[0];
    } else {
      // ✨ Insert new donor
      const { data, error } = await supabase
        .from("donors")
        .insert([{ full_name, email, phone, location }])
        .select();

      if (error) throw error;
      result = data[0];
    }

    res.status(200).json({ success: true, donor: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * 🧠 GET /api/donors/:email
 * Fetch donor by email
 */
router.get("/:email", async (req, res) => {
  const { email } = req.params;

  try {
    const { data, error } = await supabase
      .from("donors")
      .select("*")
      .eq("email", email)
      .single();

    if (error && error.code === "PGRST116") {
      return res.status(404).json({ message: "Donor not found" });
    }
    if (error) throw error;

    res.json({ success: true, donor: data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;