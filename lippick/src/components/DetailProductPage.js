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
import { Link, useHistory } from "react-router-dom";
import Loading from "./Loading";

const { Option } = Select;
function DetailProductPage(props) {
  useEffect(() => {
    props.dispatch({ type: "nav-on" });
  }, []);

  const dispatch = useDispatch();

  const productId = props.match.params.productId;

  const [Product, setProduct] = useState({});

  const [tryOn, setTryOn] = useState(false);

  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
    };

    getProducts(body);
    props.dispatch({type:"loading-start"})
  }, []);

  const getProducts = (body) => {
    axios.post("/api/search", body).then((response) => {
      if (response.data.success) {
        if (body) {
          setProducts([...response.data.productInfo]);
          console.log(Products);
        }
        setPostSize(response.data.postSize);
      } else {
        alert(" 상품 가져오기 실패 ");
      }
      props.dispatch({type:"loading-end"})

      
    });
  };

  const getProductsForSearch = (body) => {
    axios.post("/api/search", body).then((response) => {
      if (response.data.success) {
        if (body) {
          setProducts([...response.data.productInfo]);
          console.log(Products);
        }
        setPostSize(response.data.postSize);
      } else {
        alert(" 상품 가져오기 실패 ");
      }

      
    });
  };

  const updateSearchTerm = (newSearchTerm) => {
    let body = {
      skip: 0,
      limit: Limit,
      searchTerm: newSearchTerm,
    };

    setSkip(0);
    setSearchTerm(newSearchTerm);
    getProductsForSearch(body);
  };

  useEffect(() => {
    axios
      .get(`/api/product/products_by_id?id=${productId}`)
      .then((response) => {
        setProduct(response.data[0]);
      })
      .catch((err) => alert(err));
  }, []);

  const bagHandler = () => {
    // 필요한 정보를 cart field에 넣어준다.
    dispatch(addToCart(productId));
  };
  const changeTry = () => {
    setTryOn(!tryOn);
  };

  const searchTitle = (text) => {
    if (text === undefined) {
      return "";
    } else {
      let searchText = text.split(" ");
      return searchText[0];
    }
  };

  const searchOther = () => {
    setSearchTerm(searchTitle(Product.title));
    updateSearchTerm(searchTitle(Product.title));
  };

  const linkOther = (value) => {
    window.location.replace(`/product/${value}`);
  };
 

  return (
    <div className="detail-wrap">
      {props.loading ? (
        <Loading />
      ) : (
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
              <Select
                style={{ width: "200px", marginTop: "10px" }}
                placeholder="선택 가능한 컬러"
                onClick={() => {
                  searchOther();
                }}
                onChange={(e) => {
                  linkOther(e);
                }}
              >
                {Products.map((pro) => {
                  return <Option value={pro._id}>{pro.title}</Option>;
                })}
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
      )}

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
    loading: state.reducer12,
    heart: state.reducer13,
  };
}

export default connect(stateprops)(DetailProductPage);
