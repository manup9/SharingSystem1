import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import {
  setCurrentUser,
  logoutUser,
  Listaclienti,
} from "../src/actions/authAutentications";

//store
import { Provider } from "react-redux";
import store from "./store";

//css
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

//componenti
import Layout from "./componenti/Layout/layout/layout";
import PrivateRoute from "../src/componenti/private-route/PrivateRoute";
import Register from "./componenti/auth/Register";
import Login from "./componenti/auth/Login";
import Mappa from "./componenti/googlemap/mappa";

//pagineGeneriche
import Email from "./pagineGeneriche/Email";
import Chisiamo from "./pagineGeneriche/Chisiamo";
import notFound from "./pagineGeneriche/notfound404";
import ModificaPassword from "./pagineGeneriche/modificaPassword";
import Patente from "./pagineGeneriche/aggiornaPatente";
import IlMioProfilo from "./pagineGeneriche/IlMioProfilo";
import VisualizzaPrenotazioni from "./pagineGeneriche/VisualizzaPrenotazioni";
import GestioneCorsa from "./pagineGeneriche/GestioneCorsa";
import NotificheLista from "./pagineGeneriche/Notifiche";
import errorServer from "../src/pagineGeneriche/errorServer";
import ModificaArrivo from "./pagineGeneriche/modificaArrivo";

//pagineCliente
import HomeCliente from "./componenti/PagineCliente/HomeCliente";
import NuovaPrenotazione from "./componenti/PagineCliente/NuovaPrenotazione";
import ListaVeicoli from "./componenti/PagineCliente/ListaVeicoli";
import MetodiPagamento from "./componenti/PagineCliente/MetodiPagamento";
import InserimentoParcheggio from "./componenti/PagineCliente/InserimentoParcheggio";
import RiepilogoPrenotazione from "./componenti/PagineCliente/RiepilogoPrenotazione";
import SchermataPagamento from "./componenti/PagineCliente/SchermataPagamento";

//pagineAdmin
import Dashboard from "../src/componenti/PagineAdmin/DashboardAdmin";
import GestioneAmministrazione from "./componenti/PagineAdmin/GestioneAmministrazione";
import AggiornaClienti from "./componenti/PagineAdmin/AggiornaClienti";
import AggiornaVeicoli from "./componenti/PagineAdmin/AggiornaVeicoli";
import AggiornaDipendenti from "./componenti/PagineAdmin/AggiornaDipendenti";
import AggiornaParcheggi from "./componenti/PagineAdmin/AggiornaParcheggi";
import ModificaTariffe from "./componenti/PagineAdmin/AggiornaTariffe";

//pagineDipendenti
import ModificaParcheggio from "./componenti/PagineDipendenti/ModificaParcheggio";
import DashboardDipendenti from "./componenti/PagineDipendenti/DashboardDipendenti";
import VeicoliLista from "./pagineGeneriche/VeicoliLista";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "/";
  }
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/email" component={Email} />

          <Switch>
            <PrivateRoute exact path="/HomeCliente" component={HomeCliente} />
            <PrivateRoute
              exact
              path="/NuovaPrenotazione"
              component={NuovaPrenotazione}
            />
            <PrivateRoute exact path="/Dashboard" component={Dashboard} />
            <PrivateRoute
              exact
              path="/GestioneAmministrazione"
              component={GestioneAmministrazione}
            />
            <PrivateRoute exact path="/ListaVeicoli" component={ListaVeicoli} />
            <PrivateRoute
              exact
              path="/ListaClienti"
              component={AggiornaClienti}
            />
            <PrivateRoute
              exact
              path="/AggiornaVeicoli"
              component={AggiornaVeicoli}
            />
            <PrivateRoute
              path="/AggiornaDipendenti"
              component={AggiornaDipendenti}
            />
            <PrivateRoute
              path="/AggiornaParcheggi"
              component={AggiornaParcheggi}
            />
            <PrivateRoute
              path="/DashboardDipendenti"
              component={DashboardDipendenti}
            />
            <PrivateRoute path="/IlMioProfilo" component={IlMioProfilo} />
            <PrivateRoute
              path="/ModificaPassword"
              component={ModificaPassword}
            />
            <PrivateRoute
              path="/MetodiDiPagamento"
              component={MetodiPagamento}
            />
            <PrivateRoute path="/Patente" component={Patente} />
            <PrivateRoute
              path="/ModificaParcheggio"
              component={ModificaParcheggio}
            />
            <PrivateRoute path="/ModificaTariffe" component={ModificaTariffe} />
            <PrivateRoute
              path="/InserimentoParcheggio"
              component={InserimentoParcheggio}
            />
            <PrivateRoute
              path="/RiepilogoPrenotazione"
              component={RiepilogoPrenotazione}
            />
            <PrivateRoute
              path="/SchermataPagamento"
              component={SchermataPagamento}
            />
            <PrivateRoute
              path="/VisualizzaPrenotazioni"
              component={VisualizzaPrenotazioni}
            />
            <PrivateRoute path="/GestioneCorsa" component={GestioneCorsa} />
            <PrivateRoute path="/Notifiche" component={NotificheLista} />
            <PrivateRoute path="/VeicoliLista" component={VeicoliLista} />
            <PrivateRoute path="/ModificaArrivo" component={ModificaArrivo} />
            <Route exact path="/ChiSiamo" component={Chisiamo} />
            <Route exact path="/Mappa" component={Mappa} />
            <Route exact path="/errorServer" component={errorServer} />
            <PrivateRoute exact path="*" component={notFound} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
