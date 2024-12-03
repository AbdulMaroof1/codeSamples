import { Avatar, Badge, Box, Button, For, HStack, IconButton, Stack, Table, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import moment from 'moment';
import { ViewIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { GET} from '../../utilities/ApiProvider';
import { saveAs } from 'file-saver';
import { Pagination } from 'swiper/modules';

const SearchReport = ({tableData , isHome }) => {
  tableData = Array.isArray(tableData) ? tableData : [tableData];


  
  const generateReport = async(id)=>
  {
      try
      {

        const response = await GET(`/search/report/${id}`);
        if(response.status == 200)
        {
          const base64Pdf = response.data.base64;
          const byteArray = new Uint8Array(atob(base64Pdf).split('').map(c => c.charCodeAt(0)));
          const blob = new Blob([byteArray], { type: 'application/pdf' });
          saveAs(blob, `report-${id}.pdf`);

        }


      }
      catch(error)
      {

      }
    
  }


  return (
    <Stack display="flex" flexDirection="column" gap={2}>
      {/* Header Row */}
      <HStack display="flex" w="100%" px={4} bg="#f7f7f7" alignItems="center">
        <Box flex={4} textAlign="left" fontSize="15px" fontWeight="400" color="#75767A">
          PROPERTY ADDRESS
        </Box>
        <Box flex={1} textAlign="center" fontSize="15px" fontWeight="400" color="#75767A">
          POSTCODE
        </Box>
        <Box flex={2} textAlign="center" fontSize="15px" fontWeight="400" color="#75767A">
          UPRN
        </Box>
        <Box flex={1} textAlign="center" fontSize="15px" fontWeight="400" color="#75767A">
          TOWN
        </Box>
        <Box flex={2} textAlign="center" fontSize="15px" fontWeight="400" color="#75767A">
          COUNTY
        </Box>
        <Box flex={1} textAlign="center" fontSize="15px" fontWeight="400" color="#75767A">
          what3words
        </Box>
        <Box flex={1} textAlign="center" fontSize="15px" fontWeight="400" color="#75767A">
          STATUS
        </Box>
        <Box flex={1} textAlign="center" fontSize="15px" fontWeight="400" color="#75767A">
          Action
        </Box>
      </HStack>
  
      {/* Data Rows */}
      {tableData?.map((item, index) => (
        <HStack
          key={index}
          display="flex"
          w="100%"
          h="70px"
          bg="#fff"
          shadow="0px 16px 38px 0px #0000000F"
          px={4}
          borderRadius="16px"
          alignItems="center"
        >
          <Box flex={4} textAlign="left" fontSize="15px" fontWeight="500" color="#1B1C1D">
            {item.propertyAddress}
          </Box>
          <Box flex={1} textAlign="center" fontSize="15px" fontWeight="500" color="#1B1C1D">
            {item.postCode}
          </Box>
          <Box flex={2} textAlign="center" fontSize="15px" fontWeight="500" color="#1B1C1D">
            {item.uprn}
          </Box>
          <Box flex={1} textAlign="center" fontSize="15px" fontWeight="500" color="#1B1C1D">
            {item.town}
          </Box>
          <Box flex={2} textAlign="center" fontSize="15px" fontWeight="500" color="#1B1C1D">
            {item.country}
          </Box>
          <Box flex={1} textAlign="center" fontSize="15px" fontWeight="500" color="#1B1C1D">
            {item.What3WordsAddress}
          </Box>
          <Box flex={1} textAlign="center" fontSize="15px" fontWeight="500" color="#1B1C1D">
            <Badge
              w="81px"
              height="28px"
              display="flex"
              alignItems="center"
              borderRadius="50px"
              justifyContent="center"
              bg="#F3D893"
              color="#C79209"
            >
              {item?.status}
            </Badge>
          </Box>
          <Box flex={1} textAlign="center" fontSize="15px" fontWeight="500" color="#1B1C1D">
            <HStack justifyContent="center">
              <IconButton
                isRound
                variant="solid"
                w="40px"
                h="40px"
                fontSize="16px"
                bgGradient="linear(to-r, #295377, #208C74)"
                aria-label="View"
                icon={<ViewIcon fontSize="16px" color="#fff" />}
                onClick={() => generateReport(item.id)}
              />
            </HStack>
          </Box>
        </HStack>
      ))}
      
      {/* Pagination */}
      {!isHome && (
        <Stack mt={4} direction="row" justifyContent="space-between">
          <Button>Previous</Button>
          <Button>Next</Button>
        </Stack>
      )}
    </Stack>
  );
  
  
}

export default SearchReport