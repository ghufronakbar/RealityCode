const getKeyFavoritedPost = (): string => {
  const bookmarks = localStorage.getItem("bookmarks");
  if (bookmarks) {
    return bookmarks;
  } else {
    return "[]";
  }
};

export default getKeyFavoritedPost;
