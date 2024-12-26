// import React from "react";
// import ReactDOM from "react-dom";
// import { BrowserRouter as Router } from "react-router-dom";
// import 'antd/dist/reset.css';
// import App from "./App";
// import { Provider } from "react-redux";
// import store from "./Store/index";
// import * as serviceWorker from "./serviceWorker";
// // import Wrapper from "./Wrapper"
// // NetworkService.setupInterceptors(store);

// ReactDOM.render(
//   <Provider store={store}>
//   {/* <Wrapper> */}
//     <Router basename={process.env.PUBLIC_URL}>
//       <App />
//     </Router>
//     {/* </Wrapper> */}
//   </Provider>,
//   document.getElementById("root")
// );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();




import React from "react";
import ReactDOM from "react-dom/client"; // Updated import for React 18
import { BrowserRouter as Router } from "react-router-dom";
import 'antd/dist/reset.css';
import App from "./App";
import { Provider } from "react-redux";
import store from "./Store/index";
import * as serviceWorker from "./serviceWorker";

// Create a root element
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    {/* <Wrapper> */}
    <Router basename={process.env.PUBLIC_URL}>
      <App />
    </Router>
    {/* </Wrapper> */}
  </Provider>
);

// Service worker setup (optional)
serviceWorker.unregister();

