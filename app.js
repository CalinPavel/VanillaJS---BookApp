// Book Class: Represents a Book
class Book {
    constructor(title,author,isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
// UI Class: Handle UI Tasks
class UI {
    static displayBooks() {
        const books = Store.getBooks();
        // const StoredBooks = [
        //     {
        //         title: 'Book One',
        //         author: 'John Doe',
        //         isbn: '3434434'
        //     },
        //     {
        //         title: 'Book Two',
        //         author: 'John Doe',
        //         isbn: '45545'
        //     }
        // ];
        //  const books = StoredBooks;

        books.forEach((book) => UI.addBookToList(book));
    }
    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className} mt-4` ;
        div.appendChild(document.createTextNode(message));
       // const i = document.querySelector('#i');
        const form = document.querySelector('#book-form');
        form.appendChild(div);
        //Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove() , 3000);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    static deleteBook(el){
        if (el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }
}
// Store Class: Handles Storage
class Store {
   static getBooks(){
        let books;
        if (localStorage.getItem('books') === null){
            books = [];
        }else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static  addBook(book){
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books',JSON.stringify(books));
    }
    static  removeBook(isbn) {
      const books = Store.getBooks();
      books.forEach((book,index) => {
          if (book.isbn === isbn){}
          books.splice(index,1);
      });

      localStorage.setItem('books' , JSON.stringify(books));
    }
}

// Event: Display Books

document.addEventListener('DOMContentLoaded' , UI.displayBooks);

// Event: Add a book
document.querySelector('#book-form').addEventListener('submit' , (e) => {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //Validate
     if (title === '' || author === '' || isbn === '')
     {
       // alert('Please fill in all fields')
         UI.showAlert('Please fill in all fields' , 'danger');
     }else
     {
         // Instatiate book

         const book = new Book(title , author , isbn);

         //Add Book to UI

         UI.addBookToList(book);

         //Add book to store
         Store.addBook(book);

         // Clear fields
         UI.clearFields();

         // Show success message
         UI.showAlert('Book added' , 'success');
     }
});

// Event: Remove a Book
   document.querySelector('#book-list').addEventListener('click' , (e) => {
      // console.log(e.target);
      // Remove book from UI
       UI.deleteBook(e.target);

       //Remove book from store
       Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

      // UI.showAlert('Book Removed' , 'success');
   });