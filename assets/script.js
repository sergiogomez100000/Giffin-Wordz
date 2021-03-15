// create API key for gif
const apiKeyGiphy = "F9EV2crSkhvqoTLa3t0KEM15VzdKISVG";
//create  variable for gif  container
const gifContainer = document.querySelector("#gif-container");
//create variable for def container
const defContainer = document.querySelector("#def-container");
//create var for searchbar
const searchBar = document.querySelector("#searchBar");
//create variable for submitBtn
const submitBtn = document.querySelector("#submitBtn");
//create var for webster api key
const favBtn = document.querySelector("#favBtn");
// assign value to variale that can be changed, changed value to empty string
let currentGifUrl = "";

// create var favArr assigning the parsed stringified array in local storage under favGifsSave, 
//reading this from favGifsSave 
//and if nothing there reads empty array
function getFavArr() {
  return JSON.parse(localStorage.getItem("favGifsSave")) || [];
}
// favArr varaible invokes the getFavArr function
let favArr = getFavArr();
// assign API key info for Webster
const apiKeyWebster = "b8d63f50-7aed-4699-a007-51ec78791ac1";
// creates function to geta gif using searchQuery
function getGif(searchQuery) {
  //var for giphy Url and inserts searchQuery and API key info from giphy using Template Literals
  const giphyUrl = `https://api.giphy.com/v1/gifs/random?tag=${searchQuery}&api_key=${apiKeyGiphy}`;
  //console.log(giphyUrl);// gets info from giphyUrl
  fetch(giphyUrl)
    //convert data into .json making it readable
    .then((data) => data.json())
    // tells fetch where to get specific data
    .then((data) => {
      // reassigns var value to be image url in data in data
      currentGifUrl = data.data.image_url;
      //console.log(data);

      //creates var and creates img tag with it
      const imgEl = document.createElement("img");
      //sets currentGifUrl as source attribute to img EL
      imgEl.setAttribute("src", currentGifUrl);
      // empties gifContainer, appends imgEL to gif Container
      gifContainer.innerHTML = "";
      gifContainer.append(imgEl);
    });
}
// creates function to get defintion using searchQuery
function getDefinition(searchQuery) {
  // var for webster api Url, creates fetch to retrieve data
  const websterUrl = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${searchQuery}?key=${apiKeyWebster}`;
  fetch(websterUrl)
  // converts data in .Json, gets specific
    .then((data) => data.json())
    .then((data) => {
      //logs target data
      console.log(data);
      // targets short def in search query
      console.log(data[0]);

      //empties defContainer
      defContainer.innerHTML = "";
      // creates var and creates h1 with it
      const h1El = document.createElement("h1");
      //assigns text content of h1El to searchbar value, append h1EL to defCOntainer
      h1El.textContent = searchBar.value;
      defContainer.append(h1El);

      //creates p tag el  //updates defEL text content to string n data // appends defCaseEL (adds) to defContainer
      const defCaseEl = document.createElement("p");
      defCaseEl.textContent = "Case: " + data[0].fl;
      //console.log(data[0].fl)
      defContainer.append(defCaseEl);
      
      // creates p tag el/ updates textcontent to string and data, appends def El to DefContainer
      const defEl = document.createElement("p");
      defEl.textContent = "Definition: " + data[0].shortdef[0];
      defContainer.append(defEl);

      // targets pronunciation from data, creates p tag, assigns text content of string n array , appends to def cont
      const defAudio = data[0].hwi.prs[0];
      console.log(data[0].hwi.prs[0]);
      const defProEl = document.createElement("p");
      defProEl.textContent = ["Pronunciation: " + defAudio.mw];
      defContainer.append(defProEl);

      // creates variable of audio Url, creates audio tag, sets source attritube to audioUrl, adds controls,
      //appends to defCOnatiner
      const defAudioUrl = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${defAudio.sound.audio[0]}/${defAudio.sound.audio}.mp3`;
      const defAudioEl = document.createElement("audio");
      defAudioEl.setAttribute("src", defAudioUrl);
      defAudioEl.setAttribute("controls", "");
      defContainer.append(defAudioEl);
    });
}
// create function to handle submit, ipnut var set to search bar value, telling functions to run
function handleSubmit() {
  const input = searchBar.value;
  getGif(input);
  getDefinition(input);
  //console.log(input)
}//add event listener to submit button, on click invoke handleSubmit function
submitBtn.addEventListener("click", handleSubmit);
//add eventlistener to favBtn, on click run handleSave function
favBtn.addEventListener("click", handleSave);

// when fav button hit, push fav gif array into local storage, array push method, then restore with stringify
function handleSave() {
  favArr = getFavArr();
  // if current gif url is empty or has something in it get out
  if (currentGifUrl === "" || favArr.includes(currentGifUrl)) return;
  favArr.push(currentGifUrl);
  localStorage.setItem("favGifsSave", JSON.stringify(favArr));
}
