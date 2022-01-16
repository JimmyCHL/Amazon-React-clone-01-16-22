import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { useStateValue } from "../components/StateProvider";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Order from "../components/Orders/Order";
import { reauthenticateWithCredential } from "firebase/auth";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [{ user, basket }, dispatch] = useStateValue();

  console.log(orders[0]);

  useEffect(async () => {
    if (!user) return setOrders([]);
    const orderSnap = await getDocs(
      query(
        collection(db, "users", user?.uid, "orders"),
        orderBy("created", "desc")
      )
    );
    console.log(orderSnap.docs);
    setOrders(
      orderSnap.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }))
    );
  }, [user]);

  return (
    <OrdersContainer>
      <h1>{!user ? "Please Login in" : "Your Orders"}</h1>
      {user && orders.length == 0 && <h1>No Order Yet</h1>}
      <div className="orders__order">
        {orders.map((order, i) => {
          //if (i >= 1) return; //we only need latest order history
          return <Order key={i} order={order} />; //show all orders history
        })}
      </div>
    </OrdersContainer>
  );
};

export default Orders;

const OrdersContainer = styled.div`
  padding: 20px 40px;

  > h1 {
    margin: 30px 0;
  }
`;
