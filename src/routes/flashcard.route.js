import express from "express";
import { createCard, getAllCards, updateCard, deleteCard, likeCard } from "../controllers/card.controller.js";
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllCards);
router.post('/', auth, createCard);
router.patch('/:cardId',auth, updateCard);
router.delete('/:cardId', auth, deleteCard);
router.patch('/:cardId/likeCard', auth, likeCard);

export default router;