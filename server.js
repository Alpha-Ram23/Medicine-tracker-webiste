const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.static(__dirname));

// ✅ Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://ramcharan:ram123@ramcharan.4qsopdm.mongodb.net/medicinesDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("✅ Connected to MongoDB Atlas");
}).catch(err => {
  console.error("❌ MongoDB connection error:", err);
});

// ✅ Define Schema
const medicineSchema = new mongoose.Schema({
  medicineName: String,
  dosage: String,
  purpose: String,
  available: Boolean,
  pharmacyName: String,
  pharmacyLocation: String,
  contactNumber: String,
  quantity: Number,
  price: Number
});

const Medicine = mongoose.model("Medicine", medicineSchema);

// ✅ Search Route (API)
app.get('/search', async (req, res) => {
  const medicineName = req.query.medicineName?.toLowerCase();
  if (!medicineName) return res.json([]);

  try {
    const results = await Medicine.find({
      medicineName: { $regex: new RegExp(medicineName, 'i') }
    });
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
