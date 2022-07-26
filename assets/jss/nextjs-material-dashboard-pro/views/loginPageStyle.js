import {
  container,
  cardTitle,
  whiteColor,
  grayColor, hexToRgb, blackColor,
} from "assets/jss/nextjs-material-dashboard-pro.js";
import customCheckboxRadioSwitch from "../customCheckboxRadioSwitch";

const loginPageStyle = (theme) => ({
  ...customCheckboxRadioSwitch,
  container: {
    ...container,
    zIndex: "4",
    [theme.breakpoints.down("sm")]: {
      paddingBottom: "100px",
    },
  },
  cardTitle: {
    ...cardTitle,
    color: whiteColor,
  },
  textCenter: {
    textAlign: "center",
  },
  justifyContentCenter: {
    justifyContent: "center !important",
  },
  customButtonClass: {
    "&,&:focus,&:hover": {
      color: whiteColor,
    },
    marginLeft: "5px",
    marginRight: "5px",
  },
  inputAdornment: {
    marginRight: "18px",
  },
  inputAdornmentIcon: {
    color: grayColor[6],
  },
  cardHidden: {
    opacity: "0",
    transform: "translate3d(0, -60px, 0)",
  },
  cardHeader: {
    marginBottom: "20px",
  },
  socialLine: {
    padding: "0.9375rem 0",
  },
  checkboxLabelControl: {
    margin: "0",
  },
  checkboxLabel: {
    fontSize: "0.875rem",
    marginLeft: "6px",
    color: "rgba(" + hexToRgb(blackColor) + ", 0.26)",
  },
});

export default loginPageStyle;
