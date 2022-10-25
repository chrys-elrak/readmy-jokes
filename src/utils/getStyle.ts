import { Theme, ThemeStyle } from "../types/theme";

export function getStyle(style: ThemeStyle = "default"): string {
    let theme: Theme;
    switch (style) {
        case "default":
            theme = require("../../assets/themes/default.theme.json");
            break;
        default:
            theme = require("../../assets/themes/default.theme.json");
            break;
    }
    return `
    <style>
      .desktop-device{
        width: 500px;
      }
      .mobile-device{
        width: 80%;
      }
      .desktop {
        font-size: 18px;
      }
      .mobile {
        font-size: 45px;
      }
      .text{
        padding: 0.5rem;
        font-family: Arial, Helvetica, sans-serif;
      }
      .meme {
          margin: .5rem;
          padding: .5rem;
          box-shadow: -1px -3px 14px 0px darkgrey;
      }
      .container {
        background: ${theme.backgroundColor};
        max-height: 100px;
        padding: 0.5rem;
        margin: 0.5rem;
      }
      .joke {
        color: ${theme.jokeColor};
        font-size: 1rem;
      }
      .author {
        color: ${theme.authorColor};
        text-align: right;
        font-style: italic;
        font-size: 0.8rem;
      }
      code {
        font-size: 1rem;
        color: ${theme.codeColor};
        background: ${theme.codeBackgroundColor};
        boreder-radius: 50px;
      }
      .question {
        color: ${theme.questionColor};
        font-size: 1rem;
      }
      .answer {
        color: ${theme.answerColor};
        font-size: 1rem;
      }
    </style>
          `;
}