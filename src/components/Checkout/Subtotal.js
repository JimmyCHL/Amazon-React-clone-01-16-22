import React from "react";
import styled from "styled-components";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../StateProvider";
import { useNavigate } from "react-router-dom";

const Subtotal = () => {
  const [{ basket }, dispatch] = useStateValue();
  const navigate = useNavigate();
  console.log("This is the basket", basket);

  //Selector
  const getBasketTotal = (basket) => {
    let total = 0;
    basket?.map((item) => (total += item.price));
    return total;
  };
  return (
    <SubtotalContainer>
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({basket.length} items):
              <strong>{`${value}`}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      />
      <button onClick={(e) => navigate("/payment")}>Proceed to Checkout</button>
    </SubtotalContainer>
  );
};

export default Subtotal;

const SubtotalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
  height: 100px;
  padding: 20px;
  background-color: #f3f3f3;
  border: 1px solid #dddddd;
  border-radius: 3px;

  .subtotal__gift {
    display: flex;
    align-items: center;

    input {
      margin-right: 5px;
    }
  }

  >button{
      background: #f0c14b;
      border-radius: 2px;
      width:100%;
      height:30px;
      border:1px solid
      margin-top:10px;
      border-color: #a88734 #9c7e31 #846a29;
      color: #111;
      cursor: pointer;
  }
`;
