import { useEffect } from 'react';
import moment from 'moment';

// Context
import StoreOpenProvider from './lib/context/StoreOpenProvider';

// Router
import { Routes, Route, useNavigate } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { clearAuth } from './redux/features/admin/adminSlice';
import { clearBag } from './redux/features/bag/bagSlice';

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
import AdminDashboard from './pages/admin/dashboard';
import AdminActivity from './pages/admin/activity';
import AdminMeals from './pages/admin/meals'
import AdminSingleMeal from './pages/admin/meals/[id]'
import AdminAddMeal from './pages/admin/meals/add'
import AdminOrders from './pages/admin/orders'
import AdminSingleOrder from './pages/admin/orders/[id]'
import AdminAccount from './pages/admin/account'

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
  const session = useSelector((state) => state.session)

  useEffect(() => {
    if (ready) {
      const today = moment(Date.now())
      const expirationDate = moment(expires)
      if (expirationDate.isBefore(today)) {
        dispatch(clearAuth())
      }
    }
  }, [ready, expires, dispatch])


  useEffect(() => {
    const sinceLastSession = moment(Date.now()).diff(moment(session), 'hours')
    if (sinceLastSession > 20) {
      dispatch(clearBag())
    }
  }, [dispatch, session])
  return (
    <StoreOpenProvider>
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
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Activity */}
          <Route exact path="/admin/activity"
            element={
              <ProtectedRoute>
                <AdminActivity />
              </ProtectedRoute>
            }
          />

          {/* Meals */}
          <Route exact path="/admin/meals"
            element={
              <ProtectedRoute>
                <AdminMeals />
              </ProtectedRoute>
            }
          />

          {/* Single Meal */}
          <Route exact path="/admin/meals/:name/:_id"
            element={
              <ProtectedRoute>
                <AdminSingleMeal />
              </ProtectedRoute>
            }
          />

          {/* Single Meal */}
          <Route exact path="/admin/meals/add"
            element={
              <ProtectedRoute>
                <AdminAddMeal />
              </ProtectedRoute>
            }
          />

          {/* Orders */}
          <Route exact path="/admin/orders"
            element={
              <ProtectedRoute>
                <AdminOrders />
              </ProtectedRoute>
            }
          />

          {/* Single Order */}
          <Route exact path="/admin/orders/:number/:_id"
            element={
              <ProtectedRoute>
                <AdminSingleOrder />
              </ProtectedRoute>
            }
          />

          {/* Account */}
          <Route exact path="/admin/account"
            element={
              <ProtectedRoute>
                <AdminAccount />
              </ProtectedRoute>
            }
          />

        </Routes>
      </Layout>
    </StoreOpenProvider>
  );
}

export default App;
