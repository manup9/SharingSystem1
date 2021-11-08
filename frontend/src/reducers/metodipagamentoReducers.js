import {
  VISUALIZZA_METODIPAGAMENTO,
  CANCELLA_METODIPAGAMENTO,
} from "../actions/type";

const INITIAL_STATE = {
  pagamento: [],
  pagamenti: {},
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case VISUALIZZA_METODIPAGAMENTO:
      return {
        ...state,
        pagamento: action.payload,
      };
    case CANCELLA_METODIPAGAMENTO:
      const pagamento = state.pagamento.filter(
        (pagamento) => pagamento._id !== action.payload.id
      );
      return {
        ...state,
        deleted: true,
        pagamento: pagamento,
      };
    default:
      return state;
  }
};
