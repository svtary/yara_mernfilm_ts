import { IUIConfigs } from "../types/interfaces";
import { IStyle } from "../types/interfaces";
import { ISize } from "../types/interfaces";
import { ITypoLines } from "../types/interfaces";
import { IBackgroundImage } from "../types/interfaces";
import { IMaincontent } from "../types/interfaces";

const uiConfigs: IUIConfigs = {
  style: {
    gradientBgImage: {
      dark: {
        backgroundImage:
          "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))",
      },
      light: {
        backgroundImage:
          "linear-gradient(to top, rgba(245,245,245,1), rgba(0,0,0,0))",
      },
    },
    horizontalGradientBgImage: {
      dark: {
        backgroundImage:
          "linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,0))",
      },
      light: {
        backgroundImage:
          "linear-gradient(to right, rgba(245,245,245,1), rgba(0,0,0,0))",
      },
    },
    typoLines: (lines: number, textAlign: string): ITypoLines => ({
      textAlign: textAlign || "justify",
      display: "-webkit-box",
      overflow: "hidden",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: lines,
    }),
    mainContent: {
      maxWidth: "1366px",
      margin: "auto",
      padding: 2,
    } as IMaincontent,
    backgroundImage: (imgPath: string): IBackgroundImage => ({
      position: "relative",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: "darkgrey",
      backgroundImage: `url(${imgPath})`,
    }),
  } as IStyle,
  size: {
    sidebarWith: "300px",
    contentMaxWidth: "1366px",
  } as ISize,
};

export default uiConfigs;
