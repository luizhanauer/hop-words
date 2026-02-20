export class WordText {
    constructor(private readonly value: string) {}

    public matches(other: WordText): boolean {
        return this.value.toLowerCase() === other.value.toLowerCase();
    }

    public display(): string {
        return this.value;
    }
}