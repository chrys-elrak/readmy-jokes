import { Joke, JokeType } from './../types/joke';
export default function getJoke(jokeType: JokeType): Joke<JokeType> {
    if (jokeType === "QA") {
        return {
            type: "QA",
            question: "How can you tell if a lawyer is well hung?",
            answer: "You can’t get a finger between the rope and his <code>neck!</code>",
            author: "Chrys Rakotonimanana"
        };
    }
    if (jokeType === "JK") {
        return {
            type: "JK",
            joke: `An exercise for people who are out of shape: Begin with a five-pound potato bag in each hand. Extend your arms straight out from your sides, hold them there for a full minute, and then relax. After a few weeks, move up to ten-pound potato bags. Then try 50-pound potato bags, and eventually try to get to where you can lift a 100-pound potato bag in each hand and hold your arms straight for more than a full minute. Once you feel confident at that level, put a potato in each bag.`,
            author: "Beverly Gross"
        };
    }
    if (jokeType === "MM") {
        return {
            type: "MM",
            url: "https://i.imgflip.com/1g8my4.jpg",
            author: "Chrys Rakotonimanana"
        };
    }
    throw new Error("Invalid joke type");
}