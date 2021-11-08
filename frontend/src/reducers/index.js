import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import customerlistReducers from "./customerlistReducers";
import veicoliReducers from "./veicoliReducers";
import parcheggiReducers from "./parcheggiReducers";
import metodipagamentoReducers from "./metodipagamentoReducers";
import veicoliDisponibiliReducers from "./veicoliDisponibiliReducers";
import prenotazioniReducers from "./prenotazioniReducers";
import notificheReducers from "./notificheReducers";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  customerlist: customerlistReducers,
  listaveicoli: veicoliReducers,
  listaparcheggi: parcheggiReducers,
  listametodipagamento: metodipagamentoReducers,
  listaveicolidisponibili: veicoliDisponibiliReducers,
  listaprenotazioni: prenotazioniReducers,
  listanotifiche: notificheReducers,
});
