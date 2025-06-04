const form = document.getElementById("book-form");
const list = document.getElementById("book-list");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const toggleTheme = document.getElementById("toggle-theme");
const filterFav = document.getElementById("filter-fav");

let books = JSON.parse(localStorage.getItem("books")) || [];
let showOnlyFavorites = false;

function saveBooks() {
  localStorage.setItem("books", JSON.stringify(books));
}

function renderBooks() {
  list.innerHTML = "";
  let filtered = showOnlyFavorites ? books.filter(b => b.favorite) : books;
  filtered.forEach((book, index) => {
    const li = document.createElement("li");
    li.className = "book-item";
    li.innerHTML = `
      <span>${book.title} by ${book.author}</span>
      <div class="actions">
        <button onclick="toggleFavorite(${index})">${book.favorite ? "❤️" : "🤍"}</button>
        <button onclick="deleteBook(${index})">🗑️</button>
      </div>
    `;
    list.appendChild(li);
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();
  books.push({
    title: titleInput.value,
    author: authorInput.value,
    favorite: false,
  });
  titleInput.value = "";
  authorInput.value = "";
  saveBooks();
  renderBooks();
});

function deleteBook(index) {
  books.splice(index, 1);
  saveBooks();
  renderBooks();
}

function toggleFavorite(index) {
  books[index].favorite = !books[index].favorite;
  saveBooks();
  renderBooks();
}

filterFav.addEventListener("change", () => {
  showOnlyFavorites = filterFav.checked;
  renderBooks();
});

toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  toggleTheme.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// On load
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  toggleTheme.textContent = "☀️ Light Mode";
}
renderBooks();
