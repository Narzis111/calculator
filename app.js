let count = 0;
const readCount = document.getElementById("read-count");
const cardContainer = document.getElementById("card-container");

// ===================All Cards loading====================

const loadCards = (item) => {
  
  const url = 'https://openapi.programming-hero.com/api/retro-forum/posts'
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      data.posts.forEach((item) => {
        
        cardContainerHtml(item);
      })
    })
}
// =======function for append new div for both loadCards and search==========
function cardContainerHtml(item){
 
  const postDiv = document.createElement("div");

        postDiv.innerHTML = `
            <div class="flex gap-5 mb-4 p-5 border-2 border-solid rounded-lg  bg-blue-100 border-blue-800  " id="card-container">
              <div class="indicator">
                <span id="badge" class="indicator-item badge ${(item.isActive)? 'bg-green-500' : 'bg-red-500'}"></span> 
                <div class="grid w-32 h-32 bg-base-300 place-items-center"><img src="${item.image}" alt="" srcset=""></div>
              </div>
              <div class="left-discuss">
                <div class="flex gap-5">
                  <p>#   <span>${item.category}</span></p>
                  <p>Author : <span>${item.author.name}</span></p>
                </div>
                <h5 class="font-extrabold">${item.title}</h5>
                <p>${item.description}</p>
                <hr class="my-4">
                <div class="flex justify-between">
                  <div class="flex gap-12">
                    <p><i class="fa-solid fa-comment"></i> <span>${item.comment_count}</span></p>
                    <p><i class="fa-regular fa-eye"></i> <span>${item.view_count}</span></p>
                    <p><i class="fa-regular fa-clock"></i> <span>${item.posted_time}</span> min</p>
  
                  </div>
                 
                  <button onclick="greenBtnHandler('${item.title.replace(/'/, "@")}', '${item.view_count}')"  id="green-btn" class="bg-green-400 text-white h-8 w-8 rounded-full">
                    <i class="fa-regular fa-envelope"></i>
                  </button>
                </div>
              </div>
            </div>
            `;
        cardContainer.appendChild(postDiv);
} 

// =============Input-search button with category============
const handleSearch = async () => {
  const value = document.getElementById("search-box").value;
  const spiner = document.getElementById("spinner");
  spiner.classList.remove("hidden");
  const search = value;
  const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${search}`);
  const data = await res.json();
  cardContainer.innerHTML = "";
  data.posts.forEach((item)=>{
    cardContainerHtml(item);
  }) 
  spiner.classList.add("hidden");
}

// ==========================latest card load==================
const loadPost = () => {
  const url = 'https://openapi.programming-hero.com/api/retro-forum/latest-posts'
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const postContainer = document.getElementById("post-container")
      data.forEach((item) => {
        const div = document.createElement("div");
        div.innerHTML = `
                    <div class="p-10">
          <img src="${item.cover_image}" class="mb-3" srcset="">
          <p><i class="fa-solid fa-calendar-days"></i> <span>${(item.author.posted_date)? item.author.posted_date : "Unknown"}</span></p>
          <h5 class="my-3 font-extrabold">${item.title}</h5>
            <p>${item.description}</p>
          <div class="flex justify-even mt-3">
              <img class="w-10 h-10 rounded-full" src="${item.profile_image}" alt="" srcset="">
              <div class="ml-4">
              <p class="font-bold">${item.author.name}</p>
              <p>${(item.author.designation)?item.author.designation : "Unknown"}</p>               
            </div>
          </div>       
      </div>
                    `;
        postContainer.appendChild(div);
      })
    })
}
// ===========loading button==================

function greenBtnHandler(title, view) {
  const preCount = parseInt(readCount.innerText);
  readCount.innerText = preCount + 1;
  const bookRow = document.getElementById("selected-book");
  const newReadElement = document.createElement('div')
  newReadElement.classList = `mx-2 bg-white rounded-xl flex justify-between items-center mt-2 gap-2 p-4`;
  newReadElement.innerHTML = `
  <h1 class="text-black">${title.replace(/@/, "'")}</h1>
  <div class="flex gap-1 items-center ">
  <i class="fa-regular fa-eye"></i> <!--seen-->
  <h1>${view}</h1>
  </div>
  `;
  bookRow.appendChild(newReadElement);
}


loadCards();
loadPost();
