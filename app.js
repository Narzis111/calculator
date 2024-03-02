// https://openapi.programming-hero.com/api/retro-forum/posts

//1. 4 ta category button a kaj korbo tai full container ke dhorar jonno
// const btnContainer = document.getElementById('btn-container');
const cardContainer = document.getElementById('card-container');
// const errorElement = document.getElementById('error-element');
// const sortBtn = document.getElementById('sort-btn');

let selectedCategory = 1000;
let sortByView = false;
// shurute jate 1000 category card er video/content by default show kore
sortBtn.addEventListener('click', () =>{
    sortByView = true;
    fetchDataByCategories(selectedCategory, sortByView)
})
//2. 4 category button er data nibo api link theke
const fetchCategories = () =>{
    const url = 'https://openapi.programming-hero.com/api/retro-forum/posts'
    fetch(url)
    // url ta ke fetch method a call korbo
    .then ((res) => res.json())
    // ekhon .then((data) => console.log(data.data)) likhe function call korle category 4 ta pabo array hisabe
    // amader main kaj ei .then((data) niye tai ekhane foreach loop nibo jate joto category thake chole ase
    .then((data) => {
        data.data.forEach ((video) =>{
            let verifiedBadge = ''
            if (video.authors[0].verified){
                verifiedBadge = `<p><img class="w-5 h-5"  src="./images/Group 1171275317.png" alt="" srcset=""></p>`
            }
            const newCard = document.createElement('div')
            newCard.innerHTML = `
            <div class="my-8">
            <figure class="h-72">
            <img class="h-[100%] w-[100%] object-cover" src="${video.thumbnail}">
            <h6 class="absolute">${video.others.posted_date}</h6>
            </figure>
            <div class="flex justify-even mt-8">
                <img class="w-8 h-8 rounded-full" src="${video.authors[0].profile_picture}" alt="" srcset="">
                <div>
                <p>${video.title}</p>
                <div class="flex">
                    <p>${video.authors[0].profile_name}</p>
                    ${verifiedBadge}

                </div>
                
                <p>${video.others.views}</p>
            </div>

            </div>
            
        </div>
        `
         cardContainer.appendChild(newCard)

        

    })

}
// category btn a click korle jate category id pai tar jonno add evet listener niyesi upore
// tarpor tar moddhe category_id fetch diyesi, and sei function niche create kore caterogyId pass korsi
const fetchDataByCategories = (categoryId, sortByView) => {
    // console.log(categoryId) to shoe only thik thak click kaj kortese kina
    selectedCategory = categoryId
    // je btn click hobe sei id thekei show korbe
    const url = `https://openapi.programming-hero.com/api/videos/category/${categoryId}`
    fetch(url)

    .then ((res) => res.json())
    
    .then((data) => {
        if(sortByView){
            data.data.sort((a, b) => {
                const totalViewsStrFirst = a.others?.views;
                const totalViewsStrSecond = b.others?.views;
                const totalViewsFirstNumber = parseFloat(totalViewsStrFirst.replace("K", ''))|| 0;
                const totalViewsSecondNumber = parseFloat(totalViewsStrSecond.replace("K", ''))|| 0;
                return totalViewsSecondNumber - totalViewsFirstNumber;
            })
        }


        if(data?.data.length === 0){
            errorElement.classList.remove('hidden')
        } else{
            errorElement.classList.add('hidden')
        }
        cardContainer.innerHTML = ''
        data.data.forEach ((video) =>{
            let verifiedBadge = ''
            if (video.authors[0].verified){
                verifiedBadge = `<p><img class="w-5 h-5"  src="./images/Group 1171275317.png" alt="" srcset=""></p>`
            }
            const newCard = document.createElement('div')
            newCard.innerHTML = `
            <div class="my-8">
            <figure class="h-72">
            <img class="h-[100%] w-[100%] object-cover" src="${video.thumbnail}">
            <h6 class="absolute">${video.others.posted_date}</h6>
            </figure>
            <div class="flex justify-even mt-8">
                <img class="w-8 h-8 rounded-full" src="${video.authors[0].profile_picture}" alt="" srcset="">
                <div>
                <p>${video.title}</p>
                <div class="flex">
                    <p>${video.authors[0].profile_name}</p>
                    ${verifiedBadge}

                </div>
                
                <p>${video.others.views}</p>
            </div>

            </div>
            
        </div>
        `
         cardContainer.appendChild(newCard)

        })
    })

}

fetchCategories()
fetchDataByCategories(selectedCategory, sortByView)