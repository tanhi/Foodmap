$(document).ready(function() {
  // Declarando variables para seleccionar los elementos del DOM
  var $search = $('#input-search');
  var $buttonSearch = $('#button-search');
  var $modal = $('#myModal');
  // Declarando variables para la ruta de imagen
  var $src = '';

  // array para la lista de autocompletar
  var tagsCategories = ['mexicana', 'vegetariana', 'americana'];
  // Funcion que muestra las imagenes de los restaurantes
  showRestaurantImage(data, 'mexicana');
  showRestaurantImage(data, 'vegetariana');
  showRestaurantImage(data, 'americana');


  $search.on('input', function(event) {
    var $value = $(this).val();
    $value = $value.toLowerCase();

    if (($value === 'todos') || ($value === ' ') || ($value.length == 0)) {
      $('.filter').show('1000');
    } else {
      // Selecciona todos los elementos que no coinciden con el selector dado
      $('.filter').not('.' + $value).hide('3000');
      // Filtra todos los elementos que coincidan con el
      $('.filter').filter('.' + $value).show('3000');
    }
  });

  $buttonSearch.on('click', function(event) {
    var cate = $search.val();
    var restaurants = getRestaurants(data, cate);
  });

  $('.img-rest').on('click', function(event) {
    $('#myModal').modal('show');
    var photoRest = $(this).attr('src');
    var $categoryImg = $(this).attr('data-category');
    var $index = $(this).attr('data-index');
    var restaurants = getRestaurants(data, $categoryImg);
    console.log(restaurants);

    for (var i = 0;i < restaurants.length;i++) {
      if ($index == i) {
        var $name = restaurants[i].name;
        var address = restaurants[i].address;
        $('#modal-titleRest').text($name);
        $('#modal-addressRest').text(address);

        $('#modal-rest-images').attr('src', photoRest);
      }
    }
  });
});
function getRestaurants(data, category) {
  return data[category].restaurants;
}
function showRestaurantImage(data, cate) {
  var restaurants = getRestaurants(data, cate);
  for (var i = 0;i < restaurants.length;i++) {
    $src = restaurants[i].photo;
    $('#gallery').append('<div class="gallery_restaurant col-xs-6 col-lg-4 col-md-4 col-sm-4 filter ' + cate + '"><div class="container-img"><img src="' + $src + '" class="img-rest img-responsive" data-index="' + i + '" data-category=' + cate + '></div><br></div>');
  }
}
