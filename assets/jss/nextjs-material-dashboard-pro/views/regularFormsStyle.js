import {
  cardTitle,
  successColor,
  dangerColor, grayColor,
} from "assets/jss/nextjs-material-dashboard-pro.js";
import customCheckboxRadioSwitch from "assets/jss/nextjs-material-dashboard-pro/customCheckboxRadioSwitch.js";

const regularFormsStyle = {
  ...customCheckboxRadioSwitch,
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px",
  },
  staticFormGroup: {
    marginLeft: "0",
    marginRight: "0",
    paddingBottom: "10px",
    margin: "8px 0 0 0",
    position: "relative",
    "&:before,&:after": {
      display: "table",
      content: '" "',
    },
    "&:after": {
      clear: "both",
    },
  },
  staticFormControl: {
    marginBottom: "0",
    paddingTop: "8px",
    paddingBottom: "8px",
    minHeight: "34px",
  },
  inputAdornment: {
    marginRight: "8px",
    position: "relative",
  },
  inputAdornmentIconSuccess: {
    color: successColor[0] + "!important",
  },
  inputAdornmentIconError: {
    color: dangerColor[0] + "!important",
  },
  formControl: {
    margin: "0 0 17px 0",
    paddingTop: "27px",
    position: "relative",
    verticalAlign: "unset",
    "& svg,& .fab,& .far,& .fal,& .fas,& .material-icons": {
      color: grayColor[14],
    },
  },
  buttonCreate: {
    marginTop: "20px",
  },
  danger: {
    color: dangerColor[0] + "!important",
  },
};

export default regularFormsStyle;
