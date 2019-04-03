import asap from "fitbit-asap/companion"

setInterval(() => {

    fetch('https://tempooo.herokuapp.com', {method: "GET"})
  .then(function (response) {
      response.json()
      .then(function(data) {
        // We just want the current temperature
        console.log(data["command"])
        if (data["command"]){
            returnCommand(data["command"])
        }
        // Send the weather data to the device
      });
  })
  .catch(function (err) {
    console.log("Error fetching : " + err);
  });
    
}, 3500);

function returnCommand(data) {
    asap.send(data)
  }
  