import React, { FC, ReactElement, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Col, Row } from "react-bootstrap";

import { getMovieCredits } from "../store/actions/ActionCreator";
import { RootState } from "../store";
import { MovieCast } from "../store/types";

interface MovieStarsProps {
	stars: MovieCast[];
}

const MovieStars: FC<MovieStarsProps> = ({ stars }): ReactElement => {
	const handleImageError = (e: any) => {
		e.target.src = "http://placehold.jp/253x380.png";
	};

	return (
		<React.Fragment>
			{stars.slice(0, 12).map((star, index) => (
				<Col xs={6} md={2} key={index}>
					<Card className="mb-3">
						<Card.Img
							variant="top"
							src={`https://image.tmdb.org/t/p/w500/${star.profile_path}`}
							onError={handleImageError}
						/>
						<Card.Body>
							<Card.Title>{star.name}</Card.Title>
							<Card.Text>{star.character}</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			))}
		</React.Fragment>
	);
};

const MovieCredits: FC = (): ReactElement => {
	const dispatch = useDispatch();
	const data = useSelector((state: RootState) => state.movie.credits);

	useEffect(() => {
		dispatch(getMovieCredits());
	}, [dispatch]);

	if (!data) return <div></div>;

	return (
		<Fragment>
			<Row>
				<Col xs={12}>
					<h2 className="mb-3">Top Billed Cast</h2>
				</Col>
				<MovieStars stars={data.cast} />
			</Row>
		</Fragment>
	);
};

export default MovieCredits;
