import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from 'react-router-dom';
import '../css/Home.css';
import '../css/Navbar.css';
import logo from '../assets/logo.png'

function Books() {
  const [ApiData, setApiData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    axios
      .get("https://reactnd-books-api.udacity.com/books", {
        headers: { Authorization: "whatever-you-want" },
      })
      .then((response) => {
        const data = response.data.books;
        setApiData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const showSuccess = sessionStorage.getItem("registrationSuccess");
    if (showSuccess) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        sessionStorage.removeItem("registrationSuccess"); 
      }, 4000);
    }
  }, []);

  useEffect(() => {
    const filtered = ApiData.filter(book =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBooks(filtered);
  }, [ApiData, searchQuery]);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="main">
      {showSuccessMessage && (
        <div className="success-message">
          Registration Successful!
        </div>
      )}
      <nav>
        <div>
          <NavLink to="/">
            <img
              src={logo}
              alt=""
            />
          </NavLink>
        </div>
        <div>
          <input
            className="input"
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="🔍    Search Books"
          />
        </div>
        <div>
          <NavLink to="/form">
            <button className="register-btn">Register</button>
          </NavLink>
        </div>
      </nav>

      <div className="container flex">
        {filteredBooks.map((item) => (
          <div className="card" key={item.id}>
            <div className="card-image">
              <img src={item.imageLinks.smallThumbnail} alt={item.title} />
            </div>
            <div className="card-text">
              <h3>{item.title}</h3>
              <div className="ratings">
              <p className="author">By {item.authors}</p>
                {item.averageRating ? (
                  <span>{item.averageRating}★</span>
                ) : (
                  "No ratings yet"
                )}
                <span> • Free</span>
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;
