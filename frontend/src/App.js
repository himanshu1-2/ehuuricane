import Header from './componets/Header'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from './componets/Fotter'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'

import { Container } from 'react-bootstrap'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import productListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path="/cart" component={CartScreen} />
          <Route path="/order/:id" component={OrderScreen} />
          <Route path='/admin/userlist' component={UserListScreen}></Route>
          <Route path='/admin/productlist' component={productListScreen}></Route>
          <Route path='/admin/product/:id/edit' component={ProductEditScreen}></Route>
          <Route path='/admin/user/:id/edit' component={UserEditScreen}></Route>
          <Route path='/admin/orderList' component={OrderListScreen}></Route>
          <Route path='/shipping' component={ShippingScreen}></Route>
          <Route path='/payment' component={PaymentScreen}></Route>
          <Route path='/placeorder' component={PlaceOrderScreen}></Route>
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/profile/" component={ProfileScreen} />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id" component={CartScreen} />
          <Route path="/" component={HomeScreen} exact />
          <Route path="/search/:keyword" component={HomeScreen} exact />
          <Route path="/page/:pageNumber" component={HomeScreen} exact />
          <Route path="/search/:keyword/page/:pageNumber" component={HomeScreen} exact />

        </Container>
      </main >
      <Footer />
    </Router>
  );
}

export default App;
