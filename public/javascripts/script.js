function onSubmit(event) {
  event.preventDefault();
  const queryInput = document.getElementById("query-input");
  let queryValue = queryInput.value;
  console.log('submit:', queryValue);
  queryInput.value = '';
}
