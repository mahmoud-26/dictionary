let wordInput = document.getElementById("word-input");
let searchBtn = document.getElementById("search-btn");
let definitionsDiv = document.getElementById("definitions-div");
let examplesDiv = document.getElementById("examples-div");
let synonymsDiv = document.getElementById("synonyms-div");

window.onload = function () {
  wordInput.value = "play";
  searchWord("play");
}

function searchWord(word) {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
  .then(res => res.json())
  .then(result => {
    if (result.title) {
      definitionsDiv.innerHTML = `There is no definitions for "${word}"`;
      examplesDiv.innerHTML = `There ia no Examples for "${word}"`;
      synonymsDiv.innerHTML = `There is no synonyms for "${word}"`;
    } else if (result[0].meanings[0].definitions[0].definition === undefined) {
      definitionsDiv.innerHTML = `There is no definitions for "${word}"`;
      examplesDiv.innerHTML = result[0].meanings[0].definitions[0].example;
      synonymsDiv.innerHTML = result[0].meanings[0].synonyms[0];
    } else if (result[0].meanings[0].definitions[0].example === undefined) {
      definitionsDiv.innerHTML = result[0].meanings[0].definitions[0].definition;
      examplesDiv.innerHTML = `There is no examples for "${word}"`;
      synonymsDiv.innerHTML = result[0].meanings[0].synonyms[0];
    } else if (result[0].meanings[0].synonyms[0] === undefined) {
      definitionsDiv.innerHTML = result[0].meanings[0].definitions[0].definition;
      examplesDiv.innerHTML = result[0].meanings[0].definitions[0].example;
      synonymsDiv.innerHTML = `There is no synonyms for "${word}"`;
    } else {
      definitionsDiv.innerHTML = result[0].meanings[0].definitions[0].definition;
      examplesDiv.innerHTML = result[0].meanings[0].definitions[0].example;
      for (let i = 0; i < result[0].meanings[0].synonyms.length; i++) {
        let synonyms = document.createElement("p");
        let synonymsText = document.createTextNode(result[0].meanings[0].synonyms[i]);
        synonyms.appendChild(synonymsText);
        synonymsDiv.appendChild(synonyms);
      }
    }
  })
}

searchBtn.onclick = function () {
  searchWord(wordInput.value);
  definitionsDiv.innerHTML = "";
  examplesDiv.innerHTML = "";
  synonymsDiv.innerHTML = "";
}
