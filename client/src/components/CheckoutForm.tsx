import React, { useEffect, useMemo, useState } from 'react';
import { PaymentElement, useDots, useElements } from '@dots.dev/react-dots-js';
import './CheckoutForm.css';
import api from '../api';
import countryList from 'react-select-country-list';
import { useForm } from 'react-hook-form';

export default function CheckoutForm() {
  const [error, setError] = useState(null);
  const [metadata, setMetadata] = useState<any | null>();
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const dots = useDots();
  const amount = 9600;
  const elements = useElements();
  const countryOptions = useMemo(() => countryList().getData(), []);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    if (!dots || !elements) return;
    setProcessing(true);

    // // Step 3: Use clientSecret from PaymentIntent and the CardElement
    // // to confirm payment with dots.confirmCardPayment()
    try {
      const clientSecret = await api.createPaymentIntent(amount); //create a card charge of 96 dollar
      console.log(data);
      const payload = await dots.confirmCardPayment(clientSecret, {
        payment_method: {
          element: elements?.getElement('payment')!,
          billing_details: {
            name: data.name, // not required
            address: {
              country: data.country,
              zip: data.zip,
            },
          },
        },
      });
      setSucceeded(true);
      setMetadata(payload);
    } catch (error: any) {
      setError(error.toString());
    } finally {
      setProcessing(false);
    }
  };

  const renderSuccess = () => {
    return (
      <div className="sr-field-success message">
        <h1>Your test payment {metadata?.status}</h1>
        <p>View PaymentIntent response:</p>
        <pre className="sr-callout">
          <code>{JSON.stringify(metadata, null, 2)}</code>
        </pre>
        <button
          className="btn"
          onClick={() => {
            setSucceeded(false);
            reset({
              country: 'US',
            });
            setError(null);
          }}
        >
          Reset
        </button>
      </div>
    );
  };

  const renderForm = () => {
    const fieldOptions = {
      styles: {
        base: {
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          color: '#32325d',
          fontWeight: '400',
          fontSize: '16px',
        },
        invalid: {
          ':hover': {
            textDecoration: 'underline dotted red',
          },
          color: '#fa755a',
        },
        valid: {
          color: '#32CD32',
        },
      },
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>
          USD $
          {(amount / 100).toLocaleString(navigator.language, {
            minimumFractionDigits: 2,
          })}{' '}
        </h1>
        <br />
        <PaymentElement options={fieldOptions} />
        <div className="sr-combo-inputs">
          <div className="sr-combo-inputs-row">
            <input
              type="text"
              placeholder="Full Name"
              autoComplete="name"
              className="sr-input"
              {...register('name', { required: true })}
            />
            <input
              type="text"
              placeholder="12345"
              autoComplete="postal-code"
              className="sr-input"
              {...register('zip', { required: true })}
            />

            <select
              defaultValue="US"
              className="sr-select"
              {...register('country', { required: true })}
            >
              {countryOptions.map((country: any, index: number) => (
                <option key={index.toString()} value={country.value}>
                  {country.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && <div className="message sr-field-error">{error}</div>}

        <button className="btn" disabled={processing}>
          {processing ? 'Processing…' : 'Pay'}
        </button>
      </form>
    );
  };

  return (
    <div className="checkout-form">
      <div className="sr-payment-form">
        <div className="sr-form-row" />
        {succeeded ? renderSuccess() : renderForm()}
      </div>
    </div>
  );
}
