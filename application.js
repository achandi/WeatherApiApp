function cityCall(args) {
  $('#city-box').html("");
  args.RESULTS.forEach((city, i) => {
    $('#city-box').append(
        '<div class="city_location", data-coordinates="'+city.lat+','+city.lon+'"> City: '+city.name+'<div class="city_data"></div></div>'
    );
  });

}

$(document).ready(function(){

  $('#search-box').on('keyup',function() {
    var searchTerm = $(this).val();
    if (searchTerm.length > 3) {
      $.ajax({
       method: "GET",
       dataType: "jsonp",
       data: {query: searchTerm, cb: 'cityCall'},
       url: "http://autocomplete.wunderground.com/aq" 
      });
    }
  });  


  $('#city-box').on('click', '.city_location', function() {
    var city_location = $(this).children('.city_data');
    var hello = $(this).attr("data-coordinates");
     $.ajax({
      method: "GET",
      url: 'http://api.wunderground.com/api/bb8a68e1f5fecd30/conditions/q/' + hello + '.json',
      success: function (result) {
        $(city_location).html(
        '<div> >> weather conditions: '+ result.current_observation.weather + '</div>'+
         '<div> >> temperature: '+ result.current_observation.temperature_string +'</div>'
        );
      }
    });
  });
  
});