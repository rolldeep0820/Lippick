import React, { useEffect , useState} from "react";
import axios from "axios";
import { Col, Card, Row, Button } from "antd";
import Meta from "antd/lib/card/Meta";
import { connect } from "react-redux";

function LandingGloss(props) {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)

    useEffect(() => {
        props.dispatch({ type: "nav-on" });
    }, [props.navTG]);
     
    useEffect(() =>{

        let body = {
            skip: Skip,
            limit: Limit
        }

        getProducts(body)
        
    }, [])

    const getProducts = (body) => {
        axios.post('/api/product/gloss', body)
            .then(response => {
                if (response.data.success) {
                    if(body.loadMore){
                        setProducts([...Products, ...response.data.productInfo])
                    } else {
                        setProducts(response.data.productInfo)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert(" 상품 가져오기 실패 ")
                }
            })
    }

    const loadMoreHandler = () => {
        
        let skip = Skip + Limit
        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }

        getProducts(body)
        
    }


    const renderCards = Products.map((product, index) => {
        
        console.log('product', product)
        return <Col lg={6} md={8} xs={24} key={index}>
        
            <Card
            cover={<img src={`http://localhost:5000/${product.images[0]}`} />}>
            <Meta 
                title= {product.title}
            />
            </Card>

            </Col>
    })

    
    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <br />
            <br />
            <br />
            <br />
            {/* Filter */}

            {/* Card */}

            <Row gutter={[16, 16]}>
                {renderCards}
            </Row>
            <br />
            <br />
            <br />
            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={loadMoreHandler}>더보기</Button>
            </div>
            }
        </div>
    )
}
function stateprops(state) {
    return {
        navTG: state.reducer1,
    };
}

export default connect(stateprops)(LandingGloss);