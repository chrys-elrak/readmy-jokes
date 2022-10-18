import { Request, Response } from 'express';
import { renderJoke, renderMemes, renderQa } from '../renderer';
import { Joke, JokeType } from '../types/joke';
import getJoke from '../utils/getJoke';

export default function (req: Request, res: Response) {
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
        res.setHeader('Cache-Control', `public, max-age=10`);
        return res.send(svg);
    } catch {
        res.status(500).send('An error was encountered while processing your request');
    }
}