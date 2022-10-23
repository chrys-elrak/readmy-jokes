import joke from '../joke';
import { Lang } from '../types/lang';
import { Joke, JokeType } from './../types/joke';
export default async function getJoke(jokeType: JokeType, lang: Lang = Lang.DEFAULT): Promise<Joke<JokeType>> {
    let db: { [key: string]: any} = {};
    switch (lang) {
        case Lang.EN: {
            let { default: en } = await import('../../assets/jokes/jokes.en.json');
            db = { ...db, ...en };
            break;
        }
        case Lang.MG: {
            let { default: mg } = await import('../../assets/jokes/jokes.mg.json');
            db = { ...db, ...mg };
            break;
        } case Lang.FR: {
            let { default: fr } = await import('../../assets/jokes/jokes.fr.json');
            db = { ...db, ...fr };
            break;
        }
        default: {
            let { default: def } = await import('../../assets/jokes/jokes.default.json');
            db = { ...db, ...def };
            break;
        }
    }
    // turn db into array
    const jokes = Object.keys(db).map((key: string) => db[key]).filter((joke: Joke<JokeType>) => joke.type === jokeType);
    // get random joke
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    return randomJoke;
}