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
  ButtonGroup,
  TextField,
  Icon,
} from "@mui/material";
import LiquorIcon from "@mui/icons-material/Liquor";
import Current from "../Components/Current";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Webcam from "react-webcam";
import Order from "../Components/Order";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import SmokingRoomsIcon from "@mui/icons-material/SmokingRooms";
import RestaurantIcon from "@mui/icons-material/Restaurant";
export interface itemObject {
  barcode?: number;
  type?: string;
  label?: string;
  price?: number;
}
const alcohol = { barcode: 1, type: "Alcohol", label: "Patron", price: 59.99 };
const Checkout = () => {
  const numberFormat = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  const [loyal, setLoyal] = useState(false);
  const [total, setTotal] = useState(0);
  const [isLoyal, setisLoyal] = useState(false);
  const [currentItem, setCurrentItem] = useState({
    barcode: 1,
    type: "none",
    label: "none",
    price: 0,
  });
  const [firstInstance, setfirstInstance] = useState(false);
  const [items, additems] = useState([
    { barcode: 0, type: "type", label: "Item Label", price: 0 },
  ]);
  useEffect(() => {
    let cnt = 0;
    if (items.length > 0) {
      items.map((item) => {
        cnt += item.price;
        console.log(cnt);
      });
    }
    setTotal(cnt);
  }, [items]);
  useEffect(() => {}, [currentItem]);
  return (
    <Box>
      <Stack style={{ alignItems: "center" }}>
        <Typography style={{ fontSize: "40px", textAlign: "center" }}>
          {" "}
          Welcome to Store Name{" "}
        </Typography>
        <Typography style={{ fontSize: "40px", textAlign: "center" }}>
          {" "}
          {!isLoyal ? <>Enter Loyalty ID</> : <>Begin Shopping</>}
        </Typography>
        {loyal ? (
          <></>
        ) : (
          <Stack direction="row" spacing={2}>
            <TextField
              style={{ alignContent: "center", width: "200px" }}
              id="outlined-basic"
              label="Enter ID"
              variant="outlined"
            />
            <Button
              onClick={() => {
                setLoyal(true);
                setisLoyal(true);
                console.log(loyal);
              }}
            >
              Enter
            </Button>
          </Stack>
        )}
        {loyal ? (
          <></>
        ) : (
          <Button
            style={{ fontSize: "50px" }}
            onClick={() => {
              setLoyal(true);
              setisLoyal(false);
            }}
          >
            Skip
          </Button>
        )}
      </Stack>
      <Stack direction="row">
        {loyal ? (
          <Box style={{ marginLeft: "500x" }}>
            <ButtonGroup
              style={{ minWidth: "200px" }}
              variant="contained"
              orientation="vertical"
              aria-label="outlined primary button group"
            >
              <Button
                style={{ fontSize: "40px" }}
                onClick={() => {
                  additems((arr) => [...arr, alcohol]);
                  setCurrentItem(alcohol);
                }}
              >
                Newport 100s <SmokingRoomsIcon></SmokingRoomsIcon>
              </Button>
              <Button
                style={{ fontSize: "40px" }}
                onClick={() => {
                  additems((arr) => [...arr, alcohol]);
                  setCurrentItem(alcohol);
                }}
              >
                Deli <RestaurantIcon></RestaurantIcon>
              </Button>
              <Button
                style={{ fontSize: "40px" }}
                onClick={() => {
                  additems((arr) => [...arr, alcohol]);
                  setCurrentItem(alcohol);
                }}
              >
                Powerade <LocalDrinkIcon></LocalDrinkIcon>
              </Button>
              <Button
                style={{ fontSize: "40px" }}
                onClick={() => {
                  additems((arr) => [...arr, alcohol]);
                  setCurrentItem(alcohol);
                }}
              >
                Patron<LiquorIcon></LiquorIcon>
              </Button>
              <Button
                style={{ fontSize: "40px" }}
                onClick={() => {
                  additems((arr) => [...arr, alcohol]);
                  setCurrentItem(alcohol);
                }}
              >
                Hennessy<LiquorIcon></LiquorIcon>
              </Button>
            </ButtonGroup>
          </Box>
        ) : (
          <></>
        )}{" "}
        {/* <Current item={currentItem}></Current> */}
        <Stack direction="column" style={{}}>
          <Webcam />
          <Typography style={{ fontSize: "20px", color: "#1b76d4" }}>
            Number of Items in <ShoppingCartIcon />: {items.length - 1}
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
      </Stack>
    </Box>
  );
};

export default Checkout;
