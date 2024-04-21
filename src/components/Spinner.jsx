import React from 'react';
import { CircleLoader} from 'react-spinners';

function Spinner() {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="text-center text-white">
        <CircleLoader color="#36D7B7"  size={100} loading={true} />
        <p className='textFont text-2xl'>Loading...</p>
      </div>
    </div>
  );
}

export default Spinner;
