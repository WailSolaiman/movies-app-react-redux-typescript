import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-image-gallery/styles/css/image-gallery.css";

import App from "./App";
import store from "./store";

ReactDOM.render(
	<React.Fragment>
		<Provider store={store}>
			<App />
		</Provider>
	</React.Fragment>,
	document.getElementById("root")
);
