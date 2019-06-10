import React, { Fragment } from "react";

import Map from "../../components/Map";
import BarraLateral from "../../components/BarraLateral";
import ModalUser from "../../components/Modal";

const Main = () => (
  <Fragment>
    <Map />
    <BarraLateral />
    <ModalUser />
  </Fragment>
);

export default Main;
