import { useCart } from "../../context/Context";
import "./Cart.css";

const Cart = () => {
  // eslint-disable-next-line
  const [cartItems, setCartItems] = useCart();

  return (
    <div className="cart">
      {
        <div>
          <table style={{ width: "300px" ,textAlign:''}} >
            <tr>
              <th>Item</th>
              <th>Price</th>
            </tr>
            {cartItems.map((item, index) => {
              return (
                <tr key={index}>
                  <td style={{ textAlign: "center" }}>
                    <img
                      src={item.thumbnail}
                      alt=""
                      srcset=""
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "5px",
                      }}
                    />
                  </td>
                  <td>
                    <span>{item.discountPercentage}</span>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      }
    </div>
  );
};

export default Cart;
