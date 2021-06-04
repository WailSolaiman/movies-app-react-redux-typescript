import React, { FC } from "react";
import { Container } from "react-bootstrap";

const Footer: FC = () => {
	return (
		<div style={{ backgroundColor: "rgba(0,0,0,.2)" }}>
			<Container>
				<footer className="mt-5">
					<p className="text-center m-0 py-3">
						Copyright © Wail Solaiman 2021 All Rights Reserved
					</p>
				</footer>
			</Container>
		</div>
	);
};

export default Footer;
