// create API key for gif
const apiKeyGiphy = "F9EV2crSkhvqoTLa3t0KEM15VzdKISVG";
//create  variable for gif  container
const gifContainer = document.querySelector("#gif-container");
//create var for searchbar 
const searchBar = document.querySelector("#searchBar");
//create variable for submitBtn
const submitBtn = document.querySelector("#submitBtn");
//create var for webster api key
const apiKeyWebster = "b8d63f50-7aed-4699-a007-51ec78791ac1"

function getGif(searchQuery) {
  const giphyUrl = `https://api.giphy.com/v1/gifs/random?tag=${searchQuery}&api_key=${apiKeyGiphy}`;
  console.log(giphyUrl);
  fetch(giphyUrl)
    //convert data into .json making it readable
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
      const imgEl = document.createElement("img")
      imgEl.setAttribute("src", data.data.image_url)
      gifContainer.innerHTML = ""
     gifContainer.append(imgEl)
      console.log(typeof imgEl)
    });
}

function getDefinition(searchQuery){
  const websterUrl= `https://www.dictionaryapi.com/api/v3/references/collegiate/json/voluminous?key=${apiKeyWebster}`
}
function handleSubmit(){
  const input = searchBar.value;
  getGif(input)

  console.log(input)
}
submitBtn.addEventListener("click", handleSubmit);
// getGif("cats");

// create API key for Dictionary
// var input on form
// create function to access API info gif (fetch and var for url)
// create function to access API info dictionary (fetch and var for url)
// local storage for gif favorite button
// append and/or local storage for word that was searched
// event listener for submit button
// event listener for favorite button
