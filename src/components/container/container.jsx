import React from 'react'

// we genrally use this component so that when ever  we want to change the width of the component
// simple we change the width of container where ever it is used will also change
function container({children}) {
  return <div className='w-full max-w-7xl mx-auto px-4'>
          {children}      
        </div>;
}

export default container
