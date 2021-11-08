import {
  GET_ERRORS,
  ERROR_DIPENDENTI,
  GET_ERRORS_MODIFICAPASSWORD,
} from "../actions/type";

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case GET_ERRORS_MODIFICAPASSWORD:
      return action.payload;
    case ERROR_DIPENDENTI:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
