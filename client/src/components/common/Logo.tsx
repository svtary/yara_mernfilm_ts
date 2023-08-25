import * as React from "react";
import { Typography, useTheme } from "@mui/material";

const Logo = () => {
  const theme = useTheme();

  return (
    <Typography fontWeight="700" fontSize="1.7rem">
      YARA<span style={{ color: theme.palette.primary.main }}>FILM</span>
    </Typography>
  );
};

export default Logo;
