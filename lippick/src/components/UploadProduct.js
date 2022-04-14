import React, { useState } from "react";
import {Button, Form, Input} from "antd";
import FileUpload from "./FileUpload";
import axios from "axios";
import { withRouter } from "react-router-dom";

const { TextArea } = Input;

function UploadProduct(props){

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState([])
    const [Price, setPrice] = useState(0)
    const [Category, setCategory] = useState(1)
    const [Tone, setTone] = useState(1)
    const [Images, setImages] = useState([])
    const [Color, setColor] = useState("")

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }
    // const descriptionChangeHandler = (event) => {
    //     setDescription(event.currentTarget.value)
    // }
    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }
    const categoryChangeHandler = (event) => {
        setCategory(event.currentTarget.value)
    }
    const toneChangeHandler = (event) => {
        setTone(event.currentTarget.value)
    }
    const colorChangeHandler = (event) => {
        setColor(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const detailImages = (newImages) => {
        setDescription(newImages)
    }

    const submitHandler = (event) => {
        event.preventDefault();
        console.log("submitHandler 작동!")
        if(!Title || !Description || !Price || !Category || !Tone || !Images || !Color ) {
            return alert("모든 값을 넣어주세요.")
        }
    

        // 서버에 채운 값들을 request로 보낸다.
        const body = {
            title: Title,
            description: Description,
            price: Price,
            category: Category,
            tone: Tone,
            images: Images,
            color: Color
        }
        
        axios.post("/api/product", body)
        .then(response => {
            if(response.data.success){
                alert("상품을 업로드 했습니다.")
                props.history.push('/product/upload')
            } else {
                alert("상품 업로드 실패했습니다.")
            }
        })
    }

    return (
        <div style={{ width: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem'}}>
                <h2> Upload Product </h2>
            </div>

            <Form onSubmitCapture={submitHandler}> 
                <br />
                <br /><br />
                <br /><br />
                <br />
                <FileUpload refreshFunction={updateImages}/>

                <br />
                <br />
                <label>이름</label>
                <Input onChange={titleChangeHandler} value={Title}/>
                <br />
                <br />
                <label>설명</label>
                <FileUpload refreshFunction={detailImages}/>
                {/* <TextArea onChange={descriptionChangeHandler} value={Description}/> */}
                <br />
                <br />
                <label>가격</label>
                <Input onChange={priceChangeHandler} value={Price}/>
                <br />
                <br />
                <label>색정보</label>
                <Input onChange={colorChangeHandler} value={Color}/>
                <br />
                <br />
                <label>카테고리</label>
                <br />
                <select onChange={categoryChangeHandler} value={Category}>
                    <option key="1" value="립스틱">립스틱</option>
                    <option key="2" value="리퀴드">리퀴드</option>
                    <option key="3" value="립글로스">립글로스</option>
                    <option key="4" value="립케어">립케어</option>
                </select>
                <br />
                <br />
                <label>톤</label>
                <br />
                <select onChange={toneChangeHandler} value={Tone}>
                    <option key="1" value="봄웜">봄웜</option>
                    <option key="2" value="여름쿨">여름쿨</option>
                    <option key="3" value="가을웜">가을웜</option>
                    <option key="4" value="겨울쿨">겨울쿨</option>
                </select>
                <br />
                <br />
                <Button htmlType="submit">확인</Button>

            

            </Form>

        </div>
    )
}

export default withRouter(UploadProduct)