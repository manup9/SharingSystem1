import {
  INSERISCI_PARCHEGGIO,
  VISUALIZZA_PARCHEGGI,
  ERROR_PARCHEGGI,
} from "../actions/type";

const INITIAL_STATE = {
  parcheggio: [],
  parcheggi: {},
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INSERISCI_PARCHEGGIO:
      return {
        ...state,
        parcheggio: [action.payload],
      };
    case VISUALIZZA_PARCHEGGI:
      return {
        ...state,
        parcheggio: action.payload,
      };
    default:
      return state;
  }
};
