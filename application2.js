function foo(args) {
  $('#city-box').html("");
  args.RESULTS.forEach((city, i) => {
    $('#city-box').append(
        '<br>'+
        '<div id="bob", data-coordinates="'+city.lat+','+city.lon+'"> City: '+city.name+' </div>'+
        '</br>'
    );
  });

  $('#bob').click( function() {
    var hello = $(this).attr("data-coordinates");
     $.ajax({
      method: "GET",
      url: 'http://api.wunderground.com/api/bb8a68e1f5fecd30/conditions/q/' + hello + '.json',
      success: function (result) {
        $('#bob').append(
        '<div> weather conditions: '+ result.current_observation.weather + '</div>',
         '<div> temperature: '+ result.current_observation.temperature_string +'</div>'
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
       data: {query: searchTerm, cb: 'foo'},
       url: "http://autocomplete.wunderground.com/aq" 
      });
    }
  });  
});