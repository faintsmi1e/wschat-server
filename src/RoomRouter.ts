import { Router } from "express";
import RoomController from "./RoomController";

const router = Router();

router.post('/room', RoomController.create);
router.get('/room',RoomController.getAll);

export default router;