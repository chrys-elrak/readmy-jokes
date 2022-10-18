import type { VercelRequest, VercelResponse } from '@vercel/node';
import { renderJoke, renderMemes, renderQa } from '../src/renderer';
import { Joke, JokeType } from '../src/types/joke';
import getJoke from '../src/utils/getJoke';

export default function (req: VercelRequest, res: VercelResponse) {
    try {
        let svg: string = '';
        const { jokeType } = req.query;
        const joke = getJoke(jokeType as JokeType);
        if (joke.type === "QA") {
            svg = renderQa(joke as Joke<"QA">);
        }
        if (joke.type === "JK") {
            svg = renderJoke(joke as Joke<"JK">);
        }
        if (joke.type === "MM") {
            svg = renderMemes(joke as Joke<"MM">);
        }
        res.setHeader('Content-Type', 'image/svg+xml');
        res.setHeader('Cache-Control', 's-maxage=86400');
        return res.send(svg);
    } catch {
        res.status(500).send('An error was encountered while processing your request');
    }
}