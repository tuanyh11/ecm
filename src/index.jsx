import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

// import { store } from "./redux/store"
// import { Provider } from "react-redux";

import "./assets/boxicons-2.0.7/css/boxicons.min.css";
// import './assets'
import "./sass/index.scss";

import Layout from "./components/ui/Layout";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render( 
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      
        {/* <App/> */}
        <Layout />
        {/* <Test></Test> */}
    </QueryClientProvider>
  </React.StrictMode>
);

reportWebVitals();
