import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Bookpage.css";
import { Link } from "react-router-dom";



function Bookpage() {

  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [result, setResult] = useState("");
  const submitstatus = localStorage.getItem("submitstatus")
 
  
  //fetching api
  useEffect(() => {

    
    axios
      .get("https://reactnd-books-api.udacity.com/books", {
        headers: {
          Authorization: "whatever-you-want",
        },
      })
      .then((response) => {
        setBooks(response.data.books);
        console.log(response.data.books);
        

      })
      .catch((error) => {
        console.log(error);
      })
      
     
  }, []);
  

  // for changing submitstatus while refreshing 
  window.addEventListener('beforeunload', () => {
    
    localStorage.setItem("submitstatus","!true");
    
  });
  // Filter data for search option
  const filteredData = books.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  

  const handleInputChange = (event) => {
    setSearch(event.target.value);
    if (event.target.value === "") {
      setResult("");
    } else {
      filteredData.length > 0
        ? setResult("Showing books of your choice 📚")
        : setResult("no books found 😓");
    }
  };

  return (
    <div className="mainpage" style={{color:"black" ,width:"99vw"}}>
      {/* -------------------------navbar -----------------------------  */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          background: "#0000000",
          boxShadow: "0px 8px  4px rgba(0, 0, 0, 0.65)",
          width: "99vw",
          height:"9vh",
          alignItems:"center",
          
        }}
      >
   
        <div className="logo">
            
            <img src="https://kalvium.community/images/sidebar-3d-logo.svg" alt="" />  <h1 style={{color:"black"}}>Kalvibooks</h1>
        </div>
        <div>
          
        <input className="search" type="search" placeholder="Search" onChange={handleInputChange}/>
        
        
        {
  submitstatus =="true" ? (
    <button style={{ margin: "5px" }}>
      Registered
    </button>
  ) : (
    <Link to={"/register"}>
      <button style={{ margin: "5px" }}>
        Register
      </button>
    </Link>
  )
}
      
        </div>
      </div>
        {/* ---------------------------Books---------------------- */}
     
      <p className="results">{result}    </p>
      <div className="Books">
        {filteredData.map((data) => (
          <div>                                                           {/*mapping each item in the api */}
            <img src={data.imageLinks.thumbnail} alt="" />
            <h4 key={data.id}>{data.title}</h4>
            <p>
              {data.averageRating ? (
                <span>
                  <h3>✨{data.averageRating}</h3>
                  <h3 className="cost" >FREE</h3>
                </span>
              ) : (
                <span>
                  <h3>UR</h3>
                  <h3 className="cost">FREE</h3>
                </span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>

  );
}

export default Bookpage;