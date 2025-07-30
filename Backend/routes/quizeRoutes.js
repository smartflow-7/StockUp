const express = require('express');
const quizRoutes = express.Router();
const {
    createQuiz,
    getQuizzesByModule,
    getQuizById,
    updateQuiz,
    deleteQuiz
} = require('../controllers/quizController');

quizRoutes.route('/').post(createQuiz).get(getQuizzesByModule);
quizRoutes.route('/:id').get(getQuizById).put(updateQuiz).delete(deleteQuiz);

module.exports = quizRoutes;