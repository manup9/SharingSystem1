import React, { Component } from "react";
import '../App.css';
import Noi from '../immagini/chisiamo1.png';
import { Container, Row, Col, Button } from 'react-bootstrap';


export default class Chisiamo extends Component {

  constructor(props) {
    super(props);
  }




   render(){ 
      return( 
         <div className='Chisiamo'> 
                <img src={Noi} alt="studenti" width="60%" className='imgChisiamo' />
         </div>
      ); 
   } 
}

