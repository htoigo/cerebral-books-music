import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';

export default function ProductScreen(props) {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <div>
      {loading
         ? <LoadingBox />
         : error
             ? <MessageBox variant="warning"> {error} </MessageBox>
             : (
               <div>
                 <Link to="/"> Back to results. </Link>
                 <div className="row top">
                   <div className="col-double">
                     <img className="large" src={product.image} alt={product.name} />
                   </div>
                   <div className="col-single">
                     <ul>
                       <li><h1>{product.name}</h1></li>
                       <li>
                         <Rating rating={product.rating} numReviews={product.numReviews} />
                       </li>
                       <li> Price: ${product.price} </li>
                       <li> Description: <p>{product.description}</p> </li>
                     </ul>
                   </div>
                   <div className="col-single">
                     <div className="card card-body">
                       <ul>
                         <li>
                           <div className="row">
                             <div> Price </div>
                             <div className="price"> ${product.price} </div>
                           </div>
                         </li>
                         <li>
                           <div className="row">
                             <div> Status </div>
                             <div>
                               {product.numInStock > 0
                                  ? <span className="success"> In Stock </span>
                                  : <span className="warning"> Unavailable </span>
                               }
                             </div>
                           </div>
                         </li>
                         {
                           product.numInStock > 0 && (
                             <>
                               <li>
                                 <div className="row">
                                   <div>Qty</div>
                                   <div>
                                     <select value={qty}
                                             onChange={(e) => setQty(e.target.value)}>
                                       {[...Array(product.numInStock).keys()].map(
                                         (x) => (
                                           <option key={x+1} value={x+1}>
                                             {x + 1}
                                           </option>
                                         )
                                       )}
                                     </select>
                                   </div>
                                 </div>
                               </li>
                               <li>
                                 <button className="primary block"
                                         onClick={addToCartHandler}>
                                   Add to Cart
                                 </button>
                               </li>
                             </>
                           )
                         }
                       </ul>
                     </div>
                   </div>
                 </div>
               </div>
             )
      }
    </div>
  );
}
