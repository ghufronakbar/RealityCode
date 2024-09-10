interface Bookmarks {
  id: number;
}
const checkBookmark = (id: number): boolean => {
  const bookmarks = localStorage.getItem("bookmarks");
  if (bookmarks) {
    const bookmarksList: Bookmarks[] = JSON.parse(bookmarks);
    return bookmarksList.some((bookmark) => bookmark.id === id);
  }
  return false;
};

const processBookmark = (id: number) => {
  const bookmarks = localStorage.getItem("bookmarks");
  if (bookmarks) {
    const bookmarksList: Bookmarks[] = JSON.parse(bookmarks);
    if (checkBookmark(id)) {
      const newBookmarksList = bookmarksList.filter(
        (bookmark) => bookmark.id !== id
      );
      localStorage.setItem("bookmarks", JSON.stringify(newBookmarksList));
    } else {
      bookmarksList.push({ id });
      localStorage.setItem("bookmarks", JSON.stringify(bookmarksList));
    }
  } else {
    localStorage.setItem("bookmarks", JSON.stringify([{ id }]));
  }
};

export { checkBookmark, processBookmark }