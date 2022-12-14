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
    <Paper style={{overflow: 'auto', maxHeight: '180px'}}>
      {items.length > 0 ? (
        items.map((item: any) => {
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
                {item.price > 0 ? numberFormat(item.price) : "Price"}
              </Grid>
            </Grid>
          );
        })
      ) : (
        <></>
      )}
    </Paper>
  );
};

export default Order;
