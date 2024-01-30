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

  // Fetch books data from the API on component mount.
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

  // Checks for registrationSuccess value in sessionStorage and shows message accordingly.
  useEffect(() => {
    const showSuccess = sessionStorage.getItem("registrationSuccess");
    if (showSuccess) {
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        sessionStorage.removeItem("registrationSuccess"); 
      }, 3000);
    }
  }, []);

  // Filter books based on the search query.
  useEffect(() => {
    const filtered = ApiData.filter(book =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBooks(filtered);
  }, [ApiData, searchQuery]);

  // Handle changes to the search input field.
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="main">
      {showSuccessMessage && (
        <div className="success-message">
          Registration Successful! ✅
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
        {filteredBooks.map((book) => (
          <div className="card" key={book.id}>
            <div className="card-image">
              <img src={book.imageLinks.smallThumbnail} alt={book.title} />
            </div>
            <div className="card-text">
              <h3>{book.title}</h3>
              <div className="ratings">
              <p className="author">By {book.authors}</p>
                {book.averageRating ? (
                  <span>{book.averageRating}⭐</span>
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
