import express from "express";
const quizRoutes = express.Router();
import {
    createQuiz,
    getQuizzesByModule,
    getQuizById,
    updateQuiz,
    deleteQuiz
} from '../controllers/quizController.js';

quizRoutes.route('/').post(createQuiz);
quizRoutes.route('/by-module/:moduleId').get(getQuizzesByModule);
quizRoutes.route('/:id').get(getQuizById).put(updateQuiz).delete(deleteQuiz);

export default quizRoutes;