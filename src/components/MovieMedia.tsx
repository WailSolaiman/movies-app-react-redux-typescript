import React, { FC, ReactElement, Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import ImageGallery from "react-image-gallery";

import { MovieDetails } from "../store/types";

interface MovieMediaProps {
	data: MovieDetails;
}

const MovieMediaFilter: FC<MovieMediaProps> = ({
	data,
}: {
	data: MovieDetails;
}): ReactElement => {
	const PHOTOS = data.images.backdrops.map((image) => ({
		original: `https://image.tmdb.org/t/p/original/${image.file_path}`,
		thumbnail: `https://image.tmdb.org/t/p/w500/${image.file_path}`,
	}));

	return (
		<Fragment>
			<ImageGallery items={PHOTOS} />
		</Fragment>
	);
};

const MovieMedia: FC<MovieMediaProps> = ({
	data,
}: {
	data: MovieDetails;
}): ReactElement => {
	return (
		<Fragment>
			<Row>
				<Col xs={12}>
					<h2 className="mb-3">Media: Images</h2>
				</Col>
			</Row>
			<Row>
				<Col xs={12}>
					<MovieMediaFilter data={data} />
				</Col>
			</Row>
			<Row>
				<Col xs={12}>
					<h2 className="mb-3">Media: Trailer</h2>
				</Col>
				<Col>
					<iframe
						title={data.title}
						className="has-ratio"
						style={{ width: "100%", height: 700 }}
						src={`https://www.youtube.com/embed/${data.videos.results[0]?.key}?playlist=VIDEO_ID&loop=1&showinfo=0&controls=0&rel=0&showinfo=0&disablekb=1&iv_load_policy=3&modestbranding=1`}
						frameBorder="0"
						allowFullScreen={true}
					></iframe>
				</Col>
			</Row>
		</Fragment>
	);
};

export default MovieMedia;
