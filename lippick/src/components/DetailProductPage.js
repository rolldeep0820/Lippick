import React, { useEffect, useState } from "react";
import axios from "axios";
import DetailProductImage from "./DetailProductImage";
import { Row, Col, Form, Button, Select, Image } from "antd";

function DetailProductPage(props) {
 
    const productId = props.match.params.productId;

    const [Product, setProduct] = useState({})

    useEffect(() => {
            
            axios.get(`/api/product/products_by_id?id=${productId}`)
                .then(response => {
                    console.log(response.data.success)
                    if (response.data.success) {
                        console.log('response.data', response.data)
                        setProduct(response.data.product[0])
                    } else {
                        console.log('가져오기 실패')
                    }

                })

        }, [])

    const bagHandler = () => {

    }


    return (
        <div style={{ width: '100%', padding: '3rem 4rem' }}>

            <br />
            <br />

            <Row gutter={[30, 30]} >
                <Col lg={12} sm={24}>
                    <DetailProductImage detail={Product}/>
                </Col>
                <Col lg={12} sm={24}>
                    <br />
                    <br />
                    <br />
                    <h3>{Product.title}</h3>
                    <hr />
                    <p>{Product.price} 원</p>
                    <p style={{fontWeight : 'bold'}}>선택 가능한 컬러</p>
                    <Select style={{ width: '200px' }}>
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
                    <Button size="large" shape="round">
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
    )
}

export default DetailProductPage