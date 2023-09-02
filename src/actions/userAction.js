import axios from "axios"




export const login=(username,password)=>async(dispatch)=>{
    try{
    dispatch({
        type:'USER_LOGIN_REQUEST'
    })

    const config= {
        headers:{
            'Content-Type':'application/json'
        }
    }

    const {data} = await axios.post('http://127.0.0.1/api/user/login',{username,password},config)
    dispatch({
        type:'USER_LOGIN_REQUEST',
        payload:data
    })

    localStorage.setItem('userInfo',JSON.stringify(data))

}catch(error){
    dispatch({
        type:'USER_LOGIN_FAIL',
        payload:error.response && error.response.data.detail ? error.response.data.detail: error.response.message
    })
}

}