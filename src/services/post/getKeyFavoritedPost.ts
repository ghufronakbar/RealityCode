const isValidIds = (data: any) => {
  if (!Array.isArray(data)) {
    return false;
  }
  for (let item of data) {
    if (typeof item !== "object" || item === null) {
      return false;
    }
    const keys = Object.keys(item);
    if (keys.length !== 1 || keys[0] !== "id") {
      return false;
    }
    if (typeof item.id !== "number") {
      return false;
    }
  }
  return true;
};

const getKeyFavoritedPost = (): string => {
  const bookmarks = localStorage.getItem("bookmarks");
  if (bookmarks) {
    const data = JSON.parse(bookmarks);
    if (isValidIds(data)) {
      return JSON.stringify(data);
    } else {
      localStorage.setItem("bookmarks", "[]");
      return "[]";
    }
  } else {
    return "[]";
  }
};

export default getKeyFavoritedPost;
