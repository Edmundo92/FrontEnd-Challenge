import React from "react";
import { Switch, Route } from "react-router-dom";
import ListingVehicle from "./vehicle/listing";
import RegisterVehicle from "./vehicle/register";
import Layout from "../components/Layout";

const Root = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/veiculos" component={ListingVehicle} />
        <Route path="/veiculo/:id" component={RegisterVehicle} />
        <Route path="/veiculo" component={RegisterVehicle} />
      </Switch>
    </Layout>
  );
};

export default Root;
