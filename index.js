const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const app = express();

const allowedOrigins = [
  "http://localhost:4000",
  process.env.CLIENT_URL, // For production frontend
];

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

app.route("/bfhl")
  .get((req, res) => {
    res.status(200).json({ operation_code: 1 });
  })
  .post((req, res) => {
    const data = req.body.data || [];
    const numbers = [];
    const alphabets = [];
    let highest_alphabet = "";

    for (const item of data) {
      if (!isNaN(item)) {
        numbers.push(item);
      } else if (item.length === 1 && isNaN(item)) {
        alphabets.push(item);
        if (!highest_alphabet || item.toUpperCase() > highest_alphabet.toUpperCase()) {
          highest_alphabet = item;
        }
      }
    }

    res.json({
      is_success: true,
      user_id: "HardikDaim_17092004",
      email: "2220909.cse.coe@cgc.edu.in",
      roll_number: "2220909",
      numbers: numbers,
      alphabets: alphabets,
      highest_alphabet: highest_alphabet ? [highest_alphabet] : [],
    });
  });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

module.exports = app;
