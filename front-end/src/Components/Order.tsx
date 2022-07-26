import React, { useEffect, useState } from "react";
import { Paper, Grid } from "@mui/material";
const Order = (props: { items: any }) => {
  const { items } = props;
  const numberFormat = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  return (
    //mt: "700px", ml: "1400px"
    <Paper >
      {items.map((item: any) => {
        return (
          <Grid
            container
            spacing={3}
            direction="row"
            alignItems="center"
            style={{ justifyContent: "space-evenly" }}
          >
            <Grid alignItems="center" item>
              {item.label}
            </Grid>
            <Grid alignItems="center" item>
              {item.type}
            </Grid>
            <Grid alignItems="center" item>
              {numberFormat(item.price)}
            </Grid>
          </Grid>
        );
      })}
    </Paper>
  );
};

export default Order;
