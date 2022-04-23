import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
    getCartItems,
    removeCartItem,
    onSuccessBuy,
} from "../_actions/user_actions";
import UserCardBlock from "./UserCardBlock";
import Paypal from "./Paypal";
import { Empty, Result } from "antd";

function BagPage(props) {
    const dispatch = useDispatch();
    const [Total, setTotal] = useState(0);
    const [CartNumber, setCartNumber] = useState(0);
    const [ShowTotal, setShowTotal] = useState(false);
    const [ShowSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        let cartItems = [];

        // 리덕스 User State안에 cart 안에 상품이 들어있는지 확인
        if (props.user.userData && props.user.userData.cart) {
            if (props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach((item) => {
                    cartItems.push(item.id);
                });

                dispatch(
                    getCartItems(cartItems, props.user.userData.cart)
                ).then((response) => {
                    calculateTotal(response.payload);
                });
            }
        }
    }, [props.user.userData]);

    let calculateTotal = (cartDetail) => {
        let total = 0;

        cartDetail.map((item) => {
            total += parseInt(item.price, 10) * item.quantity;
        });
        setTotal(total);
        setShowTotal(true);
    };

    let cartNum = (cartDetail) => {
        let total = 0;

        cartDetail.map((item) => {
            total += parseInt(item.quantity, 10);
        });
        setCartNumber(total);
    };

    let bagGet = () => {
        dispatch({ type: "bag-get" });
        setTimeout(() => {
            dispatch({ type: "bag-get" });
        }, 500);
        setTimeout(() => {
            dispatch({ type: "bag-get" });
        }, 750);
        setTimeout(() => {
            dispatch({ type: "bag-get" });
        }, 1000);
        setTimeout(() => {
            dispatch({ type: "bag-get" });
        }, 1500);
        setTimeout(() => {
            dispatch({ type: "bag-get" });
        }, 2000);
    };

    let removeFromCart = (productId) => {
        // dispatch({ type: "bag-get" });
        dispatch(removeCartItem(productId)).then((response) => {
            if (response.payload.productInfo.length <= 0) {
                setShowTotal(false);
            }
            bagGet();
        });
    };

    const transactionSuccess = (data) => {
        dispatch(
            onSuccessBuy({
                paymentData: data,
                cartDetail: props.user.cartDetail,
            })
        ).then((response) => {
            if (response.payload.success) {
                setShowTotal(false);
                setShowSuccess(true);
            }
        });
        bagGet();
    };

    return (
        <div style={{ width: "85%", margin: "3rem auto" }}>
            <h1>BagPage</h1>
            <div>
                <UserCardBlock
                    products={props.user.cartDetail}
                    removeItem={removeFromCart}
                    onClick={() => {}}
                />
            </div>
            {ShowTotal ? (
                <div style={{ marginTop: "3rem" }}>
                    <p>총 금액: {Total} 원</p>
                </div>
            ) : ShowSuccess ? (
                <Result status="success" title="결제가 완료되었습니다." />
            ) : (
                <>
                    <Empty
                        description={false}
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                </>
            )}

            {ShowTotal && (
                <Paypal
                    total={(Total / 1243.5).toFixed(2)}
                    onSuccess={transactionSuccess}
                />
            )}
        </div>
    );
}

export default BagPage;
