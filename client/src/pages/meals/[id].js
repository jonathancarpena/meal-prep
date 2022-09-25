import React, { useState, useEffect } from 'react';

// React Router
import { useParams } from 'react-router-dom';

// API
import { get_SingleMeal, get_SimilarMeals } from '../../lib/api';

// Components
import Main from '../../components/Meals/Single/Main';
import Recommended from '../../components/Meals/Single/Recommended';
import Loading from '../../components/Admin/Loading';



function SingleMeal() {
  const { _id } = useParams();
  const [loading, setLoading] = useState(true);
  const [meal, setMeal] = useState(null);
  const [similarMeals, setSimilarMeals] = useState(null);

  useEffect(() => {
    // Fetch Todays Meals

    if (meal === null) {
      get_SingleMeal(_id).then((data) => {
        setMeal(data);
      });
    }
  }, [_id, meal]);

  useEffect(() => {
    if (meal !== null && similarMeals === null) {
      get_SimilarMeals(meal.type).then((data) => setSimilarMeals([...data]));
    }
  }, [meal, similarMeals]);

  useEffect(() => {
    if (meal !== null && similarMeals !== null) {
      setLoading(false);
    }
  }, [meal, similarMeals]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className='mt-[120px] md:mt-[45px] lg:mt-[100px] bg-neutral-100 px-10 sm:p-20 flex flex-col relative space-y-20 max-w-[1980px]'>


      <Main data={meal} />
      <Recommended similarMeals={similarMeals} />
    </div>
  );
}

export default SingleMeal;
