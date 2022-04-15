import React, { useEffect, useState } from "react";
import axios from "axios";

function DetailProductPage(props) {

    const productId = props.match.params.productId;
    console.log(productId)

    useEffect(() => {
            
            axios.get(`/api/product/products_by_id?id=${productId}`)
                .then(response => {
                    console.log(response.data.success)
                    if (response.data.success) {
                        console.log('response.data', response.data)
                    } else {
                        console.log('가져오기 실패')
                    }

                })

        }, [])


    return (
        <div>
            DetailProductPage
        </div> 
    )
}

export default DetailProductPage