import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import { RootState } from "./store";
import Movie from "./components/Movie";
import {
	getMovieId,
	setAlert,
	setError,
	setLoading,
} from "./store/actions/ActionCreator";
import Alert from "./components/Alert";
import Search from "./components/Search";
import Footer from "./components/Footer";
import "./App.css";

function App() {
	const dispatch = useDispatch();
	const movieId = useSelector((state: RootState) => state.movie.id);
	const loading = useSelector((state: RootState) => state.movie.loading);
	const error = useSelector((state: RootState) => state.movie.error?.message);
	const alertMsg = useSelector((state: RootState) => state.alert.message);

	useEffect(() => {
		dispatch(setLoading());
		dispatch(getMovieId("alien"));
	}, [dispatch]);

	return (
		<Fragment>
			<div className="content">
				{error && (
					<Alert message={error} onClose={() => dispatch(setError())} />
				)}
				{alertMsg && (
					<Alert message={alertMsg} onClose={() => dispatch(setAlert(""))} />
				)}
				<Search title="Enter movie name and press search button" />
				{loading ? (
					<div className="container">
						<div className="text-center">
							<p className="mt-5">Loading...</p>
						</div>
					</div>
				) : (
					<motion.div
						initial="hidden"
						animate="visible"
						variants={{
							hidden: {
								opacity: 0,
							},
							visible: {
								opacity: 1,
								transition: {
									delay: 0.9,
								},
							},
						}}
					>
						{movieId && <Movie />}
					</motion.div>
				)}
			</div>
			<Footer />
		</Fragment>
	);
}

export default App;
