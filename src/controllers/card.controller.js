import mongoose from "mongoose";
import Card from '../models/card.model.js';

export const createCard = async (req, res) => {
    const card = req.body;
    const newCard = new Card(card);

    try {
        await newCard.save();
        
        res.status(201).json(newCard);
    } catch (err) {
        res.status(409).json({ message: err.message});
    }
};

export const getAllCards = async (req, res) => {
   try {
       const cards = await Card.find();

       res.status(200).json(cards);
   } catch(err){
       res.status(400).json({ message: err.message });
   }
}

export const getSingleCard = async (req, res) => {
    const id = req.params.cardId;
    try{
        const card = await Card.findById(id);

        res.status(200).json(card);
    } catch(err){
        res.status(404).json({ message: err.message });
    }
}

export const updateCard = async (req, res) => {
    const id = req.params.cardId;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    const isValidID = mongoose.Types.ObjectId.isValid(id);

    if(!isValidID) return res.status(404).send(`No card with id: ${id}`);

    const updateCardData = { creator, title, message, tags, selectedFile };

    const updatedCard = await Card.findByIdAndUpdate(id, updateCardData);

    res.json(updatedCard);
}

export const deleteCard = async (req, res) => {
    const id = req.params.cardId;

    const isValidID = mongoose.Types.ObjectId.isValid(id);

    if (!isValidID) return res.status(404).send(`No card with id: ${id}`);

    await Card.findByIdAndRemove(id);

    res.json({ message: "Card deleted successfully." });
}


export const likeCard = async ( req, res) => {
    const id = req.params.cardId;

    const isValidID = mongoose.Types.ObjectId.isValid(id);

    if(!isValidID) return res.status(404).send(`No card with id: ${id}`);

    try{
        const card = await Card.findById(id);

        const index = card.likes.findIndex((id) => id === String(req.userId));

        if(index === -1) {
            card.likes.push(req.userId);
        } else {
            card.likes = card.likes.filter((id) => id !== String(req.userId));
        }

        const updateCard = await Card.findByIdAndUpdate(id, card, { new: true});

        res.json(updateCard);
    } catch(err) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong.' });
    }
}

