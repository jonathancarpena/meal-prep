function Brand({ onClick = null }) {
  return (
    <div
      onClick={() => onClick()}
      className={` h-[85px]  w-max px-5 flex justify-center items-center rounded-lg  overflow-hidden bg-yellow-400 cursor-pointer `}>
      <img src='/logo.jpeg' alt="brand" className='w-auto h-[90%]' />
    </div>
  );
}

export default Brand;
