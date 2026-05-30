require("dotenv").config();
const express = require("express");
const app = express();

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString("utf8");
    },
  })
);

const webhookRoutes = require("./src/routes");
app.use("/api", webhookRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "online",
    service: "Shopify Webhook Handler",
    timestamp: new Date().toISOString(),
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Webhook handler running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
