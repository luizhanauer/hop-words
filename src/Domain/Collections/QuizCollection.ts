import { Quiz } from "../Entities/Quiz";
import { WordText } from "../ValueObjects/WordText";

export class QuizCollection {
    constructor(private readonly quizzes: Quiz[]) {}

    public findByWord(word: WordText): Quiz | null {
        // Mudamos de matchesWord para isMatch para bater com a Entidade
        return this.quizzes.find(quiz => quiz.isMatch(word)) || null;
    }

    public getRandom(): Quiz | null {
        if (this.quizzes.length === 0) return null;
        const index = Math.floor(Math.random() * this.quizzes.length);
        return this.quizzes[index];
    }
}