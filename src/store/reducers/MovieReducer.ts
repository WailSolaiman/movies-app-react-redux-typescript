import { MovieAction, MovieState } from "../types";

const initialState: MovieState = {
	id: null,
	details: null,
	credits: {
		cast: [
			{
				character: null,
				id: null,
				name: null,
				profile_path: null,
			},
		],
		crew: [
			{
				department: null,
				id: null,
				name: null,
				profile_path: null,
			},
		],
	},
	loading: false,
	error: null,
};

const MovieReducer = (state = initialState, action: MovieAction) => {
	switch (action.type) {
		case "GET_MOVIE_ID":
			return {
				id: action.payload,
				details: null,
				credits: {
					cast: [
						{
							character: null,
							id: null,
							name: null,
							profile_path: null,
						},
					],
					crew: [
						{
							department: null,
							id: null,
							name: null,
							profile_path: null,
						},
					],
				},
				loading: false,
				error: null,
			};
		case "GET_MOVIE_DETAILS":
			return {
				...state,
				details: action.payload,
			};
		case "GET_MOVIE_CREDITS":
			return {
				...state,
				credits: action.payload,
			};
		case "SET_LOADING":
			return {
				...state,
				loading: true,
			};
		case "SET_ERROR":
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		default:
			return state;
	}
};

export default MovieReducer;
