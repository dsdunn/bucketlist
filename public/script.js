$(window).load(() => {
  fetch('/ideas', (request,response) => {
    
  })
})


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
  }).then(response => response.json())
    .then(id => {

      const card = `
      <div class="card">
        <button id="${id.id}" class="delete-button">delete</button>
        <h3 class="card-title">${title}</h3>
        <p class="card-body">${body}</p>
      </div>
      `
      $('.card-container').append(card);
      $('#item-title, #item-body').val(''); 
    })
  .catch(err => console.log(err))
})

$('.card-container').on('click','.delete-button', function(event) {
  const id = event.target.id;
  $(this).parent().remove();

  fetch(`./ideas/${id}`, {
    method: 'DELETE'
  })
  
})



