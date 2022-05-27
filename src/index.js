import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider} from "react-redux"

import App from './App'

const defaultState = {
    cart: [],
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_PROD':
            return {...state, cart: [...state.cart, action.payload]}
		case 'REMOVE_PROD':
			return {...state, cart: state.cart.filter((el) => {
				return el.id !== action.payload
			})}
		case 'CLEAR_CART':
			return {...state, cart:	[]}
		case 'CHANGE_SELECTED_PROD':
			let newCart = state.cart.slice()
			newCart.forEach((el) => {
				if (el.id === action.payload.id)
					el.selected = action.payload.selected
			})
			return {...state, cart: newCart}
		case 'CHANGE_CHECKED_PROD':
			let newCartList = state.cart.slice()
			newCartList.forEach((el) => {
				if (el.id === action.payload.id)
					el.checked = action.payload.checked
			})
			return {...state, cart: newCartList}
        default: return state
    }
}

const store = createStore(reducer)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
