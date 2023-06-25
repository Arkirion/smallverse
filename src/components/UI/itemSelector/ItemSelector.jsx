import './itemSelector.css'
import { items, useItemSelectorStore } from '../../../store/itemSelectoreStore'

export const ItemSelector = () => {
  const [selectedItem] = useItemSelectorStore(state => [state.selectedItem])
  return <div className='itemSelector'>
    <div className='items'>
      {items && Object.values(items).map(item => <div className={selectedItem.id === item.id ? 'item-selected' : 'item'} key={item.id}>{item.id}</div>)}
    </div>
  </div>
}

