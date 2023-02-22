import React from 'react';

import './App.css';
import { loadDots } from '@dots.dev/dots-js';
import { Elements } from '@dots.dev/react-dots-js';
import api from './api';
import CheckoutForm from './components/CheckoutForm';

const dotsPromise = api.getClientId().then((key) => loadDots(key, 'sandbox'));
function App() {
  return (
    <div className="App">
      <Elements dots={dotsPromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}

export default App;
