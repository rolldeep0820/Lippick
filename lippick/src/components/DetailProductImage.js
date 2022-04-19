import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import { connect } from "react-redux";
import "./DetailProduct.scss";

function DetailProductImage(props) {
  const [Images, setImages] = useState([]);

  useEffect(() => {
    if (props.detail.images && props.detail.images.length > 0) {
      let images = [];

      props.detail.images.map((item) => {
        images.push({
          original: `http://localhost:5000/${item}`,
          thumbnail: `http://localhost:5000/${item}`,
        });
      });
      setImages(images);
    }

    props.dispatch({ type: "loading-end" });
  }, [props.detail]);

  return (
    <div>
      <ImageGallery items={Images} />
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
  
  export default connect(stateprops)(DetailProductImage);
  