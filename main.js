let wordInput = document.getElementById("word-input");
let searchBtn = document.getElementById("search-btn");
let definitionsDiv = document.getElementById("definitions-div");
let synonymsDiv = document.getElementById("synonyms-div");

window.onload = function () {
  wordInput.value = "hello";
  definitionsDiv.innerHTML = `"Hello!" or an equivalent greeting.`;
  synonymsDiv.innerHTML = "greeting"
}

function fetchApi(word) {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
  .then(res => res.json())
  .then(result => {
    if (result.title) {
      definitionsDiv.innerHTML = `There is no definitions for "${word}"`;
      synonymsDiv.innerHTML = `There is no synonyms for "${word}"`;
    } else if (result[0].meanings[0].synonyms[0] === undefined) {
      definitionsDiv.innerHTML = result[0].meanings[0].definitions[0].definition;
      synonymsDiv.innerHTML = `There is no synonyms for "${word}"`;
    } else if (result[0].meanings[0].definitions[0].definition === undefined) {
      synonymsDiv.innerHTML = result[0].meanings[0].synonyms[0];
      definitionsDiv.innerHTML = `There is no synonyms for "${word}"`;
    } else {
      definitionsDiv.innerHTML = result[0].meanings[0].definitions[0].definition;
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
  fetchApi(wordInput.value);
  definitionsDiv.innerHTML = "";
  synonymsDiv.innerHTML = "";
}

searchBtn.onsubmit = function() {
  fetchApi(wordInput.value);
  definitionsDiv.innerHTML = "";
  synonymsDiv.innerHTML = "";
  console.log(wordInput.value);
}
