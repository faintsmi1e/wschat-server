import { Router } from "express";
import RoomController from "./RoomController";

const router = Router();

router.post('/room', RoomController.create);
router.get('/room/:id',RoomController.get);

export default router;