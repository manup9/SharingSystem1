import {
  INSERISCI_VEICOLO,
  VISUALIZZA_VEICOLI,
  ERROR_VEICOLI,
  CANCELLA_VEICOLO,
  GET_SPECIFIC_VEICOLO,
  MODIFICA_VEICOLO,
} from "../actions/type";

const INITIAL_STATE = {
  veicolo: [],
  veicoli: {},
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INSERISCI_VEICOLO:
      return {
        ...state,
        veicolo: [action.payload],
      };
    case VISUALIZZA_VEICOLI:
      return {
        ...state,
        veicolo: action.payload,
      };
    case ERROR_VEICOLI:
      return {
        ...state,
        error: action.error,
      };
    case CANCELLA_VEICOLO:
      const veicolo = state.veicolo.filter(
        (veicolo) => veicolo._id !== action.payload.id
      );
      return {
        ...state,
        deleted: true,
        veicolo: veicolo,
      };
    case GET_SPECIFIC_VEICOLO:
      return {
        ...state,
        isFound: true,
        veicolo: action.payload,
      };
    case MODIFICA_VEICOLO:
      return {
        ...state,
        isUpdated: true,
        veicolo: action.payload,
      };
    default:
      return state;
  }
};
