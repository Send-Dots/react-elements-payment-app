import axios from 'axios';
import exp from 'constants';

export const createPaymentIntent = async (amount: number) => {
  const res = await axios.post('/create-payment-intent', {
    currency: 'usd',
    amount,
  });

  return res.data;
};
export const attachPaymentMethod = async (
  paymentMethodId: string,
  customerId: string
) => {
  const res = await axios.post('/attach-payment-method', {
    paymentMethodId,
    customerId,
  });
  return res.data;
};
export const createPaymentCustomer = async (countryCode: string) => {
  const res = await axios.post('/create-payment-customer', {
    countryCode,
  });
  return res.data;
};

export const confirmPaymentIntent = async (
  paymentIntentId: string,
  paymentMethodId: string
) => {
  const res = await axios.post('/confirm-payment-intent', {
    paymentMethodId,
    paymentIntentId,
  });
  return res.data;
};

export const getClientId = async () => {
  const res = await axios.get('/client-id');
  return res.data.clientId;
};

const api = {
  createPaymentIntent,
  getClientId,
  attachPaymentMethod,
  createPaymentCustomer,
  confirmPaymentIntent,
};

export default api;
