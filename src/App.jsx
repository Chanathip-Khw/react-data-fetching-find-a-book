import axios from "axios";
import "./App.css";
import { useState } from "react";

function App() {
  const [bookName, setBookName] = useState("");
  const [books, setBooks] = useState([]); // State to store fetched books
  const [loading, setLoading] = useState(false); // State for loading status

  const getBookData = async (bookname) => {
    try {
      setLoading(true); // Set loading to true before fetching data
      const result = await axios.get(
        "https://openlibrary.org/search.json?q=" + bookname
      );
      setBooks(result.data.docs); // Update state with the fetched books
    } catch (error) {
      console.error("Error fetching book data:", error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  };

  const findingBook = () => {
    getBookData(bookName);
  };

  return (
    <>
      <div className="App">
        <h1>Find a Book</h1>
        <input
          type="text"
          value={bookName}
          onChange={(event) => setBookName(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              findingBook(); // Call findingBook when Enter is pressed
            }
          }}
        />
        <button onClick={findingBook}>Fetch Book Data</button>

        {/* Show loading text if loading is true */}
        {loading ? (
          <div>Loading...</div>
        ) : books.length > 0 ? (
          <ul>
            {books.map((book) => (
              <li key={book.key}>{book.title}</li>
            ))}
          </ul>
        ) : (
          <div>ไม่เจอ</div>
        )}
      </div>
    </>
  );
}

export default App;
