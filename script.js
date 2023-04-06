// VARIABLES & SELECTORS

const myLibrary = [];
const addBtn = document.querySelector('#addBtn');
const addExampleBtn = document.querySelector('#addExampleBtn');
const pageOverlay = document.querySelector('#pageOverlay');
const modalOverlay = document.querySelector('#modalOverlay');
const bookModal = document.querySelector('#bookModal');
const bookForm = document.querySelector('#bookForm');
const inputTitle = document.querySelector('#title');
const inputAuthor = document.querySelector('#author');
const inputPages = document.querySelector('#pages');
const inputRead = document.querySelector('#isRead');
const submitBtn = document.querySelector('#submitBtn');
const mainContainer = document.querySelector('.main');
const grid = document.querySelector('#grid');
const empty = document.querySelector('#empty');

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

function displayBooks() {
	grid.textContent = '';

	myLibrary.forEach((item, index) => {
		const div = document.createElement('div');
		div.classList.add('bookCard');
		grid.appendChild(div);

		const title = document.createElement('p');
		title.classList.add('title');
		div.appendChild(title);

		const author = document.createElement('p');
		author.classList.add('author');
		div.appendChild(author);

		const pages = document.createElement('p');
		pages.classList.add('pages');
		div.appendChild(pages);

		title.textContent = `"${item.title}"`;
		author.textContent = item.author;
		pages.textContent = `${item.pages} pages`;

		// Toggle read status button
		const readBtn = document.createElement('button');
		readBtn.classList.add('readBtn');

		div.appendChild(readBtn);
		readBtn.textContent = 'Read';
		readBtn.addEventListener('click', () => {
			myLibrary[index].toggleRead();
			displayBooks();
		});

		// Remove button
		const removeBtn = document.createElement('button');
		removeBtn.classList.add('removeBtn');
		div.appendChild(removeBtn);
		removeBtn.textContent = 'Remove';

		removeBtn.addEventListener('click', () => {
			myLibrary.splice(index, 1);
			displayBooks();
		});

		// removeBtn.addEventListener('click', () => {
		// 	div.classList.add('fadeOut');
		// 	div.addEventListener('transitionend', () => {
		// 		myLibrary.splice(index, 1);
		// 		displayBooks();
		// 	});
		// });
	});

	if (!grid.textContent) {
		grid.classList.remove('show');
		empty.classList.add('show');
	} else {
		empty.classList.remove('show');
		grid.classList.add('show');
	}
}

// Add multiple books to myLibrary array
for (let i = 1; i <= 3; i += 1) {
	myLibrary.push(new Book(`The Lord of the Interface ${i}`, 'G.P.T. Altman', 432, 'not read yet'));
}

// for (let i = 1; i <= 8; i += 1) {
// 	setTimeout(() => {
// 		myLibrary.push(new Book(`The Hobbit ${i}`, 'J.R.R. Tolkien', 295, 'not read yet'));
// 		displayBooks();
// 		console.log('The');
// 	}, i * 100);
// }

function addBookToLibrary() {
	myLibrary.push(new Book(inputTitle.value, inputAuthor.value, inputPages.value, inputRead.checked ? 'read' : 'not read yet'));
}

function addExampleToLibrary() {
	myLibrary.push(new Book('Example title', 'Unknown author', '123', 'not read yet'));
}

// EVENT LISTENERS

// Show book modal
addBtn.addEventListener('click', () => {
	pageOverlay.classList.add('show');
	modalOverlay.classList.add('show');
});

// Hide book modal when clicked outside modal
document.addEventListener(
	'mousedown',
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
		bookForm.reset();
	}
});

// Add example book
addExampleBtn.addEventListener('click', () => {
	addExampleToLibrary();
	displayBooks();

	// grid.lastElementChild.classList.add('fadeIn');
	// setTimeout(() => {
	// 	grid.lastElementChild.classList.add('show');
	// }, 0);
});

// RUN

displayBooks();
