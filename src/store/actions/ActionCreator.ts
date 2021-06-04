import { ThunkAction } from "redux-thunk";

import {
	MovieResults,
	MovieAction,
	MovieDetails,
	MovieError,
	MovieCredits,
	AlertAction,
} from "../types";
import {
	GET_MOVIE_CREDITS,
	GET_MOVIE_DETAILS,
	GET_MOVIE_ID,
	SET_ALERT,
	SET_ERROR,
	SET_LOADING,
} from "./ActionTypes";
import { RootState } from "../";

export const getMovieId = (
	movieQuery: string
): ThunkAction<void, RootState, null, MovieAction | AlertAction> => {
	return async (dispatch) => {
		try {
			const timeout: number = 3000;
			const controller = new AbortController();
			const id = setTimeout(() => {
				controller.abort();
				dispatch({
					type: SET_ALERT,
					payload: "Movie not found!",
				});
			}, timeout);

			const response = await fetch(
				`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${movieQuery}`,
				{
					signal: controller.signal,
				}
			);

			if (!response.ok) {
				const responseData: MovieError = await response.json();
				dispatch({
					type: SET_ERROR,
					payload: {
						message: responseData.message,
					},
				});
			}

			const movie: MovieResults = await response.json();
			const movieId: number = movie.results[0]?.id;
			if (movieId) {
				dispatch({
					type: SET_ALERT,
					payload: "",
				});
				dispatch({
					type: GET_MOVIE_ID,
					payload: movieId,
				});
			} else {
				// dispatch({
				// 	type: SET_ALERT,
				// 	payload: "Movie not found.",
				// });
				dispatch({
					type: SET_ALERT,
					payload: "",
				});
				dispatch({
					type: SET_ERROR,
					payload: {
						message: "Movie file not found!",
					},
				});
			}

			clearTimeout(id);
		} catch (error) {
			console.error("ERROR: " + error);
		}
	};
};

export const getMovieDetails = (): ThunkAction<
	void,
	RootState,
	null,
	MovieAction
> => {
	return async (dispatch, getState) => {
		const id = getState().movie.id;
		if (id) {
			try {
				const response = await fetch(
					`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos,images`
				);
				if (!response.ok) {
					const responseData: MovieError = await response.json();
					dispatch({
						type: SET_ERROR,
						payload: {
							message: responseData.message,
						},
					});
				}
				const movieDetails: MovieDetails = await response.json();
				dispatch({
					type: GET_MOVIE_DETAILS,
					payload: {
						id: movieDetails.id,
						title: movieDetails.title,
						tagline: movieDetails.tagline,
						budget: movieDetails.budget,
						genres: movieDetails.genres,
						homepage: movieDetails.homepage,
						original_language: movieDetails.original_language,
						original_title: movieDetails.original_language,
						overview: movieDetails.overview,
						popularity: movieDetails.popularity,
						poster_path: movieDetails.poster_path,
						release_date: movieDetails.release_date,
						revenue: movieDetails.revenue,
						runtime: movieDetails.runtime,
						spoken_languages: movieDetails.spoken_languages,
						status: movieDetails.status,
						vote_average: movieDetails.vote_average,
						vote_count: movieDetails.vote_count,
						videos: movieDetails.videos,
						images: movieDetails.images,
					},
				});
			} catch (error) {
				console.error("ERROR: " + error);
			}
		}
	};
};

export const getMovieCredits = (): ThunkAction<
	void,
	RootState,
	null,
	MovieAction
> => {
	return async (dispatch, getState) => {
		const id = getState().movie.id;
		if (id) {
			try {
				const response = await fetch(
					`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
				);
				if (!response.ok) {
					const responseData: MovieError = await response.json();
					dispatch({
						type: SET_ERROR,
						payload: {
							message: responseData.message,
						},
					});
				}
				const movieCredits: MovieCredits = await response.json();
				const cast = movieCredits.cast.map((star) => ({
					name: star.name,
					id: star.id,
					character: star.character,
					profile_path: star.profile_path,
				}));
				const crew = movieCredits.crew.map((worker) => ({
					name: worker.name,
					id: worker.id,
					department: worker.department,
					profile_path: worker.profile_path,
				}));
				dispatch({
					type: GET_MOVIE_CREDITS,
					payload: {
						cast,
						crew,
					},
				});
			} catch (error) {
				console.error("ERROR: " + error);
			}
		}
	};
};

export const setLoading = (): MovieAction => {
	return {
		type: SET_LOADING,
	};
};

export const setError = (): MovieAction => {
	return {
		type: SET_ERROR,
		payload: {
			message: "",
		},
	};
};

export const setAlert = (message: string): AlertAction => {
	return {
		type: SET_ALERT,
		payload: message,
	};
};
