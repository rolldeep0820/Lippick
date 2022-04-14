import React, { useEffect , useState} from "react";
import axios from "axios";
import { Col, Card, Row} from "antd";
import Meta from "antd/lib/card/Meta";

function LandingPage() {

    const [Products, setProducts] = useState([])
     
    useEffect(() =>{

        axios.post('/api/product/products')
            .then(response => {
                if (response.data.success) {
                    setProducts(response.data.productInfo)
                } else {
                    alert(" 상품 가져오기 실패 ")
                }
            })

    }, [])

    const renderCards = Products.map((product, index) => {
        
        console.log('product', product)
        return <Card
            cover={<img src={`http://localhost:5000/${product.images[0]}`} />}>
            <Meta 
                title= {product.title}
            />
        </Card>
    })



    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <br />
            <br />
            <br />
            <br />
            {/* Filter */}

            {/* Card */}

            {renderCards}
            
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button>더보기</button>
            </div>
        </div>
    )
}

export default LandingPage