import React, {useState} from 'react'
import ReactDOM from "react-dom"
import Catalog from "./Components/Catalog"
import Modal from "./Components/Modal"
import {useDispatch, useSelector} from "react-redux"
import OrderForm from './Components/OrderForm'

const App = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentProduct, setCurrentProduct] = useState({})
    const [cartList, setCartList] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    const toggleModal = (product) => {
        if (!isModalOpen) {
			if (cart.includes(product)) return

            dispatch({type:'ADD_PROD', payload: product})
            setCurrentProduct(product)
            setCartList([...cartList, product])
            setTotalPrice(prevState => prevState + product.price * (1 - product.discount / 100))
        }
        setIsModalOpen(!isModalOpen)
    }

    return (
        <div>
			<OrderForm/>
            <Catalog toggleModal={toggleModal}/>
            {isModalOpen &&
                ReactDOM.createPortal(
                    <Modal onCloseModal={toggleModal}>
                        <h3>Product was added to cart</h3>
                        <div className={'prodInfo'}>
                            <h5 style={{color:'yellow'}}>{currentProduct.name.toUpperCase()}</h5>
                            <p>Price: {(currentProduct.price * (1 - currentProduct.discount / 100)).toFixed(2)}$</p>
                            <p>Products in cart: <span style={{color:'yellow'}}>{cartList.length}</span></p>
                            <p>Total price: <span style={{color:'yellow'}}>{totalPrice.toFixed(2)}</span>$</p>
                        </div>
                        <p><button className={'btn'}>Product registration</button></p>
                        <p><button className={'btn'} onClick={toggleModal}>Continue prod viewing</button></p>
                    </Modal>,
                    document.getElementById('portal')
                )
            }
        </div>
    )
}

export default App
