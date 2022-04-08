import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import "./ImageView.scss";
import { connect } from "react-redux";
import { compose } from "@reduxjs/toolkit";
import * as tmImage from "@teachablemachine/image";
import { promise } from "bcrypt/promises";

function ImageView(props) {
    useEffect(() => {
        props.dispatch({ type: "nav-on" });
    }, [props.navTG]);

    //teachablemachine start
    // More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

    // the link to your model provided by Teachable Machine export panel
    const URL2 = "https://teachablemachine.withgoogle.com/models/UoYzLe7MY/";

    let model, webcam, labelContainer, maxPredictions;
    const [resultTitle, setTitle] = useState("");
    const [resultExplain, setExplain] = useState("");
    // Load the image model and setup the webcam
    const modelURL = URL2 + "model.json";
    const metadataURL = URL2 + "metadata.json";
    async function init() {
        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // or files from your local hard drive
        // Note: the pose library adds "tmImage" object to your window (window.tmImage)
        model = await tmImage.load(modelURL, metadataURL);
        let maxPredictions = model.getTotalClasses();
        console.log(maxPredictions);
    }

    // run the webcam image through the image model
    async function predict() {
        model = await tmImage.load(modelURL, metadataURL);
        // predict can take in an image, video or canvas html element
        const pic = document.getElementById("pic");
        console.log("야");
        const prediction = await model.predict(pic, false);
        console.log("야2");
        prediction.sort(
            (a, b) => parseFloat(b.probability) - parseFloat(a.probability)
        );
        console.log(prediction[0].className);
        switch (prediction[0].className) {
            case "봄 웜톤":
                setTitle("봄 웜톤");
                setExplain("추천색 : 카멜색, 복숭아색, 골드색");
                break;
            case "여름 쿨톤":
                setTitle("여름 쿨톤");
                setExplain("추천색 : 라벤더색, 연분홍색, 연하늘색");
                break;
            case "가을 웜톤":
                setTitle("가을 웜톤");
                setExplain("추천색 : 연회색, 검정색");
                break;
            case "겨울 쿨톤":
                setTitle("겨울 쿨톤");
                setExplain("추천색 : 골드베이지, 누드톤");
                break;
            default:
                setTitle("알수없음");
        }
    }
    //teachablemachine end

    //face-api start

    //face-api end

    //파일 미리볼 url을 저장해줄 state
    const [fileImage, setFileImage] = useState("");

    // 파일 저장
    const saveFileImage = (e) => {
        setFileImage(URL.createObjectURL(e.target.files[0]));
    };

    // 파일 삭제
    const deleteFileImage = () => {
        URL.revokeObjectURL(fileImage);
        setFileImage("");
    };

    return (
        <div className="image-wrap">
            <h1>이미지 미리보기</h1>
            <canvas id="myCanvas" />
            <table>
                <tbody>
                    <tr>
                        <th>이미지</th>
                        <td>
                            <div>
                                {fileImage && (
                                    <img
                                        id="pic"
                                        ref={picRef}
                                        alt="sample"
                                        src={fileImage}
                                        style={{
                                            margin: "auto",
                                        }}
                                    />
                                )}
                                <div
                                    style={{
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <input
                                        name="imgUpload"
                                        type="file"
                                        accept="image/*"
                                        onChange={saveFileImage}
                                    />
                                    <div>톤 판정 결과:{resultTitle}</div>
                                    <div>{resultExplain}</div>
                                    <button
                                        style={{
                                            backgroundColor: "gray",
                                            color: "white",
                                            width: "55px",
                                            height: "40px",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => deleteFileImage()}
                                    >
                                        삭제
                                    </button>
                                    <button
                                        style={{
                                            backgroundColor: "gray",
                                            color: "white",
                                            width: "55px",
                                            height: "40px",
                                            cursor: "pointer",
                                        }}
                                        onClick={() =>
                                            init().then(() => predict())
                                        }
                                    >
                                        톤 판별
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
function stateprops(state) {
    return {
        navTG: state.reducer1,
    };
}

export default connect(stateprops)(ImageView);
