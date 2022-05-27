import React, {useState, useEffect} from 'react'
import '../App.css'
import {useDispatch, useSelector} from "react-redux"

export default function OrderForm() {
	const dispatch = useDispatch()

	const [page, setPage] = useState(1)
	const cart = useSelector(state => state.cart)
	const [checkedProdList, setCheckedProdList] = useState([])
	// summary price
	const [sumPrice, setSumPrice] = useState(0)
	const [sumWeight, setSumWeight] = useState(0)
	const [delivery, setDelivery] = useState()
	const [payment, setPayment] = useState()
	const [addressState, setAddressState] = useState(false)
	const [address, setAddress] = useState('')

	const deleteFromCart = (prod) => {
		dispatch({type:'REMOVE_PROD', payload: prod.id})
	}

	useEffect(() => {
		let priceSum = 0, weightSum = 0
		let checkedArr = []
		cart.forEach((prod) => {
			if (prod.checked) {
				priceSum += prod.price * (100 - prod.discount) / 100 * prod.selected
				weightSum += prod.weight * prod.selected
				checkedArr.push(prod)
			}
		})
		setCheckedProdList(checkedArr)
		setSumPrice(priceSum)
		setSumWeight(weightSum)
	}, [cart])

	const checkProdCount = (e, product) => {
		const count = e.target.value
		// запрет на ввод большего количества, чем имеется
		if (count > product.count) e.target.value = product.count

		dispatch({type:'CHANGE_SELECTED_PROD', payload: {id: product.id, selected: +e.target.value}})
	}

	const nextWindowHandler = () => {
		if (page === 1) {
			let arr = checkedProdList.filter((prod) => {
				return prod.selected > 0
			})
			if (arr.length > 0) {
				setPage(prev => prev + 1)
				return
			}
			return
		}
		if (page === 2 && address === '' && delivery !== '3') {
			alert('INPUT ADDRESS')
			return
		}
		setPage(prev => prev + 1)
	}

	const prevWindowHandler = () => {
		setPage(prev => prev - 1)
		if (page === 2) {
			setSumPrice(0)
			setSumWeight(0)
			setCheckedProdList([])
			dispatch({type: 'CLEAR_CART'})
		}
	}

	const checkBoxHandler = (e, product) => {
		dispatch({type:'CHANGE_CHECKED_PROD', payload: {id: product.id, checked: e.target.checked}})
	}

	const deliveryHandler = (e) => {
		if (e.target.checked) setDelivery(e.target.value)
	}

	const paymentHandler = (e) => {
		if (e.target.checked) setPayment(e.target.value)
	}

	useEffect(() => {
		if (delivery === '3') setAddressState(true)
		else setAddressState(false)
	}, [delivery])

	const confirm = () => {
		alert('Success!')
		document.location.reload()
	}
	
  	return (
		<div className='orderForm'>
			<progress value={page} max={3}/> <br/>
			{page === 1 && <>
				<p>Summary price: {sumPrice.toFixed(2)} $</p> <br/>
				<input className={'btn'} type="button" value={'Next'} onClick={nextWindowHandler}/>
				{cart.map((product) => {
					return (
						<div key={product.id} className={'catalogItem'}>
							{product.new && <p className={'new'}>NEW!</p>}
							<input className='cbx' type={'checkbox'} onChange={(e) => checkBoxHandler(e, product)}/>
							<h2>{product.name.toUpperCase()}</h2>
							<img src={product.image} alt="" style={{width: '80px'}}/>
							{product.discount ?
								<div>Price: {(product.price * (1 - product.discount / 100)).toFixed(2)}$ <s>{product.price}$</s></div> :
								<div>Price: {product.price}$</div>}
							<div>Count: {product.count}</div>
							<div>Weight: {product.weight} g.</div>
							Select count:
							<input className='inp' type={'number'} style={{width: "70px"}} onChange={(e) => checkProdCount(e, product)}/> <br/>
							<input className={'btn'} type="button" value={'Delete'} onClick={() => deleteFromCart(product)}/>
							{product.discount > 0 && <div className={'discount'}>-{product.discount}%</div>}
						</div>
					)
				})}
			</>}
			{page === 2 && <>
				Delivery:
				<div style={{textAlign: 'left'}}>
					<input type={'radio'} name={'d'} value={'1'} onChange={(e) => deliveryHandler(e)}/> by courier: 3$ (order cost > 10$ => free) <br/>
					<input type={'radio'} name={'d'} value={'2'} onChange={(e) => deliveryHandler(e)}/> by mail: 0.05$ for 50g. <br/>
					<input type={'radio'} name={'d'} value={'3'} onChange={(e) => deliveryHandler(e)}/> pickup: free <br/>
				</div>
				Payment:
				<div style={{textAlign: 'left'}}>
					<input type={'radio'} name={'p'} value={'1'} onChange={(e) => paymentHandler(e)}/> cash <br/>
					<input type={'radio'} name={'p'} value={'2'} onChange={(e) => paymentHandler(e)}/> bank card <br/>
					<input type={'radio'} name={'p'} value={'3'} onChange={(e) => paymentHandler(e)}/> bank transfer <br/>
				</div>
				<input className={'inp'} type="text" placeholder={'address'} disabled={addressState} onChange={(e) => setAddress(e.target.value)}/>
				<input className={'btn'} type="button" value={'Prev'} onClick={prevWindowHandler}/>
				<input className={'btn'} type="button" value={'Next'} onClick={nextWindowHandler}/>
			</>}
			{page === 3 && <>
				{(delivery === '1' && sumPrice < 10) && <h3>Summary cost: {sumPrice.toFixed(2) + 3} $</h3>}
				{(delivery === '1' && sumPrice > 10 || delivery === '3') && <h3>Summary cost: {sumPrice.toFixed(2)} $</h3>}
				{(delivery === '2') && <h3>Summary cost: {(sumPrice + 0.05 * sumWeight / 50).toFixed(2)} $</h3>}

				{checkedProdList.map((prod) => {
					return <p id={prod.id}>{prod.name}: {prod.price * (100 - prod.discount) / 100} $ - {prod.selected} pieces ({prod.price * (100 - prod.discount) / 100 * prod.selected} $)</p>
				})}

				{delivery === '1' && <p>delivery: by courier</p>}
				{delivery === '2' && <p>delivery: by mail</p>}
				{delivery === '3' && <p>delivery: pickup</p>}

				{payment === '1' && <p>payment: cash</p>}
				{payment === '2' && <p>payment: bank card</p>}
				{payment === '3' && <p>payment: bank transfer</p>}

				<p>address: {address}</p>

				<input className={'btn'} type="button" value={'Prev'} onClick={prevWindowHandler}/>
				<input className={'btn'} type="button" value={'Confirm'} onClick={confirm}/>
			</>}
		</div>
  	)
}
