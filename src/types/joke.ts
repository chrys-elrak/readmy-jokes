export type JokeType = "QA" | "JK" | "MM";

export type Joke<T extends JokeType> = {
    type: T;
} & (
    T extends "QA" ? { question: string, answer: string } :
    T extends "JK" ? { joke: string } :
    T extends "MM" ? { url: string } : never
) & {author: string};
