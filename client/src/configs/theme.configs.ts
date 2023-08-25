import { createTheme } from "@mui/material/styles";
import { colors } from "@mui/material";
import { IThemeModes } from "../types/interfaces";
import { IMode } from "../types/interfaces";

export const themeModes: IThemeModes = {
  dark: "dark",
  light: "light",
};

const themeConfigs = {
  custom: ({ mode }: IMode) => {
    const customPalette =
      mode === themeModes.dark
        ? {
            primary: {
              main: "#f25207",
              contrastText: "#ffffff",
            },
            secondary: {
              main: "#f44336",
              contrastText: "#ffffff",
            },
            background: {
              default: "#000000",
              paper: "#131313",
            },
          }
        : {
            primary: {
              main: "#f25207",
            },
            secondary: {
              main: "#f44336",
            },
            background: {
              default: colors.grey["100"],
            },
          };

    return createTheme({
      palette: {
        mode,
        ...customPalette,
      },
      components: {
        MuiButton: {
          defaultProps: { disableElevation: true },
        },
      },
    });
  },
};

export default themeConfigs;
