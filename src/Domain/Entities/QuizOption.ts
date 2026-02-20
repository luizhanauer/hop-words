import { WordText } from "../ValueObjects/WordText";

export class QuizOption {
    constructor(
        private readonly text: WordText,
        private readonly isCorrectOption: boolean
    ) {}

    public checkIsCorrect(): boolean {
        return this.isCorrectOption;
    }

    public display(): string {
        return this.text.display();
    }
}