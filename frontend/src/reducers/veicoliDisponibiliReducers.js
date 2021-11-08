import { VISUALIZZA_VEICOLI_DISPONIBILI } from "../actions/type";

const INITIAL_STATE = {
  veicolo: [],
  veicoli: {},
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case VISUALIZZA_VEICOLI_DISPONIBILI:
      return {
        ...state,
        veicolo: action.payload,
      };
    default:
      return state;
  }
};
