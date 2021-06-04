import React, { FC, ReactElement, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";

import { getMovieDetails } from "../store/actions/ActionCreator";
import { RootState } from "../store";
import MovieCredits from "./MovieCredits";
import MovieMedia from "./MovieMedia";

const Movie: FC = (): ReactElement => {
	const dispatch = useDispatch();
	const data = useSelector((state: RootState) => state.movie.details);

	useEffect(() => {
		dispatch(getMovieDetails());
	}, [dispatch]);

	const handleImageError = (e: any) => {
		e.target.src = "http://placehold.jp/253x380.png";
	};

	if (!data) return <div></div>;

	return (
		<Fragment>
			<div
				style={{
					backgroundImage: `url(https://image.tmdb.org/t/p/original/${data.images.backdrops[0]?.file_path})`,
					backgroundSize: "contain",
					backgroundPosition: "right",
					backgroundRepeat: "no-repeat",
					borderBottom: "2px solid red",
				}}
			>
				<div
					style={{
						padding: "50px 0",
						backgroundImage:
							"linear-gradient( 109.6deg,  rgba(62,161,219,0.8) 11.2%, rgba(93,52,236,0.8) 100.2% )",
					}}
				>
					<Container>
						<div>
							<Row>
								<Col xs={12} md={4}>
									<img
										style={{ width: "100%" }}
										src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}
										alt={data.title}
										onError={handleImageError}
									/>
								</Col>
								<Col xs={12} md={8}>
									<div className="movie-infos">
										<h1 className="title">
											{data.title} ({data.release_date.substr(0, 4)})
										</h1>
										<p className="subtitle">
											<span>
												{data.release_date} -
												{data.genres.map((genre) => (
													<span key={genre.id}> {genre.name}. </span>
												))}{" "}
											</span>
										</p>
										<p>
											Language: {data.spoken_languages[0].name} - Runtime:{" "}
											{data.runtime} Min.
										</p>
										<h6>
											Vote Average: {data.vote_average} - Vote Count:{" "}
											{data.vote_count} - Popularity: {data.popularity}
										</h6>
										<h4 className="my-3 blue-color">
											{data.tagline.toUpperCase()}
										</h4>
										<h4>
											<b>Overview</b>
										</h4>
										<p>{data.overview}</p>
										{data.budget > 0 && data.revenue > 0 ? (
											<p>
												<b>Budget: </b>
												{data.budget.toLocaleString("en-US", {
													style: "currency",
													currency: "USD",
												})}{" "}
												- <b>Revenue: </b>
												{data.revenue.toLocaleString("en-US", {
													style: "currency",
													currency: "USD",
												})}
											</p>
										) : null}
										<p>
											<b>Status:</b> {data.status}
										</p>
										{data.homepage && (
											<p>
												<b>Homepage:</b>{" "}
												<a
													href={data.homepage}
													target="_blank"
													rel="noreferrer"
												>
													{data.homepage}
												</a>
											</p>
										)}
									</div>
								</Col>
							</Row>
						</div>
					</Container>
				</div>
			</div>
			<Container>
				<MovieCredits />
				<MovieMedia data={data} />
			</Container>
		</Fragment>
	);
};

export default Movie;
