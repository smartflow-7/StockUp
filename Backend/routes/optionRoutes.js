const express = require('express');
const optionRoutes = express.Router();
const {
    createOption,
    getOptionsByQuestion,
    getOptionById,
    updateOption,
    deleteOption,
    checkQuestionAnswer
} = require('../controllers/optionController');

optionRoutes.route('/').post(createOption).get(getOptionsByQuestion);
optionRoutes.route('/:id').get(getOptionById).put(updateOption).delete(deleteOption);
optionRoutes.route('/check-answer').post(checkQuestionAnswer); // Route to check question answer

module.exports = optionRoutes;
