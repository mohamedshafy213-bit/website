import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AgencyWebsite from "./AgencyWebsite.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AgencyWebsite />
  </React.StrictMode>
);

