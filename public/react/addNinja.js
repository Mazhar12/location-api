import React from 'react';
import '../style.css';

class addNinjas extends React.Component{

        constructor(props) {
            super(props)

            this.state = {available: 'true'};

          this.addNinja = this.addNinja.bind(this);
           this.handleChange = this.handleChange.bind(this);
        }

          render (){
              return(
                <div>
                      <form id="add" onSubmit={this.addNinja}>
                          <label>Enter Ninja Name:</label>
                          <input type="text" ref="name" placeholder="Name" required />
                          
                          <label>Enter Ninja Rank:</label>
                          <input type="text" ref="rank" placeholder="Rank" required />
                          
                          <label>Enter Ninja Latitude:</label>
                          <input type="text" ref="nLat" placeholder="latitude" required />
                          
                          <label>Enter Ninja Longitude:</label>
                          <input type="text" ref="nLng" placeholder="longitude" required />
                          <div className="styled-select blue semi-square">
                                <select value={this.state.available} onChange={this.handleChange} >
                                  <option value="true">available</option>
                                  <option value="false"> not available</option>
                                </select>
                          </div>
                          <input type="submit" value="Add Ninja" />
                      </form>
                      
                  </div>
              );
          }


                   handleChange(event) {
                      this.setState({available: event.target.value});
                 }


          addNinja(e){
          
          e.preventDefault();
          var name = this.refs.name.value;
          var rank = this.refs.rank.value;
          var nlng = this.refs.nLng.value;
          var nlat = this.refs.nLat.value;
          var available = this.state.available;
              fetch('/api/ninjas?name='+ name +'&rank=' + rank + '&lat=' + nlat + '&lng=' + nlng + '&available=' + available,{method:'POST'}).then(function(data){
                  return data.json();
              })
        }

      };

export default addNinjas;