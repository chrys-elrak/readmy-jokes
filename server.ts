import { Hono } from 'hono';
import getJoke from './src/utils/getJoke';
import { Joke, JokeType } from './src/types/joke';
import { Lang } from './src/types/lang';
import { renderJoke, renderMemes, renderQa } from './src/renderer';
const app = new Hono();

app.get('/', async (ctx) => {
    try {
        const jokeType = ctx.req.query()['jokeType'] || '';
        const lang = ctx.req.query()['lang'] || '';
        const joke = await getJoke(jokeType as JokeType, lang as Lang);
        let svg: string = '';
        if (joke.type === "QA") {
            svg = await renderQa(joke as Joke<"QA">);
        }
        if (joke.type === "JK") {
            svg = renderJoke(joke as Joke<"JK">);
        }
        if (joke.type === "MM") {
            svg = await renderMemes(joke as Joke<"MM">);
        }
        return new Response(svg, { headers: { 'content-type': 'image/svg+xml', 'Cache-Control': 'no-cache' } })
    } catch {
        ctx.header('Content-Type', 'text/html');
        return ctx.html(`
           <p class="error">
               Uh oh! No joke found.
           </p>
           <style>
               .error {
                   color: red;
               }
           </style>
       `);
    }
});

export default app;