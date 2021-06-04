import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger";

import MovieReducer from "./reducers/MovieReducer";
import AlertReducer from "./reducers/AlertReducer";

const rootReducer = combineReducers({
	movie: MovieReducer,
	alert: AlertReducer,
});

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk, logger))
);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
