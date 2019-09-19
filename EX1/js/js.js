
/*
1. Función que muestra y esconde la sección para hacer comentarios 
   al hacer click el botón 'Escribe una reseña'. 
   on click!
   (5 puntos)
*/
let button = document.getElementById('escribe_reseña');
button.addEventListener('click', () => {
  let resena = document.getElementById('seccion_comentario');
  resena.classList.toggle('hidden')
})


/*
2. Cargar los comentarios de el archivo comentarios.xml o bien de 
  https://tc2026daw.github.io/instrucciones/misc/comentarios.xml 
  (función ajax, 25 puntos)
*/

$.ajax({
  url: 'https://tc2026daw.github.io/instrucciones/misc/comentarios.xml',
  type: 'GET',
  dataType: 'xml',
  success: function(data) {
    let newHtml = ''
    $(data).find('comment').each(function() {
      newHtml += `
        <div class="review">
          <div class="nombre">${$(this).find("name").text()}</div>
          ${getStarsSpans($(this).find("stars").text())}
          <div class="texto">${$(this).find("text").text()}</div>
          <a class="buttonMail" href="mailto:${$(this).find("name").attr('email')}">Enviar Mail</a>
        </div>
      `
    })
    $('#seccion_reviews').append(newHtml)
  },
  error: function(error_msg) {
    console.log(error_msg)
  },
})

/*
3. Funcion que apendiza el nuevo comentario al darle click a PUBLICAR
  on click!
  (función, 35 puntos)
*/
$('#btn-publicar').on('click', function(event){
  // validar el nombre
  let $name = $('#nombre').val()
  let $comment = $('#comentario').text()
  let $email = $('#email').val()
  let $error_comment = $('#error_comment')
  let $error_stars = $('#error_stars')
  if ($('input[name="rating"]:checked').length == 0) {
    $error_stars.removeClass('hidden')
    return false
  } else {
    $error_stars.addClass('hidden')
  }

  let $stars = $('input[name="rating"]:checked')[0].value
  if ( $name == '' || $comment == '' || $email == '') {
    $error_comment.removeClass('hidden')
    return false
  } else {
    $error_comment.addClass('hidden')
  }

  $('#seccion_reviews').append(`
    <div class="review">
      <div class="nombre">${$name}</div>
      ${getStarsSpans($stars)}
      <div class="texto">${$comment}</div>
      <a class="buttonMail" href="mailto:${$email}>Enviar Email</a>
    </div>
  `)  
  limpiar()
})



/*
4. Funcion que limpia el nombre, el email y el div "#comentarios" al darle
   click en "btn-limpiar" con leyenda de "CANCELAR"
   on click!
  (5 puntos)
*/
$('#btn-limpiar').on('click', () => {
  limpiar()
})

limpiar = () => {
  let $name = $('#nombre').val('')
  let $comment = $('#comentario').text('')
  let $email = $('#email').val('')
}

// Funcionalidad extra
// - Valida por si las estrellas tambien estan vacias
// - Enviar mail


/*
Funcion que recibe un numero de stars y regresa los 5 spans 
que simbolizan las estrellas del rating. por ejemplo:
let stars = 3;
let html = getStarsSpans(stars);

html = '
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
'
*/
function getStarsSpans(stars) {
  let new_html = '';
  for( let i = 0; i < stars; i++) {
    new_html += `
      <span class="fa fa-star checked"></span>
    `;
  }

  for ( let i = 0; i < 5 - stars; i++ ) {
    new_html += `
      <span class="fa fa-star"></span>
    `;
  }

  return new_html;
}
