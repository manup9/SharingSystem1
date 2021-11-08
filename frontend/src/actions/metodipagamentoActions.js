import axios from "axios";
import {
  GET_ERRORS_METODIPAGAMENTO,
  VISUALIZZA_METODIPAGAMENTO,
  CANCELLA_METODIPAGAMENTO,
  GET_ERRORS,
} from "./type";

export const registerMetodoPagamento = (pagamento) => (dispatch) => {
  axios
    .post("/api/pagamenti/addMetodo", pagamento)
    .then((res) => {
return true;
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
  return false;
  });
};

export const Listametodipagamento = (id) => (dispatch) => {
  axios
    .get(`/api/pagamenti/pagamentilist/${id}`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: VISUALIZZA_METODIPAGAMENTO,
        payload: res.data,
      });
    })
    .catch((err) => console.error(err));
};

export const CancellaMetodoPagamento = (id) => (dispatch) => {
  axios
    .delete(`/api/pagamenti/deletePagamento/${id}`)
    .then((res) => {
      dispatch({
        type: CANCELLA_METODIPAGAMENTO,
        payload: id,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS_METODIPAGAMENTO,
        payload: err.response.data,
      })
    );
};
