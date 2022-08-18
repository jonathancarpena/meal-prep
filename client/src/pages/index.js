
// Components
import Action from '../components/Home/Action';
import Hero from '../components/Home/Hero'
import Meals from '../components/Home/Meals'
import Practices from '../components/Home/Practices';
import Reviews from '../components/Home/Reviews';
import Steps from '../components/Home/Steps'

function Home() {


  return (
    <div className=''>
      <Hero />

      {/* Steps */}
      <Steps />

      {/* Breakfast, Lunch, Dinner */}
      <Meals />

      {/* Good Practices */}
      <Practices />

      {/* Reviews */}
      <Reviews />

      {/* Call To Action */}
      <Action />
    </div>
  )
}

export default Home;
