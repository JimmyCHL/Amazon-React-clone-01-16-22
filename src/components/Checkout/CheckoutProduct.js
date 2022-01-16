import React, { forwardRef } from "react";
import styled from "styled-components";
import { useStateValue } from "../StateProvider";

const CheckoutProduct = forwardRef(
  ({ id, image, title, price, rating, hiddenButton }, ref) => {
    const [{ basket }, dispatch] = useStateValue();

    const removeFromBasket = (dispatchEvent) => {
      //remove the item from the basket
      dispatchEvent({
        type: "REMOVE_FROM_BASKET",
        id: id,
      });
    };

    return (
      <CheckoutProductContainer ref={ref}>
        <img className="checkoutProduct__image" src={image} />
        <CheckoutProductInfo>
          <p className="checkoutProduct__title">{title}</p>
          <p className="checkoutProduct__price">
            <small>$</small>
            <strong>{price}</strong>
          </p>
          <div className="checkoutProduct__rating">
            {Array(rating)
              .fill(0)
              .map((_, i) => (
                <p key={i}>🌟</p>
              ))}
          </div>
          <button
            style={hiddenButton ? { display: "none" } : {}}
            onClick={() => removeFromBasket(dispatch)}
          >
            Remove from Basket
          </button>
        </CheckoutProductInfo>
      </CheckoutProductContainer>
    );
  }
);

export default CheckoutProduct;

const CheckoutProductContainer = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;

  .checkoutProduct__image {
    object-fit: contain;
    width: 180px;
    height: 180px;
  }
`;

const CheckoutProductInfo = styled.div`
  padding-left: 20px;
  flex: 1;
  > button {
    background: #f0c14b;
    border: 1px solid;
    margin-top: 10px;
    border-color: #a88734 #9c7e31 #846a29;
    color: #111;
    cursor: pointer;
  }

  .checkoutProduct__title {
    font-size: 17px;
    font-weight: 800;
  }

  .checkoutProduct__rating {
    display: flex;
  }
`;
