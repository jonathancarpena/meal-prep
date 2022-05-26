import { useEffect } from 'react';
import moment from 'moment';
// Router
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { clearAuth } from './redux/features/admin/adminSlice';

// Components
import Layout from './components/Layout'

// Pages
import Home from './pages'
import About from './pages/about'
import Contact from './pages/contact'
import Order from './pages/order'
import OrderSuccess from './pages/order/success'
import AllMeals from './pages/meals'
import TodayMeals from './pages/meals/today'
import SingleMeal from './pages/meals/[id]'
import NotFound from './pages/404'


// Admin Pages
import Admin from './pages/admin'
import Admin_Dashboard from './pages/admin/dashboard';
import Admin_Activity from './pages/admin/activity';
import Admin_Meals from './pages/admin/meals'
import Admin_SingleMeal from './pages/admin/meals/[id]'
import Admin_AddMeal from './pages/admin/meals/add'
import Admin_Orders from './pages/admin/orders'
import Admin_SingleOrder from './pages/admin/orders/[id]'
import Admin_Account from './pages/admin/account'

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()
  const { ready } = useSelector((state) => state.admin)
  if (!ready) {
    navigate('/')
  }
  return (
    <>
      {children}
    </>
  )
}
function App() {
  const dispatch = useDispatch()
  const { ready, expires } = useSelector(state => state.admin)

  useEffect(() => {
    if (ready) {
      const today = moment(Date.now())
      const expirationDate = moment(expires)
      if (expirationDate.isBefore(today)) {
        dispatch(clearAuth())
      }
    }
  }, [])

  return (
    <Layout>
      <Routes>

        {/* 404 */}
        <Route path='*' element={<NotFound />} />

        {/* Landing  */}
        <Route exact path='/' element={<Home />} />

        {/* About  */}
        <Route exact path='/about' element={<About />} />

        {/* Contact  */}
        <Route exact path='/contact' element={<Contact />} />

        {/* Order */}
        <Route exact path='/order' element={<Order />} />

        {/* Success */}
        <Route exact path='/order/success/:order_id' element={<OrderSuccess />} />

        {/* All Meals  */}
        <Route exact path='/meals' element={<AllMeals />} />

        {/* Today Meals  */}
        <Route exact path='/meals/today' element={<TodayMeals />} />

        {/* Single Meal */}
        <Route exact path='/meals/:name/:_id' element={<SingleMeal />} />

        {/* Admin */}
        <Route exact path="/admin" element={<Admin />} />

        {/*  */}
        {/* Protected Routes */}
        {/*  */}

        {/* Dashboard */}
        <Route exact path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Admin_Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Activity */}
        <Route exact path="/admin/activity"
          element={
            <ProtectedRoute>
              <Admin_Activity />
            </ProtectedRoute>
          }
        />

        {/* Meals */}
        <Route exact path="/admin/meals"
          element={
            <ProtectedRoute>
              <Admin_Meals />
            </ProtectedRoute>
          }
        />

        {/* Single Meal */}
        <Route exact path="/admin/meals/:name/:_id"
          element={
            <ProtectedRoute>
              <Admin_SingleMeal />
            </ProtectedRoute>
          }
        />

        {/* Single Meal */}
        <Route exact path="/admin/meals/add"
          element={
            <ProtectedRoute>
              <Admin_AddMeal />
            </ProtectedRoute>
          }
        />

        {/* Orders */}
        <Route exact path="/admin/orders"
          element={
            <ProtectedRoute>
              <Admin_Orders />
            </ProtectedRoute>
          }
        />

        {/* Single Order */}
        <Route exact path="/admin/orders/:number/:_id"
          element={
            <ProtectedRoute>
              <Admin_SingleOrder />
            </ProtectedRoute>
          }
        />

        {/* Account */}
        <Route exact path="/admin/account"
          element={
            <ProtectedRoute>
              <Admin_Account />
            </ProtectedRoute>
          }
        />





      </Routes>
    </Layout>
  );
}

export default App;
