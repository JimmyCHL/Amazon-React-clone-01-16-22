import React from "react";
import styled from "styled-components";
import moment from "moment";
import CheckoutProduct from "../Checkout/CheckoutProduct";
import CurrencyFormat from "react-currency-format";

const Order = ({ order }) => {
  console.log(order);
  return (
    <OrderContainer>
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className="order__id">
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map((item, i) => (
        <CheckoutProduct
          hiddenButton={true}
          key={i}
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
        />
      ))}
      <CurrencyFormat
        renderText={(value) => (
          <h3 className="order__total">Order Total: {value}</h3>
        )}
        decimalScale={2}
        value={order.data.amount / 100} //the amount we get is subunits so we need divide 100
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
    </OrderContainer>
  );
};

export default Order;

const OrderContainer = styled.div`
  padding: 40px;
  margin: 20px 0;
  border: 1px solid lightgray;
  background-color: white;
  position: relative;

  .order__id {
    position: absolute;
    top: 40px;
    right: 20px;
  }

  .order__total {
    text-align: right;
  }
`;
