import authReducer from './auth-slice/index.js'
import productReducer from './product-slice/index.js'
import shoppingProductReducer from './shopping-slice/index.js'
import addressReducer from './adress-slice/index.js'
import cartReducer from './cart-slice/index.js'
import orderReducer from "./order-slice/index.js"
import adminOrderReducer from './adminOrder-slice/index.js'
import searchReducer from './search-slice/index.js'
import reviewReducer from './review-slice/index.js'
import commonSlice from './common-slice/index.js'
import { configureStore } from '@reduxjs/toolkit'



const store = configureStore({ 
    reducer:{
        auth: authReducer,
        product: productReducer,
        shopProduct: shoppingProductReducer,
        cart: cartReducer,
        address: addressReducer,
        order: orderReducer,
        adminOrder: adminOrderReducer,
        searchProducts: searchReducer,
        review: reviewReducer,
        feature: commonSlice
    }
})

export default store 