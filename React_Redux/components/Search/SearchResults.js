import { Spacer } from '@chakra-ui/react'
import React from 'react'

const SearchResults = ({ showDropdown, addresses, handleAddressSelect }) => {
  return (
    <>
      {showDropdown && addresses.length > 0 && (
        <ul
        style={{
            border: '1px solid #ccc',
            maxHeight: '150px',
            overflowY: 'auto',
            listStyleType: 'none',
            padding: '0',
            margin: '0',
            position: 'absolute', // Use absolute positioning
            backgroundColor: 'white',
            zIndex: 1000,
            width: '70%',
            top: '41%', // Position it directly below the input
            left: '24%', // Align it to the left edge of the input
          }}
        >
          {addresses.map((address) => (
            <li
              key={address.DPA.UPRN}
              onClick={() => handleAddressSelect(address)}
              style={{
                padding: '10px',
                cursor: 'pointer',
                borderBottom: '1px solid #ccc',
                backgroundColor: '#f9f9f9',
              }}
            >
              {address.DPA.ADDRESS} - {address.DPA.POST_TOWN}
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

export default SearchResults
