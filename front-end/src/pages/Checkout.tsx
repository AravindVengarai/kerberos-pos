import React, { useEffect, useState, useRef } from "react";
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
import * as faceapi from "face-api.js";
import "react-simple-keyboard/build/css/index.css";
import NCR_Logo from "../assets/NCR_Logo.svg";
import { useTimer } from "use-timer";
import "react-simple-keyboard/build/css/index.css";
import Keyboard from "react-simple-keyboard";
import LiquorIcon from "@mui/icons-material/Liquor";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import Webcam from "react-webcam";
import Order from "../Components/Order";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import SmokingRoomsIcon from "@mui/icons-material/SmokingRooms";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { getThemeProps } from "@mui/system";
import Webcam from "react-webcam";

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

let video: any;
let imageUpload: any;

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
  const [restricted, setRestricted] = useState(false);
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

  const ref = useRef<any>(null);
  const [toggle, setToggle] = useState(false);

  const getPicture = async () => {
    video = document.querySelector("#videoInput");
    // video = ref.current;
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    ctx!.canvas.width = 720;
    ctx!.canvas.height = 550;
    ctx!.drawImage(video, 0, 0, 720, 550);
    canvas.toBlob(function (blob: any) {
      imageUpload = new File([blob], "test.jpg", { type: "image/jpeg" });
    }, "image/jpeg");
    startML();
  };

  useEffect(() => {
    if (toggle) {
      getPicture();
      console.log("made it");
      setToggle(false);
    }
  }, [toggle]);

  useEffect(() => {
    video = ref.current;
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        video.srcObject = stream;
      })
      .catch(function (error) {
        console.log("Something went wrong!");
        console.log(error);
      });
  }, []);
  const { time, start, pause, reset, status } = useTimer({
    initialTime: 5,
    timerType: "DECREMENTAL",
  });
  const checkID = () => {
    if (!needToCheck) {
      if (time === 0) {
        getPicture();
        setRestricted(false);
      }
      console.log("inside alc");
      return (
        <Dialog open={time > 0}>Starting Age Verification Now: {time}</Dialog>
      );
    }
  };
  useEffect(() => {
    if (currentItem.label !== "none") {
      if (
        currentItem.type === "Alcohol" ||
        currentItem.type === "Cigarrettes"
      ) {
        setRestricted(true);
        reset();
        start();
        Promise.all([
          faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
          faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
          faceapi.nets.ssdMobilenetv1.loadFromUri("/models"), //heavier/accurate version of tiny face detector
        ]);
        checkID();
        // if (time === 0) {
        //   additems((arr) => [...arr, currentItem]);
        // }
      } else {
        additems((arr) => [...arr, currentItem]);
      }
    }
  }, [dummy]);

  return (
    <Box>
      {restricted && checkID()}
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
          <video
            id="videoInput"
            width="720"
            height="550"
            muted
            controls
            autoPlay
            loop
            ref={ref}
          ></video>
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
            onClick={() => setToggle((prev) => !prev)}
          >
            Pay Now {numberFormat(total)}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Checkout;

async function startML() {
  // const container = document.createElement("div");
  // container.setAttribute("id", "top-container");
  // container.style.position = "relative";
  // document.body.append(container);
  const labeledFaceDescriptors = await loadLabeledImages();
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
  // document.body.append("Loaded");
  let image: any;
  let canvas: any;
  if (image) image.remove();
  if (canvas) canvas.remove();
  image = await faceapi.bufferToImage(imageUpload);
  image.setAttribute("id", "bottom-image");
  image.style.width = "720px";
  image.style.height = "550px";
  // container.append(image);
  canvas = faceapi.createCanvasFromMedia(image);
  canvas.setAttribute("id", "bottom-canvas");
  // container.append(canvas);
  const displaySize = { width: image.width, height: image.height };
  faceapi.matchDimensions(canvas, displaySize);
  const detections = await faceapi
    .detectAllFaces(image)
    .withFaceLandmarks()
    .withFaceDescriptors();
  const resizedDetections = faceapi.resizeResults(detections, displaySize);
  const results = resizedDetections.map((d) =>
    faceMatcher.findBestMatch(d.descriptor)
  );
  results.forEach((result, i) => {
    const box = resizedDetections[i].detection.box;
    const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() });
    drawBox.draw(canvas);
  });

  console.log('results');
  console.log(results);
}

const loadLabeledImages = () => {
  const labels = [
    "Karan",
    "Thanasis",
    "Ankit",
    "Aravind",
    "Black Widow",
    "Captain America",
    "Captain Marvel",
    "Hawkeye",
    "Jim Rhodes",
    "Thor",
    "Tony Stark",
  ];
  return Promise.all(
    labels.map(async (label) => {
      const descriptions = [];
      for (let i = 1; i <= 2; i++) {
        const img = await faceapi.fetchImage(
          `../labeled_images/${label}/${i}.jpg`
        );
        const detections = await faceapi
          .detectSingleFace(img)
          .withFaceLandmarks()
          .withFaceDescriptor();
        if (detections?.descriptor) descriptions.push(detections.descriptor);
      }
      return new faceapi.LabeledFaceDescriptors(label, descriptions);
    })
  );
};
