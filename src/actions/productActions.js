
import axios from "axios";

export const listProducts = async function loadData(dispatch){
    try {
        dispatch({type:'PRODUCT_LIST_REQUEST'})

        const {data} = await axios.get('http://127.0.0.1:800/api/products/');
        dispatch({type:'PRODUCT_LIST_SUCCESS',payload:data})
    }
    catch(error)
    {
        dispatch({
            type:'PRODUCT_LIST_FAILURE',
            payload:error.response && error.response.data.message? error.data.message :error
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: "PRODUCT_DETAILS_REQUEST" })

        const { data } = await axios.get(`http://127.0.0.1:800/api/products/${id}`)

        dispatch({
            type: "PRODUCT_DETAILS_SUCCESS",
            payload: data
        })

    } catch (error) {
        dispatch({
            type: "PRODUCT_DETAILS_FAIL",
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}