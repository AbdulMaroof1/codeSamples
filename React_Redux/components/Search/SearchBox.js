import React, { useState, useCallback } from 'react'
import axios from 'axios'
import _ from 'lodash'  // Import lodash for debounce
import SearchResults from './SearchResults'
import { Spinner, Stack, Toast, useToast } from '@chakra-ui/react'
import { POST } from '../../utilities/ApiProvider'
import proj4 from 'proj4'; // Make sure proj4 is imported
import SearchReport from './SearchReport'

proj4.defs("EPSG:27700","+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs");


const SearchBox = () => {
  const toast = useToast();
  const [postcode, setPostcode] = useState('')  // Initialize postcode state
  const [showDropdown, setShowDropdown] = useState(false)
  const [addresses, setAddresses] = useState([])
  const [error, setError] = useState(null)  // Error state for displaying errors
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingReport,setIsLoadingReport] = useState(false);
  const [showReport,setShowReport] = useState(false);
  const [data,setData] = useState([]);


  // handle search data here
  const debouncedFetchAddresses = useCallback(
    _.debounce((postcode) => fetchAddresses(postcode), 300), // 300 ms delay
    []
  )

  const handlePostcodeChange = (event) => {
    const { value } = event.target
    setPostcode(value)
    debouncedFetchAddresses(value) // Call the debounced function
  }

  const fetchAddresses = async (postcode) => {
    if (!postcode || postcode.length < 3) return // Exit if no valid postcode is entered

    const apiKey = 'R8Yl8OrQA1WH6IZX9ERVpG5EyIGs2wlo' // Your API key
    try {
      const response = await axios.get(`https://api.os.uk/search/places/v1/postcode?postcode=${postcode}&key=${apiKey}`)
      console.log('Address API Response:', response.data)
      setAddresses(response.data.results) // Set addresses based on API response
      setShowDropdown(true) // Show the dropdown when results are available
      setError(null) // Reset any previous errors
    } catch (error) {
      console.error('Error fetching addresses:', error)
      setError('Failed to fetch addresses. Please try again later.') // Set error state
      setShowDropdown(false) // Hide the dropdown on error
    }
  }

  const convertToWGS84 = (x, y) => {
    const firstProjection = 'EPSG:27700'; // British National Grid
    const secondProjection = 'EPSG:4326'; // WGS84 (latitude, longitude)
  
    console.log(`Converting X: ${x}, Y: ${y}`);
    debugger;
    return proj4(firstProjection, secondProjection, [x, y]);
  };

  const handleAddressSelect = async(address) => {
    

    const { X_COORDINATE, Y_COORDINATE } = address.DPA;
    
    const [longitude, latitude] = convertToWGS84(X_COORDINATE, Y_COORDINATE);

    // Additional logic here (e.g., make API call or navigate to another page)
    const report = await generateReport({ DPA : {
        ...address.DPA, longitude,latitude
    } })
    return report;
  }

  //  Hit an Api to search user   

  const generateReport = async(data) =>
  {
    let {DPA} = data;
    try {
        const reportPayload = {
            "longitude" : DPA.longitude,
            "latitude" : DPA.latitude,
            "propertyAddress" : DPA.ADDRESS,
            "postCode" : DPA.POSTCODE,
            "uprn" : DPA.UPRN,
            "town" : DPA.POST_TOWN,
            "county" : DPA.LOCAL_CUSTODIAN_CODE_DESCRIPTION,
            "What3WordsAddress" :DPA.POST_TOWN,
            "sudo_code" : DPA.COUNTRY_CODE
        }
        setIsLoadingReport(true);

        const response = await POST('/search', reportPayload);
        if (response.status === 200) {
            setData(response.data) // Set addresses based on API response

            toast({
            description:response?.message,
            status: 'success',
            isClosable: true,
            position: 'top-right',
            duration: 3000,
          });
        } 
        else {
            toast({
            description: response?.message,
            status: 'error',
            isClosable: true,
            position: 'top-right',
            duration: 3000,
          });
        }
      } catch (err) {
        toast({
          description: err?.message,
          status: 'error',
          isClosable: true,
          position: 'top-right',
          duration: 3000,
        });
      }

      setShowDropdown(false);
      setAddresses([]);
      setIsLoadingReport(false);
      setShowReport(true);
  }

  return (
    <Stack>
      <input
        
        type="text"
        value={postcode}
        onChange={handlePostcodeChange}
        placeholder="Enter postcode"
        style={{ marginBottom: '10px', padding: '5px', width: '70%' ,position:"relative" }}
      />
      
      {
        isLoadingReport?(<Spinner />) : (<SearchResults
            showDropdown={showDropdown}
            addresses={addresses}
            handleAddressSelect={handleAddressSelect}  // Pass handleAddressSelect as prop
          />)
      }
      {showReport && (<SearchReport tableData ={data}  />)}

    </Stack>
  )
}

export default SearchBox
