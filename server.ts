const axios = require('axios');

require('dotenv').config({ path: './.env' });
const PORT = process.env.PORT || 4242;
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(
  express.json({
    // We need the raw body to verify webhook signatures.
    // Let's compute it only when hitting the Dots webhook endpoint.
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith('/webhook')) {
        req.rawBody = buf.toString();
      }
    },
  })
);

app.get('/', (req, res) => {
  res.send('Hello from API');
});
app.get('/client-id', (req, res) => {
  res.json({ clientId: process.env.DOTS_CLIENT_ID });
});
app.post('/create-payment-intent', async (req, res) => {
  const body = req.body;

  const response = await axios.post(
    process.env.DOTS_API_URL + '/v2/payment-intents',
    {
      currency: 'usd',
      amount: body.amount,
    },
    {
      withCredentials: true,
      auth: {
        username: process.env.DOTS_CLIENT_ID,
        password: process.env.DOTS_CLIENT_SECRET,
      },
    }
  );
  res.json(response.data);
});

console.log('PORT', PORT);

app.listen(PORT, () => console.log(`Node server listening on port ${PORT}!`));
