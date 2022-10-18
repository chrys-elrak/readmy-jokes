export function getScript(...params: TemplateStringsArray[]): string {
    let fnName = params.flat().join("") || 'init';
    return `<script>
    const ${fnName} = () => {
      console.log("${fnName}");
      let text = document.getElementsByClassName("text");
      let jokeContainer = document.getElementById("joke");
      if(window.screen.availWidth > 425){
        text[0].classList.add("desktop");
        jokeContainer.classList.add("desktop-device");
      }
      else{
        text[0].classList.add("mobile");
        jokeContainer.classList.add("mobile-device");
      }
    }
    </script>
  `;
}