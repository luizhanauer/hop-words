import { WordText } from "./Domain/ValueObjects/WordText";
import { Quiz, QuizOption } from "./Domain/Entities/Quiz"; // Importe os dois daqui
import { QuizCollection } from "./Domain/Collections/QuizCollection";

function runTerminalTest() {
    const opt1 = new QuizOption(new WordText("Sempre"), true);
    const opt2 = new QuizOption(new WordText("Nunca"), false);
    const quiz = new Quiz(new WordText("always"), [opt1, opt2]);

    const dictionary = new QuizCollection([quiz]);
    const found = dictionary.findByWord(new WordText("always"));

    if (found) {
        console.log("✅ Teste com sucesso!");
        console.log(found.provideQuestionText());
    }
}

runTerminalTest();