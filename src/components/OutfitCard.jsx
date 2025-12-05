import React from 'react'
import { useState,useEffect } from 'react'

function Card({prop}) {
  return (
    <div>
      <div className='columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 '>
        {prop.map((outfit)=>(
          <div key={outfit.id} className='break-inside-avoid'>
            <img src={outfit.image_url} className='w-full rounded-lg object-cover 'alt={outfit.name}/>
          </div>
          
        ))}
      </div>
    </div>
  )
}

export default Card