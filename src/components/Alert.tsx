import React, { FC } from "react";
import { Alert as AlertCmp, Col, Container, Row } from "react-bootstrap";
import { motion } from "framer-motion";

interface AlertProps {
	message: string;
	onClose: () => void;
}

const Alert: FC<AlertProps> = ({ message, onClose }) => {
	return (
		<Container>
			<Row>
				<Col className="my-3">
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
									delay: 0.1,
								},
							},
						}}
					>
						<AlertCmp variant="danger" onClose={onClose} dismissible>
							<AlertCmp.Heading>{message}</AlertCmp.Heading>
						</AlertCmp>
					</motion.div>
				</Col>
			</Row>
		</Container>
	);
};

export default Alert;
