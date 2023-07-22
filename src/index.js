import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from "@auth0/auth0-react";
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import cartReducer from './context/CartSlice';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  "client-id": "AYBtoe3Ky4k6znEm1Sc3VYWBf6fDQpTroe4n70LdCWhvUi0C37oPfHfO0AwdPS3QhREbLyGGdm0-iBDQ",
  currency: "USD",
  locale: "en_VN",
  intent: "capture",
  "disable-funding": "credit,card"
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PayPalScriptProvider options={initialOptions}>
  <Auth0Provider
    domain="dev-tq2jltp7sj8xsjsh.us.auth0.com"
    clientId="Dyn0yOgJ80WQrImq01piEWJDmeov4xN0"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
  <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  </React.StrictMode>
  </Auth0Provider>
  </PayPalScriptProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
