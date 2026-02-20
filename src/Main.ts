import { GithubPagesDictionaryRepository } from "./Infrastructure/GithubPagesDictionaryRepository";
import { TooltipUI } from "./Presentation/TooltipUI";
import { WordText } from "./Domain/ValueObjects/WordText";
import { QuizCollection } from "./Domain/Collections/QuizCollection";
import { Quiz } from "./Domain/Entities/Quiz";

class ExtensionApp {
    constructor(
        private readonly repository: GithubPagesDictionaryRepository,
        private readonly ui: TooltipUI
    ) {}

    public async initialize(): Promise<void> {
        const dictionary = await this.repository.loadAll();
        this.attachEventListeners(dictionary);
    }

    private attachEventListeners(dictionary: QuizCollection): void {
        document.addEventListener("dblclick", (event) => this.handleTextSelection(event, dictionary));
        document.addEventListener("mousedown", (event) => this.hideUiIfClickedOutside(event));
    }

    private handleTextSelection(event: MouseEvent, dictionary: QuizCollection): void {
        const selection = window.getSelection();
        const selectedText = selection?.toString().trim() || "";
        this.processSelectedText(selectedText, event, dictionary);
    }

    private processSelectedText(text: string, event: MouseEvent, dictionary: QuizCollection): void {
        if (!text) return;

        const word = new WordText(text);
        const quiz = dictionary.findByWord(word);
        this.displayQuizIfFound(quiz, dictionary, event.pageX, event.pageY);
    }

    private displayQuizIfFound(quiz: Quiz | null, dictionary: QuizCollection, x: number, y: number): void {
        if (!quiz) return;

        this.ui.renderQuiz(quiz, (isCorrect) => {
            this.ui.showFeedback(isCorrect, () => this.showRandomQuiz(dictionary, x, y));
        });
        this.ui.showAt(x, y + 15);
    }

    private showRandomQuiz(dictionary: QuizCollection, x: number, y: number): void {
        const randomQuiz = dictionary.getRandom();
        this.displayQuizIfFound(randomQuiz, dictionary, x, y);
    }

    private hideUiIfClickedOutside(event: MouseEvent): void {
        const isClickInsideUi = this.ui.containsTarget(event.target);
        this.executeHideIfNotInside(isClickInsideUi);
    }

    private executeHideIfNotInside(isInside: boolean): void {
        if (isInside) return;
        this.ui.hide();
    }
}

// Inicialização
// Atualize o endpoint para o seu domínio real
const API_URL = "https://luizhanauer.github.io/hop-words/words.json";
const app = new ExtensionApp(new GithubPagesDictionaryRepository(API_URL), new TooltipUI());
app.initialize();