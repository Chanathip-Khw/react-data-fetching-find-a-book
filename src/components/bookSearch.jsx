import React, { useState, useEffect } from "react";
import axios from "axios";

const BookSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);

  // Function to fetch data from Google Books API using axios
  const fetchBooks = async (query) => {
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
  
      // Check if the response contains items, if not, set books to an empty array
      const booksData = response.data.items ? response.data.items.map((item) => item.volumeInfo.title) : [];
      
      setBooks(booksData);
    } catch (error) {
      console.error('Error fetching data:', error.message || 'Something went wrong');
    }
  };
  

  // Handle input change and fetch books
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchTerm(query);
  };

  // useEffect to trigger search on typing with a debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.length > 2) {
        fetchBooks(searchTerm); // Fetch books if search term is longer than 2 characters
      }
    }, 500); // Debounce delay of 500ms

    return () => clearTimeout(timer); // Cleanup timer on component unmount or searchTerm change
  }, [searchTerm]);

  return (
    <div>
      <h1>Find a Book</h1>
      <input
        type="text"
        placeholder="Search for a book..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {books.map((book, index) => (
          <li key={index}>{book}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookSearch;
