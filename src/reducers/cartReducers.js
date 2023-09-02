export const cartReducer = (state={cartItems:[]},action) =>{
    switch(action.type)
    {
        case 'CART_ADD_ITEM':
            const item =action.payload
            const exitItem=state.cartItems.find(x=>x.product===item.product)
            if(exitItem){
                return {...state,
                cartItems : state.cartItems.map((x)=> x.product==exitItem.product ? item:x)
                }

            }
            else{
                return  { ...state,  cartItems:[...state.cartItems,item] }
           }
        case 'REMOVE_CART_ITEM':
            return { ...state,
                 cartItems:[...state.cartItems.filter((item)=>item.product!=action.payload)] 

            }   
        default:
            return state    
    }
}
