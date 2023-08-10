/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51NcgSSSDGlRzJ1t01N9SivROMMQnaSssXaBrmJK0ptCye3bVGkAgrxboeFYkiH08LOtLt3bNjrv7aMPeR8X2VpV4009kIM23OW'
);

export const bookTour = async tourId => {
  try {
    //1) getting checkout session from API
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    //2) creating checkout form + charging credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
