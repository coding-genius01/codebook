import { useCart } from "../../context";
import { useTitle } from "../../hooks/useTitle"
import { CartEmpty } from "./components/CartEmpty";
import { CartList } from "./components/CartList";

export const CartPage = () => {
  const { cartList } = useCart();
  useTitle(`Cart (${cartList.length})`)

  return (
    <main>
      { cartList.length ? <CartList /> : <CartEmpty /> }
    </main>
  )
}
