let favArr = JSON.parse(localStorage.getItem("favGifsSave")) || [];

const favoritesContainer = document.querySelector("#favorite-container")
//for each item in array
function renderFavPage() {
for (const gifUrl of favArr) {
  const favImgEl = document.createElement("img")
  favImgEl.setAttribute("src", gifUrl)
//   favImgEl.classList.add("tile")
  favoritesContainer.append(favImgEl)
}
}
renderFavPage()
//create image element
//set src attribute
//append