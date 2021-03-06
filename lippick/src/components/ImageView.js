import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
//import "./ImageView.scss";
import { connect } from "react-redux";
import { compose } from "@reduxjs/toolkit";
import * as tmImage from "@teachablemachine/image";
import { promise } from "bcrypt/promises";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import MakeUp from "./MakeUp";
import "./ImageView.scss";
import Slider from "react-slick";

import colortest from "../img/colortest_full.png";
import loadingGIF from "../img/loading.gif";
import {
    AiOutlineCloudUpload,
    AiOutlineSmile,
    AiOutlineSync,
} from "react-icons/ai";
import { Link } from "react-router-dom";

function ImageView(props) {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    let domain = window.location.protocol + "//" + window.location.hostname;
    useEffect(() => {
        props.dispatch({ type: "nav-on" });
    }, [props.navTG]);

    //teachablemachine start
    // More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

    // the link to your model provided by Teachable Machine export panel
    const picRef = useRef(null);
    const canvasRef = useRef(null);

    const URL2 = "https://teachablemachine.withgoogle.com/models/LstXi4uuR/";

    let model, webcam, labelContainer, maxPredictions;
    let [loading, setLoading] = useState(false);
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
        if (fileImage === "") {
            alert("???????????? ?????????????????????.");
            return Promise.reject(new Error(204));
        } else {
            model = await tmImage.load(modelURL, metadataURL);
            let maxPredictions = model.getTotalClasses();
            console.log(maxPredictions);
        }
    }

    // run the webcam image through the image model
    async function predict() {
        setLoading(true);
        model = await tmImage.load(modelURL, metadataURL);
        // predict can take in an image, video or canvas html element
        const pic = document.getElementById("pic");
        const prediction = await model.predict(pic, false);
        prediction.sort(
            (a, b) => parseFloat(b.probability) - parseFloat(a.probability)
        );
        console.log(prediction[0].className);
        switch (prediction[0].className) {
            case "???":
                setTitle("??? ???");
                setExplain("?????? ?????? : ?????????, ????????????, ?????????");
                getProductsByTone("??????");
                break;
            case "??????":
                setTitle("?????? ???");
                getProductsByTone("?????????");
                setExplain("?????? ?????? : ????????????, ????????????, ????????????");
                break;
            case "??????":
                setTitle("?????? ???");
                getProductsByTone("?????????");
                setExplain("?????? ?????? : ?????????, ?????????");
                break;
            case "??????":
                setTitle("?????? ???");
                getProductsByTone("?????????");
                setExplain("?????? ?????? : ???????????????, ?????????");
                break;
            default:
                setTitle("????????????");
        }

        setLoading(false);
    }
    //teachablemachine end

    //?????? ????????? url??? ???????????? state
    const [fileImage, setFileImage] = useState("");

    // ?????? ??????
    const saveFileImage = (e) => {
        setFileImage(URL.createObjectURL(e.target.files[0]));
    };

    // ?????? ??????
    const deleteFileImage = () => {
        URL.revokeObjectURL(fileImage);
        setFileImage("");
        setTitle("");
        setExplain("");
    };
    const runFacemesh = async () => {
        const net = await facemesh.load(
            facemesh.SupportedPackages.mediapipeFacemesh
        );
        setTitle("");
        setExplain("");
        detect(net);
    };
    const [face, setFace] = useState();
    const [ctx, setCtx] = useState();

    const detect = async (net) => {
        if (typeof picRef.current !== "undefined" && picRef.current !== null) {
            canvasRef.current.width = picRef.current.width;
            canvasRef.current.height = picRef.current.height;
            const pic = document.getElementById("pic");
            const face1 = await net.estimateFaces({ input: pic });

            const ctx1 = canvasRef.current.getContext("2d");

            setFace(face1);
            setCtx(ctx1);

            // requestAnimationFrame(() => {

            // });
        }
    };
    const drawMesh = (predictions, ctx, color) => {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        if (predictions.length > 0) {
            predictions.forEach((prediction) => {
                const keypoints1 = prediction.annotations.lipsLowerOuter;
                const keypoints2 = prediction.annotations.lipsLowerInner;
                const keypoints3 = prediction.annotations.lipsUpperOuter;
                const keypoints4 = prediction.annotations.lipsUpperInner;
                let i;
                ctx.beginPath();
                ctx.moveTo(keypoints1[0][0], keypoints1[0][1]);
                for (i = 1; i < keypoints1.length - 1; i++) {
                    ctx.lineTo(keypoints1[i][0], keypoints1[i][1]);
                }

                for (i = keypoints2.length - 1; i >= 0; i--) {
                    ctx.lineTo(keypoints2[i][0], keypoints2[i][1]);
                }
                ctx.lineTo(keypoints1[0][0], keypoints1[0][1]);
                ctx.moveTo(keypoints3[0][0], keypoints3[0][1]);

                for (i = 1; i < keypoints3.length - 1; i++) {
                    ctx.lineTo(keypoints3[i][0], keypoints3[i][1]);
                }
                for (i = keypoints4.length - 1; i >= 0; i--) {
                    ctx.lineTo(keypoints4[i][0], keypoints4[i][1]);
                }
                ctx.fillStyle = color;

                ctx.globalAlpha = 0.6;
                ctx.fill();
            });
        }
    };

    //??? ??? ?????? ????????????
    const getProductsByTone = (tone) => {
        props.refreshFunction(tone);
    };
    const linkStyle = {
        color: "inherit",
        textDecoration: "none",
        maxHeight: "75px",
    };

    //

    return (
        <div className="colortest-wrap">
            {loading && (
                <div className="loading-wrap">
                    <img src={loadingGIF} alt="loading" />
                </div>
            )}
            <div className="colortest-left-wrap">
                <div
                    style={{
                        position: "relative",
                    }}
                >
                    <div style={{ position: "absolute" }}>
                        {fileImage && <canvas ref={canvasRef} />}
                    </div>
                    {fileImage ? (
                        <img
                            id="pic"
                            ref={picRef}
                            alt="sample"
                            src={fileImage}
                            onLoad={() => runFacemesh()}
                        />
                    ) : (
                        <img src={colortest} alt="" />
                    )}
                </div>
            </div>
            <div className="colortest-right-wrap">
                <div className="colortest-right-wrap-title">
                    <h1>????????? ??????????????? </h1>
                </div>
                <div className="colortest-right-wrap-span">
                    <span>
                        ?????? ???????????? ?????? ????????? ?????? ????????? ????????? ???????????????.
                    </span>
                </div>
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
                        id="input-image"
                        style={{ display: "none" }}
                    />
                    <div>
                        <span>??? ?????? ??????:{resultTitle}</span>
                    </div>
                    <div>
                        <span className="resultExplain">{resultExplain}</span>
                    </div>
                    {resultTitle && (
                        <div className="test-slide-wrap">
                            <Slider {...settings}>
                                {props.Products.slice(0, 10).map((product) => {
                                    return (
                                        <div
                                            className="test-slide-img"
                                            onClick={() =>
                                                drawMesh(
                                                    face,
                                                    ctx,
                                                    product.color
                                                )
                                            }
                                        >
                                            <img
                                                src={`${domain}:5000/${product.images[0]}`}
                                                alt=""
                                            />

                                            <div className="product-content-wrap">
                                                <Link
                                                    to={`./product/${product._id}`}
                                                    style={linkStyle}
                                                >
                                                    <span className="product-title">
                                                        {resultTitle} ?????? ??????:
                                                        {product.title}
                                                    </span>
                                                </Link>
                                                <div
                                                    className="color-box"
                                                    style={{
                                                        backgroundColor: `${product.color}`,
                                                        width: "20px",
                                                        height: "20px",
                                                        borderRadius: "10px",
                                                        marginTop: "3%",
                                                    }}
                                                ></div>

                                                <span className="product-price">
                                                    {product.price} ???
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </Slider>
                        </div>
                    )}
                </div>
                <div className="btn-wrap">
                    <div className="input-image-wrap">
                        <label className="input-image-btn" for="input-image">
                            <div className="icon-wrap">
                                <AiOutlineCloudUpload />
                            </div>
                            <span>?????????</span>
                        </label>
                    </div>

                    <div className="input-image-wrap">
                        <label
                            className="input-image-btn"
                            onClick={() => predict()}
                        >
                            <div className="icon-wrap">
                                <AiOutlineSmile />
                            </div>
                            <span>?????????</span>
                        </label>
                    </div>
                </div>
                <div>
                    <span className="test-span">
                        *????????? ????????? ???????????? ??????????????? ??? ????????????.
                    </span>
                </div>
            </div>
        </div>
    );
}
function stateprops(state) {
    return {
        navTG: state.reducer1,
    };
}

export default connect(stateprops)(ImageView);
