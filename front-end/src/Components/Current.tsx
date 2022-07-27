import React, { useEffect, useState } from "react";
import { Paper, Grid, Typography } from "@mui/material";
const Current = (props: { item: {} }) => {
  return (
    <Paper>
      <Typography>{props.item.toString()}</Typography>
    </Paper>
  );
};

export default Current;
