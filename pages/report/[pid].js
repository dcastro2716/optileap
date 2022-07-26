import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";
import Info from "@material-ui/icons/Info";
import LocationOn from "@material-ui/icons/LocationOn";
import Gavel from "@material-ui/icons/Gavel";
import HelpOutline from "@material-ui/icons/HelpOutline";
import Height from "@material-ui/icons/Height";
import Timer from "@material-ui/icons/Timer";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills.js";
import Accordion from "components/Accordion/Accordion.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import {useRef, useEffect, useLayoutEffect} from 'react';
import Success from "components/Typography/Success.js";
import Warning from "components/Typography/Warning.js";
import Danger from "components/Typography/Danger.js";

import { cardTitle } from "assets/jss/nextjs-material-dashboard-pro.js";
import Button from "../../components/CustomButtons/Button";
import {useSnackbar} from "notistack";
import CardIcon from "../../components/Card/CardIcon";
import Icon from "@material-ui/core/Icon";
import CardFooter from "../../components/Card/CardFooter";
import LocalOffer from "@material-ui/icons/LocalOffer";
import useSWR from "swr";
import {useRouter} from "next/router";
import Link from "next/link";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Table from "../../components/Table/Table";
import moment from "moment";

const styles = {
  cardTitle,
  pageSubcategoriesTitle: {
    color: "#3C4858",
    textDecoration: "none",
    textAlign: "center",
  },
  cardCategory: {
    margin: "0",
    color: "#999999",
  },
};

async function findUser(...args) {
  const [url] = args;
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token"),
    },
  });
  return response.json();
}

function Pid() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const router = useRouter();

  const {data , mutation} = useSWR(["/api/user/" + router.query.pid], findUser);

  const [matState, setMatState] = React.useState(undefined);
  const [readyState, setReadyState] = React.useState(false);
  const [flyState, setFlyState] = React.useState("");
  const [heightState, setHeightState] = React.useState("");
  const [buttonState, setButtonState] = React.useState("Evaluar");
  const [tablaState, setTablaState] = React.useState([]);
  const [refreshState, setRefreshState] = React.useState(true);

  useEffect(() => {

    window.addEventListener('gamepadconnected', (event) => {
      console.log(event.gamepad.index);
      if(event.gamepad.index !== undefined) {
        setMatState(event.gamepad.index);
      }
    });

  },[])

  if (!data) return <div>Loading...</div>

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader>
              <h4 className={classes.cardTitle}>
                CMJB <small> - Counter Movement Jump</small>
              </h4>
            </CardHeader>
            <CardBody>
              <NavPills
                color="warning"
                tabs={[
                  {
                    tabButton: "Plataforma",
                    tabContent: (
                      <span>
                        <p>Pararse sobre plataforma para verificar configuración</p>
                          {matState !== undefined ?
                            <Success>
                              Plataforma configurada
                            </Success>
                            :
                            <Danger>
                              Plataforma no configurada
                            </Danger>
                          }

                        <p>
                        {matState !== undefined ?
                          <>
                          <Button color="primary" simple onClick={() => {
                            const myGamepad = navigator.getGamepads()[matState];
                            let startTime, endTime;
                            if (myGamepad.buttons.filter(e => e.pressed).length > 0) {
                              setReadyState(false);
                              setFlyState('0');
                              setHeightState('0');
                              setButtonState("Ya puede saltar");
                              let inter = setInterval(() => {
                                const pad = navigator.getGamepads()[matState];
                                if (pad.buttons.filter(e => e.pressed).length > 0 && startTime) {
                                  endTime = new Date();
                                  let time = (endTime - startTime) / 1000;
                                  setFlyState(time + '');
                                  setHeightState((9.81 * time * time / 8).toFixed(4) + '');
                                  setReadyState(true);
                                  clearInterval(inter);
                                  setButtonState("Evaluar");
                                } else if (pad.buttons.filter(e => e.pressed).length === 0 && !startTime) {
                                  startTime = new Date();
                                  setButtonState("Inicia salto");
                                }
                              }, 100);
                            } else {
                              enqueueSnackbar('Pararse sobre la plataforma', { variant: 'error' });
                            }
                          }}>
                            {buttonState}
                          </Button>
                          </>
                          : null
                        }
                          </p>
                      </span>
                    ),
                  },
                  {
                    tabButton: "Usuario",
                    tabContent: (
                      <span>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={4}>
                            Nombres:
                          </GridItem>
                          <GridItem xs={12} sm={12} md={8}>
                            {data.data.names}
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={4}>
                            Apellidos:
                          </GridItem>
                          <GridItem xs={12} sm={12} md={8}>
                            {data.data.lastNames}
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={4}>
                            Email:
                          </GridItem>
                          <GridItem xs={12} sm={12} md={8}>
                            {data.data.email}
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={4}>
                            Peso en kg:
                          </GridItem>
                          <GridItem xs={12} sm={12} md={8}>
                            {data.data.weight}
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={4}>
                            Altura en cm:
                          </GridItem>
                          <GridItem xs={12} sm={12} md={8}>
                            {data.data.height}
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={4}>
                            Afiliacion:
                          </GridItem>
                          <GridItem xs={12} sm={12} md={8}>
                            {data.data.affiliation}
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={4}>
                            Nacimiento:
                          </GridItem>
                          <GridItem xs={12} sm={12} md={8}>
                            {data.data.birth}
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={4}>
                            Sexo:
                          </GridItem>
                          <GridItem xs={12} sm={12} md={8}>
                            {data.data.sex === 'M' ? 'Masculino' : 'Femenino'}
                          </GridItem>
                        </GridContainer>
                      </span>
                    ),
                  },
                  {
                    tabButton: "Evaluaciones",
                    tabButtonHandler: async () => {
                      if (refreshState) {
                        const response = await fetch("/api/evaluation/"+data.data.id, {
                          method: "GET",
                          headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + localStorage.getItem("token"),
                          },
                        });
                        let res = await response.json();
                        let tabla = [];
                        if (res.data) {
                          for(let i = 0 ; i < res.data.length ; i++) {
                            tabla.push([i + 1, res.data[i].time, res.data[i].jump, moment(res.data[i].date).format('DD/MM/YYYY hh:mm A')]);
                          }
                          setTablaState(tabla);
                          setRefreshState(false);
                        }
                      }
                    },
                    tabContent: (
                      <span>
                        <Table
                          tableHead={[
                            "#",
                            "Tiempo (seg)",
                            "Salto (m)",
                            "Fecha",
                          ]}
                          tableData={[
                            ...tablaState,
                          ]}
                        />
                      </span>
                    ),
                  },
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader stats icon>
              <CardIcon color={readyState ? "success" : "danger"}>
                <Height/>
              </CardIcon>
              <p className={classes.cardCategory}>Altura en metros</p>
              <h3 className={classes.cardTitle}>{heightState}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                El resultado se mostrará luego de la evaluación
              </div>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader stats icon>
              <CardIcon color={readyState ? "success" : "danger"}>
                <Timer/>
              </CardIcon>
              <p className={classes.cardCategory}>Tiempo de vuelo en segundos</p>
              <h3 className={classes.cardTitle}>{flyState}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                El resultado se mostrará luego de la evaluación
              </div>
            </CardFooter>
          </Card>
          {readyState ?
            <Button color="rose" onClick={async () => {
              const response = await fetch('/api/save-evaluation', {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  "Authorization": "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify({
                  names: data.data.names,
                  lastNames: data.data.lastNames,
                  email: data.data.email,
                  weight: data.data.weight,
                  height: data.data.height,
                  affiliation: data.data.affiliation,
                  birth: data.data.birth,
                  sex: data.data.sex,
                  time: flyState,
                  jump: heightState,
                  userId: data.data.id
                }),
              });
              const json = await response.json();
              if (response.status !== 200) {
                enqueueSnackbar(json.msg, { variant: 'error' });
              } else {
                enqueueSnackbar('Evaluación guardada', { variant: 'success' });
                setReadyState(true);
              }
            }}>Guardar Evaluación</Button>
          :null
          }

        </GridItem>
        {/*
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader>
              <h4 className={classes.cardTitle}>
                Navigation Pills <small> - Vertical Tabs</small>
              </h4>
            </CardHeader>
            <CardBody>
              <NavPills
                color="rose"
                horizontal={{
                  tabsGrid: { xs: 12, sm: 12, md: 4 },
                  contentGrid: { xs: 12, sm: 12, md: 8 },
                }}
                tabs={[
                  {
                    tabButton: "Profile",
                    tabContent: (
                      <span>
                        <p>
                          Collaboratively administrate empowered markets via
                          plug-and-play networks. Dynamically procrastinate B2C
                          users after installed base benefits.
                        </p>
                        <br />
                        <p>
                          Dramatically visualize customer directed convergence
                          without revolutionary ROI. Collaboratively
                          administrate empowered markets via plug-and-play
                          networks. Dynamically procrastinate B2C users after
                          installed base benefits.
                        </p>
                        <br />
                        <p>This is very nice.</p>
                      </span>
                    ),
                  },
                  {
                    tabButton: "Settings",
                    tabContent: (
                      <span>
                        <p>
                          Efficiently unleash cross-media information without
                          cross-media value. Quickly maximize timely
                          deliverables for real-time schemas.
                        </p>
                        <br />
                        <p>
                          Dramatically maintain clicks-and-mortar solutions
                          without functional solutions.
                        </p>
                      </span>
                    ),
                  },
                  {
                    tabButton: "Options",
                    tabContent: (
                      <span>
                        <p>
                          Completely synergize resource taxing relationships via
                          premier niche markets. Professionally cultivate
                          one-to-one customer service with robust ideas.{" "}
                        </p>
                        <br />
                        <p>
                          Dynamically innovate resource-leveling customer
                          service for state of the art customer service.
                        </p>
                      </span>
                    ),
                  },
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
        */}
      </GridContainer>
      {/*
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader>
              <h4 className={classes.cardTitle}>Collapsible Accordion</h4>
            </CardHeader>
            <CardBody>
              <Accordion
                active={0}
                collapses={[
                  {
                    title: "Collapsible group Item #1",
                    content:
                      "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.",
                  },
                  {
                    title: "Collapsible group Item #2",
                    content:
                      "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.",
                  },
                  {
                    title: "Collapsible group Item #3",
                    content:
                      "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.",
                  },
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader>
              <h4 className={classes.cardTitle}>
                Navigation Pills Icons <small> - Vertical Tabs</small>
              </h4>
            </CardHeader>
            <CardBody>
              <NavPills
                color="rose"
                horizontal={{
                  tabsGrid: { xs: 12, sm: 12, md: 4 },
                  contentGrid: { xs: 12, sm: 12, md: 8 },
                }}
                tabs={[
                  {
                    tabButton: "Dashboard",
                    tabIcon: Dashboard,
                    tabContent: (
                      <span>
                        <p>
                          Collaboratively administrate empowered markets via
                          plug-and-play networks. Dynamically procrastinate B2C
                          users after installed base benefits.
                        </p>
                        <br />
                        <p>
                          Dramatically visualize customer directed convergence
                          without revolutionary ROI. Collaboratively
                          administrate empowered markets via plug-and-play
                          networks. Dynamically procrastinate B2C users after
                          installed base benefits.
                        </p>
                        <br />
                        <p>
                          Dramatically visualize customer directed convergence
                          without revolutionary ROI. Collaboratively
                          administrate empowered markets via plug-and-play
                          networks. Dynamically procrastinate B2C users after
                          installed base benefits.
                        </p>
                      </span>
                    ),
                  },
                  {
                    tabButton: "Schedule",
                    tabIcon: Schedule,
                    tabContent: (
                      <span>
                        <p>
                          Efficiently unleash cross-media information without
                          cross-media value. Quickly maximize timely
                          deliverables for real-time schemas.
                        </p>
                        <br />
                        <p>
                          Dramatically maintain clicks-and-mortar solutions
                          without functional solutions. Dramatically visualize
                          customer directed convergence without revolutionary
                          ROI. Collaboratively administrate empowered markets
                          via plug-and-play networks. Dynamically procrastinate
                          B2C users after installed base benefits.
                        </p>
                      </span>
                    ),
                  },
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h3 className={classes.pageSubcategoriesTitle}>Page Subcategories</h3>
          <br />
          <NavPills
            color="warning"
            alignCenter
            tabs={[
              {
                tabButton: "Description",
                tabIcon: Info,
                tabContent: (
                  <Card>
                    <CardHeader>
                      <h4 className={classes.cardTitle}>
                        Description about product
                      </h4>
                      <p className={classes.cardCategory}>
                        More information here
                      </p>
                    </CardHeader>
                    <CardBody>
                      Collaboratively administrate empowered markets via
                      plug-and-play networks. Dynamically procrastinate B2C
                      users after installed base benefits.
                      <br />
                      <br />
                      Dramatically visualize customer directed convergence
                      without revolutionary ROI.
                    </CardBody>
                  </Card>
                ),
              },
              {
                tabButton: "Location",
                tabIcon: LocationOn,
                tabContent: (
                  <Card>
                    <CardHeader>
                      <h4 className={classes.cardTitle}>
                        Location of the product
                      </h4>
                      <p className={classes.cardCategory}>
                        More information here
                      </p>
                    </CardHeader>
                    <CardBody>
                      Efficiently unleash cross-media information without
                      cross-media value. Quickly maximize timely deliverables
                      for real-time schemas.
                      <br />
                      <br />
                      Dramatically maintain clicks-and-mortar solutions without
                      functional solutions.
                    </CardBody>
                  </Card>
                ),
              },
              {
                tabButton: "Legal Info",
                tabIcon: Gavel,
                tabContent: (
                  <Card>
                    <CardHeader>
                      <h4 className={classes.cardTitle}>
                        Legal info of the product
                      </h4>
                      <p className={classes.cardCategory}>
                        More information here
                      </p>
                    </CardHeader>
                    <CardBody>
                      Completely synergize resource taxing relationships via
                      premier niche markets. Professionally cultivate one-to-one
                      customer service with robust ideas.
                      <br />
                      <br />
                      Dynamically innovate resource-leveling customer service
                      for state of the art customer service.
                    </CardBody>
                  </Card>
                ),
              },
              {
                tabButton: "Help Center",
                tabIcon: HelpOutline,
                tabContent: (
                  <Card>
                    <CardHeader>
                      <h4 className={classes.cardTitle}>Help center</h4>
                      <p className={classes.cardCategory}>
                        More information here
                      </p>
                    </CardHeader>
                    <CardBody>
                      From the seamless transition of glass and metal to the
                      streamlined profile, every detail was carefully considered
                      to enhance your experience. So while its display is
                      larger, the phone feels just right.
                      <br />
                      <br />
                      Another Text. The first thing you notice when you hold the
                      phone is how great it feels in your hand. The cover glass
                      curves down around the sides to meet the anodized aluminum
                      enclosure in a remarkable, simplified design.
                    </CardBody>
                  </Card>
                ),
              },
            ]}
          />
        </GridItem>
      </GridContainer>
      */}
    </div>
  );
}

Pid.layout = Admin;

export default Pid;
