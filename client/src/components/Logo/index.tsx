import React from "react";
import { Stack, Typography } from "@mui/material";
import logoImage from "../../assets/NotatoLogo.png";

const Logo = () => {
  return (
    <Stack direction="row" alignItems="center" gap="10px">
      <img
        src={logoImage}
        style={{
          width: "60px",
        }}
        alt=""
      />
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: "38px",
          fontStyle: "italic",
        }}
      >
        notato
      </Typography>
    </Stack>
  );
};

export default Logo;
