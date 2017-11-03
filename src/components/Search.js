import React, { Component } from 'react';
import axios from 'axios';

const baseUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?countryCode=DE&'
const API_KEY = '&apikey=dqO3hcew5GUY0TSgaNGf3unS5nFQDsDs'

export default class Search extends Component {
       constructor(props){
       	super(props);
       	this.state = {
          data : ""
       	}
       	this.handleEvent = this.handleEvent.bind(this);
       }
       
       handleEvent(e){
       	const start = document.getElementById("startDate").value;
       	const end = document.getElementById("endDate").value;
       	const city = document.getElementById("cityName").value;
       	
       	// get current time for the format valid format YYYY-MM-DDTHH:mm:ssZ {example: 2020-08-01T14:00:00Z}
       var getTime = new Date();
       var time = "T" + ("0" + getTime.getHours()).slice(-2)+ ":" + ("0" + getTime.getMinutes()).slice(-2) + ":" + 
    ("0" + getTime.getSeconds()).slice(-2) + "Z";
       const url = `${baseUrl}&startDateTime=${start}${time}&endDateTime=${end}${time}&city=${city}${API_KEY}`
       console.log(url)

       axios.get(url)
          .then(response => {
          console.log(response)
          console.log(response.data._embedded)
          this.setState({
          	data: response.data._embedded
          })
          })
          .catch(error => {
          	alert("error! Try again")
          })
       }
    render(){
    	let data = this.state.data.events;
    	let events;
    	if(data) {
    	 events = data.map(
    		(obj) =>(
    			<div className="result">
    			<a href={obj.url}>
    			<img src={obj.images[0].url} alt="img" height="300" width="300"/>
    			<div key={obj.id}>{obj.name}</div></a>
    			</div>
    			)
    			)
    		}
        console.log(events)
    	return(
    		<div>
    		From<input type="date" id="startDate"/>
    		To<input type="date" id="endDate"/>
    		City<input type="text" id="cityName" />
    		<button onClick={this.handleEvent}>Search</button>
    		<div className="wrapper">
            {events}
            </div>
            </div>
    		)
    }
}