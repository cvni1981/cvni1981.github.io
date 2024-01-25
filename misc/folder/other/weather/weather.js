function create(htmlStr) {
  var frag = document.createDocumentFragment(),
      temp = document.createElement('div');
  temp.innerHTML = htmlStr;
  while (temp.firstChild) {
      frag.appendChild(temp.firstChild);
  }
  return frag;
}

async function getweather() {
    const locationname = prompt("Location to get weather from:");
    const requestURL =
      "https://wttr.in/"+locationname+"?format=j1";
    const request = new Request(requestURL);
  
    const response = await fetch(request);
    const data = await response.json();

    const current_condition = data['current_condition'][0]
    const nearest_area = data['nearest_area'][0]
    const weather = data['weather']

    const location = document.querySelector("#location_and_time");
    location.textContent = "Weather in "+nearest_area['areaName'][0]['value']+", "+nearest_area['country'][0]['value']+' | fetched at '+current_condition['observation_time']+' UTC from wttr.in:';

    const temp = document.querySelector("#temp");
    temp.textContent = current_condition['temp_C']+'°C'

    const description = document.querySelector("#description");
    description.textContent = current_condition['weatherDesc'][0]['value']
    const feels_like = document.querySelector("#feels_like");
    feels_like.textContent = 'Feels like '+current_condition['FeelsLikeC']+'°C'
    const wind = document.querySelector("#wind");
    wind.textContent = current_condition['windspeedKmph']+' km/h '+current_condition['winddir16Point']+' '
    const windarrow = document.querySelector('#current_arrow');
    windarrow.style.transform = 'rotate('+current_condition['winddirDegree']+'deg)'

    const precip = document.querySelector("#precip");
    precip.textContent = current_condition['precipMM']+' mm '
    const humidity = document.querySelector("#humidity");
    humidity.textContent = current_condition['humidity']+'%'
    const pressure = document.querySelector("#pressure");
    pressure.textContent = current_condition['pressure']+' mbar'
    const visibility = document.querySelector("#visibility");
    visibility.textContent = current_condition['visibility']+' km'
    const uvIndex = document.querySelector("#uvIndex");
    uvIndex.textContent = current_condition['uvIndex']
    const cloud = document.querySelector("#cloudcover");
    cloud.textContent = current_condition['cloudcover']+'%'

    for (let i = 0; i < 3; i++){
    const day = document.querySelector("#day"+i);
    day.textContent = weather[i]['date'];

    const max = document.querySelector("#max"+i);
    max.textContent = weather[i]['maxtempC'];
    const min = document.querySelector("#min"+i);
    min.textContent = weather[i]['mintempC'];

    const hourly = document.querySelector("#hourly"+i);
    const temphourly = document.querySelector("#temp"+i);
    const prechourly = document.querySelector("#prec"+i);
    const windhourly = document.querySelector("#wind"+i);
    const chancehourly = document.querySelector("#chance"+i);
    const morehourly = document.querySelector("#more"+i);
    const morehourly2 = document.querySelector("#more2"+i);
    const morehour2 = '<p><b>Total snow</b></p><p>'+weather[i]['totalSnow_cm']+'cm</p><p><b>Sun hours</b></p><p>'+weather[i]['sunHour']+'h</p><p><b>Sunrise</b></p><p>'+weather[i]['astronomy'][0]['sunrise']+'</p><p><b>Sunset</b></p><p>'+weather[i]['astronomy'][0]['sunset']+'</p><p><b>Moon phase</b></p><p>'+weather[i]['astronomy'][0]['moon_phase']+'</p><p><b>Moon illumination</b></p><p>'+weather[i]['astronomy'][0]['moon_illumination']+'%</p><p><b>Moonrise</b></p><p>'+weather[i]['astronomy'][0]['moonrise']+'</p><p><b>Moonset</b></p><p>'+weather[i]['astronomy'][0]['moonset']+'</p>'
    morehourly2.insertAdjacentHTML("beforeend", morehour2)

    for (let j = 0; j < 8; j++){
      const hour = '<tr><th>'+(j*3)+'h</th><td>'+weather[i]['hourly'][j]['weatherDesc'][0]['value']+'</td><td>'+weather[i]['hourly'][j]['tempC']+'°C</td><td>'+weather[i]['hourly'][j]['chanceofrain']+'%</td></tr>'
      hourly.insertAdjacentHTML("beforeend", hour)

      const temphour = '<tr><th>'+(j*3)+'h</th><td>'+weather[i]['hourly'][j]['tempC']+'</td><td>'+weather[i]['hourly'][j]['FeelsLikeC']+'</td><td>'+weather[i]['hourly'][j]['HeatIndexC']+'</td><td>'+weather[i]['hourly'][j]['DewPointC']+'</td></tr>'
      temphourly.insertAdjacentHTML("beforeend", temphour)

      const prechour = '<tr><th>'+(j*3)+'h</th><td>'+weather[i]['hourly'][j]['chanceofrain']+'%</td><td>'+weather[i]['hourly'][j]['precipMM']+'mm</td></tr>'
      prechourly.insertAdjacentHTML("beforeend", prechour)

      const windhour = '<tr><th>'+(j*3)+'h</th><td>'+weather[i]['hourly'][j]['windspeedKmph']+'km/h</td><td style="padding-right: 4px">'+weather[i]['hourly'][j]['winddir16Point']+'</td><td style="width:min-content; display: inline-block; padding: 0; transform: rotate('+weather[i]['hourly'][j]['winddirDegree']+'deg)">↑</td><td style="padding-left: 12px">'+weather[i]['hourly'][j]['WindGustKmph']+'km/h</td><td>'+weather[i]['hourly'][j]['WindChillC']+'°C</td></tr>'
      windhourly.insertAdjacentHTML("beforeend", windhour)
      
      const chancehour = '<tr><th>'+(j*3)+'h</th><td>'+weather[i]['hourly'][j]['chanceofrain']+'</td><td>'+weather[i]['hourly'][j]['chanceofovercast']+'</td><td>'+weather[i]['hourly'][j]['chanceofthunder']+'</td><td>'+weather[i]['hourly'][j]['chanceofsnow']+'</td><td>'+weather[i]['hourly'][j]['chanceofwindy']+'</td><td>'+weather[i]['hourly'][j]['chanceoffog']+'</td><td>'+weather[i]['hourly'][j]['chanceofsunshine']+'</td><td>'+weather[i]['hourly'][j]['chanceofhightemp']+'</td><td>'+weather[i]['hourly'][j]['chanceoffrost']+'</td></tr>'
      chancehourly.insertAdjacentHTML("beforeend", chancehour)

      const morehour = '<tr><th>'+(j*3)+'h</th><td>'+weather[i]['hourly'][j]['humidity']+'%</td><td>'+weather[i]['hourly'][j]['cloudcover']+'%</td><td>'+weather[i]['hourly'][j]['pressure']+'mbar</td><td>'+weather[i]['hourly'][j]['uvIndex']+'</td><td>'+weather[i]['hourly'][j]['visibility']+'km</td></tr>'
      morehourly.insertAdjacentHTML("beforeend", morehour)
      
    }
    }
  
  }

getweather()

  