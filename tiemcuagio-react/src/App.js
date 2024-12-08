import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './App.css';
import NavBar from './pages/home/NavBar/Navbar';
import Home from './pages/home/Home/Home';
import Product from './pages/product/Product/Product';
import Cart from './pages/cart/Cart/Cart';
import Checkout from './pages/checkout/Checkout/Checkout';
import Account from './pages/account/Account/Account';
import Footer from './components/ui/Footer/Footer';

function App() {
    // document.title = "Tiệm của Gió"
    const client = new QueryClient();
    return <div>
        <Router>
        <QueryClientProvider client={client}>
            <NavBar/>
            <div className='body'>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/products/:id/" element={<Product/>}/>
                    <Route path="/cart/" element={<Cart/>}/>
                    <Route path="/checkout/" element={<Checkout/>}/>
                    <Route path="/account/" element={<Account/>}/>
                </Routes>

            </div>
            <Footer/>
        </QueryClientProvider>
        </Router>
    </div>
}
export default App;