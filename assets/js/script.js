
// assigning var names to to Ids
var cityFormEl = document.querySelector('#city-form');
var nameInputEl = document.querySelector('#cityname');
var cityContainerEl = document.querySelector('#city-container');
var citySearchTerm = document.querySelector('#city-search-term');
var locationCity = document.querySelector('#maincard');
var a1 = document.querySelector('#card1');
//assigning var name to an empty array
var box = [];

// create elements tags for updating webpage dynamically
let list = document.createElement('ul');
var temp1 = document.createElement('li');
var temp_now = document.createElement('li');
let cloudy = document.createElement('li');
var wind1 = document.createElement('li');
let pressure1 = document.createElement('li');
let moist = document.createElement('li');
let head = document.createElement('h6')

//for city list counter
var cityList = document.querySelector('#city-list')

//creating search list for cities entered
var cities = [];
function renderCity() {
  cityList.innerHTML = "";
  const length = cities.length > 5 ? 5 : cities.length;

  for (var i = 0; i < length; i++) {
    var li = document.createElement("li");
    li.setAttribute('class', 'recentcities');
    let a = document.createElement("a");
    a.setAttribute("data-index", i);
    a.onclick = function (event) {
      const id = event.target.getAttribute('data-index');
      inputCity(cities[id]);
    };
    a.textContent = cities[i];
    li.setAttribute("data-index", i);
    li.appendChild(a);
    cityList.appendChild(li);
  }
};
// creating a function initiate by submit button on the city search
function iCity(event) {
  event.preventDefault();

  var city = nameInputEl.value.trim();
  if (city) {
    cityContainerEl.textContent = '';
    nameInputEl.value = '';
    cities.push(city);
    inputCity(city);

  } else {
    alert('Please enter a City name');
  }
}


function inputCity(city) {
  var requestedUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=9b1192177659da66737e8df6341c92d7&units=metric'

  fetch(requestedUrl)
    .then(function (response) {
       if (response.ok) {
      return response.json();
    }})
    .then(function (data) {
   
      //   var requestedUrl ='https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid=a9ccb03a3d3005daee42faa0a3e713c1&units=metric'
      var requestedUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' +data[0].lat + '&lon=' +data[0].lon + '&exclude=hourly&appid=a9ccb03a3d3005daee42faa0a3e713c1&units=metric'
      fetch(requestedUrl)
        .then(function (response) {
          if (response.ok) {
            return response.json();
          }})
     .then(function (data) {
            box = (data);
            console.log(data);
            console.log(box.current.weather.description);

            //assigning current date to a variable
            var today = moment().format("DD/MM/YYYY");

            //assigning various values to parameters at index 0 of the array from the api cal
            temp1.innerText = `Temp: ${box.current.temp} ℃`;
            temp_now.innerText = `Temp(feel like): ${box.current.feels_like} ℃`;
            cloudy.innerText = `sky: ${box.current.weather[0].description} `;
            wind1.innerText = `Wind: ${box.current.wind_speed} km/hr`;
            moist.innerText = `Humidity: ${box.current.humidity} g/kg`;
            pressure1.innerText = `UV Index: ${box.current.uvi}`;
            var UVI=box.current.uvi

            head.innerText = `City : ${city}  ( on ${today} )`;
            //head.innerText = `City : ${box.city.name}  ( on ${today} )`;
            //appending the values to the elements created dynamically
            locationCity.append(head);
            console.log(locationCity)
            list.append(temp1);
            list.append(temp_now);
            list.append(cloudy);
            list.append(wind1);
            list.append(moist);
            list.append(pressure1);
            locationCity.append(list);
            
if (UVI<=4 ){
  pressure1.setAttribute('class','normal')
} 
else if (UVI>4 && UVI<=7) 
{
  pressure1.setAttribute('class','moderate')
} 
else 
{
  pressure1.setAttribute('class','severe')
};

            //creating the iteation function for xtracting the value of the array over next 5 days.
            for (i = 1; i <= 5; i++) {
              let list_ = document.createElement('ul');
              var temp1_ = document.createElement('li');

              var temp_max_ = document.createElement('li');
              let cloudy_ = document.createElement('li');
              var wind1_ = document.createElement('li');
              let pressure1_ = document.createElement('li');
              let moist_ = document.createElement('li');
              let date = document.createElement('h6');
              list_.setAttribute('class', 'nextdays');

              temp1_.innerText = `Temp: ${box.daily[i].temp.day} ℃`;
              temp_max_.innerText = `Temp(feels): ${box.daily[i].feels_like.day} ℃`;
              cloudy_.innerText = `sky: ${box.daily[i].weather[0].description} `;
              wind1_.innerText = `Wind: ${box.daily[i].wind_speed} km/hr`;
              moist_.innerTextt = `Humidity: ${box.daily[i].humidity} g/kg`;
              pressure1_.innerText = `UV Index: ${box.daily[i].uvi} `;

              var duedate = moment().add(i, 'days').format("DD/MM/YYYY");
              date.innerText = `${duedate}`;

              console.log(duedate);

              let id = `day${i}`;

              var customref = document.getElementById(id)
              let head_ = document.createElement('h3')

              //appending in dynamically created elements
              list_.append(date);
              list_.append(temp1_);
              list_.append(temp_max_);
              list_.append(cloudy_);
              list_.append(wind1_);
              list_.append(moist_);
              list_.append(pressure1_);
              const prevChild = customref.getElementsByTagName('ul');
              if (prevChild.length > 0)
                customref.removeChild(customref.getElementsByTagName('ul')[0]);
              customref.append(list_);
              customref.append(head_);
            }
          });
          renderCity()
        });
      };
      //calling the function on a event of submitting the city search form.
      cityFormEl.addEventListener('submit', iCity);

    
//formSubmitHandler


