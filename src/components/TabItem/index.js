import './index.css'

const TabItem = props => {
  const {details, isActive, changeTabId} = props
  const {menuCategory, menuCategoryId} = details
  const classNameOfTab = isActive ? 'active-tab-item' : ''

  const onClickTab = () => {
    changeTabId(menuCategoryId)
  }

  return (
    <li className="list-item">
      <button
        type="button"
        onClick={onClickTab}
        className={`button ${classNameOfTab}`}
      >
        {menuCategory}
      </button>
    </li>
  )
}

export default TabItem
