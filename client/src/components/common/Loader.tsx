import React from "react";
import { LinearProgress, Stack } from "@mui/material";

const Loader = () => {
  return (
    <Stack gap="30px" pt="50px">
      <LinearProgress color="secondary" />
      <LinearProgress color="success" />
      <LinearProgress color="inherit" />
    </Stack>
  );
};

export default Loader;
