import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  VISUALIZZA_CLIENTI,
  VISUALIZZA_DIPENDENTI,
  CANCELLA_DIPENDENTE,
  ERROR_DIPENDENTI,
  MODIFICA_PASSWORD,
  GET_ERRORS_MODIFICAPASSWORD,
  MODIFICA_PATENTE,
  MODIFICA_PARCHEGGIO_ASSOCIATO,
} from "./type";

// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then((res) => {
      window.location.href = "/login";
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Login - get user token
export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      // Save to localStorage

      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

// Lista Clienti
export const Listaclienti = () => (dispatch) => {
  axios
    .get("/api/users/userlist")
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: VISUALIZZA_CLIENTI,
        payload: res.data,
      });
    })
    .catch((err) => console.error(err));
};

// Lista Clienti
export const Listadipendenti = () => (dispatch) => {
  axios
    .get("/api/users/dipendentilist")
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: VISUALIZZA_DIPENDENTI,
        payload: res.data,
      });
    })
    .catch((err) => console.error(err));
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  window.location.reload();
};

//Delete Customer
export const CancellaDipendente = (id) => (dispatch) => {
  axios
    .delete(`/api/users/deleteDipendente/${id}`)
    .then((res) => {
      console.log(id);
      dispatch({
        type: CANCELLA_DIPENDENTE,
        payload: id,
      });
    })
    .catch((err) =>
      dispatch({
        type: ERROR_DIPENDENTI,
        payload: err.response.data,
      })
    );
};

export const recuperoPassword = (userData) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/users/recuperoPassword", userData)
      .then((res) => {
        resolve(true);
      })
      .catch((err) =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
    resolve(false);
  });
};

export const codiceOTP = (userData) => (dispatch) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/api/users/codiceOTP", userData)
      .then((res) => {
        resolve(true);
      })
      .catch((err) => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
        resolve(false);
      });
  });
};

export const modificaPassword = (email, utente) => (dispatch) => {
  axios
    .put(`/api/users/modificaPassword/${email}`, utente)
    .then((res) => {
      dispatch({
        type: MODIFICA_PASSWORD,
        payload: res.data,
      });
    })
    .catch((err) => console.error(err));
};

export const modificaPassword2 = (email, utente) => (dispatch) => {
  axios
    .put(`/api/users/modificaPassword/${email}`, utente)
    .then((res) => {
      window.location.href = "/IlMioProfilo";
      dispatch({
        type: MODIFICA_PASSWORD,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS_MODIFICAPASSWORD,
        payload: err.response.data,
      });
    });
};

export const modificaPatente = (id, utente) => (dispatch) => {
  axios
    .put(`/api/users/modificaPatente/${id}`, utente)
    .then((res) => {
      window.location.href = "/IlMioProfilo";
      dispatch({
        type: MODIFICA_PATENTE,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const modificaParcheggioAssociato = (id, utente) => (dispatch) => {
  axios
    .put(`/api/users/modificaParcheggioAssociato/${id}`, utente)
    .then((res) => {
      window.location.href = "/IlMioProfilo";
      dispatch({
        type: MODIFICA_PARCHEGGIO_ASSOCIATO,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
