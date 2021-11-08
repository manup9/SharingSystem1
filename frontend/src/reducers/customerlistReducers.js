import { VISUALIZZA_CLIENTI, VISUALIZZA_DIPENDENTI } from "../actions/type";

const INITIAL_STATE = {
  isFound: false,
  isRetrieved: false,
  deleted: false,
  isUpdated: false,
  user: [],
  customer: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case VISUALIZZA_CLIENTI:
      return {
        ...state,
        isRetrieved: true,
        user: action.payload,
      };
    case VISUALIZZA_DIPENDENTI:
      return {
        ...state,
        isRetrieved: true,
        user: action.payload,
      };
    default:
      return state;
  }
};
