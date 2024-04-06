import {useState} from 'react'
import './index.css'
import CartContext from '../../context/CartContext'

const DishItem = props => {
  const {dishDetails} = props

  const {
    dishName,
    dishCurrency,
    dishPrice,
    dishDescription,
    dishAvailability,
    dishCalories,
    dishImage,
    addonCat,
  } = dishDetails

  const [quantity, setQuantity] = useState(0)

  const onIncreaseQuantity = () => setQuantity(prev => prev + 1)
  const onDecreaseQuantity = () =>
    setQuantity(prev => (prev > 0 ? prev - 1 : 0))

  const renderControllButton = () => (
    <div className="green-btn-container">
      <button type="button" className="green-btn" onClick={onDecreaseQuantity}>
        -
      </button>
      <p className="num">{quantity}</p>
      <button type="button" className="green-btn" onClick={onIncreaseQuantity}>
        +
      </button>
    </div>
  )

  return (
    <CartContext.Consumer>
      {value => {
        const {addCartItem} = value
        console.log(quantity)

        const onClickAddToCart = () => {
          addCartItem({...dishDetails, quantity})
        }

        return (
          <li className="dish">
            <div className="dish-container">
              <div className="icon-text">
                <p>Icon</p>
                <div className="heading-text">
                  <h1>{dishName}</h1>
                  <p>
                    {dishCurrency} {dishPrice}
                  </p>
                  <p>{dishDescription}</p>
                  {dishAvailability && renderControllButton()}
                  {!dishAvailability && (
                    <p className="not-available">Not Available</p>
                  )}
                  {addonCat.length !== 0 && (
                    <p className="customization">Customizations Available</p>
                  )}

                  {quantity > 0 && (
                    <button
                      type="button"
                      className="add-to-cart-button"
                      onClick={onClickAddToCart}
                    >
                      ADD TO CART
                    </button>
                  )}
                </div>
              </div>
              <p className="calories">{dishCalories} calories</p>
              <img className="dish-img" src={dishImage} alt={dishName} />
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default DishItem
