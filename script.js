// const API_KEY = "4d04b5257dd74debb1b54b09ee419cee";
const API_KEY = "56beba1638d042b1b9e106e526d840ac";
// const url = "https://newsapi.org/v2/everything?q=";

const url = "https://newsapi.org/v2/everything?q=";
async function fetchData(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  return data;
}
fetchData("all").then((data) => renderMain(data.articles));

let mobileMenu = document.querySelector(".mobile");
let menubtn = document.querySelector(".menubtn");
// let menubtnDis = true;
menubtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// News Redering
function renderMain(arr) {
  let mainHTML = ``;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].urlToImage) {
      mainHTML += `
      <div class="card">
          <a href = ${arr[i].url}>
          <img src="${arr[i].urlToImage}" alt="" />
          <h4>${arr[i].title}</h4>
          <div class="publishbydate">
            <p>${arr[i].source.name}</p>
            <span>•</span>
            <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
          </div>
          <div class="desc">
            ${arr[i].description}
          </div>
          </a>
    </div>
      `;
    }
  }
  let main = (document.querySelector("main").innerHTML = mainHTML);
}
const searchbtn = document.getElementById("search-form");
const searchbtnmobile = document.getElementById("searchformmobile");
const searchinputmobile = document.getElementById("searchinputmobile");
const searchInput = document.getElementById("searchinput");
searchbtn.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(searchInput.value);

  const data = await fetchData(searchInput.value);
  renderMain(data.articles);
});

searchbtnmobile.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = await fetchData(searchinputmobile.value);
  renderMain(data.articles);
});

async function Search(query) {
  const data = await fetchData(query);
  renderMain(data.articles);
}
