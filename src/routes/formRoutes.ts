import { Router } from "express";
import {
	getAllClients,
	getClientForm,
	removeAllClients,
	submitForm,
} from "../controllers/formController";

const router = Router();

router.get("/getallclients", getAllClients);
router.post("/removeallclients", removeAllClients);
router.get("/:industry/:clientId", getClientForm);
router.post("/submit", submitForm);

export default router;
