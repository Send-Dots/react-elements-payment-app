import axios from 'axios';

export const createPaymentIntent = async (amount: number) => {
  const res = await axios.post('/create-payment-intent', {
    currency: 'usd',
    amount,
  });

  return res.data.client_secret;
};

export const getClientId = async () => {
  const res = await axios.get('/client-id');
  return res.data.clientId;
};

const api = {
  createPaymentIntent,
  getClientId,
};

export default api;
