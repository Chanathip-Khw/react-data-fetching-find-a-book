import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const getData = async () => {
    try {
      const bookData = await axios.get(
        `https://openlibrary.org/search.json?q=${query}`
      );
      setBooks(bookData.data.docs);
    } catch {
      alert("error");
    }
  };

  useEffect(() => {
    getData();
  }, [query]);

  return (
    <div className="App">
      <h1>Find a Book</h1>
      <input
        type="text"
        placeholder="search here"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      ></input>
      <ul>
        {books.map((book) => (
          <li key={book.key}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
