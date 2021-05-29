import {useState} from 'react';
import './App.css';
import Header from './components/Layout/Header/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './components/store/cart-provider';


function App() {
  const [cartShown,setCartShown] = useState(false);

  const showcartHandler = () => {
    setCartShown(true);
  }

  const hidecartHandler = () => {
    setCartShown(false);
  }

  return (
    <CartProvider>
      {cartShown && <Cart onHide={hidecartHandler} />}
      <Header onShow={showcartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
