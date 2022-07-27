import React, { useEffect, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Link,
  Paper,
  List,
  Stack,
  Typography,
  Grid,
} from "@mui/material";
const Start = () => {
  const navigator = useNavigate();
  // Start page
  return (
    <Box>
      <Box className="App-header">
        <Button sx={{ typography: "h1" }} onClick={() => navigator("checkout")}>
          Start Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default Start;
