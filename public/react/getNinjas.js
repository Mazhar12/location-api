import React from 'react';
import '../style.css';
class getNinjas extends React.Component{
    
    constructor(props) {
    	super(props);
   			 this.state = {
              ninjas: []
            }

    	this.getN = this.getN.bind(this);
    	this.handleDelete = this.handleDelete.bind(this)
    }

    render() {
				let ninjas = this.state.ninjas;
				ninjas = ninjas.map(function(ninja, index){
				let available = ninja.available.toString();
					  return(
						      <li key={index}>
						          <span className={available}></span>
						          <span className="name">{ninja.name}</span>
						          <span className="rank">{ninja.rank}</span>
						          <span className="buttons btn" onClick={this.handleDelete.bind(this,ninja._id)} >x</span>
						          <span className="coordinates">{ninja.geometry.coordinates[0]}  , {ninja.geometry.coordinates[1]}</span>
						      </li>	
					  );
				}.bind(this));

               return(
	                  <div id="ninja-container">    
	                      <ul>{ninjas}</ul>
	                   </div>
              		);
        	}



        	 handleDelete(id) {

					fetch('/api/ninjas/'+id, {method:'DELETE'}).then(function(data){
                  return data.json();

		              }).then( json => {
			                  this.setState({
			                   		   ninjas: json
			                  });
		              });
          	}

			 componentDidMount() {
			 	this.getN();
			 }

            getN() {
              
              fetch('/api/ninjas').then(function(data){
                  return data.json();

		              }).then( json => {
			                  this.setState({
			                   		   ninjas: json
			                  });
		              });
          	} 



}

export default getNinjas;