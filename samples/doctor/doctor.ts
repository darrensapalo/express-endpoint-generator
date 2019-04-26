import express from "express";

import creation from "./create";
import deletion from "./delete";
import fetch from "./get";

/**
 * This defines the subroutes for modifying the resource,
 * Doctor.
 * 
 * This was automatically generated on April 26, 2019 4:25 PM.
 */
const DoctorRoutes = express.Router();

DoctorRoutes.get("/:identifier", fetch);
DoctorRoutes.post("/", creation);
DoctorRoutes.delete("/:identifier", deletion);

export default DoctorRoutes;
