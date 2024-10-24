/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "./views/Index.jsx";
import Maps from "./views/examples/Maps.jsx";
import Register from "./views/examples/Register.jsx";
import Login from "./views/examples/Login.jsx";
import Tables from "./views/examples/Tables.jsx";
import Icons from "./views/examples/Icons.jsx";
import AnalysisList from "./views/examples/AnalysisList.jsx";
import AnalysisDataDetail from "./components/RDS/AnalysisDataDetail.jsx";

const routes = [

  {
    path: "/index",
    name: "analysis",
    icon: "ni ni-chart-bar-32 text-primary",
    component: <Index />,
    layout: "/admin",
  },

  {
    path: "/analysisList",
    name: "List",
    icon: "ni ni-bullet-list-67 text-info",
    component: <AnalysisList />,
    layout: "/admin",
  },

  // 분석 데이터 리스트 디테일
  {
    path: "/analysisData/detail/:uniqueId",
    name: "Anonymous",
    icon: "ni ni-chat-round text-info",
    component: <AnalysisDataDetail/>,
    layout: "/admin",
  },

  
  {
    path: "/icons",
    name: "Anonymous",
    icon: "ni ni-planet text-blue",
    component: <Icons />,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Anonymous",
    icon: "ni ni-pin-3 text-orange",
    component: <Maps />,
    layout: "/admin",
  },

 
  {
    path: "/tables",
    name: "Anonymous",
    icon: "ni ni-bullet-list-67 text-red",
    component: <Tables />,
    layout: "/admin",
  },
  

  {
    path: "/login",
    name: "Anonymous",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },

  {
    path: "/register",
    name: "Anonymous",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },


];
export default routes;


