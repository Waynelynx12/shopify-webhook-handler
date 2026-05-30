const express = require("express");
const router = express.Router();
const { verifyShopifyWebhook } = require("./verify");
const { processWebhookEvent } = require("./process");

router.post("/webhooks", async (req, res) => {
  try {
    const isValid = verifyShopifyWebhook(req);

    if (!isValid) {
      console.warn("Invalid webhook signature detected");
      return res.status(401).json({
        error: "Unauthorized: Invalid webhook signature",
      });
    }

    const topic = req.headers["x-shopify-topic"];
    const payload = req.body;

    console.log(`Verified webhook received: ${topic}`);

    await processWebhookEvent(topic, payload);

    res.status(200).json({
      success: true,
      message: `Webhook processed: ${topic}`,
    });
  } catch (error) {
    console.error("Webhook processing error:", error.message);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router;
