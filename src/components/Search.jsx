import React from 'react'

export default function Search() {
  return (
        <div className="container-fluid">
            <form className="d-flex">
                <input className="Search-input form-control me-3 w-100 text-white bg-danger" type="search" placeholder="Search" aria-label="Search"/>
                <button className="Search-input btn btn-outline-dark" type="submit">Search</button>
            </form>
        </div>
  )
}
