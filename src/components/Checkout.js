import React from "react";
import styled from "styled-components";
import Subtotal from "./Checkout/Subtotal";
import CheckoutProduct from "./Checkout/CheckoutProduct";
import { useStateValue } from "./StateProvider";
import FlipMove from "react-flip-move";

const Checkout = () => {
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <CheckoutContainer>
      <CheckoutLeft>
        <img
          className="checkout_ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
        />
        <div>
          <h3>Hello, {user ? user.email : "Guest"}</h3>
          <CheckoutTitle>Your shopping Basket</CheckoutTitle>
          <FlipMove>
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
          </FlipMove>
        </div>
      </CheckoutLeft>
      <CheckoutRight>
        <Subtotal />
      </CheckoutRight>
    </CheckoutContainer>
  );
};

export default Checkout;

const CheckoutContainer = styled.div`
  display: flex;
  padding: 20px;
  background-color: white;
  height: max-content;
`;

const CheckoutLeft = styled.div`
  .checkout_ad {
    width: 100%;
    margin-bottom: 10px;
  }

  h3 {
    margin-right: 10px;
    padding: 10px;
  }
`;

const CheckoutTitle = styled.h2`
  margin-right: 10px;
  padding: 10px;
  border-bottom: 1px solid lightgrey;
`;

const CheckoutRight = styled.div``;
