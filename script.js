// VARIABLES & SELECTORS

const myLibrary = [];
const addBtn = document.querySelector('#addBtn');
const addExampleBtn = document.querySelector('#addExampleBtn');
const modalOverlay = document.querySelector('.modalOverlay');
const pageOverlay = document.querySelector('.pageOverlay');
const bookModal = document.querySelector('#bookModal');
const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const inputPages = document.querySelector('#pages');
const inputRead = document.querySelector('#isRead');
const submitBtn = document.querySelector('#submitBtn');

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

	toggleRead() {
		this.read = !this.read;
	}
}

// Add multiple books to myLibrary array
for (let i = 1; i <= 8; i += 1) {
	myLibrary.push(new Book(`The Hobbit ${i}`, 'J.R.R. Tolkien', 295, 'not read yet'));
}

function displayBooks() {
	const grid = document.querySelector('#grid');
	grid.textContent = '';

	myLibrary.forEach((item, index) => {
		const div = document.createElement('div');
		div.classList.add('bookCard');
		grid.appendChild(div);
		div.textContent = item.info();

		// Toggle read status button
		const readBtn = document.createElement('button');
		div.appendChild(readBtn);
		readBtn.textContent = 'Toggle Read Status';
		readBtn.addEventListener('click', () => {
			myLibrary[index].toggleRead();
			displayBooks();
		});

		// Remove button
		const removeBtn = document.createElement('button');
		div.appendChild(removeBtn);
		removeBtn.textContent = 'Remove';
		removeBtn.addEventListener('click', () => {
			myLibrary.splice(index, 1);
			displayBooks();
		});
	});
}

function addBookToLibrary() {
	myLibrary.push(new Book(inputTitle.value, inputAuthor.value, inputPages.value, inputRead.checked ? 'read' : 'not read yet'));
}

function addExampleToLibrary() {
	myLibrary.push(new Book('Example', 'Laura Peterson', '123', 'not read yet'));
}

// EVENT LISTENERS

// Show book modal
addBtn.addEventListener('click', () => {
	pageOverlay.classList.add('show');
	modalOverlay.classList.add('show');
});

// Hide book modal when clicked outside modal
document.addEventListener(
	'click',
	(e) => {
		if (modalOverlay.classList.contains('show') && !bookModal.contains(e.target)) {
			pageOverlay.classList.remove('show');
			modalOverlay.classList.remove('show');
		}
	},
	true
);

// Submit new book
submitBtn.addEventListener('click', (e) => {
	if (inputTitle.checkValidity() === true && inputAuthor.checkValidity() && inputPages.checkValidity()) {
		e.preventDefault();
		addBookToLibrary();
		displayBooks();
		pageOverlay.classList.remove('show');
		modalOverlay.classList.remove('show');
	}
});

// Add example book
addExampleBtn.addEventListener('click', () => {
	addExampleToLibrary();
	displayBooks();
});

// RUN

displayBooks();
