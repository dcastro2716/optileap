// @material-ui/icons
import Apps from "@material-ui/icons/Apps";
import DashboardIcon from "@material-ui/icons/Dashboard";
import GroupIcon from "@material-ui/icons/Group";
import PersonIcon from "@material-ui/icons/PersonAdd";
import DateRange from "@material-ui/icons/DateRange";
import GridOn from "@material-ui/icons/GridOn";
import Image from "@material-ui/icons/Image";
import Place from "@material-ui/icons/Place";
import Timeline from "@material-ui/icons/Timeline";
import WidgetsIcon from "@material-ui/icons/Widgets";

var dashRoutes = [
  {
    path: "/list",
    name: "Usuarios",
    rtlName: "لوحة القيادة",
    icon: GroupIcon,

    layout: "/user",
  },
  {
    path: "/create",
    name: "Nuevo Usuario",
    rtlName: "لوحة القيادة",
    icon: PersonIcon,

    layout: "/user",
  },
];
export default dashRoutes;
