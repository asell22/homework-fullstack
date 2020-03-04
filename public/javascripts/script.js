function onSubmit(event) {
  // ui logic
  event.preventDefault();
  const queryInput = document.getElementById("query-input");
  let queryValue = queryInput.value;
  console.log('submit:', queryValue);
  queryInput.value = '';

  //xhr logic
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  oReq.open("GET", "/api?" + 'search=' + queryValue, true);
  oReq.send();
}

function reqListener() {
  const response = JSON.parse(this.responseText)
  console.log(response);
  const statusCode = response.data.meta.status.code
  const statusMessage = response.data.meta.status.message

  if ( statusCode === 200 && statusMessage === 'OK' ) {
    buildArticlesList(response)
  }
}

function buildArticlesList(response) {
  const articles = response.data.articles
  const articlesContainer = document.getElementById("articles-container")
  const articlesList = document.createElement('ol')
  articlesList.id = 'articles-list'

  // build ordered list of articles
  for(var index in articles) {
    let article = articles[index];
    let articleLi = document.createElement('li')
    articleLi.id = article.id
    articleLi.innerText = article.title
    articlesList.appendChild(articleLi)
  }

  // build header
  const resultsHeader = document.createElement('h3')
  resultsHeader.innerText = 'Showing results for ' + response.query + ':'

  //append header and articles
  articlesContainer.append(resultsHeader)
  articlesContainer.append(articlesList);
}
