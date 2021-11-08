import {
  SET_CURRENT_USER,
  USER_LOADING,
  CANCELLA_DIPENDENTE,
  MODIFICA_PASSWORD,
  MODIFICA_PATENTE,
  MODIFICA_PARCHEGGIO_ASSOCIATO,
} from "../actions/type";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CANCELLA_DIPENDENTE:
      const user = state.user.filter((user) => user._id !== action.payload.id);
      return {
        ...state,
        deleted: true,
        user: user,
      };
    case MODIFICA_PASSWORD:
      return {
        ...state,
        isUpdated: true,
        user: action.payload,
      };
    case MODIFICA_PATENTE:
      return {
        ...state,
        isUpdated: true,
        user: action.payload,
      };
    case MODIFICA_PARCHEGGIO_ASSOCIATO:
      return {
        ...state,
        isUpdated: true,
        user: action.payload,
      };
    default:
      return state;
  }
}
