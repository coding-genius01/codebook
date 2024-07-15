import { useEffect, useState } from "react"
import { Rating } from "../components";
import { useParams } from "react-router-dom";
import { useTitle } from "../hooks/useTitle";
import { useCart } from "../context";
import { getProduct } from "../services";
import { toast } from "react-toastify";

export const ProductDetail = () => {

  const [product, setProduct] = useState({});

  const { id } = useParams();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch(error) {
        toast.error(error.message, {
          closeButton: true,
          closeOnClick: true,
          position: "bottom-center"
        })
      }    
    }
    fetchProduct();
  }, [id]);

  const {name, poster, overview, long_description, price, rating, size, best_seller, in_stock} = product;

  useTitle(name);

  const { cartList, addToCart, removeFromCart } = useCart();

  const [inCart, setInCart] = useState(false);

    useEffect(() => {
        const productInCart = cartList.find(item => item.id === product.id);
        setInCart(productInCart);
    }, [cartList, product.id]);

    return (
      <main>
          <section>
            <h1 className="mt-10 mb-5 text-4xl text-center font-bold text-gray-900 dark:text-slate-200">{ name }</h1>
            <p className="mb-5 text-lg text-center text-gray-900 dark:text-slate-200">{ overview }</p>
            <div className="flex flex-wrap justify-around">
              <div className="max-w-xl my-3">
                <img className="rounded" src={ poster } alt={ name } />
              </div>
              <div className="max-w-xl my-3">
                <p className="text-3xl font-bold text-gray-900 dark:text-slate-200">
                  <span className="mr-1">$</span>
                  <span className="">{ price }</span>
                </p>
                <p className="my-3"> 
                  <span>
                    <Rating rating={rating} />
                  </span>
                </p>
                <p className="my-4 select-none">
                  { best_seller && <span className="font-semibold text-amber-500 border bg-amber-50 rounded-lg px-3 py-1 mr-2">BEST SELLER</span> }   
                  { in_stock ? <span className="font-semibold text-emerald-600	border bg-slate-100 rounded-lg px-3 py-1 mr-2">INSTOCK</span> : <span className="font-semibold text-rose-700 border bg-slate-100 rounded-lg px-3 py-1 mr-2">OUT OF STOCK</span> }
                  <span className="font-semibold text-blue-500 border bg-slate-100 rounded-lg px-3 py-1 mr-2">{ size } MB</span>
                </p>
                <p className="my-3">
                  { inCart ? <button onClick={ () => removeFromCart(product) } className={`inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-800`}  disabled={ product.in_stock ? "" : "disabled" }>Remove Item <i className="ml-1 bi bi-trash3"></i></button> : <button onClick={ () => addToCart(product) } className={`inline-flex items-center py-2 px-5 text-lg font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 ${ product.in_stock ? "" : "cursor-not-allowed" }`} disabled={ product.in_stock ? "" : "disabled" }>Add To Cart <i className="ml-1 bi bi-plus-lg"></i></button> }
                </p>
                <p className="text-lg text-gray-900 dark:text-slate-200">
                  { long_description }
                </p>
              </div>
            </div>
          </section>
        </main> 
    )
  }