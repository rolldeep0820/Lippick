import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import DetailProductImage from "./DetailProductImage";
import { Row, Col, Form, Button, Select, Image } from "antd";
import { connect, useDispatch } from "react-redux";
import { addToCart } from "../_actions/user_actions";
import MakeUp from "./MakeUp";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { MdTty } from "react-icons/md";

function DetailProductPage(props) {
    useEffect(() => {
        props.dispatch({ type: "nav-on" });
    }, []);

    const dispatch = useDispatch();

    const productId = props.match.params.productId;

    const [Product, setProduct] = useState({});

    const [tryOn, setTryOn] = useState(false);
    useEffect(() => {
        axios
            .get(`/api/product/products_by_id?id=${productId}`)
            .then((response) => {
                setProduct(response.data[0]);
            })
            .catch(err => alert(err))
    }, []);
    console.log(Product.color);

    const bagHandler = () => {
        // 필요한 정보를 cart field에 넣어준다.
        dispatch(addToCart(productId));
    };
    const changeTry = () => {
        setTryOn(!tryOn);
    };

    return (
        <div style={{ width: "100%", padding: "3rem 4rem" }}>
            <br />
            <br />

            <Row gutter={[30, 30]}>
                <Col lg={12} sm={24}>
                    {tryOn && <MakeUp color={Product.color} />}
                    {!tryOn && <DetailProductImage detail={Product} />}
                </Col>
                <Col lg={12} sm={24}>
                    <br />
                    <br />
                    <br />
                    <h3>{Product.title}</h3>
                    <hr />
                    <p>{Product.price} 원</p>
                    <p style={{ fontWeight: "bold" }}>선택 가능한 컬러</p>
                    <Select style={{ width: "200px" }}>
                        <option>제품이름 같은 다른 놈</option>
                    </Select>
                    <p> ^ 이곳에 제품이름 같은 놈들 링크 있으면 좋겠다</p>
                    <br />
                    <hr />
                    <br />
                    <Button size="large" shape="round">
                        위시리스트
                    </Button>
                    <br />
                    <br />
                    <Button size="large" shape="round" onClick={bagHandler}>
                        장바구니
                    </Button>
                    <br />
                    <br />
                    <Button size="large" shape="round" onClick={changeTry}>
                        트라이온
                    </Button>
                </Col>
            </Row>
            <br />
            <br />
            <br />
            <hr />
            <p>상세 설명 이미지 | 근데 리뷰 기능 만들어 말어........</p>
            <Image
                src={`http://localhost:5000/${Product.description}`}
                preview={false}
            />
        </div>
    );
}

function stateprops(state) {
    return {
        navTG: state.reducer1,
    };
}

export default connect(stateprops)(DetailProductPage);
