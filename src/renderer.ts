import { Joke } from './types/joke';
import { getStyle } from './utils/getStyle';
import { getScript as script } from './utils/getScript';

export function renderJoke(joke: Joke<"JK">): string {
  const svg = `
    <svg id="joke" onload="init()" fill="none" xmlns="http://www.w3.org/2000/svg">
    ${script``}
    <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml"> 
          ${getStyle()}
          <div class="container">
            <div class="text">
              <text class="joke">${joke.joke}</text>
              <text class="author"> —${joke.author || "xxxx"}</text>
            </div>
          </div>
      </div>
    </foreignObject>
  </svg>
`;

  return svg;
}

export function renderMemes(joke: Joke<"MM">): string {
  const svg = `
    <svg fill="none" xmlns="http://www.w3.org/2000/svg">
    <foreignObject width="100%" height="100%">
      ${script``}
        <div xmlns="http://www.w3.org/1999/xhtml"> 
          ${getStyle()}
          <img class="meme" src="${joke.url}" alt="Meme" />
      </div>
    </foreignObject>
  </svg>
`;
  return svg;
};

export function renderQa(joke: Joke<"QA">): string {
  const svg = `
  <svg id="joke" onload="init()" fill="none" xmlns="http://www.w3.org/2000/svg">
  <foreignObject width="100%" height="100%">
  ${script``}
      <div xmlns="http://www.w3.org/1999/xhtml"> 
        ${getStyle()}
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