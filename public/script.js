console.log('script running');

$('form').submit((event) => {
  event.preventDefault();
  const title = $('#item-title').val();
  const body = $('#item-body').val();
  const info = { title, body };

  const id = fetch('./ideas', {
    method: 'POST',
    body: JSON.stringify(info),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response)
  .catch(err => console.log(err))
  
  const card = `
  <div class="card">
    <button class="delete-button">delete</button>
    <h3 class="card-title">${title}</h3>
    <p class="card-body">${body}</p>
  </div>
  `

})


