import { useEffect, useState } from "react";
import "./Products.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {Delete} from '@mui/icons-material'
import axios from "axios";
import { useCart } from "../../context/Context";
const Products = () => {

  const [cartItems,setCartItems] = useCart()

  // page state is used to determine on which page we are in
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState({
    products: [],
  });
  //  calculating the pages on the basis of products and products to show
  const [totalPages, setTotalPages] = useState(0);

  const getAllProducts = async () => {
    await axios
      .get(`https://dummyjson.com/products?limit=${6}&skip=${page * 6 - 6}`)
      .then((response) => {
        setProducts({
          ...products,
          total: response.data.total,
          products: response.data.products,
          limit: response.data.limit,
        });
        setTotalPages(response.data.total / 6);
      })
      .catch((error) => {});
  };

  const handlePrevious = () => {
    if (page >= 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page <= totalPages && page !== totalPages) {
      setPage(page + 1);
    }
  };


  // --- handling Cart
  const handleCart = (product)=>{
    setCartItems([...cartItems, product]);
  }
  
  const handleRemoveItems = (productId) =>{
    const myCart = [...cartItems];
    // find the index of the selected product present in the array of cart
    const index = myCart.findIndex((item) => item.id === productId);
    // remove the item from the array
    myCart.splice(index, 1);
    // update the cartItems array
    setCartItems(myCart);
    
  }
  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line
  }, [page]);
  return (
    <div className="products">
      {products.products.map((product,index) => {
        return (
          <div className="productCard" key={index }>
            <img
              src={product.thumbnail}
              alt={product.title}
              srcset=""
              className="productImage"
            />
            <span>{product.title}</span>
            <div className="cartButtons">
              <Button
              onClick={()=> handleRemoveItems(product.id)}
                variant="contained"
                color="success"
                endIcon={<Delete />}
              >
                Delete
              </Button>
              <Button
              onClick={()=>{handleCart(product)}}
                variant="contained"
                color="success"
              >
                Add To Cart
              </Button>
            </div>
          </div>
        );
      })}
      <div className="footer">
        <Stack direction={"row"} spacing={2}>
          {page <= 1 ? (
            ""
          ) : (
            <Button onClick={handlePrevious} variant="contained">
              Previous
            </Button>
          )}
          {page === totalPages ? (
            ""
          ) : (
            <Button onClick={handleNext} variant="contained">
              Next
            </Button>
          )}
        </Stack>

        <span className="productpages"> pages : {page}</span>
      </div>
    </div>
  );
};

export default Products;
