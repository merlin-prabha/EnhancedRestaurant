import './index.css'
import Header from '../Header'
import CartContext from '../../context/CartContext'
import CartItem from '../CartItem'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0

      const onClickRemoveAll = () => {
        removeAllCartItems()
      }

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
                alt="empty view"
                className="empty"
              />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  className="remove-all-button"
                  type="button"
                  onClick={onClickRemoveAll}
                >
                  Remove All
                </button>
                <ul className="cart-list">
                  {cartList.map(eachCartItem => (
                    <CartItem
                      key={eachCartItem.dishId}
                      cartItemDetails={eachCartItem}
                    />
                  ))}
                </ul>
                <div className="cart-summary">summery</div>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
