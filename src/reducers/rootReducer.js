// AQUI ES DONDE ESTAN TODOS LOS REDUCERS

// COMBINAR LOS REDUCERS
import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { calendarReducer } from "./calendarReducer";

import { uiReducer } from "./uiRecuder";

export const rootReducer = combineReducers({
  ui: uiReducer,
  calendar: calendarReducer,
  auth: authReducer
})