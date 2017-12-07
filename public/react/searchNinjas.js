import React from 'react';
import '../style.css';
class searchNinjas extends React.Component{
  	 
		constructor(props) {
            super(props)
            this.state = {
              ninjas: []
            }

            this.handleSubmit = this.handleSubmit.bind(this);
            this.geoFindMe = this.geoFindMe.bind(this);
        }

        render() {
          
        	var ninjas = this.state.ninjas;

              ninjas = ninjas.map(function(ninja, index){
                let available = ninja.obj.available.toString();
                  return(
                      <li key={index}>
                          <span className={available}></span>
                          <span className="name">{ninja.obj.name}</span>
                          <span className="rank">{ninja.obj.rank}</span>
                          <span className="dist">{Math.floor(ninja.dis / 1000)} km</span>
                          <span className="coordinates">{ninja.obj.geometry.coordinates[0]}  , {ninja.obj.geometry.coordinates[1]}</span>
                      </li>
                  );
              }.bind(this));

                            return(
                  <div id="ninja-container">
                      <form id="search" onSubmit={this.handleSubmit}>
                          <label>Enter your Latitude:</label>
                          <input type="text" ref="lat" placeholder="latitude" required />
                          <label>Enter your Longitude:</label>
                          <input type="text" ref="lng" placeholder="longitude" required />
                          <input type="submit" value="Find Ninjas" />
                      </form>
                      <hr />
                      <span>or get your position by click the button down</span>
                      <button className="geo" onClick={this.geoFindMe}>Search Ninjas Near You </button>
                      <div id="out"></div>
            
                      <ul>{ninjas}</ul>
                      <span></span>
                   </div>
              );
        }


            handleSubmit(e) {
              e.preventDefault();
              let lng = this.refs.lng.value;
              let lat = this.refs.lat.value;
              fetch('/api/ninjas?lat=' + lat + '&lng=' + lng).then(function(data){
                  return data.json();
              }).then( json => {
                  this.setState({
                      ninjas: json
                  });
                  console.log(json);
              });
          }

             geoFindMe() {
                    var output = document.getElementById("out");

                    if (!navigator.geolocation){
                          output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
                          return;
                    }

                    function success(position) {
                            var latitude  = position.coords.latitude;
                            var longitude = position.coords.longitude;

                            output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

                            var img = new Image();
                            img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=700x300&sensor=false";

                            output.appendChild(img);

                       fetch('/api/ninjas?lat=' + latitude + '&lng=' + longitude).then(function(data){
                                return data.json();
                            }).then( json => {
                                this.setState({
                                    ninjas: json
                                       });
                                console.log(json);
                            });
                    }

                    function error() {
                          output.innerHTML = "Unable to retrieve your location";
                    }

                     output.innerHTML = "<p>Locating…</p>";

                    navigator.geolocation.getCurrentPosition(success.bind(this), error);
              }


}

export default searchNinjas;



