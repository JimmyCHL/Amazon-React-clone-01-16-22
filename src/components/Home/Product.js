import React from "react";
import styled from "styled-components";
import { useStateValue } from "../StateProvider";

const Product = ({ id, title, image, price, rating }) => {
  const [{ basket }, dispatch] = useStateValue();

  //console.log("This is the basket", basket);
  const addToBasket = () => {
    //dispatch the item into data layer;
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };
  return (
    <ProductContainer>
      <ProductInfo>
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {new Array(rating).fill(0).map((_, i) => (
            <p key={i}>🌟</p>
          ))}
        </div>
        <img src={image} />
        <button onClick={addToBasket}>Add to Basket</button>
      </ProductInfo>
    </ProductContainer>
  );
};

export default Product;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 20px;
  width: 100%;
  /* min-height: 40vh; */
  min-width: 100px;
  background-color: white;
  z-index: 1;
  @media (max-width: 768px) {
    min-height: 300px;
  }
`;

const ProductInfo = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;

  > img {
    height: 200px;
    width: 100%;
    object-fit: contain;
    margin-bottom: 15px;
  }
  .product__price {
    margin-top: 5px;
  }

  > .product__rating {
    display: flex;
    margin-bottom: 5px;
  }

  > button {
    background: #f0c14b;
    border: 1px solid;
    margin-top: 10px;
    border-color: #a88734 #9c7e31 #846a29;
    color: #111;
    margin: auto;
    align-self: center;
  }
`;
