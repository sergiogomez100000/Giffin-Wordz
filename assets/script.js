// create API key for gif
const apiKeyGiphy = "F9EV2crSkhvqoTLa3t0KEM15VzdKISVG";
const gifContainer = document.querySelector("#gif-container");

function getGif(searchQuery) {
  const giphyUrl = `https://api.giphy.com/v1/gifs/random?tag=${searchQuery}&api_key=${apiKeyGiphy}`;
  console.log(giphyUrl);
  fetch(giphyUrl)
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
      var imgEl = document.createElement("img")
      imgEl.setAttribute("src", data.data.image_url)
     gifContainer.append(imgEl)
      console.log(typeof imgEl)
    });
}
getGif("cats");

// create API key for Dictionary
// var input on form
// create function to access API info gif (fetch and var for url)
// create function to access API info dictionary (fetch and var for url)
// local storage for gif favorite button
// append and/or local storage for word that was searched
// event listener for submit button
// event listener for favorite button
