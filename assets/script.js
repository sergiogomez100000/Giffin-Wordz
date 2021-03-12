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

let currentGifUrl = "";

// create var favArr assigning the parsed stringified array in local storage under favGifsSave, reading this from favGifsSave and if nothing there reads empty array
function getFavArr (){
return JSON.parse(localStorage.getItem("favGifsSave")) || [];
}
let favArr = getFavArr()

const apiKeyWebster = "b8d63f50-7aed-4699-a007-51ec78791ac1"

function getGif(searchQuery) {
  const giphyUrl = `https://api.giphy.com/v1/gifs/random?tag=${searchQuery}&api_key=${apiKeyGiphy}`;
  //console.log(giphyUrl);
  fetch(giphyUrl)
    //convert data into .json making it readable
    .then((data) => data.json())
    .then((data) => {
      currentGifUrl = data.data.image_url
      //console.log(data);
      const imgEl = document.createElement("img")
      imgEl.setAttribute("src", currentGifUrl)
      gifContainer.innerHTML = ""
     gifContainer.append(imgEl)
      //console.log(typeof imgEl)
    });
}

function getDefinition(searchQuery){
  const websterUrl= `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${searchQuery}?key=${apiKeyWebster}`
  fetch(websterUrl)
  .then((data) => data.json())
  .then((data) => {
    console.log(data);
    // targets short def in search query
    console.log(data[0])

    //empties defContainer
    defContainer.innerHTML = ""

    const h1El = document.createElement("h1")
    h1El.textContent = searchBar.value
    defContainer.append(h1El)

    //creates p tag el  //updates defEL text content to array // appends defEL (adds) to defContainer
    const defEl = document.createElement("p")
    defEl.textContent ="Definition: " + (data[0].shortdef[0])
    defContainer.append(defEl);

     
    const defCaseEl= document.createElement("p")
    defCaseEl.textContent = "Case: " + (data[0].fl)
    //console.log(data[0].fl)
    defContainer.append(defCaseEl)

    const defAudio = data[0].hwi.prs[0]
    const defAudioUrl =`https://media.merriam-webster.com/audio/prons/en/us/mp3/${defAudio.sound.audio[0]}/${defAudio.sound.audio}.mp3`
    const defAudioEl = document.createElement("audio")
    defAudioEl.setAttribute("src", defAudioUrl)
    defAudioEl.setAttribute("controls","")
    defContainer.append(defAudioEl)
    
    // targets pronunciation from data
    console.log(data[0].hwi.prs[0])
    const defProEl = document.createElement("p")
    defProEl.textContent = ["Pronunciation: " + (defAudio.mw)]
    defContainer.append(defProEl)
    

    

  })
}
function handleSubmit(){
  const input = searchBar.value;
  getGif(input)
  getDefinition(input)
  //console.log(input)
}
submitBtn.addEventListener("click", handleSubmit);

favBtn.addEventListener("click", handleSave);

// when fav button hit, push fav gif array into local storage, array push method, then restore with stringify
function handleSave(){
  favArr = getFavArr()
  // if current gif url is empty or has something in it get out
if(currentGifUrl === "" || favArr.includes(currentGifUrl)) return;
favArr.push(currentGifUrl)
localStorage.setItem("favGifsSave", JSON.stringify(favArr))
}


