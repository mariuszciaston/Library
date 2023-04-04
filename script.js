/* eslint-disable no-alert */

// VALUES & SELECTORS

let myLibrary = [];
const addBtn = document.querySelector('#add-btn');

// CLASSES & FUNCTIONS

class Book {
	constructor(title, author, pages, read) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}
	info() {
		return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
	}
}

// Generate multiple books
for (i = 1; i <= 8; i = i + 1) {
	myLibrary.push(new Book('The Hobbit ' + i, 'J.R.R. Tolkien', 295, 'not read yet'));
}

function displayBooks() {
	grid.textContent = '';
	myLibrary.forEach((item) => {
		let grid = document.querySelector('#grid');
		let div = document.createElement('div');
		div.classList.add('book-card');
		grid.appendChild(div);
		div.textContent = item.info();
	});
}

function addBookToLibrary() {
	myLibrary.push(new Book('The Hobbit', 'J.R.R. Tolkien', '295', 'not read yet'));
}

// RUN
addBtn.addEventListener('click', () => {
	addBookToLibrary();
	displayBooks();
});
displayBooks();
