import axios from "axios";
import {
  VISUALIZZA_PARCHEGGI,
  ERROR_PARCHEGGI,
  INSERISCI_PARCHEGGIO,
  GET_ERRORS,
} from "./type";

// Register User
export const registerParcheggio = (parcheggio, history) => (dispatch) => {
  axios.post("/api/parcheggi/addParcheggio", parcheggio).catch((err) =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    })
  );
};

// Lista Veicoli
export const Listaparcheggi = () => (dispatch) => {
  axios
    .get("/api/parcheggi/parcheggilist")
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: VISUALIZZA_PARCHEGGI,
        payload: res.data,
      });
    })
    .catch((err) => console.error(err));
};
