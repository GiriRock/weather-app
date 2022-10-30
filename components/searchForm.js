import React, { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import {
  useLoadScript,
  Autocomplete,
} from '@react-google-maps/api'

const scriptOptions = {
  googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY,
  libraries: ['places'],
}

export default function SearchForm({ action, title }) {
  const router = useRouter();
  const { isLoaded, loadError } = useLoadScript(scriptOptions)
  const [autocomplete, setAutocomplete] = useState(null)
  const inputEl = useRef(title ? title : null)
  console.log(inputEl)

  // Handle the keypress for input
  const onKeypress = (e) => {
    // On enter pressed
    if (e.key === 'Enter') {
      e.preventDefault()
      return false
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const onLoad = (autocompleteObj) => {
    setAutocomplete(autocompleteObj)
  }

  const onPlaceChanged = (e) => {
    if (autocomplete) {
      const place = autocomplete.getPlace()
      if ('place_id' in place) {
        router.push(`/place/${place.place_id}`)
      }
    }
  }

  return (
    <div className="bg-white shadow p-10 rounded">
      { loadError && (
        <div>Google Map script cannot be loaded, please reload the page</div>
      ) }

      { isLoaded && (
        <React.Fragment>
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 mb-4">Search Place</h1>
          <form className="flex" onSubmit={handleSubmit}>
            <div className="w-full">
              <Autocomplete
                onLoad={onLoad}
                fields={['place_id']}
                onPlaceChanged={onPlaceChanged}
              >
                <input
                  ref={inputEl}
                  type="text"
                  className="form-input block py-3 w-full rounded-md px-3 focus:outline-green-500"
                  placeholder="Enter Location"
                  onKeypress={onKeypress}
                />
              </Autocomplete>
            </div>
          </form>
        </React.Fragment>
      ) }
    </div>
  )
}
