let books = [];
let perPage = 10;
let currentPage = 1;

// Load placeholder data
$(document).ready(function () {
  $.getJSON("assets/placeholder-books.json", function (data) {
    books = data.items;
    displayResults();
    displayBookshelf();
  });

  $('#searchBtn').on('click', function () {
    const query = $('#searchBox').val().toLowerCase();
    currentPage = 1;
    books = books.filter(book => book.title.toLowerCase().includes(query));
    displayResults();
  });
});

function displayResults() {
  const start = (currentPage - 1) * perPage;
  const paginated = books.slice(start, start + perPage);
  $('#results').html('');

  paginated.forEach((book, index) => {
    $('#results').append(`
      <div class="book" onclick="showDetails(${start + index})">
        <img src="${book.thumbnail}" width="100" />
        <p>${book.title}</p>
      </div>
    `);
  });

  renderPagination();
}

function renderPagination() {
  $('#pagination').html('');
  const pages = Math.ceil(books.length / perPage);
  for (let i = 1; i <= pages; i++) {
    $('#pagination').append(`
      <span class="page-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</span>
    `);
  }
}

function goToPage(page) {
  currentPage = page;
  displayResults();
}

function showDetails(index) {
  const book = books[index];
  $('#details').html(`
    <h3>${book.title}</h3>
    <img src="${book.thumbnail}" width="150" />
    <p><strong>Author:</strong> ${book.authors}</p>
    <p><strong>Publisher:</strong> ${book.publisher}</p>
    <p><strong>Published Date:</strong> ${book.publishedDate}</p>
    <p>${book.description}</p>
  `);
}

function displayBookshelf() {
  const shelfBooks = books.slice(0, 5);
  $('#bookshelf').html('');
  shelfBooks.forEach((book, index) => {
    $('#bookshelf').append(`
      <div class="book" onclick="showDetails(${index})">
        <img src="${book.thumbnail}" width="100" />
        <p>${book.title}</p>
      </div>
    `);
  });
}

