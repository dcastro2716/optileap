import buttonGroupStyle from "assets/jss/nextjs-material-dashboard-pro/buttonGroupStyle.js";
import customCheckboxRadioSwitch from "assets/jss/nextjs-material-dashboard-pro/customCheckboxRadioSwitch.js";
import {
  blackColor,
  cardTitle, dangerColor,
  grayColor, hexToRgb,
} from "assets/jss/nextjs-material-dashboard-pro.js";
import modalStyle from "../modalStyle";

const extendedTablesStyle = {
  ...customCheckboxRadioSwitch,
  ...buttonGroupStyle,
  right: {
    textAlign: "right",
  },
  center: {
    textAlign: "center",
  },
  description: {
    maxWidth: "150px !important",
  },
  actionButton: {
    margin: "0 0 0 5px !important",
    padding: "5px !important",
    "& svg,& .fab,& .fas,& .far,& .fal,& .material-icons": {
      marginRight: "0px !important",
    },
  },
  icon: {
    verticalAlign: "middle !important",
    width: "17px !important",
    height: "17px !important",
    top: "-1px !important",
    position: "relative !important",
  },
  imgContainer: {
    width: "120px !important",
    maxHeight: "160px !important",
    overflow: "hidden !important",
    display: "block !important",
  },
  img: {
    width: "100% !important",
    height: "auto !important",
    verticalAlign: "middle !important",
    border: "0 !important",
  },
  tdName: {
    minWidth: "200px !important",
    fontWeight: "400 !important",
    fontSize: "1.5em !important",
  },
  tdNameAnchor: {
    color: grayColor[2] + " !important",
  },
  tdNameSmall: {
    color: grayColor[0] + " !important",
    fontSize: "0.75em !important",
    fontWeight: "300 !important",
  },
  tdNumber: {
    textAlign: "right !important",
    minWidth: "145px !important",
    fontWeight: "300 !important",
    fontSize: "1.3em !important",
  },
  tdNumberSmall: {
    marginRight: "3px !important",
  },
  tdNumberAndButtonGroup: {
    lineHeight: "1 !important",
  },
  positionAbsolute: {
    position: "absolute !important",
    right: "0 !important",
    top: "0 !important",
  },
  customFont: {
    fontSize: "16px !important",
  },
  actionButtonRound: {
    width: "auto !important",
    height: "auto !important",
    minWidth: "auto !important",
  },
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px !important",
    marginBottom: "0px !important",
  },
  instructionNoticeModal: {
    marginBottom: "25px",
  },
  imageNoticeModal: {
    maxWidth: "150px",
  },
  modalClose: {
    width: "16px",
    height: "16px",
  },
  modalBody: {
    paddingTop: "24px",
    paddingRight: "24px",
    paddingBottom: "16px",
    paddingLeft: "24px",
    position: "relative",
    overflow: "visible",
  },
  modalHeader: {
    borderBottom: "none",
    paddingTop: "24px",
    paddingRight: "24px",
    paddingBottom: "0",
    paddingLeft: "24px",
    minHeight: "16.43px",
  },
  modalTitle: {
    margin: "0",
    lineHeight: "1.42857143",
  },
  modalRoot: {
    overflow: "auto",
    alignItems: "unset",
    justifyContent: "unset",
  },
  modal: {
    maxWidth: "500px",
    margin: "auto",
    borderRadius: "6px",
    marginTop: "100px !important",
    overflow: "visible",
    maxHeight: "unset",
    position: "relative",
    height: "fit-content",
  },
  modalCloseButton: {
    color: grayColor[0],
    marginTop: "-12px",
    WebkitAppearance: "none",
    padding: "0",
    cursor: "pointer",
    background: "0 0",
    border: "0",
    fontSize: "inherit",
    opacity: ".9",
    textShadow: "none",
    fontWeight: "700",
    lineHeight: "1",
    float: "right",
  },
  labelRoot: {
    marginLeft: "-14px",
  },
  label: {
    cursor: "pointer",
    paddingLeft: "0",
    color: grayColor[3],
    fontSize: "14px",
    lineHeight: "1.428571429",
    fontWeight: "400",
    display: "inline-flex",
    transition: "0.3s ease all",
    letterSpacing: "unset",
  },
  labelHorizontal: {
    color: "rgba(" + hexToRgb(blackColor) + ", 0.26)",
    cursor: "pointer",
    display: "inline-flex",
    fontSize: "14px",
    lineHeight: "1.428571429",
    fontWeight: "400",
    paddingTop: "39px",
    marginRight: "0",
    "@media (min-width: 992px)": {
      float: "right",
    },
  },
  labelHorizontalRadioCheckbox: {
    paddingTop: "22px",
  },
  labelLeftHorizontal: {
    color: "rgba(" + hexToRgb(blackColor) + ", 0.26)",
    cursor: "pointer",
    display: "inline-flex",
    fontSize: "14px",
    lineHeight: "1.428571429",
    fontWeight: "400",
    paddingTop: "22px",
    marginRight: "0",
  },
  labelError: {
    color: dangerColor[0],
  },
};

export default extendedTablesStyle;
