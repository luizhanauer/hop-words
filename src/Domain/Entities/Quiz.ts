import { WordText } from "../ValueObjects/WordText";
import { QuizOption } from "./QuizOption";

export class Quiz {
    constructor(
        private readonly targetWord: WordText,
        private readonly options: QuizOption[]
    ) {}

    public matchesWord(word: WordText): boolean {
        return this.targetWord.matches(word);
    }

    public provideQuestionText(): string {
        return `Qual a tradução de: ${this.targetWord.display()}?`;
    }

    public executeOnOptions(action: (option: QuizOption) => void): void {
        this.options.forEach(action);
    }
}