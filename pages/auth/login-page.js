import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";

// layout for this page
import Auth from "layouts/Auth.js";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/nextjs-material-dashboard-pro/views/loginPageStyle.js";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useSnackbar } from "notistack";
import { useRouter } from 'next/router';

function LoginPage() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [checked, setChecked] = React.useState([]);
  const [registerEmailState, setRegisterEmailState] = React.useState("");
  const [registerEmail, setRegisterEmail] = React.useState("");
  const [registerPasswordState, setRegisterPasswordState] = React.useState("");
  const [registerPassword, setRegisterPassword] = React.useState("");

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let error = false;
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
      email: registerEmail,
      password: registerPassword,
      remember: checked[1] === 1,
    }
    const response = await fetch('/api/login', {
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
      localStorage.setItem('token', json.token);
      //enqueueSnackbar('Ingreso Exitoso', { variant: 'success' });
      await router.push('/user/list');
    }
  }

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

  React.useEffect(() => {
    let id = setTimeout(function () {
      setCardAnimation("");
    }, 700);
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.clearTimeout(id);
    };
  });
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <form onSubmit={handleSubmit}>
            <Card login className={classes[cardAnimaton]}>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="rose"
              >
                <h4 className={classes.cardTitle}>Bienvenido</h4>
                <div className={classes.socialLine}>
                </div>
                {/*
                <div className={classes.socialLine}>
                  {[
                    "fab fa-facebook-square",
                    "fab fa-twitter",
                    "fab fa-google-plus",
                  ].map((prop, key) => {
                    return (
                      <Button
                        color="transparent"
                        justIcon
                        key={key}
                        className={classes.customButtonClass}
                      >
                        <i className={prop} />
                      </Button>
                    );
                  })}
                </div>
                */}
              </CardHeader>
              <CardBody>
                <CustomInput
                  success={registerEmailState === "success"}
                  error={registerEmailState === "error"}
                  labelText="Email..."
                  id="email"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Email className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    ),
                    onChange: (event) => {
                      if (event.target.value.length > 0) {
                        setRegisterEmailState("success");
                      } else {
                        setRegisterEmailState("error");
                      }
                      setRegisterEmail(event.target.value);
                    },
                  }}
                />
                <CustomInput
                  success={registerPasswordState === "success"}
                  error={registerPasswordState === "error"}
                  labelText="Password"
                  id="password"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputAdornmentIcon}>
                          lock_outline
                        </Icon>
                      </InputAdornment>
                    ),
                    onChange: (event) => {
                      if (event.target.value.length === 0) {
                        setRegisterPasswordState("error");
                      } else {
                        setRegisterPasswordState("success");
                      }
                      setRegisterPassword(event.target.value);
                    },
                    type: "password",
                    autoComplete: "off",
                  }}
                />
                {/*
                <FormControlLabel
                  classes={{
                    root: classes.checkboxLabelControl,
                    label: classes.checkboxLabel,
                  }}
                  control={
                    <Checkbox
                      tabIndex={-1}
                      onClick={() => handleToggle(1)}
                      checkedIcon={
                        <Check className={classes.checkedIcon}/>
                      }
                      icon={<Check className={classes.uncheckedIcon}/>}
                      classes={{
                        checked: classes.checked,
                        root: classes.checkRoot,
                      }}
                    />
                  }
                  label={
                    <span>
                          Recuérdame
                        </span>
                  }
                />
                */}
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button color="rose" simple size="lg" block type="submit">
                  Ingresar
                </Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}

LoginPage.layout = Auth;

export default LoginPage;
