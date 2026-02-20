import { WordText } from "./Domain/ValueObjects/WordText";
import { QuizOption } from "./Domain/Entities/QuizOption";
import { Quiz } from "./Domain/Entities/Quiz";
import { QuizCollection } from "./Domain/Collections/QuizCollection";

function runTerminalTest() {
    console.log("--- Iniciando Teste do Domínio (HopWords) ---\n");

    // 1. Criando os objetos de domínio manualmente (simulando a API)
    const alwaysOption1 = new QuizOption(new WordText("Sempre"), true);
    const alwaysOption2 = new QuizOption(new WordText("Nunca"), false);
    const quiz1 = new Quiz(new WordText("always"), [alwaysOption1, alwaysOption2]);

    const neverOption1 = new QuizOption(new WordText("Sempre"), false);
    const neverOption2 = new QuizOption(new WordText("Nunca"), true);
    const quiz2 = new Quiz(new WordText("never"), [neverOption1, neverOption2]);

    // 2. Criando a coleção de primeira classe
    const dictionary = new QuizCollection([quiz1, quiz2]);

    // 3. Simulando o usuário selecionando a palavra "always"
    const selectedText = "always";
    console.log(`[Usuário] Selecionou a palavra: "${selectedText}"`);

    const wordToSearch = new WordText(selectedText);
    const foundQuiz = dictionary.findByWord(wordToSearch);

    if (foundQuiz) {
        console.log(`✅ Quiz encontrado com sucesso!`);
        console.log(`\nPergunta da Extensão: ${foundQuiz.provideQuestionText()}`);
        
        console.log("\nOpções geradas:");
        foundQuiz.executeOnOptions((option) => {
            const status = option.checkIsCorrect() ? "✅ Certa" : "❌ Errada";
            console.log(` -> ${option.display()} (${status})`);
        });

    } else {
        console.log("❌ Palavra não encontrada no dicionário.");
    }
    
    console.log("\n--- Teste Finalizado ---");
}

runTerminalTest();