import React, { useEffect, useState } from 'react';
import { useDispatch} from "react-redux";
import { getCartItems, removeCartItem } from "../_actions/user_actions"
import UserCardBlock from './UserCardBlock';
import Paypal from "./Paypal"

function BagPage(props) {
    const dispatch = useDispatch();
    const [Total, setTotal] = useState(0)
    const [CartNumber, setCartNumber] = useState(0)

    useEffect(() => {

        let cartItems = []


        // 리덕스 User State안에 cart 안에 상품이 들어있는지 확인
        if(props.user.userData && props.user.userData.cart) {
            if(props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.id)
                })

                dispatch(getCartItems(cartItems, props.user.userData.cart ))
                    .then(response => { 
                        calculateTotal(response.payload)
                    })
            }
        }
        
    }, [props.user.userData])

    let calculateTotal = (cartDetail) => {
        let total = 0;

        cartDetail.map(item => {
            total += parseInt(item.price,10) * item.quantity
        })
        setTotal(total)
    }

    let cartNum = (cartDetail) => {
        let total = 0;

        cartDetail.map(item => {
            total += parseInt(item.quantity,10)
        })
        setCartNumber(total)
    } 

    let removeFromCart = (productId) => {
        dispatch(removeCartItem(productId))
        .then(response => {

        })
    }



    return (
        <div style={{ width: '85%', margin: '3rem auto'}}>
            <h1>BagPage</h1>
            <div>
            <UserCardBlock products={props.user.cartDetail} removeItem={removeFromCart}/>
            </div>

            <div style={{ marginTop: '3rem' }}>
                <p>총 금액: {Total} 원</p>
            </div>

            <Paypal />


        </div> 
    )
}


export default BagPage