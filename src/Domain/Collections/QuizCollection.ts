import { Quiz } from "../Entities/Quiz";
import { WordText } from "../ValueObjects/WordText";

export class QuizCollection {
    constructor(private readonly quizzes: Quiz[]) {}

    public findByWord(word: WordText): Quiz | null {
        const matches = this.quizzes.filter(quiz => quiz.matchesWord(word));
        return this.returnFirstOrNull(matches);
    }

    public getRandom(): Quiz | null {
        return this.returnRandomOrNull(this.quizzes.length);
    }

    private returnFirstOrNull(matches: Quiz[]): Quiz | null {
        if (matches.length === 0) {
            return null;
        }
        return matches[0];
    }

    private returnRandomOrNull(length: number): Quiz | null {
        if (length === 0) {
            return null;
        }
        const randomIndex = Math.floor(Math.random() * length);
        return this.quizzes[randomIndex];
    }
}