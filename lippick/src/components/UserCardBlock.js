import React from 'react';
import "./UserCardBlock.css"

function UserCardBlock (props) {

    const renderCartImage = (images) => {
        if(images.length > 0){
            let image = images[0]
            return `http://localhost:5000/${image}`
        }
    }
    
    const renderItems = () => (
        props.products && props.products.map((product, index) => (
            <tr key={index}>
                <td>
                    <img style={{ width: '70px'}} alt="product"
                    src={renderCartImage(product.images)}/>
                </td>
                <td>
                    {product.quantity} EA
                </td>
                <td>
                    {product.price} 원
                </td>
                <td>
                    <button>삭제</button>
                </td>
            </tr>
        ))
    )



    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>제품 사진</th>
                        <th>제품 이름</th>
                        <th>제품 가격</th>
                        <th>삭제하기</th>
                    </tr>
                </thead>
                <tbody>
                    {renderItems()}
                </tbody>
            </table>
        </div>
    )
}

export default UserCardBlock;