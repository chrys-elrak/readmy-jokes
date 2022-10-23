import { Lang } from './types/lang';
import { Request, Response } from 'express';
import { renderJoke, renderMemes, renderQa } from '../src/renderer';
import { Joke, JokeType } from '../src/types/joke';
import getJoke from '../src/utils/getJoke';

export default async function (req: Request, res: Response) {
    try {
        let svg: string = '';
        const jokeType = (req.query as any)?.jokeType?.toUpperCase();
        const lang: Lang = (req.query as any)?.lang?.toUpperCase();
        const joke = await getJoke(jokeType as JokeType, lang);
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
        res.header('Content-Type', 'text/html');
        res.status(500).send(`
            <p class="error">
                Uh oh! An error was encountered while processing your request.
            </p>
            <style>
                .error {
                    color: red;
                }
            </style>
        `);
    }
}