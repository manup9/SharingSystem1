import {
  VISUALIZZA_PRENOTAZIONI,
  MODIFICA_PPRENOTAZIONE,
  CANCELLA_PRENOTAZIONE,
} from "../actions/type";

const INITIAL_STATE = {
  prenotazione: [],
  prenotazioni: {},
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case VISUALIZZA_PRENOTAZIONI:
      return {
        ...state,
        prenotazione: action.payload,
      };
    case MODIFICA_PPRENOTAZIONE:
      return {
        ...state,
        isUpdated: true,
        prenotazione: action.payload,
      };
    case CANCELLA_PRENOTAZIONE:
      const prenotazione = state.prenotazione.filter(
        (prenotazione) => prenotazione._id !== action.payload.id
      );
    default:
      return state;
  }
};
