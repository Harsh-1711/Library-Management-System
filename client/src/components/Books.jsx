// import React, { useState } from 'react';
// import AddBook from './AddBook';
// import ManageBook from './ManageBook';

// const Books = () => {
//   const [books, setBooks] = useState([]);

//   const handleAddBook = (book) => {
//     setBooks([...books, book]);
//   };

//   const handleRemoveBook = (index) => {
//     const updatedBooks = books.filter((_, i) => i !== index);
//     setBooks(updatedBooks);
//   };

//   return (
//     <div>
//       {/* AddBook Component */}
//       <AddBook onAddBook={handleAddBook} />
      
//       {/* ManageBook Component */}
//       <ManageBook books={books} onRemoveBook={handleRemoveBook} />
//     </div>
//   );
// };

// export default Books;
