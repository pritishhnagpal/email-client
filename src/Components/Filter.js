import "./Filter.css";

const Filter = ({ setFilters, filters }) => {
  function updateFilters({
    showFavourite = false,
    showRead = false,
    showUnread = false,
  }) {
    setFilters({
      showFavourite,
      showRead,
      showUnread,
    });
  }
  function showFavorites() {
    updateFilters({ showFavourite: true });
  }

  function showReadEmails() {
    updateFilters({ showRead: true });
  }
  function showUnreadEmails() {
    updateFilters({ showUnread: true });
  }
  return (
    <div className="filter">
      <div>Filter By:</div>
      <button
        className={`filterButton ${filters.showUnread ? "highlight" : ""}`}
        onClick={showUnreadEmails}
      >
        Unread
      </button>
      <button
        className={`filterButton ${filters.showRead ? "highlight" : ""}`}
        onClick={showReadEmails}
      >
        Read
      </button>
      <button
        className={`filterButton ${filters.showFavorites ? "highlight" : ""}`}
        onClick={showFavorites}
      >
        Favorites
      </button>
    </div>
  );
};

export default Filter;
