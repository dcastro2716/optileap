import React from "react";

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Timeline from "@material-ui/icons/Timeline";
import Code from "@material-ui/icons/Code";
import Group from "@material-ui/icons/Group";
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import Contacts from "@material-ui/icons/Contacts";
// import LockOutline from "@material-ui/icons/LockOutline";
import Check from "@material-ui/icons/Check";

// layout for this page
import Auth from "layouts/Auth.js";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import InfoArea from "components/InfoArea/InfoArea.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

import styles from "assets/jss/nextjs-material-dashboard-pro/views/registerPageStyle";
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "../../components/Snackbar/Snackbar";
import SnackbarContent from "../../components/Snackbar/SnackbarContent";
import { useSnackbar } from 'notistack';
import {useRouter} from 'next/router';
import Close from "@material-ui/icons/Close";

function RegisterPage() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [registerNameState, setRegisterNameState] = React.useState("");
  const [registerName, setRegisterName] = React.useState("");
  const [registerLastNameState, setRegisterLastNameState] = React.useState("");
  const [registerLastName, setRegisterLastName] = React.useState("");
  const [registerEmailState, setRegisterEmailState] = React.useState("");
  const [registerEmail, setRegisterEmail] = React.useState("");
  const [registerPasswordState, setRegisterPasswordState] = React.useState("");
  const [registerPassword, setRegisterPassword] = React.useState("");

  const router = useRouter();

  const verifyEmail = (value) => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRex.test(value);
  };

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
    if (registerEmail === '') {
      setRegisterEmailState('error');
      error = true;
    }
    if (registerPassword === '') {
      setRegisterPasswordState('error');
      error = true;
    }
    if (error) return;

    const user = {
      names: registerName,
      lastNames: registerLastName,
      email: registerEmail,
      password: registerPassword,
    }

    const response = await fetch('/api/register-user', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const json = await response.json();
    if (response.status !== 200) {
      enqueueSnackbar(json.msg, { variant: 'error' });
    } else {
      enqueueSnackbar('Usuario creado exitósamente', { variant: 'success' });
      await router.push('/auth/login-page');
    }
  };

  const useStyles = makeStyles(styles);
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={8} md={8}>
          <Card className={classes.cardSignup}>
            <h2 className={classes.cardTitle}>Crea una Nueva Cuenta</h2>
            <CardBody>
              <GridContainer justify="center">
                {/*
                <GridItem xs={12} sm={12} md={5}>
                  <InfoArea
                    title="Marketing"
                    description="We've created the marketing campaign of the website. It was a very interesting collaboration."
                    icon={Timeline}
                    iconColor="rose"
                  />
                  <InfoArea
                    title="Fully Coded in HTML5"
                    description="We've developed the website with HTML5 and CSS3. The client has access to the code using GitHub."
                    icon={Code}
                    iconColor="primary"
                  />
                  <InfoArea
                    title="Built Audience"
                    description="There is also a Fully Customizable CMS Admin Dashboard for this product."
                    icon={Group}
                    iconColor="info"
                  />
                </GridItem>
                */}
                <GridItem xs={12} sm={8} md={8}>
                  {/*
                  <div className={classes.center}>
                    <Button justIcon round color="twitter">
                      <i className="fab fa-twitter" />
                    </Button>
                    {` `}
                    <Button justIcon round color="dribbble">
                      <i className="fab fa-dribbble" />
                    </Button>
                    {` `}
                    <Button justIcon round color="facebook">
                      <i className="fab fa-facebook-f" />
                    </Button>
                    {` `}
                    <h4 className={classes.socialTitle}>or be classical</h4>
                  </div>
                  */}
                  <form className={classes.form} onSubmit={handleSubmit}>
                    <CustomInput
                      success={registerNameState === "success"}
                      error={registerNameState === "error"}
                      id="registerName"
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses,
                      }}
                      inputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className={classes.inputAdornment}
                          >
                            <Face className={classes.inputAdornmentIcon}/>
                          </InputAdornment>
                        ),
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
                        placeholder: "Nombres...",
                      }}
                    />
                    <CustomInput
                      success={registerLastNameState === "success"}
                      error={registerLastNameState === "error"}
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses,
                      }}
                      inputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className={classes.inputAdornment}
                          >
                            <Contacts className={classes.inputAdornmentIcon}/>
                          </InputAdornment>
                        ),
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
                        placeholder: "Apellidos...",
                      }}
                    />
                    <CustomInput
                      success={registerEmailState === "success"}
                      error={registerEmailState === "error"}
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses,
                      }}
                      inputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className={classes.inputAdornment}
                          >
                            <Email className={classes.inputAdornmentIcon}/>
                          </InputAdornment>
                        ),
                        endAdornment:
                          registerEmailState === "error" ? (
                            <InputAdornment position="end">
                              <Close className={classes.danger} />
                            </InputAdornment>
                          ) : undefined,
                        placeholder: "Email...",
                        onChange: (event) => {
                          if (verifyEmail(event.target.value)) {
                            setRegisterEmailState("success");
                          } else {
                            setRegisterEmailState("error");
                          }
                          setRegisterEmail(event.target.value);
                        },
                        type: "email",
                      }}
                    />
                    <CustomInput
                      success={registerPasswordState === "success"}
                      error={registerPasswordState === "error"}
                      formControlProps={{
                        fullWidth: true,
                        className: classes.customFormControlClasses,
                      }}
                      inputProps={{
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className={classes.inputAdornment}
                          >
                            <Icon className={classes.inputAdornmentIcon}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        endAdornment:
                          registerPasswordState === "error" ? (
                            <InputAdornment position="end">
                              <Close className={classes.danger} />
                            </InputAdornment>
                          ) : undefined,
                        onChange: (event) => {
                          if (event.target.value.length > 100) {
                            setRegisterPasswordState("error");
                          } else {
                            setRegisterPasswordState("success");
                          }
                          setRegisterPassword(event.target.value);
                        },
                        placeholder: "Password...",
                      }}
                    />
                    <div className={classes.center}>
                      <Button round color="primary" type="submit">
                        Regístrate
                      </Button>
                    </div>
                  </form>
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

RegisterPage.layout = Auth;

export default RegisterPage;
