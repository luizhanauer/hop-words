// Importação unificada para resolver o erro TS2307
import { Quiz, QuizOption } from "../Domain/Entities/Quiz";

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
            background: "#ffffff",
            border: "1px solid #e0e0e0",
            padding: "16px",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            zIndex: "2147483647", // Valor máximo para garantir que fique acima de tudo
            fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
            display: "none",
            minWidth: "200px"
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
        return target instanceof Node && this.container.contains(target);
    }

    public renderQuiz(quiz: Quiz, onGuess: (isCorrect: boolean) => void): void {
        this.clearContainer();
        
        const title = this.createTitle(quiz.provideQuestionText());
        this.container.appendChild(title);

        quiz.executeOnOptions((option) => {
            const button = this.createOptionButton(option, onGuess);
            this.container.appendChild(button);
        });
    }

    public showFeedback(isCorrect: boolean, onNext: () => void): void {
        this.clearContainer();
        
        const message = this.createFeedbackMessage(isCorrect);
        const nextBtn = this.createButton("Próxima Palavra", onNext, "#4CAF50", "#fff");
        const closeBtn = this.createButton("Fechar", () => this.hide(), "#f44336", "#fff");

        this.container.appendChild(message);
        this.container.appendChild(nextBtn);
        this.container.appendChild(closeBtn);
    }

    private clearContainer(): void {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
    }

    private createTitle(text: string): HTMLElement {
        const title = document.createElement("h4");
        title.textContent = text;
        title.style.margin = "0 0 12px 0";
        title.style.color = "#333";
        return title;
    }

    private createOptionButton(option: QuizOption, onGuess: (isCorrect: boolean) => void): HTMLButtonElement {
        const btn = this.createButton(option.display(), () => onGuess(option.checkIsCorrect()));
        btn.style.width = "100%";
        btn.style.marginBottom = "8px";
        return btn;
    }

    private createFeedbackMessage(isCorrect: boolean): HTMLDivElement {
        const div = document.createElement("div");
        div.textContent = isCorrect ? "🎉 Excelente!" : "❌ Quase lá!";
        div.style.color = isCorrect ? "#2e7d32" : "#d32f2f";
        div.style.fontWeight = "bold";
        div.style.marginBottom = "12px";
        div.style.textAlign = "center";
        return div;
    }

    private createButton(text: string, onClick: () => void, bg = "#f0f0f0", color = "#333"): HTMLButtonElement {
        const btn = document.createElement("button");
        btn.textContent = text;
        btn.style.padding = "8px 12px";
        btn.style.border = "none";
        btn.style.borderRadius = "6px";
        btn.style.cursor = "pointer";
        btn.style.backgroundColor = bg;
        btn.style.color = color;
        btn.style.fontWeight = "500";
        btn.style.marginRight = "4px";
        btn.style.transition = "filter 0.2s";
        
        btn.onmouseover = () => { btn.style.filter = "brightness(0.9)"; };
        btn.onmouseout = () => { btn.style.filter = "brightness(1)"; };
        btn.onclick = onClick;
        
        return btn;
    }
}