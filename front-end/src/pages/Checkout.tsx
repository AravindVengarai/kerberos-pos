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
import * as faceapi from 'face-api.js'
import 'react-simple-keyboard/build/css/index.css';
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
const Newport = { barcode: 13, type: "Cigarrettes", label: "Newports", price: 8.99 };
const Powerade =  { barcode: 14, type: "Drink", label: "Powerade", price: 1.99 };
const Deli =  { barcode: 15, type: "food", label: "Deli", price: 5.99 };
 
let video: any;
let imageUpload: any;

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

  const ref = useRef<any>(null);
  const [toggle, setToggle] = useState(false);

  const getPicture = async () => {
    //let temp = document.createElement('a');
    video = document.querySelector('#videoInput')
    console.log('video');
    console.log(video);
    // video = ref.current;
    console.log(video);
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    console.log('ctx');
    console.log(ctx);
    ctx!.canvas.width = 720;
    ctx!.canvas.height = 550;
    ctx!.drawImage(video, 0, 0, 720, 550);
    canvas.toBlob(function(blob: any) {
				imageUpload = new File([blob], 'test.jpg', { type: 'image/jpeg' });
			}, 'image/jpeg');
    // temp.setAttribute('href', URL.createObjectURL(mblob));
    // temp.setAttribute('download', 'trial.jpeg');
    console.log('imageUpload in getPicture');
    console.log(imageUpload);
    Promise.all([
      faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
      faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
      faceapi.nets.ssdMobilenetv1.loadFromUri('/models') //heavier/accurate version of tiny face detector
    ]).then(start);
  }

  useEffect(() => {
  if(toggle){
    getPicture();
    console.log('made it');
    setToggle(false);
  }
  }, [toggle]);

  useEffect(() => {
    video = ref.current;
    navigator.mediaDevices.getUserMedia({ video: true }).then(
      function(stream) {
          video.srcObject = stream;
      })
      .catch(function (error) {
          console.log("Something went wrong!");
          console.log(error)
      });
  }, [])

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
          <video id="videoInput" width="720" height="550" muted controls autoPlay loop ref={ref}></video>
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
            onClick={() => setToggle(prev => !prev)}
          >
            Pay Now {numberFormat(total)}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

// function start() {
//   document.body.append('Models Loaded')
//   navigator.mediaDevices.getUserMedia({ video: true }).then(
//       function(stream) {
//           video.srcObject = stream;
//       })
//       .catch(function (error) {
//           console.log("Something went wrong!");
//           console.log(error)
//       });
//   recognizeFaces();
// }

// async function recognizeFaces() {
//     const container = document.createElement('div')
//     container.style.position = 'relative'
//     document.body.append(container)
//     const labeledDescriptors = await loadLabeledImages()
//     const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.7)
//     console.log('hello');
//     console.log('video');
//     console.log(video);
//     video.addEventListener('play', async () => {
//         console.log('Playing');
//         container.append(video);
//         let canvas: any;
//         if (faceapi.createCanvasFromMedia(video) !== null) {
//           canvas = faceapi.createCanvasFromMedia(video);
//         }
//         container.append(canvas);
//         const displaySize = { width: video.width, height: video.height}
//         faceapi.matchDimensions(canvas, displaySize);
//         setInterval(async () => {
//             const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()
//             const resizedDetections = faceapi.resizeResults(detections, displaySize);
//             canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
//             const results = resizedDetections.map((d) => {
//                 return faceMatcher.findBestMatch(d.descriptor)
//             })
//             results.forEach( (result, i) => {
//               const box = resizedDetections[i].detection.box
//               const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
//               drawBox.draw(canvas)
//             })
//         }, 100)
//     })
// }


// function loadLabeledImages() {
//     const labels = ['Ankit'] // for WebCam
//     return Promise.all(
//         labels.map(async (label)=>{
//             const descriptions = []
//             for(let i=1; i<=2; i++) {
//                 const img = await faceapi.fetchImage(`../labeled_images/${label}/${i}.jpg`)
//                 const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
//                 console.log(label + i + JSON.stringify(detections))
//                 if (detections?.descriptor) descriptions.push(detections.descriptor)
//             }
//             document.body.append(label+' Faces Loaded | ')
//             return new faceapi.LabeledFaceDescriptors(label, descriptions)
//         })
//     )
// }

export default Checkout;


async function start() {
  const container = document.createElement('div')
  container.setAttribute('id', 'top-container');
  container.style.position = 'relative'
  document.body.append(container)
  const labeledFaceDescriptors = await loadLabeledImages()
  const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)
  document.body.append('Loaded')
  let image: any;
  let canvas: any;
  if (image) image.remove()
  if (canvas) canvas.remove()
  image = await faceapi.bufferToImage(imageUpload);
  console.log('image_upload in start');
  console.log(imageUpload);
  image.setAttribute('id', 'bottom-image');
  image.style.width = '720px';
  image.style.height = '550px';
  container.append(image)
  canvas = faceapi.createCanvasFromMedia(image)
  canvas.setAttribute('id', 'bottom-canvas');
  container.append(canvas)
  const displaySize = { width: image.width, height: image.height }
  faceapi.matchDimensions(canvas, displaySize)
  const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
  const resizedDetections = faceapi.resizeResults(detections, displaySize)
  const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
  results.forEach((result, i) => {
      const box = resizedDetections[i].detection.box
      const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
      drawBox.draw(canvas)
  })
};

const loadLabeledImages = () => {
    const labels = ['Karan','Thanasis','Ankit', 'Aravind', 'Black Widow', 'Captain America', 'Captain Marvel', 'Hawkeye', 'Jim Rhodes', 'Thor', 'Tony Stark']
    return Promise.all(
      labels.map(async label => {
        const descriptions = []
        for (let i = 1; i <= 2; i++) {
            const img = await faceapi.fetchImage(`../labeled_images/${label}/${i}.jpg`);
            const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
            if (detections?.descriptor) descriptions.push(detections.descriptor)
        }
        document.body.append(label+' Faces Loaded | ');
        return new faceapi.LabeledFaceDescriptors(label, descriptions)
      })
    )
}