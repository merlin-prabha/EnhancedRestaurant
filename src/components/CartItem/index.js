import './index.css'
import {RiDeleteBin6Fill} from 'react-icons/ri'
import CartContext from '../../context/CartContext'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value
      const {cartItemDetails} = props
      console.log(cartItemDetails)
      const {dishId, dishName, quantity, dishPrice, dishImage} = cartItemDetails

      const onRemoveCartItem = () => {
        removeCartItem(dishId)
      }

      const onIncrementCount = () => {
        incrementCartItemQuantity(dishId)
      }

      const onDecrementCount = () => {
        decrementCartItemQuantity(dishId)
      }

      return (
        <li className="cart-item">
          <img className="cart-product-image" src={dishImage} alt={dishName} />
          <div className="cart-item-details-container">
            <div className="cart-product-title-brand-container">
              <p className="cart-product-title">{dishName}</p>
            </div>
            <div className="cart-quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onDecrementCount}
                data-testid="minus"
              >
                -
              </button>
              <p className="cart-quantity">{quantity}</p>
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onIncrementCount}
                data-testid="plus"
              >
                +
              </button>
            </div>
            <div className="total-price-remove-container">
              <p className="cart-total-price">Rs {dishPrice * quantity}/-</p>
              <button
                className="remove-button"
                type="button"
                onClick={onRemoveCartItem}
                data-testid="remove"
              >
                Remove
              </button>
            </div>
          </div>
          <button
            className="delete-button"
            type="button"
            onClick={onRemoveCartItem}
          >
            <RiDeleteBin6Fill />
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
