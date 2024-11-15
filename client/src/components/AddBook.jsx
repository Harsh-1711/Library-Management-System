import React, { useState } from 'react';
import { Navbar } from './Nav';
import { Sidebar } from './Sidebar';
import toast from 'react-hot-toast';
import Button from './Button';
import InputField from './InputField';
import '../assets/css/AddBook.css';

export const AddBook = () => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    image: '',
    pdf: '',
    url: ''
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setBook({ ...book, [name]: files[0] });
  };

  const validateFields = () => {
    const { title, author, genre, image, pdf, url } = book;
    if (!title && !author && !genre && !image && !pdf && !url ) {
      toast.error("Please fill all the fields");
      return false;
    }
    
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlPattern.test(url)) {
      toast.error("Please enter a valid URL.");
      return false;
    }

    return true;
  };

  const handleAddBook = () => {
    if (validateFields()) {
      const books = JSON.parse(localStorage.getItem('books')) || [];
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));

      toast.success("Book added successfully!");
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
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="dashboard-container">
        <div className={`sidebar ${sidebarOpen ? '' : 'closed'}`}>
          <Sidebar />
        </div>
        <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <div className="add-book-section">
            <div className="add-book-container">
              <h2>Add a New Book</h2>
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
              />
              <InputField
                label="Book PDF"
                type="file"
                onChange={handleFileChange}
                id="pdf"
                name="pdf"
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
