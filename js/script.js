let form = document.querySelector("form");
let bookList = document.querySelector("#book-list");




// Book Class
class Book {
	constructor(title,author,isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

// UI Class
class UI {
	constructor() {

	}
	addToBookList(book){
		let list = document.querySelector("#book-list");
		let row = document.createElement("tr");
		row.innerHTML =`
		<td>${book.title}</td>
		<td>${book.author}</td>
		<td>${book.isbn}</td>
		<td><a href="#" class="delete">X</a></td>
		`;
		list.appendChild(row);

	}
	clearFields(){
		document.querySelector("#title").value="";
		document.querySelector("#author").value="";
		document.querySelector("#isbn").value= "";
	}

	showAlert(message,className) {
		let div = document.createElement("div");
		div.className = `alert ${className}`;
		div.appendChild(document.createTextNode(message));
		let container = document.querySelector(".container");
		container.insertBefore(div,form)

		setTimeout(() => {
			document.querySelector(".alert").remove();
		},3000)
	}
	removeFromBook(target) {
		if(target.hasAttribute("href")) {
			target.parentElement.parentElement.remove();
			this.showAlert("Successfully removed Book","success")
		}
	}
	
}

class Store {
	static getBooks() {
		let books;
		if(localStorage.getItem("books") === null) {
			books = [];
		} else {
			books = JSON.parse(localStorage.getItem("books"));
		}
		return books;
	}
	static addBooks(book) {
		let books = Store.getBooks();
		books.push(book);
		localStorage.setItem("books",JSON.stringify(books));
	}
	static displayBooks(){
		let books = Store.getBooks();
		books.forEach(book => {
			let list = document.querySelector("#book-list");
		let row = document.createElement("tr");
		row.innerHTML =`
		<td>${book.title}</td>
		<td>${book.author}</td>
		<td>${book.isbn}</td>
		<td><a href="#" class="delete">X</a></td>
		`;
		list.appendChild(row);
		})
	}
}

// Events
form.addEventListener("submit",newBook)
bookList.addEventListener("click",removeBook);
document.addEventListener("DOMContentLoaded",Store.displayBooks());

// Define Functions
function newBook(e) {
	let title = document.querySelector("#title").value;
	let author = document.querySelector("#author").value;
	let isbn = document.querySelector("#isbn").value;

	let ui = new UI()

	if(title === "" || author === "" || isbn ==="") {
		ui.showAlert("Please fill all the fields","error");
	} else {

	let book = new Book(title,author,isbn);
	
	ui.addToBookList(book)

	ui.clearFields();

	ui.showAlert("Successfully added new book!","success");
	Store.addBooks(book);
	}

	e.preventDefault();
}

function removeBook(e) {
	let ui = new UI();
	ui.removeFromBook(e.target);
	e.preventDefault();
}

