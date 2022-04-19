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
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function DetailProductPage(props) {
  useEffect(() => {
    props.dispatch({ type: "nav-on" });
  }, []);

  const dispatch = useDispatch();

  const productId = props.match.params.productId;

  const [Product, setProduct] = useState({});

  const [tryOn, setTryOn] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    axios
      .get(`/api/product/products_by_id?id=${productId}`)
      .then((response) => {
        setProduct(response.data[0]);
      })
      .catch((err) => alert(err));
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
    <div className="detail-wrap">
      <div className="detail-top-wrap">
        <Row gutter={[30, 30]} className="detail-top-wrap-2">
          <Col lg={12} sm={24}>
            {tryOn && <MakeUp color={Product.color} />}
            {tryOn && <br />}
            {tryOn && <br />}
            {tryOn && <br />}
            {tryOn && <br />}
            {tryOn && <br />}
            {tryOn && <br />}
            {tryOn && <br />}
            {tryOn && <br />}
            {tryOn && <br />}
            {tryOn && <br />}
            {tryOn && <br />}
            {tryOn && <br />}
            {tryOn && <br />}
            {tryOn && <br />}
            {!tryOn && <DetailProductImage detail={Product} />}
          </Col>

          <Col lg={12} sm={24} className="detail-info-wrap">
            <div className="detail-title-wrap">
              <h3>{Product.title}</h3>
              {props.heart ? (
                <AiFillHeart
                  className="heart"
                  onClick={() => {
                    props.dispatch({ type: "heart-drain" });
                  }}
                />
              ) : (
                <AiOutlineHeart
                  className="heart"
                  onClick={() => {
                    props.dispatch({ type: "heart-fill" });
                  }}
                />
              )}
            </div>

            <p>{Product.price} 원</p>
            <p style={{ fontWeight: "bold" }}>선택 가능한 컬러</p>
            <Select style={{ width: "200px" }}>
              <option>제품이름 같은 다른 놈</option>
            </Select>

            <button className="detail-btn" onClick={bagHandler}>
              장바구니에 추가하기
            </button>

            <button className="detail-btn" onClick={changeTry}>
              트라이온
            </button>
          </Col>
        </Row>
      </div>
      <div className="detail-bottom-wrap"></div>
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
    heart: state.reducer13,
  };
}

export default connect(stateprops)(DetailProductPage);
