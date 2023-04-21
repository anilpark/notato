import React from "react";
import { Stack, Typography } from "@mui/material";

const FoldersList = () => {
  return (
    <Stack
      sx={{
        width: "200px",
        maxHeight: "calc(100vh - 64px)",
        overflowY: "scroll",
        padding: "10px",
      }}
    >
      <Typography>Folders</Typography>
    </Stack>
  );
};

export default FoldersList;
