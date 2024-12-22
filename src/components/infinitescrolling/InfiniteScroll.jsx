import { useEffect, useState, useRef } from "react";
import styles from "./InfiniteScroll.module.css";
const InfiniteScroll = () => {
  const [query, setQuery] = useState("");
  const [userList, setuserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const observer = useRef();
  const lastElement = (node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPageNumber((prev) => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  };
  const fetchUserDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://openlibrary.org/search.json?title=${query}&page=${pageNumber}`
      );
      const responseData = await response.json();
      setuserList((prevState) => {
        return [
          ...new Set([
            ...prevState,
            ...responseData.docs.map((user) => user.title),
          ]),
        ];
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchedItem = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    fetchUserDetail();
  }, [query, pageNumber]);

  return (
    <>
      <h2>Users Info</h2>
      <div className={styles.searchWrapper}>
        <input
          type="text"
          placeholder="search by user title"
          onChange={handleSearchedItem}
        />
      </div>
      {userList.length > 0 ? (
        userList.map((user, id) => {
          if (userList.length === id + 1) {
            return (
              <div key={id} ref={lastElement}>
                {user}
              </div>
            );
          } else {
            return <div key={id}>{user}</div>;
          }
        })
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default InfiniteScroll;
