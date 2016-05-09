function cityCall(args) {
  $('#city-box').html("");
  args.RESULTS.forEach((city, i) => {
    $('#city-box').append(
        '<div class="city_location", data-coordinates="'+city.lat+','+city.lon+'"> City: '+city.name+' </div>'
    );
  });

  $('.city_location').click( function() {
    var city_location = this;
    var hello = $(this).attr("data-coordinates");
     $.ajax({
      method: "GET",
      url: 'http://api.wunderground.com/api/bb8a68e1f5fecd30/conditions/q/' + hello + '.json',
      success: function (result) {
        console.log(city_location);
        $(city_location).append(
        '<div> >> weather conditions: '+ result.current_observation.weather + '</div>',
         '<div> >> temperature: '+ result.current_observation.temperature_string +'</div>'
        );
      }
    });
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
});