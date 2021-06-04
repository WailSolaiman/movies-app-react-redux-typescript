import { AlertAction, AlertState } from "../types";

const initialState: AlertState = {
	message: "",
};

const AlertReducer = (state = initialState, action: AlertAction) => {
	switch (action.type) {
		case "SET_ALERT":
			return {
				...state,
				message: action.payload,
			};
		default:
			return state;
	}
};

export default AlertReducer;
