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
}
