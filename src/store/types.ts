import {
	GET_MOVIE_DETAILS,
	GET_MOVIE_CREDITS,
	SET_LOADING,
	SET_ALERT,
	SET_ERROR,
	GET_MOVIE_ID,
} from "./actions/ActionTypes";

export interface MovieId {
	id: number;
}

export interface MovieResults {
	results: MovieId[];
}

interface MovieGenre {
	id: number;
	name: string;
}

interface MovieSpokenLanguage {
	name: string;
}

interface MovieVideo {
	id: string;
	key: string;
}

interface MovieVideoResults {
	results: MovieVideo[];
}

interface MovieImage {
	file_path: string;
}

interface MovieImageBackdrop {
	backdrops: MovieImage[];
}

export interface MovieDetails {
	title: string;
	tagline: string;
	budget: number;
	genres: MovieGenre[];
	homepage: string;
	id: MovieId;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: MovieSpokenLanguage[];
	status: string;
	vote_average: number;
	vote_count: number;
	videos: MovieVideoResults;
	images: MovieImageBackdrop;
}

export interface MovieCast {
	id: number | null;
	name: string | null;
	profile_path: string | null;
	character: string | null;
}

export interface MovieCrew {
	id: number | null;
	name: string | null;
	profile_path: string | null;
	department: string | null;
}

export interface MovieCredits {
	cast: MovieCast[];
	crew: MovieCrew[];
}

export interface MovieError {
	message: string;
}

export interface MovieState {
	id: number | null;
	details: MovieDetails | null;
	credits: MovieCredits | null;
	loading: boolean;
	error: MovieError | null;
}

interface GetMovieIdAction {
	type: typeof GET_MOVIE_ID;
	payload: number | null;
}

interface GetMovieDetailsAction {
	type: typeof GET_MOVIE_DETAILS;
	payload: MovieDetails;
}

interface GetMovieCreditsAction {
	type: typeof GET_MOVIE_CREDITS;
	payload: MovieCredits;
}

interface SetLoadingAction {
	type: typeof SET_LOADING;
}

interface SetErrorAction {
	type: typeof SET_ERROR;
	payload: MovieError;
}

export type MovieAction =
	| GetMovieIdAction
	| GetMovieDetailsAction
	| GetMovieCreditsAction
	| SetLoadingAction
	| SetErrorAction;

export interface AlertAction {
	type: typeof SET_ALERT;
	payload: string;
}

export interface AlertState {
	message: string;
}
