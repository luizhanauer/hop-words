import { Quiz } from "../Domain/Entities/Quiz";
import { QuizOption } from "../Domain/Entities/QuizOption";

export class TooltipUI {
    private readonly container: HTMLDivElement;

    constructor() {
        this.container = document.createElement("div");
        this.applyStyles();
        document.body.appendChild(this.container);
    }

    private applyStyles(): void {
        Object.assign(this.container.style, {
            position: "absolute",
            background: "#fff",
            border: "1px solid #ccc",
            padding: "15px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            zIndex: "999999",
            fontFamily: "sans-serif",
            display: "none"
        });
    }

    public showAt(x: number, y: number): void {
        this.container.style.left = `${x}px`;
        this.container.style.top = `${y}px`;
        this.container.style.display = "block";
    }

    public hide(): void {
        this.container.style.display = "none";
    }

    public containsTarget(target: EventTarget | null): boolean {
        if (!target) return false;
        return this.container.contains(target as Node);
    }

    public renderQuiz(quiz: Quiz, onGuess: (isCorrect: boolean) => void): void {
        this.clearContainer();
        this.renderTitle(quiz.provideQuestionText());
        quiz.executeOnOptions((option) => this.renderOption(option, onGuess));
    }

    public showFeedback(isCorrect: boolean, onNext: () => void): void {
        this.clearContainer();
        this.renderFeedbackMessage(isCorrect);
        this.renderNextButton(onNext);
        this.renderCloseButton();
    }

    private clearContainer(): void {
        this.container.innerHTML = "";
    }

    private renderTitle(text: string): void {
        const title = document.createElement("h4");
        title.textContent = text;
        title.style.margin = "0 0 10px 0";
        this.container.appendChild(title);
    }

    private renderOption(option: QuizOption, onGuess: (isCorrect: boolean) => void): void {
        const button = document.createElement("button");
        button.textContent = option.display();
        button.style.display = "block";
        button.style.width = "100%";
        button.style.marginBottom = "8px";
        button.style.padding = "8px";
        button.style.cursor = "pointer";
        
        button.addEventListener("click", () => onGuess(option.checkIsCorrect()));
        this.container.appendChild(button);
    }

    private renderFeedbackMessage(isCorrect: boolean): void {
        const message = document.createElement("div");
        message.textContent = isCorrect ? "🎉 Acertou!" : "❌ Errou!";
        message.style.color = isCorrect ? "green" : "red";
        message.style.fontWeight = "bold";
        message.style.marginBottom = "10px";
        this.container.appendChild(message);
    }

    private renderNextButton(onNext: () => void): void {
        const button = document.createElement("button");
        button.textContent = "Próxima Palavra Aleatória";
        button.style.marginRight = "5px";
        button.addEventListener("click", onNext);
        this.container.appendChild(button);
    }

    private renderCloseButton(): void {
        const button = document.createElement("button");
        button.textContent = "Fechar";
        button.addEventListener("click", () => this.hide());
        this.container.appendChild(button);
    }
}