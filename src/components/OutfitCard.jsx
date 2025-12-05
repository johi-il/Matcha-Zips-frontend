import React from 'react'
import { useState,useEffect } from 'react'

function Card({prop}) {


  return (
    <div>
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 ">
        {prop.map((outfit) => (
          <div class="group relative max-w-sm overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-200 hover:shadow-lg">
            <div key={outfit.id} className="break-inside-avoid">
              <img
                src={outfit.image_url}
                className="w-full rounded-lg object-cover "
                alt={outfit.name}
              />
            </div>
            <div class="absolute inset-0 flex flex-col justify-end bg-black/60 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div class="translate-y-4 space-y-2 transition-transform duration-300 group-hover:translate-y-0">
                <h3 class="text-lg font-semibold text-white">{outfit.name}</h3>
                <p class="text-white">{outfit.description}</p>

                <li class="text-base font-light text-white">
                  occasion: {outfit.occasion_id} 
                </li>
                <li  class="text-base font-light text-white">
                  Color: {outfit.color}
                </li>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card