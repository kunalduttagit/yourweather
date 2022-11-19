window.addEventListener("load", () => {
    //variables
    let lat;
    let long;
    let temperatureDescription = document.querySelector(
        ".temperature-description"
    );
    let locationIcon = document.querySelector(".location-icon");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    if (navigator.geolocation) {
        //if user gives location permissions
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude; //get info from browser
            lat = position.coords.latitude;
            let apiKey = "f4a29c578357e86a7d54cb0063e275d9";
            let unit = "metric";
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${unit}`;

            fetch(api) //to fetch info from api
                .then(response => {
                    return response.json(); //then it returns json formatted information as response of complete
                })
                .then(data => {
                    //then we decide what to do with the data
                    console.log(data);
                    let { temp } = data.main;
                    const { icon, description } = data.weather[0];
                    const { country } = data.sys;
                    temp = Math.round(temp);
                    //set DOM elements
                    temperatureDegree.textContent = temp;
                    temperatureDescription.textContent = description;
                    locationTimezone.textContent = `${data.name}, ${country}`;
                    locationIcon.innerHTML = `
                        <div>
                            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
                        </div>
                    `;
                });
        });
    } else {
        h1.textContent = "You need to enable Location Permissions to continue.";
    }
});
