$.ajax({
  url : 'data/grammys.json',
  type : 'GET',
  dataType : 'json',
  success : function(data) {
    const newHtml = data.fields.map(element => `
        <option value="${element.field_id}">
          ${element.field}
        </option>
    `);
    $('#category_types').append(newHtml);
    loadCategoriesInfo(data)
  },
  error : function (errorMsg) {
    console.log(errorMsg)
  }
})

function loadCategoriesInfo(data) {
  $('#category_types').on('change', function(event) {
    let id = $('#category_types').val()
    $('#field_name').html(data.fields.find(e => e.field_id == id).field);
    $('#description_field').html(data.fields.find(e => e.field_id == id).description);
    loadNomineesInfo(data, id)
  })
}

function loadNomineesInfo(data, id) {
  $('#categories').html('');
  const categories = data.fields.find(e => e.field_id == id).categories;
  for( let i = 0; i < categories.length; i++) {
    $('#categories').append(`
    <h3 id="nominees_${categories[i].category_id}">
      ${categories[i].category_name}
    `);
    for ( let j = 0; j < categories[i].nominees.length; j++) {
      $('#categories').append(`
        <li>
          <h4 class="${(categories[i].winner_id == j) ? 'winner' : ''}">
            ${categories[i].nominees[j].nominee}
          </h4>
          ${(categories[i].winner_id == j) ? '<span>Winner!</span>' : ''}
          <p>${categories[i].nominees[j].artist}</p>
          <p>${categories[i].nominees[j].info}</p>
        </li>
      `)
    }
    $('#categories').append(`
      </h3>
      <hr>
    `);
  }
}