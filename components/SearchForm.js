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
        console.log(place)
        router.push(`/place/${place.place_id}`)
      }
    }
  }

  return (
    <div className= "p-10">
      { loadError && (
        <div>Google Map script cannot be loaded, please reload the page</div>
      ) }

      { isLoaded && (
        <React.Fragment>
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
                  className="form-input block py-3 w-full rounded-md px-3 outline outline-1 outline-gray-300 focus:shadow-md"
                  placeholder="Choose your location"
                  onKeyPress={onKeypress}
                />
              </Autocomplete>
            </div>
          </form>
        </React.Fragment>
      ) }
    </div>
  )
}
