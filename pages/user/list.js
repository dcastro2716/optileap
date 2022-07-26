import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import useSWR, {mutate} from "swr";
// material-ui icons
import Assignment from "@material-ui/icons/Assignment";
import Person from "@material-ui/icons/Person";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
import Remove from "@material-ui/icons/Remove";
import Add from "@material-ui/icons/Add";
import AssessmentIcon from '@material-ui/icons/Assessment';
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";

import styles from "assets/jss/nextjs-material-dashboard-pro/views/extendedTablesStyle.js";

import product1 from "assets/img/product1.jpg";
import product2 from "assets/img/product2.jpg";
import product3 from "assets/img/product3.jpg";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Instruction from "../../components/Instruction/Instruction";
import noticeModal1 from "../../assets/img/card-1.jpeg";
import noticeModal2 from "../../assets/img/card-2.jpeg";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import FormLabel from "@material-ui/core/FormLabel";
import InstructionText from "../../components/InstructionText/InstructionText";
import {colors} from "@material-ui/core";
import Link from "next/link";
import {useSnackbar} from "notistack";
import {useRouter} from 'next/router';
import Tooltip from "@material-ui/core/Tooltip";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

async function userList(...args) {
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

function ExtendedTables() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const {data , mutation} = useSWR(["/api/list-user"], userList);

  const [checked, setChecked] = React.useState([]);
  const [noticeModal, setNoticeModal] = React.useState(false);
  const [modalData, setModalData] = React.useState({});
  const [tablaData, setTablaData] = React.useState([]);

  const router = useRouter();

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

  const fillButtons = (value) => [
    { color: "info", icon: Person, fun: 'view', tooltip: 'Ver datos del usuario' },
    { color: "success", icon: AssessmentIcon, fun: 'report', tooltip: 'Ejecutar medición' },
    { color: "danger", icon: Close, fun: 'delete', tooltip: 'Eliminar usuario' },
  ].map((prop, key) => {
    return (
      <Tooltip title={prop.tooltip}>
        <Button color={prop.color} className={classes.actionButton} key={key} onClick={async () => {
          if (prop.fun === 'view') {
            setModalData(value);
            setNoticeModal(true);
          } else if (prop.fun === 'delete') {
            const response = await fetch("/api/delete-user", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
              },
              body: JSON.stringify({userId: value.id}),
            });
            let r = await response.json();
            if(r.count > 0) {
              await router.reload(window.location.pathname);
            } else {
              enqueueSnackbar('No se pudo eliminar usuario', { variant: 'error' });
            }

          } else if (prop.fun === 'report') {
            await router.push('/report/'+value.id);
          }
        }}>
          <prop.icon className={classes.icon} />
        </Button>
      </Tooltip>

    );
  });
  const simpleButtons = [
    { color: "info", icon: Person },
    { color: "success", icon: Edit },
    { color: "danger", icon: Close },
  ].map((prop, key) => {
    return (
      <Button
        color={prop.color}
        simple
        className={classes.actionButton}
        key={key}
      >
        <prop.icon className={classes.icon} />
      </Button>
    );
  });
  const roundButtons = [
    { color: "info", icon: Person },
    { color: "success", icon: Edit },
    { color: "danger", icon: Close },
  ].map((prop, key) => {
    return (
      <Button
        round
        color={prop.color}
        className={classes.actionButton + " " + classes.actionButtonRound}
        key={key}
      >
        <prop.icon className={classes.icon} />
      </Button>
    );
  });

  if (!data) return <div>Loading...</div>

  let tabla = [];
  if (data.data) {
    for(let i = 0 ; i < data.data.length ; i++) {
      tabla.push([i + 1, data.data[i].names, data.data[i].lastNames, data.data[i].email, data.data[i].affiliation,
        fillButtons(data.data[i])
      ]);
    }
  }

  return (
    <GridContainer>
      <GridItem  xs={12}>
        <Dialog
          classes={{
            root: classes.center + " " + classes.modalRoot,
            paper: classes.modal,
          }}
          open={noticeModal}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setNoticeModal(false)}
          aria-labelledby="notice-modal-slide-title"
          aria-describedby="notice-modal-slide-description"
        >
          <DialogTitle
            id="notice-modal-slide-title"
            disableTypography
            className={classes.modalHeader}
          >
            <Button
              justIcon
              className={classes.modalCloseButton}
              key="close"
              aria-label="Close"
              color="transparent"
              onClick={() => setNoticeModal(false)}
            >
              <Close className={classes.modalClose} />
            </Button>
            <h4 className={classes.modalTitle}>Datos del Usuario</h4>
          </DialogTitle>
          <DialogContent
            id="notice-modal-slide-description"
            className={classes.modalBody}
          >
            <p style={{color: "white"}}>wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww</p>
            <div className={classes.instructionNoticeModal}>
                <GridContainer >
                  <GridItem xs={12} sm={12} md={8}>
                    <FormLabel >
                      Nombres:
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormLabel >
                      {modalData.names}
                    </FormLabel>
                  </GridItem>
                </GridContainer>
            </div>
            <div className={classes.instructionNoticeModal}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
                    <FormLabel >
                      Apellidos:
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormLabel >
                      {modalData.lastNames}
                    </FormLabel>
                  </GridItem>
                </GridContainer>
            </div>
            <div className={classes.instructionNoticeModal}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
                    <FormLabel >
                      Email:
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormLabel >
                      {modalData.email}
                    </FormLabel>
                  </GridItem>
                </GridContainer>
            </div>
            <div className={classes.instructionNoticeModal}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
                    <FormLabel >
                      Afiliación:
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormLabel >
                      {modalData.affiliation}
                    </FormLabel>
                  </GridItem>
                </GridContainer>
            </div>
            <div className={classes.instructionNoticeModal}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
                    <FormLabel >
                      Peso (en kg):
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormLabel >
                      {modalData.weight}
                    </FormLabel>
                  </GridItem>
                </GridContainer>
            </div>
            <div className={classes.instructionNoticeModal}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
                    <FormLabel>
                      Altura (en cm):
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormLabel >
                      {modalData.height}
                    </FormLabel>
                  </GridItem>
                </GridContainer>
            </div>
            <div className={classes.instructionNoticeModal}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
                    <FormLabel >
                      Nacimiento:
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormLabel >
                      {modalData.birth}
                    </FormLabel>
                  </GridItem>
                </GridContainer>
            </div>
            <div className={classes.instructionNoticeModal}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
                    <FormLabel >
                      Sexo:
                    </FormLabel>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormLabel >
                      {modalData.sex === 'M' ? 'Masculino' : 'Femenino'}
                    </FormLabel>
                  </GridItem>
                </GridContainer>
            </div>
          </DialogContent>
          <DialogActions
            className={
              classes.modalFooter + " " + classes.modalFooterCenter
            }
          >
            <Button
              onClick={() => setNoticeModal(false)}
              color="info"
              round
            >
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </GridItem>
      <GridItem xs={12}>
        <Card>
          <CardHeader color="rose" icon>
            <CardIcon color="rose">
              <Assignment />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Usuarios</h4>
          </CardHeader>
          <CardBody>
            <Table
              tableHead={[
                "#",
                "Nombres",
                "Apellidos",
                "Email",
                "Afiliación",
                "Actions",
              ]}
              tableData={[
                ...tabla,
                {
                  purchase: true,
                  colspan: "4",
                  col: {
                    colspan: 2,
                    text: (
                      <Link href="/user/create">
                        <Button color="info" round >
                          Nuevo Usuario{" "}
                          <KeyboardArrowRight className={classes.icon} />
                        </Button>
                      </Link>
                    ),
                  },
                },
              ]}
              customCellClasses={[classes.center, classes.right, classes.right]}
              customClassesForCells={[0, 4, 5]}
              customHeadCellClasses={[
                classes.center,
                classes.right,
                classes.right,
              ]}
              customHeadClassesForCells={[0, 4, 5]}
            />
          </CardBody>
        </Card>
      </GridItem>
      {/*
      <GridItem xs={12}>
        <Card>
          <CardHeader color="rose" icon>
            <CardIcon color="rose">
              <Assignment />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Striped Table</h4>
          </CardHeader>
          <CardBody>
            <Table
              striped
              tableHead={[
                "#",
                "",
                "Product Name",
                "Type",
                "Qty",
                "Price",
                "Amount",
              ]}
              tableData={[
                [
                  "1",
                  <Checkbox
                    key="key"
                    className={classes.positionAbsolute}
                    tabIndex={-1}
                    onClick={() => handleToggle(1)}
                    checkedIcon={<Check className={classes.checkedIcon} />}
                    icon={<Check className={classes.uncheckedIcon} />}
                    classes={{
                      checked: classes.checked,
                      root: classes.checkRoot,
                    }}
                  />,
                  "Moleskine Agenda",
                  "Office",
                  "25",
                  "€ 49",
                  "€ 1,225",
                ],
                [
                  "2",
                  <Checkbox
                    key="key"
                    className={classes.positionAbsolute}
                    tabIndex={-1}
                    onClick={() => handleToggle(2)}
                    checkedIcon={<Check className={classes.checkedIcon} />}
                    icon={<Check className={classes.uncheckedIcon} />}
                    classes={{
                      checked: classes.checked,
                      root: classes.checkRoot,
                    }}
                  />,
                  "Stabilo Pen",
                  "Office",
                  "30",
                  "€ 10",
                  "€ 300",
                ],
                [
                  "3",
                  <Checkbox
                    key="key"
                    className={classes.positionAbsolute}
                    tabIndex={-1}
                    onClick={() => handleToggle(3)}
                    checkedIcon={<Check className={classes.checkedIcon} />}
                    icon={<Check className={classes.uncheckedIcon} />}
                    classes={{
                      checked: classes.checked,
                      root: classes.checkRoot,
                    }}
                  />,
                  "A4 Paper Pack",
                  "Office",
                  "50",
                  "€ 10.99",
                  "€ 109",
                ],
                [
                  "4",
                  <Checkbox
                    key="key"
                    className={classes.positionAbsolute}
                    tabIndex={-1}
                    onClick={() => handleToggle(4)}
                    checkedIcon={<Check className={classes.checkedIcon} />}
                    icon={<Check className={classes.uncheckedIcon} />}
                    classes={{
                      checked: classes.checked,
                      root: classes.checkRoot,
                    }}
                  />,
                  "Apple iPad",
                  "Communication",
                  "10",
                  "€ 499.00",
                  "€ 4,990",
                ],
                [
                  "5",
                  <Checkbox
                    key="key"
                    className={classes.positionAbsolute}
                    tabIndex={-1}
                    onClick={() => handleToggle(5)}
                    checkedIcon={<Check className={classes.checkedIcon} />}
                    icon={<Check className={classes.uncheckedIcon} />}
                    classes={{
                      checked: classes.checked,
                      root: classes.checkRoot,
                    }}
                  />,
                  "Apple iPhone",
                  "Communication",
                  "10",
                  "€ 599.00",
                  "€ 5,999",
                ],
                { total: true, colspan: "5", amount: "€12,999" },
              ]}
              customCellClasses={[classes.center, classes.right, classes.right]}
              customClassesForCells={[0, 5, 6]}
              customHeadCellClasses={[
                classes.center,
                classes.right,
                classes.right,
              ]}
              customHeadClassesForCells={[0, 5, 6]}
            />
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12}>
        <Card>
          <CardHeader color="rose" icon>
            <CardIcon color="rose">
              <Assignment />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Shopping Cart Table</h4>
          </CardHeader>
          <CardBody>
            <Table
              tableHead={[
                "",
                "PRODUCT",
                "COLOR",
                "SIZE",
                "PRICE",
                "QTY",
                "AMOUNT",
                "",
              ]}
              tableData={[
                [
                  <div className={classes.imgContainer} key="key">
                    <img src={product1} alt="..." className={classes.img} />
                  </div>,
                  <span key="key">
                    <a href="#jacket" className={classes.tdNameAnchor}>
                      Spring Jacket
                    </a>
                    <br />
                    <small className={classes.tdNameSmall}>
                      by Dolce&amp;Gabbana
                    </small>
                  </span>,
                  "Red",
                  "M",
                  <span key="key">
                    <small className={classes.tdNumberSmall}>€</small> 549
                  </span>,
                  <span key="key">
                    1{` `}
                    <div className={classes.buttonGroup}>
                      <Button
                        color="info"
                        size="sm"
                        round
                        className={classes.firstButton}
                      >
                        <Remove className={classes.icon} />
                      </Button>
                      <Button
                        color="info"
                        size="sm"
                        round
                        className={classes.lastButton}
                      >
                        <Add className={classes.icon} />
                      </Button>
                    </div>
                  </span>,
                  <span key="key">
                    <small className={classes.tdNumberSmall}>€</small> 549
                  </span>,
                  <Button simple className={classes.actionButton} key="key">
                    <Close className={classes.icon} />
                  </Button>,
                ],
                [
                  <div className={classes.imgContainer} key="key">
                    <img src={product2} alt="..." className={classes.img} />
                  </div>,
                  <span key="key">
                    <a href="#jacket" className={classes.tdNameAnchor}>
                      Short Pants{" "}
                    </a>
                    <br />
                    <small className={classes.tdNameSmall}>by Pucci</small>
                  </span>,
                  "Purple",
                  "M",
                  <span key="key">
                    <small className={classes.tdNumberSmall}>€</small> 499
                  </span>,
                  <span key="key">
                    2{` `}
                    <div className={classes.buttonGroup}>
                      <Button
                        color="info"
                        size="sm"
                        round
                        className={classes.firstButton}
                      >
                        <Remove className={classes.icon} />
                      </Button>
                      <Button
                        color="info"
                        size="sm"
                        round
                        className={classes.lastButton}
                      >
                        <Add className={classes.icon} />
                      </Button>
                    </div>
                  </span>,
                  <span key="key">
                    <small className={classes.tdNumberSmall}>€</small> 998
                  </span>,
                  <Button simple className={classes.actionButton} key="key">
                    <Close className={classes.icon} />
                  </Button>,
                ],
                [
                  <div className={classes.imgContainer} key="key">
                    <img src={product3} alt="..." className={classes.img} />
                  </div>,
                  <span key="key">
                    <a href="#jacket" className={classes.tdNameAnchor}>
                      Pencil Skirt
                    </a>
                    <br />
                    <small className={classes.tdNameSmall}>by Valentino</small>
                  </span>,
                  "White",
                  "XL",
                  <span key="key">
                    <small className={classes.tdNumberSmall}>€</small> 799
                  </span>,
                  <span key="key">
                    1{` `}
                    <div className={classes.buttonGroup}>
                      <Button
                        color="info"
                        size="sm"
                        round
                        className={classes.firstButton}
                      >
                        <Remove className={classes.icon} />
                      </Button>
                      <Button
                        color="info"
                        size="sm"
                        round
                        className={classes.lastButton}
                      >
                        <Add className={classes.icon} />
                      </Button>
                    </div>
                  </span>,
                  <span key="key">
                    <small className={classes.tdNumberSmall}>€</small> 799
                  </span>,
                  <Button simple className={classes.actionButton} key="key">
                    <Close className={classes.icon} />
                  </Button>,
                ],
                {
                  total: true,
                  colspan: "5",
                  amount: (
                    <span key="key">
                      <small>€</small>2,346
                    </span>
                  ),
                },
                {
                  purchase: true,
                  colspan: "6",
                  col: {
                    colspan: 2,
                    text: (
                      <Button color="info" round>
                        Complete Purchase{" "}
                        <KeyboardArrowRight className={classes.icon} />
                      </Button>
                    ),
                  },
                },
              ]}
              tableShopping
              customHeadCellClasses={[
                classes.center,
                classes.description,
                classes.description,
                classes.right,
                classes.right,
                classes.right,
              ]}
              customHeadClassesForCells={[0, 2, 3, 4, 5, 6]}
              customCellClasses={[
                classes.tdName,
                classes.customFont,
                classes.customFont,
                classes.tdNumber,
                classes.tdNumber + " " + classes.tdNumberAndButtonGroup,
                classes.tdNumber,
              ]}
              customClassesForCells={[1, 2, 3, 4, 5, 6]}
            />
          </CardBody>
        </Card>
      </GridItem>
      */}
    </GridContainer>
  );
}

ExtendedTables.layout = Admin;

export default ExtendedTables;
