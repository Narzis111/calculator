let count = 0;
const loadCards = () => {
    const url = 'https://openapi.programming-hero.com/api/retro-forum/posts'
    fetch(url)

        .then((res) => res.json())

        .then((data) => {
            const cardContainer = document.getElementById("card-container")
            data.posts.forEach((item) => {
                const div = document.createElement("div");

                //data.post only full category object ta pawla gelo
                div.innerHTML = `
            <div class="flex gap-5 mb-4 p-5 border-2 border-solid rounded-lg  bg-blue-100 border-blue-800  " id="card-container">
              <div class="indicator">
                <span class="indicator-item badge badge-success"></span> 
                <div class="grid w-32 h-32 bg-base-300 place-items-center"><img src="${item.image}" alt="" srcset=""></div>
              </div>
              <div class="left-discuss">
                <div class="flex gap-5">
                  <p>#  <span>${item.category}</span></p>
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
                  <button onclick="" id="green-btn" class="bg-green-400 text-white h-8 w-8 rounded-full">
                    <i class="fa-regular fa-envelope"></i>
                  </button>
                </div>
              </div>
            </div>
            `;
                cardContainer.appendChild(div);
            })

        }
        )
}

function readCount() {
  const readCount = document.getElementById("read-count");
  count += 1;
  readCount.innerText = count;

}
function bookInfoAddition(book) {
  const bookRow = document.getElementById("selected-book");
  const createRow = document.createElement("div");
  createRow.innerHTML = `
  <div class="flex book rounded-lg bg-white m-5 p-4">
  <h5 class="font-extrabold">${item.title}</h5>
  <p><i class="fa-regular fa-eye"></i></p>
  <p class="ml-3">${item.view_count}</p>
</div>
  `;
  bookRow.appendChild(createRow);
}
const books = document.querySelectorAll(".book");
  for (const book of books) {
    book.addEventListener("click", function (event) {
     
      ticketCount();
      bookInfoAddition(book);
    });
  }


// ==========================
const loadPost = () => {
    const url = 'https://openapi.programming-hero.com/api/retro-forum/latest-posts'
    fetch(url)

        .then((res) => res.json())

        .then((data) => {
            const postContainer = document.getElementById("post-container")
            data.forEach((item) => {
                const div = document.createElement("div");

                //data.post only full category object ta pawla gelo
                div.innerHTML = `
                    <div class="border-solid border-2 border-slate-300 p-10">
          <img src="${item.cover_image}"" srcset="">
          <p><i class="fa-solid fa-calendar-days"></i> <span>${item.author.posted_date}</span></p>
          <h5 class="my-3 font-extrabold">${item.title}</h5>
            <p>${item.description}</p>
          <div class="flex justify-even mt-3">
              <img class="w-10 h-10 rounded-full" src="${item.profile_image}" alt="" srcset="">
              <div class="ml-4">
              <p class="font-bold">${item.author.name}</p>
              <p>${item.author.designation}</p>               
            </div>
          </div>       
      </div>
                    `;
                postContainer.appendChild(div);
            })

        }
        )
}


loadCards();
loadPost();
