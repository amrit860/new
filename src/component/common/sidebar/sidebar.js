import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.component.css";
export const Sidebar =(props)=>{
    return(
        <div className="sidenav">

      <Link to="/home">Home</Link>
    <Link to="/Add Product">Add Product</Link>
    <Link to="/View Product">view product</Link>
    <Link to="/Search Product">Search Product</Link>
   

  </div>
    )
}
