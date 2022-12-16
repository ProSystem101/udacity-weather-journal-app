let d = new Date();
let newDate = `${d.getMonth()+1}.${d.getDate()}.${d.getFullYear()}`;

document.getElementById('generate').onclick = async () => {

  try {
    let zipCode = document.getElementById('zip').value;
    let feelings = document.getElementById('feelings').value;
    const apiKey = "1a213f7bc05091b7a28d5781d0ce5050&units=metric";
    let url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`;
    let response = await fetch(url).then(res => res.json());
    let temp = await response.main.temp;
    console.log(temp);

    await fetch('/addWeather', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        newDate,
        temp,
        feelings
      })
    })

    const results = await fetch('/getWeather').then(res => res.json());
    document.getElementById('date').innerHTML = results.date;
    document.getElementById('temp').innerHTML = results.temp + " degrees";
    document.getElementById('content').innerHTML = results.feelings;
  }

  catch (error) {
    console.log("ERROR:", error);
  }

};
