import rootReducer from "./reducer";
import { applyMiddleware, compose } from "redux";
import { legacy_createStore as createStore } from "redux";
import thunkMiddleware from "redux-thunk";


// para poder definir el store necesito que este armado el reducer
//para poder armar el reducer necesito poder contemplar los casos de las actions

const componseEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    componseEnhancer(applyMiddleware(thunkMiddleware))
    );

export default store;