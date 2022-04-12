import React from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

function FileUpload() {

    const dropHandler = (files) => {

        let formData = new FormData();

        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])

        axios.post('/api/product/image', formData, config)
            .then(response => {
                if(response.data.success){
                    console.log(response.data)
                } else {
                    alert("파일 저장 실패")
                }
            })


    }


  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
            <div 
                style={{ width: 300, height: 240, border:'1px solid lightgray',
                    display:'flex', alignSelf:'center', justifyContent: 'center' }}
                {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
        )}
      </Dropzone>
    </div>
  );
}

export default FileUpload;
