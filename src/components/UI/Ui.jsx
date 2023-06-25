import './ui.css'
import { Pointer } from './pointer/Pointer'
import { ItemSelector } from './itemSelector/ItemSelector'

export const Ui = () => {
  return <div className='container'>
    <ItemSelector/>
    <Pointer/>
  </div>
}