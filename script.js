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
		readBtn.textContent = item.read;
		readBtn.classList.add('readBtn');
		div.appendChild(readBtn);

		if (myLibrary[index].read) {
			readBtn.classList.add('read');
			readBtn.classList.remove('notReadYet');
			readBtn.textContent = 'Read';
		} else {
			readBtn.classList.add('notReadYet');
			readBtn.classList.remove('read');
			readBtn.textContent = 'Not read yet';
		}

		readBtn.addEventListener('click', () => {
			myLibrary[index].toggleRead();
			displayBooks();
		});

		// Create remove button
		const removeBtn = document.createElement('button');
		removeBtn.classList.add('removeBtn');
		div.appendChild(removeBtn);
		removeBtn.textContent = 'Remove';

		// Remove book card
		removeBtn.addEventListener('click', () => {
			div.classList.add('fadeOut');
			setTimeout(() => {
				myLibrary.splice(index, 1);
				displayBooks();
			}, 200);
		});
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
