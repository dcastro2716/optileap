import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";

// @material-ui/icons
import MailOutline from "@material-ui/icons/MailOutline";
import Check from "@material-ui/icons/Check";
import Clear from "@material-ui/icons/Clear";
import Contacts from "@material-ui/icons/Contacts";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardText from "components/Card/CardText.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/nextjs-material-dashboard-pro/views/regularFormsStyle";
import Datetime from "react-datetime";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {Box} from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import {dangerColor} from "../../assets/jss/nextjs-material-dashboard-pro";
import {useSnackbar} from "notistack";
import {useRouter} from 'next/router';

function RegularForms() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [checked, setChecked] = React.useState([24, 22]);
  const [simpleSelect, setSimpleSelect] = React.useState("");
  const [selectedEnabled, setSelectedEnabled] = React.useState("b");
  const [selectedValue, setSelectedValue] = React.useState(null);

  const [registerNameState, setRegisterNameState] = React.useState("");
  const [registerName, setRegisterName] = React.useState("");
  const [registerLastNameState, setRegisterLastNameState] = React.useState("");
  const [registerLastName, setRegisterLastName] = React.useState("");
  const [registerEmailState, setRegisterEmailState] = React.useState("");
  const [registerEmail, setRegisterEmail] = React.useState("");
  const [registerWeightState, setRegisterWeightState] = React.useState("");
  const [registerWeight, setRegisterWeight] = React.useState("");
  const [registerHeightState, setRegisterHeightState] = React.useState("");
  const [registerHeight, setRegisterHeight] = React.useState("");
  const [registerAffiliationState, setRegisterAffiliationState] = React.useState("");
  const [registerAffiliation, setRegisterAffiliation] = React.useState("");
  const [registerBirth, setRegisterBirth] = React.useState("");

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    let error = false;
    if (registerName === '') {
      setRegisterNameState('error');
      error = true;
    }
    if (registerLastName === '') {
      setRegisterLastNameState('error');
      error = true;
    }
    if (registerEmail !== "" && !verifyEmail(registerEmail)) {
      setRegisterEmailState('error');
      error = true;
    }
    if (registerWeight === '') {
      setRegisterWeightState('error');
      error = true;
    }
    if (registerHeight === '') {
      setRegisterHeightState('error');
      error = true;
    }
    if (registerAffiliation === '') {
      setRegisterAffiliationState('error');
      error = true;
    }
    if (simpleSelect === '') {
      enqueueSnackbar('Elegir Sexo', { variant: 'error' });
      error = true;
    }
    if (!registerBirth._isAMomentObject) {
      enqueueSnackbar('Elegir Nacimiento válido', { variant: 'error' });
      error = true;
    }

    if (error) return;

    const user = {
      names: registerName,
      lastNames: registerLastName,
      email: registerEmail,
      weight: registerWeight,
      height: registerHeight,
      affiliation: registerAffiliation,
      birth: registerBirth.format('DD/MM/YYYY'),
      sex: simpleSelect,
    }

    const response = await fetch('/api/create-user', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify(user),
    });
    const json = await response.json();
    if (response.status !== 200) {
      enqueueSnackbar(json.msg, { variant: 'error' });
    } else {
      enqueueSnackbar('Usuario agregado exitósamente', { variant: 'success' });
      await router.push('/user/list');
    }
  }

  const handleBirth = (event) => {
    setRegisterBirth(event);
  };

  const verifyEmail = (value) => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRex.test(value);
  };

  const verifyNumber = (value) => {
    var numberRex = new RegExp("^[0-9]+$");
    return numberRex.test(value);
  };

  const handleSimple = (event) => {
    setSimpleSelect(event.target.value);
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleChangeEnabled = (event) => {
    setSelectedEnabled(event.target.value);
  };
  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  return (
    <GridContainer>
      {/*
      <GridItem xs={12} sm={12} md={6}>
        <Card>
          <CardHeader color="rose" icon>
            <CardIcon color="rose">
              <MailOutline />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Stacked Form</h4>
          </CardHeader>
          <CardBody>
            <form>
              <CustomInput
                labelText="Email adress"
                id="email_adress"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "email",
                }}
              />
              <CustomInput
                labelText="Password"
                id="password"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "password",
                  autoComplete: "off",
                }}
              />
              <div className={classes.checkboxAndRadio}>
                <FormControlLabel
                  control={
                    <Checkbox
                      tabIndex={-1}
                      onClick={() => handleToggle(2)}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked,
                        root: classes.checkRoot,
                      }}
                    />
                  }
                  classes={{
                    label: classes.label,
                    root: classes.labelRoot,
                  }}
                  label="Subscribe to newsletter"
                />
              </div>
              <Button color="rose">Submit</Button>
            </form>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={6}>
        <Card>
          <CardHeader color="rose" icon>
            <CardIcon color="rose">
              <Contacts />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Horizontal Form</h4>
          </CardHeader>
          <CardBody>
            <form>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    Email
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={12} md={9}>
                  <CustomInput
                    id="email_adress2"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "email",
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <FormLabel className={classes.labelHorizontal}>
                    Password
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={12} md={9}>
                  <CustomInput
                    id="password2"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "password",
                      autoComplete: "off",
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer justify="flex-end">
                <GridItem xs={12} sm={12} md={9}>
                  <div className={classes.checkboxAndRadio}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          tabIndex={-1}
                          onClick={() => handleToggle(1)}
                          checkedIcon={
                            <Check className={classes.checkedIcon} />
                          }
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{
                            checked: classes.checked,
                            root: classes.checkRoot,
                          }}
                        />
                      }
                      classes={{
                        label: classes.label,
                        root: classes.labelRoot,
                      }}
                      label="Remember me"
                    />
                  </div>
                </GridItem>
              </GridContainer>
              <GridContainer justify="flex-end">
                <GridItem xs={12} sm={12} md={9}>
                  <Button color="rose">Submit</Button>
                </GridItem>
              </GridContainer>
            </form>
          </CardBody>
        </Card>
      </GridItem>
      */}
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="rose" text>
            <CardText color="rose">
              <h4 className={classes.cardTitle}>Nuevo Usuario</h4>
            </CardText>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit}>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Nombres
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={10}>
                  <CustomInput
                    success={registerNameState === "success"}
                    error={registerNameState === "error"}
                    id="nombres"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      endAdornment:
                        registerNameState === "error" ? (
                          <InputAdornment position="end">
                            <Close className={classes.danger} />
                          </InputAdornment>
                        ) : undefined,
                      onChange: (event) => {
                        if (event.target.value.length > 100) {
                          setRegisterNameState("error");
                        } else {
                          setRegisterNameState("success");
                        }
                        setRegisterName(event.target.value);
                      },
                      type: "text",
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Apellidos
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={10}>
                  <CustomInput
                    success={registerLastNameState === "success"}
                    error={registerLastNameState === "error"}
                    id="apellidos"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      endAdornment:
                        registerLastNameState === "error" ? (
                          <InputAdornment position="end">
                            <Close className={classes.danger} />
                          </InputAdornment>
                        ) : undefined,
                      onChange: (event) => {
                        if (event.target.value.length > 100) {
                          setRegisterLastNameState("error");
                        } else {
                          setRegisterLastNameState("success");
                        }
                        setRegisterLastName(event.target.value);
                      },
                      type: "text",
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Email
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={10}>
                  <CustomInput
                    success={registerEmailState === "success"}
                    error={registerEmailState === "error"}
                    id="email"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      endAdornment:
                        registerEmailState === "error" ? (
                          <InputAdornment position="end">
                            <Close className={classes.danger} />
                          </InputAdornment>
                        ) : undefined,
                      onChange: (event) => {
                        if (event.target.value.length === 0 || verifyEmail(event.target.value)) {
                          setRegisterEmailState("success");
                        } else {
                          setRegisterEmailState("error");
                        }
                        setRegisterEmail(event.target.value);
                      },
                      type: "text",
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Peso (en Kg.)
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={10}>
                  <CustomInput
                    success={registerWeightState === "success"}
                    error={registerWeightState === "error"}
                    id="peso"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      endAdornment:
                        registerWeightState === "error" ? (
                          <InputAdornment position="end">
                            <Close className={classes.danger} />
                          </InputAdornment>
                        ) : undefined,
                      onChange: (event) => {
                        if (verifyNumber(event.target.value)) {
                          setRegisterWeightState("success");
                        } else {
                          setRegisterWeightState("error");
                        }
                        setRegisterWeight(event.target.value);
                      },
                      onKeyDown: (e) => {
                        let checkIfNum;
                        if (e.key !== undefined) {
                          checkIfNum = e.key === "e" || e.key === "." || e.key === "+" || e.key === "-" ;
                        }
                        else if (e.keyCode !== undefined) {
                          checkIfNum = e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 187 || e.keyCode === 189;
                        }
                        return checkIfNum && e.preventDefault();
                      },
                      type: "number",
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Altura (en cm.)
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={10}>
                  <CustomInput
                    success={registerHeightState === "success"}
                    error={registerHeightState === "error"}
                    id="altura"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      endAdornment:
                        registerHeightState === "error" ? (
                          <InputAdornment position="end">
                            <Close className={classes.danger} />
                          </InputAdornment>
                        ) : undefined,
                      onChange: (event) => {
                        if (verifyNumber(event.target.value)) {
                          setRegisterHeightState("success");
                        } else {
                          setRegisterHeightState("error");
                        }
                        setRegisterHeight(event.target.value);
                      },
                      onKeyDown: (e) => {
                        let checkIfNum;
                        if (e.key !== undefined) {
                          checkIfNum = e.key === "e" || e.key === "." || e.key === "+" || e.key === "-" ;
                        }
                        else if (e.keyCode !== undefined) {
                          checkIfNum = e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 187 || e.keyCode === 189;
                        }
                        return checkIfNum && e.preventDefault();
                      },
                      type: "text",
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Afiliación
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={10}>
                  <CustomInput
                    success={registerAffiliationState === "success"}
                    error={registerAffiliationState === "error"}
                    id="afiliacion"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      endAdornment:
                        registerAffiliationState === "error" ? (
                          <InputAdornment position="end">
                            <Close className={classes.danger} />
                          </InputAdornment>
                        ) : undefined,
                      onChange: (event) => {
                        if (event.target.value.length > 100) {
                          setRegisterAffiliationState("error");
                        } else {
                          setRegisterAffiliationState("success");
                        }
                        setRegisterAffiliation(event.target.value);
                      },
                      type: "text",
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Nacimiento
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={10}>
                  <FormControl fullWidth className={classes.formControl}>
                    <Datetime
                      value={registerBirth}
                      onChange={handleBirth}
                      dateFormat="DD/MM/yyyy"
                      timeFormat={false}
                    />
                  </FormControl>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Sexo
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={10}>
                  <FormControl
                    fullWidth
                    className={classes.formControl}
                  >
                    <Select
                      MenuProps={{
                        className: classes.selectMenu,
                      }}
                      classes={{
                        select: classes.select,
                      }}
                      value={simpleSelect}
                      onChange={handleSimple}
                      inputProps={{
                        name: "simpleSelect",
                        id: "simple-select",
                      }}
                    >
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected,
                        }}
                        value="M"
                      >
                        Masculino
                      </MenuItem>
                      <MenuItem
                        classes={{
                          root: classes.selectMenuItem,
                          selected: classes.selectMenuItemSelected,
                        }}
                        value="2"
                      >
                        Femenino
                      </MenuItem>
                    </Select>
                  </FormControl>
                </GridItem>
              </GridContainer>
              {/*
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Password
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={10}>
                  <CustomInput
                    id="pass"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      type: "password",
                      autoComplete: "off",
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Placeholder
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={10}>
                  <CustomInput
                    id="placeholder"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      placeholder: "placeholder",
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Disabled
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={10}>
                  <CustomInput
                    id="disabled"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      placeholder: "Disabled",
                      disabled: true,
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Static control
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={10}>
                  <div className={classes.staticFormGroup}>
                    <p className={classes.staticFormControl}>
                      hello@creative-tim.com
                    </p>
                  </div>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel
                    className={
                      classes.labelHorizontal +
                      " " +
                      classes.labelHorizontalRadioCheckbox
                    }
                  >
                    Checkboxes and radios
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={10}>
                  <div
                    className={
                      classes.checkboxAndRadio +
                      " " +
                      classes.checkboxAndRadioHorizontal
                    }
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          tabIndex={-1}
                          onClick={() => handleToggle(3)}
                          checkedIcon={
                            <Check className={classes.checkedIcon} />
                          }
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{
                            checked: classes.checked,
                            root: classes.checkRoot,
                          }}
                        />
                      }
                      classes={{
                        label: classes.label,
                        root: classes.labelRoot,
                      }}
                      label="First Checkbox"
                    />
                  </div>
                  <div
                    className={
                      classes.checkboxAndRadio +
                      " " +
                      classes.checkboxAndRadioHorizontal
                    }
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          tabIndex={-1}
                          onClick={() => handleToggle(4)}
                          checkedIcon={
                            <Check className={classes.checkedIcon} />
                          }
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{
                            checked: classes.checked,
                            root: classes.checkRoot,
                          }}
                        />
                      }
                      classes={{
                        label: classes.label,
                        root: classes.labelRoot,
                      }}
                      label="Second Checkbox"
                    />
                  </div>
                  <div
                    className={
                      classes.checkboxAndRadio +
                      " " +
                      classes.checkboxAndRadioHorizontal
                    }
                  >
                    <FormControlLabel
                      control={
                        <Radio
                          checked={selectedValue === "a"}
                          onChange={handleChange}
                          value="a"
                          name="radio button demo"
                          aria-label="A"
                          icon={
                            <FiberManualRecord
                              className={classes.radioUnchecked}
                            />
                          }
                          checkedIcon={
                            <FiberManualRecord
                              className={classes.radioChecked}
                            />
                          }
                          classes={{
                            checked: classes.radio,
                            root: classes.radioRoot,
                          }}
                        />
                      }
                      classes={{
                        label: classes.label,
                        root: classes.labelRoot,
                      }}
                      label="First Radio"
                    />
                  </div>
                  <div
                    className={
                      classes.checkboxAndRadio +
                      " " +
                      classes.checkboxAndRadioHorizontal
                    }
                  >
                    <FormControlLabel
                      control={
                        <Radio
                          checked={selectedValue === "b"}
                          onChange={handleChange}
                          value="b"
                          name="radio button demo"
                          aria-label="B"
                          icon={
                            <FiberManualRecord
                              className={classes.radioUnchecked}
                            />
                          }
                          checkedIcon={
                            <FiberManualRecord
                              className={classes.radioChecked}
                            />
                          }
                          classes={{
                            checked: classes.radio,
                            root: classes.radioRoot,
                          }}
                        />
                      }
                      classes={{
                        label: classes.label,
                        root: classes.labelRoot,
                      }}
                      label="Second Radio"
                    />
                  </div>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel
                    className={
                      classes.labelHorizontal +
                      " " +
                      classes.labelHorizontalRadioCheckbox
                    }
                  >
                    Inline checkboxes
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={10}>
                  <div className={classes.inlineChecks}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          tabIndex={-1}
                          onClick={() => handleToggle(10)}
                          checkedIcon={
                            <Check className={classes.checkedIcon} />
                          }
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{
                            checked: classes.checked,
                            root: classes.checkRoot,
                          }}
                        />
                      }
                      classes={{
                        label: classes.label,
                        root: classes.labelRoot,
                      }}
                      label="a"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          tabIndex={-1}
                          onClick={() => handleToggle(11)}
                          checkedIcon={
                            <Check className={classes.checkedIcon} />
                          }
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{
                            checked: classes.checked,
                            root: classes.checkRoot,
                          }}
                        />
                      }
                      classes={{
                        label: classes.label,
                        root: classes.labelRoot,
                      }}
                      label="b"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          tabIndex={-1}
                          onClick={() => handleToggle(12)}
                          checkedIcon={
                            <Check className={classes.checkedIcon} />
                          }
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{
                            checked: classes.checked,
                            root: classes.checkRoot,
                          }}
                        />
                      }
                      classes={{
                        label: classes.label,
                        root: classes.labelRoot,
                      }}
                      label="c"
                    />
                  </div>
                </GridItem>
              </GridContainer>
              */}
              <div className={classes.buttonCreate}>
                <Button color="rose" type="submit">Crear Usuario</Button>
              </div>

            </form>
          </CardBody>
        </Card>
      </GridItem>
      {/*
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary" text>
            <CardText color="primary">
              <h4 className={classes.cardTitle}>Input Variants</h4>
            </CardText>
          </CardHeader>
          <CardBody>
            <form>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel
                    className={
                      classes.labelHorizontal +
                      " " +
                      classes.labelHorizontalRadioCheckbox
                    }
                  >
                    Custom Checkboxes & Radios
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <div
                    className={
                      classes.checkboxAndRadio +
                      " " +
                      classes.checkboxAndRadioHorizontal
                    }
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          tabIndex={-1}
                          onClick={() => handleToggle(21)}
                          checkedIcon={
                            <Check className={classes.checkedIcon} />
                          }
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{
                            checked: classes.checked,
                            root: classes.checkRoot,
                          }}
                        />
                      }
                      classes={{
                        label: classes.label,
                        root: classes.labelRoot,
                      }}
                      label="Unchecked"
                    />
                  </div>
                  <div
                    className={
                      classes.checkboxAndRadio +
                      " " +
                      classes.checkboxAndRadioHorizontal
                    }
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          tabIndex={-1}
                          onClick={() => handleToggle(22)}
                          checked={checked.indexOf(22) !== -1 ? true : false}
                          checkedIcon={
                            <Check className={classes.checkedIcon} />
                          }
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{
                            checked: classes.checked,
                            root: classes.checkRoot,
                          }}
                        />
                      }
                      classes={{
                        label: classes.label,
                        root: classes.labelRoot,
                      }}
                      label="Checked"
                    />
                  </div>
                  <div
                    className={
                      classes.checkboxAndRadio +
                      " " +
                      classes.checkboxAndRadioHorizontal
                    }
                  >
                    <FormControlLabel
                      disabled
                      control={
                        <Checkbox
                          tabIndex={-1}
                          checkedIcon={
                            <Check className={classes.checkedIcon} />
                          }
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{
                            checked: classes.checked,
                            root: classes.checkRoot,
                          }}
                        />
                      }
                      classes={{
                        label: classes.label,
                        disabled: classes.disabledCheckboxAndRadio,
                        root: classes.labelRoot,
                      }}
                      label="Disabled Unchecked"
                    />
                  </div>
                  <div
                    className={
                      classes.checkboxAndRadio +
                      " " +
                      classes.checkboxAndRadioHorizontal
                    }
                  >
                    <FormControlLabel
                      disabled
                      control={
                        <Checkbox
                          tabIndex={-1}
                          checked={checked.indexOf(24) !== -1 ? true : false}
                          checkedIcon={
                            <Check className={classes.checkedIcon} />
                          }
                          icon={<Check className={classes.uncheckedIcon} />}
                          classes={{
                            checked: classes.checked,
                            root: classes.checkRoot,
                          }}
                        />
                      }
                      classes={{
                        label: classes.label,
                        disabled: classes.disabledCheckboxAndRadio,
                        root: classes.labelRoot,
                      }}
                      label="Disabled Checked"
                    />
                  </div>
                </GridItem>
                <GridItem xs={12} sm={4}>
                  <div
                    className={
                      classes.checkboxAndRadio +
                      " " +
                      classes.checkboxAndRadioHorizontal
                    }
                  >
                    <FormControlLabel
                      control={
                        <Radio
                          checked={selectedEnabled === "a"}
                          onChange={handleChangeEnabled}
                          value="a"
                          name="radio button enabled"
                          aria-label="A"
                          icon={
                            <FiberManualRecord
                              className={classes.radioUnchecked}
                            />
                          }
                          checkedIcon={
                            <FiberManualRecord
                              className={classes.radioChecked}
                            />
                          }
                          classes={{
                            checked: classes.radio,
                            root: classes.radioRoot,
                          }}
                        />
                      }
                      classes={{
                        label: classes.label,
                        root: classes.labelRoot,
                      }}
                      label="First Radio"
                    />
                  </div>
                  <div
                    className={
                      classes.checkboxAndRadio +
                      " " +
                      classes.checkboxAndRadioHorizontal
                    }
                  >
                    <FormControlLabel
                      control={
                        <Radio
                          checked={selectedEnabled === "b"}
                          onChange={handleChangeEnabled}
                          value="b"
                          name="radio button enabled"
                          aria-label="B"
                          icon={
                            <FiberManualRecord
                              className={classes.radioUnchecked}
                            />
                          }
                          checkedIcon={
                            <FiberManualRecord
                              className={classes.radioChecked}
                            />
                          }
                          classes={{
                            checked: classes.radio,
                            root: classes.radioRoot,
                          }}
                        />
                      }
                      classes={{
                        label: classes.label,
                        root: classes.labelRoot,
                      }}
                      label="Second Radio"
                    />
                  </div>
                  <div
                    className={
                      classes.checkboxAndRadio +
                      " " +
                      classes.checkboxAndRadioHorizontal
                    }
                  >
                    <FormControlLabel
                      disabled
                      control={
                        <Radio
                          checked={false}
                          value="a"
                          name="radio button disabled"
                          aria-label="B"
                          icon={
                            <FiberManualRecord
                              className={classes.radioUnchecked}
                            />
                          }
                          checkedIcon={
                            <FiberManualRecord
                              className={classes.radioChecked}
                            />
                          }
                          classes={{
                            checked: classes.radio,
                            disabled: classes.disabledCheckboxAndRadio,
                            root: classes.radioRoot,
                          }}
                        />
                      }
                      classes={{
                        label: classes.label,
                        root: classes.labelRoot,
                      }}
                      label="Second Radio"
                    />
                  </div>
                  <div
                    className={
                      classes.checkboxAndRadio +
                      " " +
                      classes.checkboxAndRadioHorizontal
                    }
                  >
                    <FormControlLabel
                      disabled
                      control={
                        <Radio
                          checked={true}
                          value="b"
                          name="radio button disabled"
                          aria-label="B"
                          icon={
                            <FiberManualRecord
                              className={classes.radioUnchecked}
                            />
                          }
                          checkedIcon={
                            <FiberManualRecord
                              className={classes.radioChecked}
                            />
                          }
                          classes={{
                            checked: classes.radio,
                            disabled: classes.disabledCheckboxAndRadio,
                            root: classes.radioRoot,
                          }}
                        />
                      }
                      classes={{
                        label: classes.label,
                        root: classes.labelRoot,
                      }}
                      label="Second Radio"
                    />
                  </div>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Input with success
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={10}>
                  <CustomInput
                    id="success"
                    labelText="Success"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          className={classes.inputAdornment}
                        >
                          <Check
                            className={classes.inputAdornmentIconSuccess}
                          />
                        </InputAdornment>
                      ),
                    }}
                    success
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Input with error
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={10}>
                  <CustomInput
                    id="error"
                    labelText="Error"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          className={classes.inputAdornment}
                        >
                          <Clear className={classes.inputAdornmentIconError} />
                        </InputAdornment>
                      ),
                    }}
                    error
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={2}>
                  <FormLabel className={classes.labelHorizontal}>
                    Column sizing
                  </FormLabel>
                </GridItem>
                <GridItem xs={12} sm={10}>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={3}>
                      <CustomInput
                        id="md3"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          placeholder: "md={3}",
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <CustomInput
                        id="md4"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          placeholder: "md={4}",
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={5}>
                      <CustomInput
                        id="md5"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          placeholder: "md={5}",
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </form>
          </CardBody>
        </Card>
      </GridItem>
      */}
    </GridContainer>
  );
}

RegularForms.layout = Admin;

export default RegularForms;
