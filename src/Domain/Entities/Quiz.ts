import { WordText } from "../ValueObjects/WordText";

export class QuizOption {
    constructor(
        private readonly text: WordText,
        private readonly isCorrect: boolean
    ) {}

    public display(): string {
        return this.text.toString();
    }

    public checkIsCorrect(): boolean {
        return this.isCorrect;
    }
}

export class Quiz {
    constructor(
        private readonly word: WordText,
        private readonly options: QuizOption[]
    ) {}

    public provideQuestionText(): string {
        return `Qual a tradução de: ${this.word.toString()}?`;
    }

    public executeOnOptions(callback: (option: QuizOption) => void): void {
        this.options.forEach(callback);
    }

    public isMatch(otherWord: WordText): boolean {
        return this.word.equals(otherWord);
    }
}