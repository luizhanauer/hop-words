export class WordText {
    private readonly value: string;

    constructor(value: string) {
        if (!value || value.trim().length === 0) {
            throw new Error("O texto da palavra não pode estar vazio.");
        }
        this.value = value.trim().toLowerCase();
    }

    public equals(other: WordText): boolean {
        return this.value === other.toString();
    }

    public toString(): string {
        return this.value;
    }
}