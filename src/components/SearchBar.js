import React from 'react'

function SearchBar() {
  return (
    <div className="search-wrapper">
        <input className="w-44 m-2 p-2 cursor-pointer rounded-md focus:outline-none" type="text" placeholder="Search" />
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="feather feather-search w-10" viewBox="0 0 25 25">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="M21 21l-4.35-4.35"></path>
        </svg>
    </div>
  )
}

export default SearchBar
