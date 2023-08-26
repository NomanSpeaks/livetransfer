const url = 'https://openapi.programming-hero.com/api/news/categories'
fetch(url)
  .then(res => res.json())
  .then(data => displayCategory(data)) 
  

function displayCategory(items) {
  const newsItemContainer = document.getElementById('news-sub-container');
    const cetagories = items.data.news_category;
  for (const item of cetagories) {
    const eachItem = item.category_name;
    const itemId = item.category_id;
    const itemLink = document.createElement('a');
    itemLink.innerText = eachItem;
    itemLink.setAttribute("onclick", "clickFunction(" + itemId + ")");
    itemLink.setAttribute("id", itemId);
    itemLink.classList.add('btn', 'btn-info', 'mb-2');
    newsItemContainer.appendChild(itemLink);
  }
}

const toggleSpinner = isLoading => {
    const spinnerContainer = document.getElementById('spinner');
    if(isLoading){
      spinnerContainer.classList.remove('d-none')
    }
    else{
      spinnerContainer.classList.add('d-none')
    }
}
  
let cetagorId = '03'
function clickFunction(catId) {
  toggleSpinner(true);
  const catUrl = 'https://openapi.programming-hero.com/api/news/category/0' + catId; // creating categori link
  cetagorId = catId;
  fetch(catUrl)
    .then(respons => respons.json())
    .then(newsItems => displayNewsByCat(newsItems));
}


function displayNewsByCat(newsItems) {

    const newsCardContainer = document.getElementById('card-container');
    newsCardContainer.textContent = '';
    const newslists = newsItems.data;
    const count = "0" + cetagorId;
    const newsCountTag = document.getElementById('news-count', count);
    newslists.sort((a, b) => {
        return b.total_view - a.total_view;
    });
    if (newslists.length > 0) {
      const cateId = document.getElementById(count);
      const newsTopic = cateId.innerText || 'waiting...';
      newsCountTag.innerText = `${newslists.length} News shown in ${newsTopic}`;
        toggleSpinner(false);
        
      for (const news of newslists) {
        const newsId = news._id;
        const newsImage = news.thumbnail_url;
        const newsTitle = news.title;
        const newsDetails = news.details;
        const athorName = news.author.name;
        const authorImgUrl = news.author.img;
        // const publishDate = news.author.published_date;
        const newsViews = news.total_view;
        // const newRating = news.rating.number;
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card h-100">
                <img src="${newsImage}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${newsTitle}</h5>
                  <p class="card-text">${newsDetails}</p>
                </div>
                <div class="card-footer">
                  <div class="card-body d-flex align-items-center justify-content-around mb-0">
                    <div class="d-flex align-items-center">
                      <img
                        src="${authorImgUrl}"
                        class="img-fluid author rounded-circle" alt="">
                      <div class="ms-2 my-2">
                        <span class="aut">${athorName}</span><br>
                      </div>
                    </div>
                    <div class="my-2">
                      <i class="fa-solid fa-eye"> <span id="views">${newsViews}</span></i>
                    </div>
                    <div onclick="openModal('${newsId}')" class="btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                      <i class="fa-solid fa-arrow-right"></i>
                    </div>
                  </div>
                </div>
              </div>
        `;
        newsCardContainer.classList.add('col');
        newsCardContainer.appendChild(div);
      };
      newsCountTag.style.color = 'black';
    }
    else{
      newsCountTag.innerText = 'Sorry No News found. Please read Diffrent News'
      newsCountTag.style.color = 'red';
      toggleSpinner(false);
    }
  
  }
clickFunction(0)
function openModal(id) {
    const newsUrl = 'https://openapi.programming-hero.com/api/news/' + id;
    fetch(newsUrl)
      .then(res => res.json())
      .then(posts => readNews(posts))
  }
  
  function readNews(posts) {
    const newsDetails = posts.data;
    const modalCon = document.getElementById('staticBackdrop');
    for (news of newsDetails) {
      const newsTitle = news.title;
      const newsBody = news.details;
      modalCon.innerHTML = `
      <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title" id="staticBackdropLabel">${newsTitle}</h3>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>${newsBody}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-info">Share</button>
        </div>
      </div>
    </div>
      `
    }
  }
 

  const isTrue='false'; 
if(!isTrue){
console.log('hello');
} else {
console.log('world'); 
}