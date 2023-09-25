import { Joke } from './types/joke';
import { getStyle } from './utils/getStyle';
import { getScript as script } from './utils/getScript';
const CHUNK = 10;
const LINE = 50;
const MARGIN_VERTICAL = 30;
const MAX_WIDTH = 500;
const MAX_HEIGHT = 50;

export function renderJoke(joke: Joke<"JK">): string {
  const chunks = joke.joke.split(' ');
  const lines = [];
  let res = '';
  let maxWidth = 0;
  let lastLine = 0;
  for (let i = 0; i < chunks.length; i += CHUNK) {
    if (i > MAX_HEIGHT) {
      break;
    }
    const chunk = chunks.slice(i, i + CHUNK);
    const y = LINE + (lastLine > 0 ? lastLine - MARGIN_VERTICAL : 0);
    const text = chunk.join(' ');
    if (maxWidth < text.length) {
      maxWidth = text.length;
    }
    res += `
    <text style="fill: rgb(51, 51, 51); font-family: Arial, sans-serif; font-size: 11px; white-space: pre;" x="0" y="${y}">
      ${i + CHUNK > MAX_HEIGHT ? text + '...' : text}
    </text>
    `;
    lines.push(text);
    lastLine = y;
  }
  const height = lastLine + lines.length + LINE;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" style="width: 600px; height: 600px;">
      <g viewBox="0 0 500 500">
      <rect x="0" y="0" width="${MAX_WIDTH}" height="${height}" style="fill: transparent; stroke: rgb(0, 0, 0);"></rect>
        ${res}
        <text style="fill: rgb(51, 51, 51); font-family: Arial, sans-serif;
        font-size: 11px; white-space: pre; font-style: italic;"
        x="${(MAX_WIDTH / 2) + maxWidth}" y="${height - MARGIN_VERTICAL}">
          -- ${joke.author}
        </text>
      </g>
    </svg>
`;

  return svg;
}

export async function renderMemes(joke: Joke<"MM">): Promise<string> {
  const svg = `
    <svg fill="none" xmlns="http://www.w3.org/2000/svg">
    <foreignObject width="100%" height="100%">
      ${script``}
        <div xmlns="http://www.w3.org/1999/xhtml">
          ${await getStyle()}
          <img class="meme" src="${joke.url}" alt="Meme by ${joke.author}" />
      </div>
    </foreignObject>
  </svg>
`;
  return svg;
};

export async function renderQa(joke: Joke<"QA">): Promise<string> {
  const svg = `
  <svg id="joke" onload="init()" fill="none" xmlns="http://www.w3.org/2000/svg">
  <foreignObject width="100%" height="100%">
  ${script``}
      <div xmlns="http://www.w3.org/1999/xhtml">
        ${await getStyle()}
        <div class="container">
          <div class="text">
            <p class="question"><b>Q: </b>${joke.question}</p>
            <p class="answer"><b>A: </b>${joke.answer}</p>
            <p class="author"> —${joke.author || "xxxx"}</p>
          </div>
        </div>
    </div>
  </foreignObject>
  </svg>
  `;
  return svg;
};