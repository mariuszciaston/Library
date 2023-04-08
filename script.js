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

	toggleRead() {
		this.read = !this.read;
	}
}

function displayBooks() {
	grid.textContent = '';

	// Loop through the library and create a book card for each book
	myLibrary.forEach((book, index) => {
		// Create book card
		const bookCard = document.createElement('div');
		bookCard.classList.add('bookCard');
		grid.appendChild(bookCard);

		// Create book card content
		const title = document.createElement('p');
		title.classList.add('title');
		bookCard.appendChild(title);
		title.textContent = `"${book.title}"`;

		const author = document.createElement('p');
		author.classList.add('author');
		bookCard.appendChild(author);
		author.textContent = book.author;

		const pages = document.createElement('p');
		pages.classList.add('pages');
		bookCard.appendChild(pages);
		pages.textContent = `${book.pages} pages`;

		// Toggle read status button
		const statusBtn = document.createElement('button');
		statusBtn.classList.add('statusBtn');
		bookCard.appendChild(statusBtn);
		statusBtn.textContent = book.read;

		if (myLibrary[index].read) {
			statusBtn.classList.add('read');
			statusBtn.textContent = 'Read';
		} else {
			statusBtn.classList.remove('read');
			statusBtn.textContent = 'Not read yet';
		}

		statusBtn.addEventListener('click', () => {
			myLibrary[index].toggleRead();
			displayBooks();
		});

		// Create remove button
		const removeBtn = document.createElement('button');
		removeBtn.classList.add('removeBtn');
		bookCard.appendChild(removeBtn);
		removeBtn.textContent = 'Remove';

		// Remove book card
		removeBtn.addEventListener('click', () => {
			bookCard.classList.add('fadeOut');
			setTimeout(() => {
				myLibrary.splice(index, 1);
				displayBooks();
			}, 200);
		});
	});

	// Show & hide empty message box
	if (grid.textContent) {
		empty.classList.remove('show');
		grid.classList.add('show');
	} else {
		grid.classList.remove('show');
		empty.classList.add('show');
	}
}

// Add multiple books to myLibrary array
for (let i = 1; i <= 3; i += 1) {
	myLibrary.push(new Book(`Artificial intelligence ${i}`, 'G.P.T. Altman', 432, true));
}

function addBookToLibrary() {
	myLibrary.push(new Book(inputTitle.value, inputAuthor.value, inputPages.value, inputRead.checked));
}

function addExampleToLibrary() {
	myLibrary.push(new Book('Example title', 'Unknown author', '123'));
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
	if (inputTitle.checkValidity() && inputAuthor.checkValidity() && inputPages.checkValidity()) {
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

	grid.lastElementChild.classList.add('fadeIn');
	setTimeout(() => {
		grid.lastElementChild.classList.add('show');
	}, 0);

	setTimeout(() => {
		grid.lastElementChild.classList.remove('fadeIn');
		grid.lastElementChild.classList.remove('show');
	}, 200);
});

// RUN

displayBooks();
