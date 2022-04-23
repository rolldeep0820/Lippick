import React from 'react';

function HistoryPage (props) {

    console.log(props.user);

    

    return ( 
        <div style={{ width: '80%', margin: '3rem auto'}}>
            <table>
                <thead>
                    <tr>
                        <th>주문번호</th>
                        <th>제품</th>
                        <th>가격</th>
                        <th>개수</th>
                    </tr>
                </thead>
                <tbody>
                    {props.user.userData && 
                        props.user.userData.history.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.price} 원</td>
                                <td>{item.quantity}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}

export default HistoryPage;