import { useState, useEffect } from 'react'

function useDeviceSize() {
    const [scroll, setScroll] = useState(0)

    const handleScroll = () => {
        setScroll(window.scrollY)
    }

    useEffect(() => {
        // component is mounted and window is available
        handleScroll()
        window.addEventListener('scroll', handleScroll);
        // unsubscribe from the event on component unmount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return scroll

}

export default useDeviceSize