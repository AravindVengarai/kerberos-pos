import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Link as Linker,
  Paper,
  List,
  Stack,
  Typography,
  Grid,
} from "@mui/material";
import Order from "../Components/Order";
const Checkout = () => {
  const numberFormat = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  const [total, setTotal] = useState(0);
  const [items, additems] = useState([
    {
      barcode: 1982394,
      type: "Alcohol",
      label: "Patron",
      price: 59.99,
    },
    {
      index: 2,
      type: "Grocery",
      label: "Gala Apples",
      price: 10.29,
    },
    {
      index: 2,
      type: "Grocery",
      label: "Gala Apples",
      price: 10.29,
    },
    {
      index: 2,
      type: "Grocery",
      label: "Gala Apples",
      price: 10.29,
    },
    {
      index: 2,
      type: "Grocery",
      label: "Gala Apples",
      price: 10.29,
    },
  ]);
  useEffect(() => {
    let cnt = 0;
    items.map((item) => {
      cnt += item.price;
      console.log(cnt);
    });
    setTotal(cnt);
  }, []);
  return (
    <Box>
      <Typography style={{ fontSize: "40px", textAlign: "center" }}>
        {" "}
        Welcome to Store Name{" "}
      </Typography>
      <Typography style={{ fontSize: "40px", textAlign: "center" }}>
        {" "}
        Enter Loyalty ID
      </Typography>
      <Stack
        direction="column"
        style={{ marginTop: "700px", marginLeft: "1400px" }}
      >
        <Typography style={{ fontSize: "20px", color: "#1b76d4" }}>
          Number of Items: {items.length}
        </Typography>
        <Order items={items}></Order>
        <Button
          style={{
            backgroundColor: "green",
            color: "white",
            fontSize: "25px",
            width: "fit-content",
          }}
        >
          Pay Now {numberFormat(total)}
        </Button>
      </Stack>
    </Box>
  );
};

export default Checkout;
