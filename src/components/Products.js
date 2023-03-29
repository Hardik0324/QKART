import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Products.css";
import ProductCard from "./ProductCard";
import Cart from "./Cart"

// Definition of Data Structures used
/**
 * @typedef {Object} Product - Data on product available to buy
 * 
 * @property {string} name - The name or title of the product
 * @property {string} category - The category that the product belongs to
 * @property {number} cost - The price to buy the product
 * @property {number} rating - The aggregate rating of the product (integer out of five)
 * @property {string} image - Contains URL for the product image
 * @property {string} productId - Unique ID for the product
 */

const Products = () => {

  /**
   * Make API call to get the products list and store it to display the products
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on all available products
   *
   * API endpoint - "GET /products"
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "name": "iPhone XR",
   *          "category": "Phones",
   *          "cost": 100,
   *          "rating": 4,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "v4sLtEcMpzabRyfx"
   *      },
   *      {
   *          "name": "Basketball",
   *          "category": "Sports",
   *          "cost": 100,
   *          "rating": 5,
   *          "image": "https://i.imgur.com/lulqWzW.jpg",
   *          "_id": "upLK9JbQ4rMhTwt4"
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 500
   * {
   *      "success": false,
   *      "message": "Something went wrong. Check the backend console for more details"
   * }
   */
  const { enqueueSnackbar } = useSnackbar();
  const [arrprod, setArrprod] = useState([]) 
  const [arrcart, setArrcart] = useState([])
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const tok = localStorage.getItem("token");

  useEffect(()=>{
    performAPICall()
  },[])

  useEffect(()=>{
    fetchCart(tok)
  },[])

  const performAPICall = async () => {
    try{
      setLoading(true)
      const data = await axios.get(`${config.endpoint}/products`)
      setArrprod(data.data)
      setLoading(false)
    }
    catch(error){
      setLoading(false);
      enqueueSnackbar(error.response.data.message, {variant: "error"})
    }
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Implement search logic
  /**
   * Definition for search handler
   * This is the function that is called on adding new search keys
   *
   * @param {string} text
   *    Text user types in the search bar. To filter the displayed products based on this text.
   *
   * @returns { Array.<Product> }
   *      Array of objects with complete data on filtered set of products
   *
   * API endpoint - "GET /products/search?value=<search-query>"
   *
   */
  // const performSearch1 = (e)=>{
  //   setSearch(e.target.value);
  //   performSearch(search)
  // }

  const performSearch = async (txt) => {
    // console.log(text.target.value);
    try{
      setLoading(true)
      let url = `${config.endpoint}/products/search?value=${txt}`
      const data = await axios.get(url);
      setArrprod(data.data)
      setLoading(false)
    }
    catch(error){
      if(error.response.status == 404){
        setArrprod([]);
        setLoading(false);
      }
      else{
        setLoading(false);
        enqueueSnackbar(error.response.data.message, {variant: "error"})
      }
    }
  };

  // TODO: CRIO_TASK_MODULE_PRODUCTS - Optimise API calls with debounce search implementation
  /**
   * Definition for debounce handler
   * With debounce, this is the function to be called whenever the user types text in the searchbar field
   *
   * @param {{ target: { value: string } }} event
   *    JS event object emitted from the search input field
   *
   * @param {NodeJS.Timeout} debounceTimeout
   *    Timer id set for the previous debounce call
   *
   */

  // const handlechange = (e) =>{

  // }

  let timer;
  const debounceSearch = (e,debounceTimeout) => {
    // console.log(e)
    setSearch(e.target.value);
     if(timer){
       clearTimeout(timer)
     }
    timer = setTimeout(()=>performSearch(e.target.value), debounceTimeout)
    // performSearch(search)
  };

  // const updatearrprod= (arr) =>{
  //   setArrprod(arr);
  // }

  // const scload = (abc) => {
  //   setLoading(abc)
  // }
  /**
   * Perform the API call to fetch the user's cart and return the response
   *
   * @param {string} token - Authentication token returned on login
   *
   * @returns { Array.<{ productId: string, qty: number }> | null }
   *    The response JSON object
   *
   * Example for successful response from backend:
   * HTTP 200
   * [
   *      {
   *          "productId": "KCRwjF7lN97HnEaY",
   *          "qty": 3
   *      },
   *      {
   *          "productId": "BW0jAAeDJmlZCF8i",
   *          "qty": 1
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 401
   * {
   *      "success": false,
   *      "message": "Protected route, Oauth2 Bearer token not found"
   * }
   */
   const fetchCart = async (token) => {
    if (!token) return;
    try {
      // TODO: CRIO_TASK_MODULE_CART - Pass Bearer token inside "Authorization" header to get data from "GET /cart" API and return the response data
      const response = await axios.get(`${config.endpoint}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setArrcart(response.data)
    } catch (e) {
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Could not fetch cart details. Check that the backend is running, reachable and returns valid JSON.",
          {
            variant: "error",
          }
        );
      }
      return null;
    }
  };


  const isItemInCart = (items, productId) => {
    return items.findIndex((item) => item.productId === productId) !== -1;
  };

   /**
   * Perform the API call to add or update items in the user's cart and update local cart data to display the latest cart
   *
   * @param {string} token
   *    Authentication token returned on login
   * @param { Array.<{ productId: String, quantity: Number }> } items
   *    Array of objects with productId and quantity of products in cart
   * @param { Array.<Product> } products
   *    Array of objects with complete data on all available products
   * @param {string} productId
   *    ID of the product that is to be added or updated in cart
   * @param {number} qty
   *    How many of the product should be in the cart
   * @param {boolean} options
   *    If this function was triggered from the product card's "Add to Cart" button
   *
   * Example for successful response from backend:
   * HTTP 200 - Updated list of cart items
   * [
   *      {
   *          "productId": "KCRwjF7lN97HnEaY",
   *          "qty": 3
   *      },
   *      {
   *          "productId": "BW0jAAeDJmlZCF8i",
   *          "qty": 1
   *      }
   * ]
   *
   * Example for failed response from backend:
   * HTTP 404 - On invalid productId
   * {
   *      "success": false,
   *      "message": "Product doesn't exist"
   * }
   */
    const addToCart = async (token, items, productId, qty, options = { preventDefault : false}) => {
      if (!token) {
        enqueueSnackbar("Please log in to add item to cart", {
          variant: "warning",
        });
        return;
      }
      if (options.preventDuplicate && isItemInCart(items, productId)) {
        enqueueSnackbar(
          "Item already in cart. Use the cart slidebar to update quantity or remove item.",
          { variant: "warning" },
        );
        return;
      }
      try {
        const response = await axios.post(
          `${config.endpoint}/cart`,
          { productId, qty },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data)
        setArrcart(response.data)
        // updateCartItems(response.data, products);
      } catch (e) {
        if (e.response) {
          enqueueSnackbar(e.response.data.message, { variant: "error" });
        } else {
          enqueueSnackbar(
            "Could not fetch products. Check that the backend is running,reachable and return valid JSON",
            {
              variant: "error",
            }
          );
        }
      }
      // console.log("Added to cart", productId);
    };


  return (
    <div className="proddiv">
      <Header >
        {/* TODO: CRIO_TASK_MODULE_PRODUCTS - Display search bar in the header for Products page */}
      <TextField
        value = {search}
        onChange = {(e)=>debounceSearch(e, 500)}
        className="search-desktop"
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
      />
      </Header>
      {/* {console.log(arrprod)} */}
      {/* Search view for mobiles */}
      <TextField
        value = {search}
        onChange = {(e)=>debounceSearch(e, 500)}
        className="search-mobile"
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
      />
      <div className="mainProd">
      <div className="prdimg">
       <Grid container>
         <Grid item className="product-grid">
           <Box className="hero">
             <p className="hero-heading">
               India’s <span className="hero-highlight">FASTEST DELIVERY</span>{" "}
               to your door step
             </p>
           </Box>
         </Grid>
       </Grid>
       <Grid container className="prodList">
       {
      loading ? <div className="progress"><CircularProgress/><p>Loading products…</p></div> : arrprod.length===0 ? <div className="noprod"><SentimentDissatisfied/><p>No products found</p></div> :
      arrprod.map((item, index) => (  
          <ProductCard product={{ 
            "name": item.name,
            "category":item.category,
            "cost":item.cost,
            "rating":item.rating,
            "image":item.image,
            "_id":item._id
          }} handleAddToCart={async () => {
            await addToCart(tok, arrcart, item._id, 1, {preventDuplicate : true});
          }} key = {index}/>
      ))
      }
      </Grid>
      </div>
      {
        tok ? <div className="cart1"><Cart className="cartin" products={arrprod} items={arrcart} handleQuantity={addToCart}/></div> : <></>
      }
      </div>
      <Footer />
    </div>
  );
};

export default Products;
