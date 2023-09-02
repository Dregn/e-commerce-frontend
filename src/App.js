import logo from './logo.svg';
import { Container } from 'react-bootstrap';

import HomeScreen from './Screens/HomeScreen';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {loadProducts} from './Screens/HomeScreen';
import './App.css';
import RootLayout from './Components/RootLayout';
import Product from './Components/Product';
import ProductScreen, { loadProduct } from './Screens/ProductScreen';
import CartScreen from './Screens/CartScreen';

const router = createBrowserRouter([
  {
  path: "/" ,
  element:<RootLayout/>,
  id:'root',
  loader:loadProducts,
  children:[
    {index:true,element:<HomeScreen></HomeScreen>},
    {
      path:'/product/:productid',
      id:'product',
      children:[
        {
          index:true,
          element:<ProductScreen></ProductScreen>
        }
      ]
    },
    {
      path:'/cart/:productid?',
      id:'cart',
      children:[
        {
          index:true,
          element:<CartScreen></CartScreen>
        }
      ]
    }
  ]

},

])

function App() {
 
    return <RouterProvider router={router} />;

}

export default App;
