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
    if ( response.data.articles.length ) {
      buildArticlesList(response)
    } else {
      renderNoArticlesMessage()
    }
  } else {
    renderServerError()
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

    if ( article.audio.length ) {
      buildAudio(articleLi, article.audio[0].url)
    }
  }

  // build header
  const resultsHeader = document.createElement('h3')
  resultsHeader.innerText = 'Showing results for ' + response.query + ':'

  //append header and articles
  articlesContainer.append(resultsHeader)
  articlesContainer.append(articlesList);
}

function buildAudio(li, url) {
  // build audio element
  const articleAudio = document.createElement('audio')
  articleAudio.controls = 'controls';
  if (articleAudio.canPlayType('audio/mpeg')) {
    articleAudio.setAttribute('type', 'audio/mpeg')
    articleAudio.setAttribute('src', url);
  }
  let audioDiv = document.createElement('div')
  audioDiv.className = 'audio'
  audioDiv.append(articleAudio)
  li.append(audioDiv)
}

function renderNoArticlesMessage() {
  const articlesContainer = document.getElementById("articles-container")
  const noArticlesParagraph = document.createElement('p')
  noArticlesParagraph.id = 'no-articles'
  noArticlesParagraph.innerText = 'There are no articles associated with your query'
  articlesContainer.append(noArticlesParagraph)
}

function renderServerError() {
  // this should execute if request to /api fails
  const articlesContainer = document.getElementById("articles-container")
  const serverErrorParagraph = document.createElement('p')
  serverErrorParagraph.id = 'server-error'
  serverErrorParagraph.innerText = 'We are currently experiencing technical difficulties. Sorry for any inconvenience.'
  articlesContainer.append(serverErrorParagraph)
}
