import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import '../assets/css/ManageBook.css';

export const ManageBook = ({ books, onRemoveBook, onEditBook }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Default values for books
  const defaultBooks = [
    {
      title: 'Sample Book 1',
      author: 'Author 1',
      genre: 'Fiction',
      image: null,
      pdf: null,
      url: 'https://example.com'
    },
   
  ];

  const finalBooks = books || defaultBooks;

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
          <h2>Manage Books</h2>
          <table className="book-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Image</th>
                <th>PDF</th>
                <th>URL</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {finalBooks.length === 0 ? (
                <tr>
                  <td colSpan="7">No books available</td>
                </tr>
              ) : (
                finalBooks.map((book, index) => (
                  <tr key={index}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.genre}</td>
                    <td>
                      {book.image ? (
                        <img
                          src={URL.createObjectURL(book.image)}
                          alt={book.title}
                          className="book-image"
                        />
                      ) : (
                        'No Image'
                      )}
                    </td>
                    <td>{book.pdf ? <a href={URL.createObjectURL(book.pdf)}>View PDF</a> : 'No PDF'}</td>
                    <td>{book.url ? <a href={book.url}>Visit URL</a> : 'No URL'}</td>
                    <td className="actions">
                      <button className="edit-btn" onClick={() => onEditBook(book)}>
                        <i className="fa fa-pencil"></i> Edit
                      </button>
                      <button className="remove-btn" onClick={() => onRemoveBook(index)}>
                        <i className="fa fa-trash"></i> Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBook;
