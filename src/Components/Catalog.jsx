import React, {useState} from 'react'
import '../App.css'

import appleImageSrc from '../Images/apple.jpg'
import orangeImageSrc from '../Images/orange.jpg'
import bananaImageSrc from '../Images/banana.jpg'
import pineappleImageSrc from '../Images/pineapple.jpg'
import cucumberImageSrc from '../Images/cucumber.jpg'
import tomatoImageSrc from '../Images/tomato.jpg'
import carrotImageSrc from '../Images/carrot.jpg'
import {useSelector} from "react-redux";

const Catalog = ({toggleModal}) => {
    const cart = useSelector(state => state.cart)

    const [productsList, setProductsList] = useState([
        {
            id: 1,
            name: "apple",
            price: 4.30,
            count: 2,
            image: appleImageSrc,
            description: 'Apples are a popular fruit, containing antioxidants, vitamins, dietary fiber, and a range of other nutrients.',
            new: true,
            discount: 5,
			weight: 150,
			selected: 1,
			checked: false,
        },
        {
            id: 2,
            name: "orange",
            price: 6.80,
            count: 25,
            image: orangeImageSrc,
            description: 'Oranges are truly an outstanding fruit. They are very healthy, cheap, and tasty, making them the ideal snack.',
            new: true,
            discount: 10,
			weight: 220,
			selected: 1,
			checked: false,
        },
        {
            id: 3,
            name: "banana",
            price: 8.00,
            count: 30,
            image: bananaImageSrc,
            description: 'Bananas are among the most important food crops on the planet.',
            new: false,
            discount: 0,
			weight: 180,
			selected: 1,
			checked: false,
        },
        {
            id: 4,
            name: "pineapple",
            price: 12.00,
            count: 7,
            image: pineappleImageSrc,
            description: 'The pineapple is a tropical plant with an edible fruit. The pineapple is indigenous to South America, where it has been cultivated for many centuries.',
            new: false,
            discount: 7,
			weight: 800,
			selected: 1,
			checked: false,
        },
        {
            id: 5,
            name: "cucumber",
            price: 3.50,
            count: 1,
            image: cucumberImageSrc,
            description: 'Cucumber is a widely-cultivated creeping vine plant in the Cucurbitaceae family that bears usually cylindrical fruits, which are used as vegetables.',
            new: false,
            discount: 5,
			weight: 670,
			selected: 1,
			checked: false,
        },
        {
            id: 6,
            name: "tomato",
            price: 4.20,
            count: 0,
            image: tomatoImageSrc,
            description: 'The tomato is the edible berry of the plant Solanum lycopersicum, commonly known as the tomato plant.',
            new: false,
            discount: 0,
			weight: 550,
			selected: 1,
			checked: false,
        },
        {
            id: 7,
            name: "carrot",
            price: 3.00,
            count: 45,
            image: carrotImageSrc,
            description: 'The carrot is a root vegetable often claimed to be the perfect health food. It is crunchy, tasty, and highly nutritious.',
            new: false,
            discount: 50,
			weight: 530,
			selected: 1,
			checked: false,
        },
    ])

    // asc - по возрастанию, desc - по убыванию
    const [sort, setSort] = useState('asc')

    const byField = (field, type) => { // сортировка массива объектов
        switch (type) {
            case 'asc':
                return (a, b) => a[field] > b[field] ? 1 : -1;
            case 'desc':
                return (a, b) => a[field] < b[field] ? 1 : -1;
            default:
        }
    }

    const sortProductsList = (e) => {
        let copy = productsList.slice()
        let value = e.target.value
        let field

        switch (value) {
            case 'Row': field = 'id'; break
            case 'Name': field = 'name'; break
            case 'Price': field = 'price'; break
            case 'Count': field = 'count'; break
            case 'Discount': field = 'discount'; break
            case 'Weight': field = 'weight'; break
            default:
        }

        copy.sort(byField(field, sort))

        if (sort === 'asc') setSort('desc')
        else setSort('asc')

        // set new products first
        let newProductsList = [], indexToSlice = []
        for (let i = 0; i < copy.length; i++) {
            if (copy[i].new) {
                newProductsList.push(copy[i])
                indexToSlice.push(i)
            }
        }

        // remove new products
        indexToSlice.map((el, i) => copy.splice(el - i, 1))

        setProductsList([...newProductsList, ...copy])
    }

    const addToCart = (product) => {
        toggleModal(product)
    }

    return (
        <div className={'catalogContainer'}>
            <div className={'catalogSorts'}>
                <h3>Sort by:</h3>
                <input type="button" value={'Name'} onClick={sortProductsList}/>
                <input type="button" value={'Price'} onClick={sortProductsList}/>
                <input type="button" value={'Discount'} onClick={sortProductsList}/>
                <input type="button" value={'Count'} onClick={sortProductsList}/>
                <input type="button" value={'Weight'} onClick={sortProductsList}/>
            </div>
            {productsList && productsList.map((product) => {
                return (
                    <div key={product.id} className={'catalogItem'}>
                        {product.new && <p className={'new'}>NEW!</p>}
                        <h2>{product.name.toUpperCase()}</h2>
                        <img src={product.image} alt="" style={{width: '200px'}}/>
                        {product.discount ?
                            <div>Price: {(product.price * (1 - product.discount / 100)).toFixed(2)}$ <s>{product.price}$</s></div> :
                            <div>Price: {product.price}$</div>}
                        <div>{product.description}</div>
                        <div>Count: {product.count}</div>
                        <div>Weight: {product.weight} g.</div>
                        {product.discount > 0 && <div className={'discount'}>-{product.discount}%</div>}
                        <input disabled={(product.count < 1) || cart.includes(product)} className={'btn'} type="button" value={'Add to cart'} onClick={() => addToCart(product)}/>
                    </div>
                )
            })}
        </div>
    )
}

export default Catalog