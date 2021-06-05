import React, {
	ChangeEvent,
	FC,
	FormEvent,
	ReactElement,
	useState,
} from "react";
import { useDispatch } from "react-redux";
import { Button, Container, Form, Col } from "react-bootstrap";

import {
	getMovieId,
	setLoading,
	setAlert,
} from "../store/actions/ActionCreator";

export interface SearchProps {
	title: string;
}

const Search: FC<SearchProps> = ({
	title,
}: {
	title: string;
}): ReactElement => {
	const dispatch = useDispatch();

	const [movie, setMovie] = useState("");

	const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setMovie(e.currentTarget.value);
	};

	const submitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (movie.trim() === "") {
			return dispatch(setAlert("Movie title is required!"));
		}

		dispatch(setLoading());
		dispatch(getMovieId(movie));
		setMovie("");
	};

	return (
		<div className="py-3" style={{ backgroundColor: "rgba(0,0,0,.2)" }}>
			<Container>
				<Form onSubmit={submitHandler}>
					<Form.Row className="align-items-center">
						<Col xs={12} md={10}>
							<Form.Control
								type="text"
								placeholder={title}
								onChange={changeHandler}
								value={movie}
							/>
						</Col>
						<Col xs={12} md={2}>
							<Button type="submit" variant="primary" style={{ width: "100%" }}>
								Search
							</Button>
						</Col>
					</Form.Row>
				</Form>
			</Container>
		</div>
	);
};

export default Search;
