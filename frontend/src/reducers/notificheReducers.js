import {
  VISUALIZZA_NOTIFICHE,
  INVIA_NOTIFICA_CLIENTE,
  CANCELLA_NOTIFICA,
} from "../actions/type";

const INITIAL_STATE = {
  notifica: [],
  notifiche: {},
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case VISUALIZZA_NOTIFICHE:
      return {
        ...state,
        notifica: action.payload,
      };
    case CANCELLA_NOTIFICA:
      const notifica = state.notifica.filter(
        (notifica) => notifica._id !== action.payload.id
      );
      return {
        ...state,
        deleted: true,
        notifica: notifica,
      };
    case INVIA_NOTIFICA_CLIENTE:
      return {
        ...state,
        notifica: action.payload,
      };
    default:
      return state;
  }
};
