import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Link as Linker,
  Stack,
  Typography,
  ButtonGroup,
  TextField,
  Dialog,
} from "@mui/material";
import faceapi from 'face-api.js';
import 'react-simple-keyboard/build/css/index.css';
import Keyboard from "react-simple-keyboard";
import LiquorIcon from "@mui/icons-material/Liquor";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import Webcam from "react-webcam";
import Order from "../Components/Order";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import SmokingRoomsIcon from "@mui/icons-material/SmokingRooms";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import start from '../../public/js/script';
export interface itemObject {
  barcode?: number;
  type?: string;
  label?: string;
  price?: number;
}
const Patron = { barcode: 11, type: "Alcohol", label: "Patron", price: 29.99 };
const Henny = { barcode: 12, type: "Alcohol", label: "Hennessy", price: 26.99 };
const Newport = { barcode: 13, type: "Cigarrettes", label: "Newports", price: 8.99 };
const Powerade =  { barcode: 14, type: "Drink", label: "Powerade", price: 1.99 };
const Deli =  { barcode: 15, type: "food", label: "Deli", price: 5.99 };



const Checkout = () => {
  const numberFormat = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  const [needToCheck, setNeedToCheck] = useState(false);
  const [beenChecked, setBeenChecked] = useState(false);
  const [loyal, setLoyal] = useState(false);
  const [total, setTotal] = useState(0);
  const [isLoyal, setisLoyal] = useState(false);
  const [loyaltyId, setLoyaltyId] = useState('');
  const [currentItem, setCurrentItem] = useState({
    barcode: 1,
    type: "none",
    label: "none",
    price: 0,
  });
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

  useEffect(() => {
    // if(currentItem.type === 'Alcohol' || currentItem.type === 'Cigarrettes') {
  
    // }
  }, [currentItem]);

  return (
    <Box>
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
          onChange={(input)=> setLoyaltyId(input)}           
          layout={{
            default: ["1 2 3", "4 5 6", "7 8 9", "{//} 0 {//}", "{bksp}"],
            shift: ["! / #", "$ % ^", "& * (", "{shift} ) +", "{bksp}"]
          }} />
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
            <Button style={{ width: "97px" }} onClick={() => {setLoyal(false); setLoyaltyId('')}}>
              Exit
            </Button>
          </ButtonGroup>
        </Dialog>
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
                additems((arr) => [...arr, Newport]);
                setCurrentItem(Newport);
              }}
            >
              Newport 100s <SmokingRoomsIcon></SmokingRoomsIcon>
            </Button>
            <Button
              style={{ fontSize: "40px" }}
              onClick={() => {
                additems((arr) => [...arr, Deli]);
                setCurrentItem(Deli);
              }}
            >
              Deli <RestaurantIcon></RestaurantIcon>
            </Button>
            <Button
              style={{ fontSize: "40px" }}
              onClick={() => {
                additems((arr) => [...arr, Powerade]);
                setCurrentItem(Powerade);
              }}
            >
              Powerade <LocalDrinkIcon></LocalDrinkIcon>
            </Button>
            <Button
              style={{ fontSize: "40px" }}
              onClick={() => {
                additems((arr) => [...arr, Patron]);
                setCurrentItem(Patron);
              }}
            >
              Patron<LiquorIcon></LiquorIcon>
            </Button>
            <Button
              style={{ fontSize: "40px" }}
              onClick={() => {
                additems((arr) => [...arr, Henny]);
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
