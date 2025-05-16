import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to a PROPER Docker tutorial");
});

const port = process.env.PORT || 5173;
app.listen(port, () => {
  // Fixed typo in arrow function
  console.log(`Successfully listening on port http://localhost:${port}`);
});
