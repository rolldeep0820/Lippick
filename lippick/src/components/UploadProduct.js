import React, { useState } from "react";
import {Button, Form, Input} from "antd";
import FileUpload from "./FileUpload";

const { TextArea } = Input;

function UploadProduct(){

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState([])
    const [Price, setPrice] = useState(0)
    const [Category, setCategory] = useState(1)
    const [Tone, setTone] = useState(1)
    const [Images, setImages] = useState([])

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }
    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }
    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }
    const categoryChangeHandler = (event) => {
        setCategory(event.currentTarget.value)
    }
    const toneChangeHandler = (event) => {
        setTone(event.currentTarget.value)
    }

    return (
        <div style={{ width: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem'}}>
                <h2> Upload Product </h2>
            </div>

            <Form> 
                <br />
                <br /><br />
                <br /><br />
                <br />
                <FileUpload />

                <br />
                <br />
                <label>이름</label>
                <Input onChange={titleChangeHandler} value={Title}/>
                <br />
                <br />
                <label>설명</label>
                <TextArea onChange={descriptionChangeHandler} value={Description}/>
                <br />
                <br />
                <label>가격</label>
                <Input onChange={priceChangeHandler} value={Price}/>
                <br />
                <br />
                <label>카테고리</label>
                <br />
                <select onChange={categoryChangeHandler} value={Category}>
                    <option key="1" value="1">립스틱</option>
                    <option key="2" value="2">리퀴드</option>
                    <option key="3" value="3">립글로스</option>
                    <option key="4" value="4">립케어</option>
                </select>
                <br />
                <br />
                {/* <label>톤</label>
                <br />
                <select onChange={toneChangeHandler} value={Tone}>
                    <option key="1" value="1">봄웜</option>
                    <option key="2" value="2">여름쿨</option>
                    <option key="3" value="3">가을웜</option>
                    <option key="4" value="4">겨울쿨</option>
                </select>
                <br />
                <br /> */}
                <Button>확인</Button>

            

            </Form>

        </div>
    )
}

export default UploadProduct 