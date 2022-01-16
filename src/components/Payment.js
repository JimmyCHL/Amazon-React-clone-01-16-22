import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useStateValue } from "../components/StateProvider";
import CheckoutProduct from "../components/Checkout/CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import axios from "../axios";
import { db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";

const Payment = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);
  const navigate = useNavigate();
  const mountedRef = useRef(true);

  useEffect(() => {
    //generate the special stripe secret which allows us to charge a customer
    const getClientsSecret = async () => {
      try {
        const response = await axios({
          method: "post",
          //Stripe expects the total in a crrencies subunits
          url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
        });
        setClientSecret(response.data.clientSecret);
      } catch {
        console.log("components unmounted");
      }
    };

    if (mountedRef.current === true) getClientsSecret();
  }, [basket]);

  console.log("THE SECRET IS >>>", clientSecret);

  //Selector
  const getBasketTotal = (basket) => {
    let total = 0;
    basket?.map((item) => (total += item.price));
    return total;
  };

  const stripe = useStripe();
  const elements = useElements();

  // do all the fancy stripe stuff
  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation
        //console.log(paymentIntent);
        setDoc(doc(db, "users", user?.uid, "orders", paymentIntent.id), {
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        mountedRef.current = false;
        dispatch({
          type: "EMPTY_BASKET",
        });

        navigate("/orders", { replace: true });
      });
  };

  const handleChange = (event) => {
    //Listen for changes in the CardElement
    //and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <PaymentOuterContainer>
      <PaymentContainer>
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        <PaymentSection>
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </PaymentSection>
        <PaymentSection>
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={i}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </PaymentSection>
        <PaymentSection>
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Stripe magic will be here  */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />

                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </PaymentSection>
      </PaymentContainer>
    </PaymentOuterContainer>
  );
};

export default Payment;

const PaymentOuterContainer = styled.div``;

const PaymentContainer = styled.div`
  background-color: white;

  > h1 {
    text-align: center;
    padding: 10px;
    font-weight: 400;
    background-color: rgb(234, 237, 237);
    border-bottom: 1px solid lightgray;
    > a {
      text-decoration: none;
    }
  }
`;

const PaymentSection = styled.div`
  display: flex;
  padding: 20px;
  margin: 0 20px;
  border-bottom: 1px solid lightgray;

  .payment__title {
    flex: 0.2;
  }

  .payment__address,
  .payment__items,
  .payment__details {
    flex: 0.8;
  }

  .payment__details {
    max-width: 500px;
    > h3 {
      padding-bottom: 20px;
    }
  }

  .payment__details > form > div > button {
    background: #f0c14b;
    border-radius: 2px;
    width: 100%;
    height: 30px;
    border: 1px solid;
    font-weight: bolder;
    margin-top: 10px;
    border-color: #a87734 #9c7e31 #846a29;
  }
`;
