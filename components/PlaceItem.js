import React from 'react'
import Link from 'next/link'

export default function PlaceItem({ place, photoUrl }) {
  return (
    <div className="w-full flex shadow bg-white/60 rounded-md">
      <div
        className="image h-auto w-56 bg-center bg-cover rounded-l-md overflow-hidden"
        style={ photoUrl ? {
          backgroundImage: `url('${photoUrl}')`
        } : {background: 'white'}}
      />

      <div className="w-full rounded-r-md p-4 flex flex-col justify-between leading-normal">
        <h3 className="font-bold text-large text-gray-900 mb-4">{ place.name }</h3>

        <div className="text-gray-900 text-sm mb-4">
          {place.formatted_address}
        </div>
      </div>
    </div>
  )
}
