import React from "react";

//Componenti
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";

export default class Layout extends React.Component{ 
   constructor(props){ 
      super(props); 
   }
   render(){ 
       return( 
          <div> 
             <Navbar/> 
             {this.props.children} 
             <Footer/> 
         </div>
      ); 
   }
}