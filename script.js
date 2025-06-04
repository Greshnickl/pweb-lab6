function bookApp() {
  return {
    books: [],
    newTitle: '',
    newAuthor: '',
    showOnlyFavorites: false,
    darkMode: false,

    init() {
      const saved = localStorage.getItem('books');
      this.books = saved ? JSON.parse(saved) : [];

      const theme = localStorage.getItem('theme');
      this.darkMode = theme === 'dark';
    },

    save() {
      localStorage.setItem('books', JSON.stringify(this.books));
    },

    toggleTheme() {
      this.darkMode = !this.darkMode;
      localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');
    },

    addBook() {
      this.books.push({
        title: this.newTitle,
        author: this.newAuthor,
        favorite: false
      });
      this.newTitle = '';
      this.newAuthor = '';
      this.save();
    },

    removeBook(index) {
      this.books.splice(index, 1);
      this.save();
    },

    toggleFavorite(index) {
      this.books[index].favorite = !this.books[index].favorite;
      this.save();
    },

    get filteredBooks() {
      return this.showOnlyFavorites
        ? this.books.filter(b => b.favorite)
        : this.books;
    }
  }
}
