// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import reportWebVitals from "./reportWebVitals";
// import List from "./App1";

// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <List />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
// index.tsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App1";
import AppFireBase from "./firebase";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <AppFireBase></AppFireBase>
  </React.StrictMode>,
  document.getElementById("root")
);
