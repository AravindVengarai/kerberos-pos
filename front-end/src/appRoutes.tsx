import Checkout from "../src/pages/Checkout";
import React from "react";
import { RouteObject } from "react-router-dom";
import App from "./App";
import Start from "../src/pages/Start";
/* ****************************************************
Will be removed once we have no blank pages
***************************************************** */
// const BlankPage = () => {
//   const { pathname } = useLocation();
//   return (
//     <div style={{ height: '100%', backgroundColor: '#FAFAFA', overflow: 'auto' }}>
//       <p>On Page: {pathname}</p>
//     </div>
//   );
// };

const appRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Start />,
  },
  {
    path: "checkout",
    element: <Checkout />,
  },
];

export default appRoutes;
