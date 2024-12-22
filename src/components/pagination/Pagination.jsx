import { useEffect, useState } from "react";

const Pagination = () => {
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(10);

  const lastIndex = currentPage * productPerPage;
  const startIndex = lastIndex - productPerPage;

  const filteredProducts = productList.slice(startIndex, lastIndex);
  const totalPage = Math.ceil(productList.length / productPerPage);
  const pageArr = [...new Array(totalPage + 1).keys()].slice(1);
  const fetchProductData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/albums");
    const responseData = await response.json();
    setProductList(responseData);
  };
  useEffect(() => {
    fetchProductData();
  }, []);

  const handlePreviousButton = () => {
    if (currentPage !== 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPageButton = () => {
    if (currentPage !== productPerPage && currentPage < pageArr.length)
      setCurrentPage((prev) => prev + 1);
  };
  const handlePage = (page) => {
    setCurrentPage(page);
  };
  const handleProductPerPage = (e) => {
    const { value } = e.target;
    setProductPerPage(value);
  };
  return (
    <>
      <select onChange={handleProductPerPage}>
        <option value="10">10</option>
        <option value="5">5</option>
        <option value="20">20</option>
      </select>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => {
          return (
            <div key={product.id}>
              <span>{product.id}</span>
              <span>{product.title}</span>
            </div>
          );
        })
      ) : (
        <div>Loading...</div>
      )}
      <div>
        <button onClick={handlePreviousButton}>prev</button>
        {pageArr.length &&
          pageArr.map((page, id) => (
            <button key={id} onClick={() => handlePage(page)}>
              {page}
            </button>
          ))}
        <button onClick={handleNextPageButton}>Next</button>
      </div>
    </>
  );
};

export default Pagination;
