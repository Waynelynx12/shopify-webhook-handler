async function processWebhookEvent(topic, payload) {
  switch (topic) {
    case "orders/create":
      await handleOrderCreated(payload);
      break;
    case "orders/paid":
      await handleOrderPaid(payload);
      break;
    case "orders/cancelled":
      await handleOrderCancelled(payload);
      break;
    case "checkouts/create":
      await handleCheckoutCreated(payload);
      break;
    default:
      console.log(`Unhandled webhook topic: ${topic}`);
  }
}

async function handleOrderCreated(order) {
  console.log(`New order received: #${order.order_number}`);
  console.log(`Customer: ${order.email}`);
  console.log(`Total: ${order.total_price} ${order.currency}`);
}

async function handleOrderPaid(order) {
  console.log(`Payment confirmed: #${order.order_number}`);
  console.log(`Amount paid: ${order.total_price}`);
}

async function handleOrderCancelled(order) {
  console.log(`Order cancelled: #${order.order_number}`);
  console.log(`Reason: ${order.cancel_reason}`);
}

async function handleCheckoutCreated(checkout) {
  console.log(`Checkout started: ${checkout.token}`);
  console.log(`Cart value: ${checkout.total_price}`);
}

module.exports = { processWebhookEvent };
