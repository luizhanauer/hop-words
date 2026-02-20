import { Quiz, QuizOption } from "../Domain/Entities/Quiz"; // Única fonte da verdade
import { QuizCollection } from "../Domain/Collections/QuizCollection";
import { WordText } from "../Domain/ValueObjects/WordText";

export class GithubPagesDictionaryRepository {
    constructor(private readonly url: string) {}

    public async loadAll(): Promise<QuizCollection> {
        const response = await fetch(this.url);
        if (!response.ok) throw new Error("Falha ao carregar API");
        
        const data = await response.json();
        
        const quizzes = data.map((item: any) => {
            const options = item.options.map((opt: any) => 
                new QuizOption(new WordText(opt.text), opt.isCorrect)
            );
            return new Quiz(new WordText(item.word), options);
        });

        return new QuizCollection(quizzes);
    }
}