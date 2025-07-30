const express = require('express');
const questionRoutes = express.Router();
const {
    createQuestion,
    getQuestionsByQuiz,
    getQuestionById,
    updateQuestion,
    deleteQuestion
} = require('../controllers/questionController');

questionRoutes.route('/').post(createQuestion).get(getQuestionsByQuiz);
questionRoutes.route('/:id').get(getQuestionById).put(updateQuestion).delete(deleteQuestion);

module.exports = questionRoutes;