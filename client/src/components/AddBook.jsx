import React, { useState } from 'react';
import { Navbar } from './Navbar';   // Import Navbar
import { Sidebar } from './Sidebar'; // Import Sidebar
import Button from './Button';       // Import Button component
import InputField from './InputField'; // Import InputField component
import '../assets/css/AddBook.css';  // Import your CSS

export const AddBook = ({ onAddBook }) => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    image: '',
    pdf: '',
    url: ''
  });
  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar state

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  // Handle image and file uploads
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setBook({ ...book, [name]: files[0] });
  };

  // Handle book addition
  const handleAddBook = () => {
    if (book.title && book.author && book.genre) {
      onAddBook(book); // Pass book to parent component
      setBook({
        title: '',
        author: '',
        genre: '',
        image: '',
        pdf: '',
        url: ''
      });
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen); 
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="dashboard-container">
        {/* Sidebar */}
        <div className={`sidebar ${sidebarOpen ? '' : 'closed'}`}>
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <div className="add-book-section">
            <div className="add-book-container">
              <h2>Add a New Book</h2>

              {/* Using InputField component */}
              <InputField
                label="Title"
                type="text"
                value={book.title}
                onChange={handleChange}
                id="title"
                name="title"
                placeholder="Enter book title"
              />
              <InputField
                label="Author"
                type="text"
                value={book.author}
                onChange={handleChange}
                id="author"
                name="author"
                placeholder="Enter book author"
              />
              <InputField
                label="Genre"
                type="text"
                value={book.genre}
                onChange={handleChange}
                id="genre"
                name="genre"
                placeholder="Enter book genre"
              />
              <InputField
                label="Book Image"
                type="file"
                onChange={handleFileChange}
                id="image"
                name="image"
                placeholder="Upload book image"
              />
              <InputField
                label="Book PDF"
                type="file"
                onChange={handleFileChange}
                id="pdf"
                name="pdf"
                placeholder="Upload book PDF"
              />
              <InputField
                label="Book URL"
                type="url"
                value={book.url}
                onChange={handleChange}
                id="url"
                name="url"
                placeholder="Enter book URL"
              />

              {/* Using Button component */}
              <Button
                type="button"
                label="Add Book"
                onClick={handleAddBook}
                className="submit-btn"
              />
            </div>
          </div>
        </div>
      </div>
      </div>
    );
};

export default AddBook;