const express = require("express");
const router = express.Router();

const Customer = require("../models/customerModel");


// GET ALL
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();

    res.json(customers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// CREATE
router.post("/", async (req, res) => {
  try {
    const customer = await Customer.create(req.body);

    res.status(201).json(customer);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(customer);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});


// SEARCH
router.get("/search", async (req, res) => {
  try {
    const q = req.query.q;

    const customers = await Customer.find({
      name: {
        $regex: q,
        $options: "i",
      },
    });

    res.json(customers);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;