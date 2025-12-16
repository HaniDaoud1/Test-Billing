const express = require("express");
const router = express.Router();
const Billing = require("../models/billing.js");
const { cloudinary } = require("../cloudinary.js");
const { upload } = require("../cloudinary.js");

// GET all billing data
router.get("/", async (req, res) => {
  try {
    const data = await Billing.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET spesific billing data
router.get("/:id", async (req, res) => {
  try {
    const data = await Billing.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Billing not found" });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ ADD client
router.post("/", upload.single("image"), async (req, res) => {
  try {
    let image = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "posts",
      });
      image = result.secure_url;
    }

    const getFormattedDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0"); // mois 01-12
      const day = String(today.getDate()).padStart(2, "0"); // jour 01-31
      return `${year}-${month}-${day}`;
    };

    const billing = new Billing({
      customer: req.body.customer,
      service: req.body.service,
      location: req.body.location,
      amount: req.body.amount,
      date: getFormattedDate(),
      description: req.body.description,
      image: image,
    });

    const savedBilling = await billing.save();
    res.status(201).json(savedBilling);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ UPDATE billing
router.patch("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      customer: req.body.customer,
      service: req.body.service,
      location: req.body.location,
      amount: req.body.amount,
      description: req.body.description,
    };

    // 📷 Nouvelle image ?
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "posts",
      });
      updateData.image = result.secure_url;
    }

    const updatedBilling = await Billing.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedBilling) {
      return res.status(404).json({ message: "Billing not found" });
    }

    res.status(200).json(updatedBilling);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ❌ DELETE client
router.delete("/:id", async (req, res) => {
  try {
    await Billing.findByIdAndDelete(req.params.id);
    res.json({ message: "Client deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
