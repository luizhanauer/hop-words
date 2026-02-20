import { QuizCollection } from "../Domain/Collections/QuizCollection";
import { Quiz } from "../Domain/Entities/Quiz";
import { QuizOption } from "../Domain/Entities/QuizOption";
import { WordText } from "../Domain/ValueObjects/WordText";

export class GithubPagesDictionaryRepository {
    constructor(private readonly endpoint: string) {}

    public async loadAll(): Promise<QuizCollection> {
        const response = await fetch(this.endpoint);
        const data = await response.json();
        return this.mapToDomain(data);
    }

    private mapToDomain(data: any[]): QuizCollection {
        const quizzes = data.map(item => this.createQuizFromItem(item));
        return new QuizCollection(quizzes);
    }

    private createQuizFromItem(item: any): Quiz {
        const targetWord = new WordText(item.word);
        const options = item.options.map((opt: any) => new QuizOption(new WordText(opt.text), opt.isCorrect));
        return new Quiz(targetWord, options);
    }
}