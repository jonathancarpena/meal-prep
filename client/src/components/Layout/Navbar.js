// Hooks
import useDeviceScroll from '../../lib/hooks/useDeviceScroll';

// Context
import { useStoreOpen } from '../../lib/context/StoreOpenProvider';

// Router
import { useNavigate, useLocation, Link } from 'react-router-dom';

// Redux
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  showMobileMenu,
  closeMobileMenu,
} from '../../redux/features/modal/modalSlice';

// Components
import Brand from '../Brand';

// Icons
import { BsBagFill } from 'react-icons/bs';
import { MdMenu, MdOutlineClose } from 'react-icons/md';

// Constants
import { Socials } from './Footer';
const navLinks = [
  { text: 'home', link: '/' },
  { text: 'about', link: '/about' },
  { text: 'meals', link: '/meals/today' },
  { text: 'contact', link: '/contact' },
];

const MobileMenu = () => {
<<<<<<< HEAD
    const { mobileMenu } = useSelector(state => state.modal)
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    const navigate = useNavigate()
    function handleNavigate(link) {
        navigate(link)
        dispatch(closeMobileMenu())
    }


    return (
        <div className={` ${mobileMenu ? 'translate-x-0 ' : 'translate-x-[100vw] bg-transparent '} fixed  inset-0 transition-all ease-in-out duration-300   z-[200] h-screen w-screen bg-yellow-400 flex flex-col text-white `}>

            <div className='active:scale-90 transition-all ease-in-out duration-200 fixed top-6 right-10 px-2 py-1 rounded-xl bg-white text-yellow-400'>
                <MdOutlineClose
                    onClick={() => dispatch(closeMobileMenu())}
                    className='cursor-pointer text-[1.75rem]  '
                />
            </div>

            <div className='flex flex-col  items-center justify-center mt-[5rem]'>
                {navLinks.map((item, idx) => (
                    <div
                        key={`mobile-menu-${item.text}`}
                        onClick={() => handleNavigate(item.link)}
                        className={`cursor-pointer w-full text-center py-10 active:bg-yellow-500`}>
                        <span className={`${pathname === item.link ? 'underline underline-offset-8' : ''} capitalize font-semibold text-5xl `}>
                            {item.text}
                        </span>
                    </div>
                ))}
            </div>
            <ul className='flex justify-center space-x-10 py-10'>
                {Socials.map((item, idx) => (
                    <a key={`social-${idx}`} target="_blank" href={item.link} rel="noopener noreferrer">
                        {item.icon}
                    </a>
                ))}
            </ul>



        </div>
    )
}
=======
  const { mobileMenu } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  function handleNavigate(link) {
    navigate(link);
    dispatch(closeMobileMenu());
  }

  return (
    <div
      className={` ${
        mobileMenu
          ? 'translate-x-0 bg-yellow-400 text-white'
          : 'translate-x-[100vw] bg-tranparent  text-transparent'
      } fixed  inset-0 transition-all ease-in-out duration-300   z-[200] h-screen w-screen  flex flex-col  `}>
      <div className='active:scale-90 transition-all ease-in-out duration-200 fixed top-6 right-10 px-2 py-1 rounded-xl bg-white text-yellow-400'>
        <MdOutlineClose
          onClick={() => dispatch(closeMobileMenu())}
          className='cursor-pointer text-[1.75rem]  '
        />
      </div>

      <div className='flex flex-col  items-center justify-center mt-[5rem]'>
        {navLinks.map((item, idx) => (
          <div
            key={`mobile-menu-${item.text}`}
            onClick={() => handleNavigate(item.link)}
            className={`cursor-pointer w-full text-center py-10 active:bg-yellow-500`}>
            <span
              className={`${
                pathname === item.link ? 'underline underline-offset-8' : ''
              } capitalize font-semibold text-5xl `}>
              {item.text}
            </span>
          </div>
        ))}
      </div>
      <ul className='flex justify-center space-x-10 py-10'>
        {Socials.map((item, idx) => (
          <a
            key={`social-${idx}`}
            target='_blank'
            href={item.link}
            rel='noopener noreferrer'>
            {item.icon}
          </a>
        ))}
      </ul>
    </div>
  );
};
>>>>>>> 3d7187f79b918196b1b806d2f99c5a2056f557e1

function Navbar() {
  const open = useStoreOpen();

  const activeLinkStyles = 'border-b-2 border-b-yellow-400';

  const navigate = useNavigate();
  const bag = useSelector((state) => state.bag);
  const { sideDrawer } = useSelector((state) => state.modal);
  const { pathname } = useLocation();
  const scroll = useDeviceScroll();

  function generateBagLength() {
    let length = 0;
    if (bag.length > 0) {
      bag.forEach((item) => (length += item.qty));
    }
    return length;
  }

  const dispatch = useDispatch();
  return (
    <>
      <nav
        className={`hidden ${
          scroll > 25
            ? 'text-white bg-yellow-400 drop-shadow-xl'
            : 'text-neutral-700'
        }    top-0 fixed ${
          sideDrawer ? 'z-0' : 'z-[100]'
        } py-1 font-body pr-5 lg:flex justify-between items-center w-full max-w-[1980px] transition-all duration-300 h-[90px]  `}>
        {/* Branding */}
        <Brand isDarkBg={scroll > 25} onClick={() => navigate('/')} />

        {/* Nav Links */}
        <ul className=' flex space-x-5 mr-[80px]  '>
          {navLinks.map((item, idx) => {
            let lastChild = false;
            if (idx === navLinks.length - 1) {
              lastChild = true;
            }
            return (
              <li
                key={item.link}
                className={` cursor-pointer uppercase text-2xl font-semibold`}>
                <Link to={item.link}>
                  <p>
                    <span
                      className={`mr-3 ${
                        pathname === item.link ? activeLinkStyles : ''
                      } `}>
                      {item.text}
                    </span>

                    {!lastChild && <span>|</span>}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Bag */}
        {open && (
          <div
            className={`${
              open ? 'bg-yellow-400' : 'bg-tranparent'
            } text-white  hidden lg:inline-block  justify-center w-[80px] absolute right-0  h-[95%] mr-0.5 rounded-xl cursor-pointer`}>
            <button
              disabled={!open}
              onClick={() => navigate('/order')}
              className='relative w-full flex h-full items-center justify-center px-3'>
              <BsBagFill className='text-[3rem]' />

              <span className=' text-yellow-400 text-xl font-bold absolute top-[50%] -translate-y-[30%] left-[50%] -translate-x-[50%]'>
                {generateBagLength() !== 0 ? generateBagLength() : ''}
              </span>
            </button>
          </div>
        )}
      </nav>

      {/* Mobile Nav */}
      <nav
        className={`${
          scroll > 25 ? 'bg-yellow-400 text-white' : ''
        }  active:scale-90  drop-shadow-xl lg:hidden fixed top-6 right-6 transition-all ease-in-out duration-200 px-2 py-1 rounded-xl  z-[100]`}>
        <MdMenu
          onClick={() => dispatch(showMobileMenu())}
          className={` text-[1.75rem] cursor-pointer `}
        />
      </nav>

      <MobileMenu />
    </>
  );
}

export default Navbar;
