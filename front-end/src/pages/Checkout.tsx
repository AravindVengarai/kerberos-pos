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
  Dialog,
} from "@mui/material";
import NCR_Logo from "../assets/NCR_Logo.svg";
import { useTimer } from "use-timer";
import "react-simple-keyboard/build/css/index.css";
import Keyboard from "react-simple-keyboard";
import LiquorIcon from "@mui/icons-material/Liquor";
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
const Patron = { barcode: 11, type: "Alcohol", label: "Patron", price: 29.99 };
const Henny = { barcode: 12, type: "Alcohol", label: "Hennessy", price: 26.99 };
const Newport = {
  barcode: 13,
  type: "Cigarrettes",
  label: "Newports",
  price: 8.99,
};
const Powerade = { barcode: 14, type: "Drink", label: "Powerade", price: 1.99 };
const Deli = { barcode: 15, type: "food", label: "Deli", price: 5.99 };

const Checkout = () => {
  const numberFormat = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  const [needToCheck, setNeedToCheck] = useState(false);
  const [loyal, setLoyal] = useState(false);
  const [total, setTotal] = useState(0);
  const [isLoyal, setisLoyal] = useState(false);
  const [loyaltyId, setLoyaltyId] = useState("");
  const [currentItem, setCurrentItem] = useState({
    barcode: 1,
    type: "none",
    label: "none",
    price: 0,
  });
  const [dummy, setDummy] = useState(false);
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
  const { time, start, pause, reset, status } = useTimer({
    initialTime: 10,
    timerType: "DECREMENTAL",
  });
  const checkID = () => {
    if (currentItem.type === "Alcohol" || currentItem.type === "Cigarrettes") {
      if (!needToCheck) {
        console.log("inside alc");
        return (
          <Dialog open={time > 0}>Starting Age Verification Now: {time}</Dialog>
        );
      }
    }
  };
  useEffect(() => {
    if (currentItem.label !== "none") {
      reset();
      start();
      checkID();
      if (time === 0) {
        additems((arr) => [...arr, currentItem]);
      }
    }
  }, [currentItem, dummy]);

  return (
    <Box>
      {checkID()}
      <Stack
        direction="row"
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <img style={{ width: "100px", height: "auto" }} src={NCR_Logo}></img>
        <Stack style={{ alignItems: "center" }}>
          <Typography style={{ fontSize: "40px", textAlign: "center" }}>
            {" "}
            Welcome to Store Name{" "}
          </Typography>
          {!isLoyal ? (
            <Button
              style={{ fontSize: "40px", textAlign: "center" }}
              onClick={() => setLoyal(true)}
            >
              {" "}
              Enter Loyalty ID
            </Button>
          ) : (
            <Typography style={{ fontSize: "40px", textAlign: "center" }}>
              Continue Shopping
            </Typography>
          )}
          <Dialog open={loyal}>
            <TextField value={loyaltyId} />
            <Keyboard
              onChange={(input) => setLoyaltyId(input)}
              layout={{
                default: ["1 2 3", "4 5 6", "7 8 9", "{//} 0 {//}", "{bksp}"],
                shift: ["! / #", "$ % ^", "& * (", "{shift} ) +", "{bksp}"],
              }}
            />
            <ButtonGroup>
              <Button
                style={{ width: "97px" }}
                onClick={() => {
                  setLoyal(false);
                  setisLoyal(true);
                }}
              >
                Submit
              </Button>
              <Button
                style={{ width: "97px" }}
                onClick={() => {
                  setLoyal(false);
                  setLoyaltyId("");
                }}
              >
                Exit
              </Button>
            </ButtonGroup>
          </Dialog>
        </Stack>
      </Stack>
      <Stack direction="row">
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
                setDummy(!dummy);
                setCurrentItem(Newport);
              }}
            >
              Newport<SmokingRoomsIcon></SmokingRoomsIcon>
            </Button>
            <Button
              style={{ fontSize: "40px" }}
              onClick={() => {
                setDummy(!dummy);
                setCurrentItem(Deli);
              }}
            >
              Deli <RestaurantIcon></RestaurantIcon>
            </Button>
            <Button
              style={{ fontSize: "40px" }}
              onClick={() => {
                setDummy(!dummy);
                setCurrentItem(Powerade);
              }}
            >
              Powerade <LocalDrinkIcon></LocalDrinkIcon>
            </Button>
            <Button
              style={{ fontSize: "40px" }}
              onClick={() => {
                setDummy(!dummy);
                setCurrentItem(Patron);
              }}
            >
              Patron<LiquorIcon></LiquorIcon>
            </Button>
            <Button
              style={{ fontSize: "40px" }}
              onClick={() => {
                setDummy(!dummy);
                setCurrentItem(Henny);
              }}
            >
              Hennessy<LiquorIcon></LiquorIcon>
            </Button>
          </ButtonGroup>
        </Box>
        <Stack
          direction="column"
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "auto",
            marginRight: 0,
          }}
        >
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
