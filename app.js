
const loadCards = () =>{
    const url = 'https://openapi.programming-hero.com/api/retro-forum/posts'
    fetch(url)
   
    .then ((res) => res.json())
    
    .then((data) => {
        const cardContainer = document.getElementById("card-container")
        data.posts.forEach((item) =>{
            const div = document.createElement("div");
            
            //data.post only full category object ta pawla gelo
            div.innerHTML = `
            <div class="flex gap-5 mb-4 p-5 border-2 border-solid rounded-lg  bg-blue-100 border-blue-800  " id="card-container">
              <div class="indicator">
                <span class="indicator-item badge badge-success"></span> 
                <div class="grid w-32 h-32 bg-base-300 place-items-center"><img src="${item.image}" alt="" srcset=""></div>
              </div>5
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
                  <button id="green-btn" class="bg-green-400 text-white h-8 w-8 rounded-full">
                    <i class="fa-regular fa-envelope"></i>
                  </button>
                </div>
              </div>
            </div>
            `;
        cardContainer.appendChild(div);        
    })
        
    }
        )}
        
    loadCards();
