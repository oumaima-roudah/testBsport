import React,{Component, useState} from 'react';

import './App.css';

let date= new Date();
let d= date.getDay();

class App extends Component {
  
  state = {
    loading: true,
    
    
    firstDate: new Date(date.getFullYear(),date.getMonth(),date.getDate()+ (d==0?-6:1)-d),
    maxDate: new Date(date.getFullYear(),date.getMonth(),date.getDate()+ (d==0?0:7)-d),
  }
 
  

  async componentDidMount(){
    let url='https://back.staging.bsport.io/api/v1/offer/';
    let offers=[];
    do {
      const response =await fetch(url);
  
       const data=await response.json();
       offers= offers.concat(
         data.results.filter(
           offer=> offer.company===6
            && new Date(offer.date_start).getTime()>= this.state.firstDate.getTime()
            && new Date(offer.date_start).getTime()<this.state.maxDate.getTime()));
      console.log(offers);
      url= data.links.next;
         }while (url!== null)
       this.setState({offers, loading: false});

    

  }
  
  render() {
    
  
    const offers= this.state.loading? "loading..." : this.state.offers.map(offer =>(
      <div key = {offer.id}>
        <span>{offer.company}</span>
        <ul>
           <li>start at : {offer.date_start}</li>
           <li>durée en minute : {offer.duration_minute}</li>
           <li>coach : {offer.coach}</li>
        </ul>

      </div>
    ))
    
    return (
    <div className="App">
     
       <h1> liste de séances</h1>
      {offers}

       
        
       

      
    </div>
    );
  }
}

export default App;
