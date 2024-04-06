import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {HiOutlineShoppingCart} from 'react-icons/hi'
import CartContext from '../../context/CartContext'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwtToken')

    history.replace('/login')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value

        return (
          <nav className="nav-header">
            <Link to="/" className="link-ele">
              <h1>UNI Resto Cafe</h1>
            </Link>
            <div className="text-carticon-number">
              <button
                type="button"
                className="logout-btn"
                onClick={onClickLogout}
              >
                Logout
              </button>
              <p className="cart-text">My Orders</p>
              <Link to="/cart" className="link-ele">
                <div className="cart-number">
                  <button type="button" data-testid="cart" className="cart-btn">
                    <HiOutlineShoppingCart className="cart-icon" />
                  </button>
                  <p className="number">{cartList.length}</p>
                </div>
              </Link>
            </div>
          </nav>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
