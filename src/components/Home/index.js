import {useState, useEffect} from 'react'

import './index.css'
import Header from '../Header'
import TabItem from '../TabItem'
import DishItem from '../DishItem'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [response, setResponse] = useState([])
  const [activeCategoryId, setActiveCategoryId] = useState('')

  const [cartItems, setCartItems] = useState([])

  const addCartLength = dish => {
    const isAlreadyExist = cartItems.find(
      eachItem => eachItem.dishId === dish.dishId,
    )
    if (!isAlreadyExist) {
      const newItem = {...dish, quantity: 1}
      setCartItems(prev => [...prev, newItem])
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.dishId === dish.dishId
            ? {...item, quantity: item.quantity + 1}
            : item,
        ),
      )
    }
  }

  const removeCartLength = dish => {
    const isAlreadyExist = cartItems.find(
      eachItem => eachItem.dishId === dish.dishId,
    )
    if (isAlreadyExist) {
      setCartItems(prev =>
        prev.map(item =>
          item.dishId === dish.dishId
            ? {...item, quantity: item.quantity - 1}
            : item,
        ),
      )
    }
  }

  const getUpdatedData = tableMenuList =>
    tableMenuList.map(eachMenu => ({
      menuCategory: eachMenu.menu_category,
      menuCategoryId: eachMenu.menu_category_id,
      menuCategoryImage: eachMenu.menu_category_image,
      categoryDishes: eachMenu.category_dishes.map(eachDish => ({
        dishId: eachDish.dish_id,
        dishName: eachDish.dish_name,
        dishPrice: eachDish.dish_price,
        dishImage: eachDish.dish_image,
        dishCurrency: eachDish.dish_currency,
        dishCalories: eachDish.dish_calories,
        dishDescription: eachDish.dish_description,
        dishAvailability: eachDish.dish_Availability,
        dishType: eachDish.dish_Type,
        addonCat: eachDish.addonCat,
      })),
    }))

  const fetchRestaurantApi = async () => {
    const api = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const apiResponse = await fetch(api)
    const data = await apiResponse.json()
    const updatedData = getUpdatedData(data[0].table_menu_list)
    setResponse(updatedData)
    setActiveCategoryId(updatedData[0].menuCategoryId)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchRestaurantApi()
  }, [])

  const onUpdateActiveCategoryId = menuCategoryId =>
    setActiveCategoryId(menuCategoryId)

  const renderLoader = () => (
    <div>
      <div className="spinner-border" role="status" />
    </div>
  )

  const renderDishes = () => {
    const {categoryDishes} = response.find(
      eachCategory => eachCategory.menuCategoryId === activeCategoryId,
    )

    return (
      <ul className="dish-items-list">
        {categoryDishes.map(eachDish => (
          <DishItem
            key={eachDish.dishId}
            dishDetails={eachDish}
            cartItems={cartItems}
            addCartLength={addCartLength}
            removeCartLength={removeCartLength}
          />
        ))}
      </ul>
    )
  }

  return (
    <div>
      {isLoading ? (
        renderLoader()
      ) : (
        <div className="app-container">
          <Header cartItems={cartItems} />
          <div className="content-container">
            <ul className="tab-list-container">
              {response.map(eachCategory => (
                <TabItem
                  key={eachCategory.menuCategoryId}
                  details={eachCategory}
                  isActive={activeCategoryId === eachCategory.menuCategoryId}
                  changeTabId={onUpdateActiveCategoryId}
                />
              ))}
            </ul>
            {renderDishes()}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
