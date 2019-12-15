//SET VARIABLES TO USE
const APR_Summer_Participants = "/apr_data/2015_Summer_APR_Participants.csv"
const siteLocationData = "/data/coordinates.csv"
const screenWidth = $(window).width();
const screenHeight = $(window).height();
let dataset;
let geoJsonFile;
let color1 = "#1986af", //blue
    color2 = "#c57f0d", //brown
    color3 = "#1ab898", //teal
    color4 = "#7fc8eb", //light blue
    color5 = "#c55b4d"

let setPolygonStyle = function(x) {
  if(x >= 550){
    return [{"color": color1, "weight": 1},
      {"color": color2, "weight": 1},
      {"color": color3, "weight": 1},
      {"color": color4, "weight": 1},
      {"color": color5, "weight": 1},
      {"color": "#1A1A1A", "weight": 1}]
    }
  if(x < 550){
    return [{"color": "#1986af", "weight": 1},
      {"color": "#1986af", "weight": 1},
      {"color": "#1986af", "weight": 1},
      {"color": "#1986af", "weight": 1},
      {"color": "#1986af", "weight": 1},
      {"color": "#1986af", "weight": 1}]
    }
}
let setButtonStyle = function(x) {
  if(x >= 550){
    return 'images/downButtonBlack.svg'
    }
  if(x < 550){
    return 'images/downButton.svg'
    }
}
let polygonStyle = setPolygonStyle(screenWidth)
let buttonStyle = setButtonStyle(screenWidth)
console.log(buttonStyle)

let pns = ["Los Angeles Promise Neighborhood in the Promise Zone",
"The Everett Freeman Promise Neighborhood Initiative (Northern California)",
"Deer Creek Promise Neighborhood (Mississippi Delta)",
"Knox Promise Neighborhood (Kentucky)",
"Promise of a Strong Partnership for Education Reform (West Philadelphia)",
"Camden Promise Neighborhood Implementation (New Jersey)"]


//////////////////////////////////////////
//INITIALIZE MAP
//////////////////////////////////////////
/*
var myMap = L.map('map-main', {attributionControl: false, zoomControl:false, }).setView([39.8283, -98.5795], 3);
L.tileLayer('https://api.mapbox.com/styles/v1/capndavet/cj70okgrxd08f2rqxkx9dal7n/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2FwbmRhdmV0IiwiYSI6ImNpdzg5cjBuaDAyMnEyb3RkeDVhcjVqMDYifQ.hUYEt9ZpUijN5ju5E4P-pA', {
  maxZoom: 18,
}).addTo(myMap);
myMap.scrollWheelZoom.disable()
*/
//////////////////////////////////////////
//PROMISES (for inside d3 function)
//////////////////////////////////////////

//get GeoJSON Polygons
$.getJSON("geoJSON/Promise_Neighborhoods_Master.geojson", function(json) {
    geoJsonFile = json
   });

$.getJSON("geoJSON/corning_union_hs_district.geojson", function(json) {
   paskentaGeoJsonFile = json
  });
//add markers

/*
let addMarkers = function(input){
    //ADD MARKERS TO MAP
    let allGroup = L.layerGroup().addTo(myMap) //Sets group for markers and stipulates that everything gets added to this

    if(screenWidth > 500){ //for wider screens
      for (var i = 0; i < input.length; i++) {
        marker = new L.circleMarker([input[i]["Y"],input[i]["X"]], {id: i, color: '#1986af'}) //sets id for marker
        .bindPopup(input[i]["Project Title"], {autoPan: false}) //binds popup with center name
        .on('mouseover', function (e) {
          this.openPopup()
        })
        .on('mouseout', function (e) {
          this.closePopup()
        })
        .on('click touch', function (e) { //function to call correct row of data
          console.log("wide screen", input[this.options.id]["Project Title"])
        })
        .addTo(allGroup) //adds popup to Map
      }
    } //end if statement
    else { //for thinner screens}
      for (var i = 0; i < input.length; i++) {
        marker = new L.circleMarker([input[i]["Y"],input[i]["X"]], {id: i, color: '#1986af'}) //sets id for marker
        .on('click touch', function (e) { //function to call correct row of data
          let goTo;
          switch (input[this.options.id]["Project Title"]) {
            case "Los Angeles Promise Neighborhood in the Promise Zone":
                  goTo = "#story_0"
                  break;
            case "The Everett Freeman Promise Neighborhood Initiative":
                  goTo = "#story_1"
                  break;
            case "Deer Creek Promise Neighborhood":
                  goTo = "#story_2"
                  break;
            case "Knox Promise Neighborhood":
                  goTo = "#story_3"
                  break;
            case "Promise of a Strong Partnership for Education Reform (ProSPER)":
                  goTo = "#story_4"
                  break;
            case "Camden Promise Neighborhood Implementation":
                  goTo = "#story_5"
                  break;
          }
          console.log(goTo)
          console.log(input[this.options.id]["Project Title"])
          $('html,body').animate({
            scrollTop: $(goTo).offset().top},
            1000);
        })
        .addTo(allGroup) //adds popup to Map
      }
    $(".annotationText").remove()

    }
} */


//////////////////////////////////////////
//D3 LOAD
//////////////////////////////////////////

d3.csv(siteLocationData, function(error, data) {
    if(error) {
      console.log(error);
    }
    else {
      dataset = data;
      //addMarkers(data)
    }
}) //end d3 function

//////////////////////////////////////////
//WAYPOINTS
//////////////////////////////////////////
let mapRef0, mapRef1, mapRef2, mapRef3, mapRef4, mapRef5, paskentaPolygon;

  $(".story").each(function(index){
    $(this).attr('id','story_'+index);    //adds an id to each story element
    let mapContainerID = 'mapContainer_'+index           //makes a class name for each map
    let mapID = 'map_'+index           //makes a class name for each map
    let zoomList = [11, 8, 9, 9, 12, 12]  //makes a list of zoom levels
    var map = L.map(mapID, {attributionControl: false, zoomControl:true, }).setView([39.8283, -98.5795], 3); //instantiates map for each area
    switch (index) {
      case 0:
        mapRef0 = map
        break
      case 1:
        mapRef1 = map
        break;
      case 2:
        mapRef2 = map
        break
      case 3:
        mapRef3 = map
        break;
      case 4:
        mapRef4 = map
        break
      case 5:
        mapRef5 = map
        break;
    }
    L.tileLayer('https://api.mapbox.com/styles/v1/capndavet/cj79fc5ot6w6u2ro9jf7aaums/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2FwbmRhdmV0IiwiYSI6ImNpdzg5cjBuaDAyMnEyb3RkeDVhcjVqMDYifQ.hUYEt9ZpUijN5ju5E4P-pA', {
      maxZoom: 18,
    }).addTo(map);
    map.scrollWheelZoom.disable()         //disables scrolling
    $('#story_'+index).waypoint(function(direction) {             //sets waypoint for each section
      if(direction==='down') {                                                    //if scrolling down
        map.flyTo(new L.LatLng(dataset[index].Y, dataset[index].X), zoomList[index], {animate:true})
        var polygon = L.geoJSON(geoJsonFile, {              //adds polygon layer to each map
            style: polygonStyle[index]
            })
        polygon.addTo(map);
        if(index=1){paskentaPolygon=polygon}
        this.destroy()
      }
    }, {offset: '50%'})
  })

if(screenWidth>=550) {
  $('.mapContainer h3').remove();                                               //remove section titles from above the story elements
  $(".story").each(function(index){                                             //for each section
      let buttonName = 'button_' + index                                        //make a button nome for each section
      $(this).prepend("<h3 class='title'>" + pns[index] + "</h3>")              //add section title back in inside the story elements
      $(this).not("#story_5").append("<a class='buttonContainer' id=" +         //add down buttons to each story except the last
        buttonName + "><img src=" + buttonStyle + " id='downButton'></a>")
    })
  $("#text1").append("<a class='buttonContainer' id='firstButton'><img src="    //add down button to intro section
    + buttonStyle + " id='downButton'></a>")
  $("#story_5").append("<a class='buttonContainer' id='lastButton'><img src="    //add up button to last section/end
    + "'images/upButtonBlack.svg' id='upButton'></a>")

  $(".story p").each(function(index){                                           //copy text from outside of map container to inside map container
    $('.mapContainer').eq(index).append($(".story p").eq(index).html()).addClass("insideMapContainerText")
  })
  $(".story p").remove().not(".insideMapContainerText")                         //remove the old text
  //$(".buttonContainer").last().html()
  //button functionality
  $("#firstButton").click(function() {                                          //give scroll functionality to button in intro
    $('html, body').animate({
        scrollTop: $("#story_0").offset().top
    }, 1000);
  });
  $(".buttonContainer").not("#lastButton").each(function(index){                //give scroll functionality to button in each section except the final section
      let buttonName = 'button_' + index
      let elementToHit = '#story_' + index
      $(this).click(function() {
          console.log(buttonName)
          $('html, body').animate({
              scrollTop: $(elementToHit).offset().top
          }, 1000);
      })
    })
    $("#lastButton").click(function() {                                          //give scroll functionality to button in intro
      $('html, body').animate({
          scrollTop: $(document.body).offset().top
      }, 1000);
    });
    //if longest story is longer than vh + some margin, remove arrow buttons
    var maxHeight = Math.max.apply(null, $(".mapContainer").map(function (){
      return $(this).height();
    }).get()) + 200;
    if(maxHeight > screenHeight){
      $(".buttonContainer").remove()
    }




  }
