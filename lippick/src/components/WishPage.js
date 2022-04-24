import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { getWishItems, removeWishItem, addToCart } from "../_actions/user_actions";

function WishPage (props) {
    const dispatch = useDispatch();

    useEffect(() => {
        let wishItems=[]

        if(props.user.userData && props.user.userData.wish) {
            if(props.user.userData.wish.length > 0 ) {
                props.user.userData.wish.forEach(item => {
                    wishItems.push(item.id)
            })

                dispatch(getWishItems(wishItems, props.user.userData.wish))
            }
        } 
        
    }, [props.user.userData])

    let removeFromWish = (productId) => {
        dispatch(removeWishItem(productId))
        .then(response => {

        })
    }

    let removeAndCart = (productId) => {
        dispatch(addToCart(productId));
        dispatch(removeWishItem(productId))
    }

    return (
        <div style={{ width: '80%', margin: '3rem auto'}}>
            <table>
                <thead>
                    <tr>
                        <th>제품</th>
                        <th>제품 이름</th>
                        <th>장바구니로</th>
                        <th>삭제하기</th>
                    </tr>
                </thead>
                <tbody>
                    {props.user && props.user.wishDetail.map(item => (
                            <tr key={item._id}>
                                <td>
                                    <img style={{ width: '70px'}} alt="product"
                                        src={`http://localhost:5000/${item.images[0]}`}/>
                                </td>
                                <td>{item.title}</td>
                                <td><button onClick={() => removeAndCart(item._id)}>장바구니로</button></td>
                                <td><button onClick={() => removeFromWish(item._id)}>삭제</button></td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default WishPage;