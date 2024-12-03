import {
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Container,
  Box,
  Image,
  Text,
  Heading,
} from '@chakra-ui/react';
import headingIcon from '../../../assets/images/website/headingIcon.svg';
import React, { useEffect, useState } from 'react';
import { GET } from '../../../utilities/ApiProvider';
import { imgUrl } from '../../../utilities/config';
import { useNavigate } from 'react-router-dom';

const AboutService = () => {
  const navigate = useNavigate();
  const [serviceData, setServiceData] = useState({
    patientData: null,
    practionerData: null,
    hospitalData: null,
  });

  const fetchServices = async () => {
    try {
      const response = await GET('/web/services');
      console.log(response);
      if (response.status === 200) {
        response?.data.map(val => {
          if (val.serviceName === 'patients') {
            setServiceData(prev => ({ ...prev, patientData: val.service }));
          } else if (val.serviceName === 'Practitioners') {
            setServiceData(prev => ({ ...prev, practionerData: val.service }));
          } else {
            setServiceData(prev => ({ ...prev, hospitalData: val.service }));
          }
        });
      }
      console.log('Service Data', serviceData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <Container
      maxW={{ base: '1366px', '2xl': '8xl' }}
      position={'relative'}
      py="60px"
    >
      <Container maxW={{ base: '1366px', xl: '6xl' }}>
        <Box flex={1} textAlign={'center'} mb="40px">
          <Heading
            mb="25px"
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            color={'primaryGreen.200'}
            as={'h6'}
            fontWeight={'600'}
          >
            <Image src={headingIcon} />
            <Text
              ml="10px"
              fontSize={{ base: '18px', xl: '20px' }}
              textTransform={'uppercase'}
              as="span"
            >
              Services
            </Text>
          </Heading>
          {/* <Heading
            fontSize={{ base: '32px', xl: '38px' }}
            fontWeight={'600'}
            color={'primaryBlack.100'}
            mb="35px"
          >
            Services
          </Heading> */}
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'center'}
            gap={'20px'}
          >
            <Tabs variant="soft-rounded" colorScheme="green">
              <TabList gap={10} alignItems={'center'} justifyContent={'center'}>
                <Tab
                  fontSize={{ base: '12px', xl: '14px' }}
                  fontWeight={500}
                  borderRadius={'25px'}
                  color={'primaryBlack.100'}
                  h={{ base: '35px', xl: '45px' }}
                  textTransform={'uppercase'}
                  bgGradient={'linear(to-b, #C2D4FF, #fff)'}
                  _selected={{
                    bgGradient: 'linear(to-r, #295377, #208C74)',
                    color: '#fff',
                  }}
                  _hover={{
                    bgGradient: 'linear(to-r, #295377, #208C74)',
                    color: '#fff',
                  }}
                >
                  Patient
                </Tab>
                <Tab
                  fontSize={{ base: '12px', xl: '14px' }}
                  fontWeight={500}
                  borderRadius={'25px'}
                  color={'primaryBlack.100'}
                  h={{ base: '35px', xl: '45px' }}
                  textTransform={'uppercase'}
                  bgGradient={'linear(to-b, #C2D4FF, #fff)'}
                  _selected={{
                    bgGradient: 'linear(to-r, #295377, #208C74)',
                    color: '#fff',
                  }}
                  _hover={{
                    bgGradient: 'linear(to-r, #295377, #208C74)',
                    color: '#fff',
                  }}
                >
                  Practitioner
                </Tab>
                <Tab
                  fontSize={{ base: '12px', xl: '14px' }}
                  fontWeight={500}
                  borderRadius={'25px'}
                  color={'primaryBlack.100'}
                  h={{ base: '35px', xl: '45px' }}
                  textTransform={'uppercase'}
                  bgGradient={'linear(to-b, #C2D4FF, #fff)'}
                  _selected={{
                    bgGradient: 'linear(to-r, #295377, #208C74)',
                    color: '#fff',
                  }}
                  _hover={{
                    bgGradient: 'linear(to-r, #295377, #208C74)',
                    color: '#fff',
                  }}
                >
                  Hospital
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel pt={10}>
                  <Stack
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    flexWrap={'wrap'}
                    spacing={0}
                    gap={{ base: '5spx', xl: '10px' }}
                  >
                    {serviceData?.patientData?.map((item, index) => (
                      <Box
                        role="group"
                        key={index}
                        w={{ base: '46%', xl: '20%' }}
                        position={'relative'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        padding={'15px 0'}
                        flexDir={'column'}
                        boxShadow={'0px 15px 25px -15px #adadad'}
                        m={{ base: '5px !important', xl: '15px !important' }}
                        cursor={'pointer'}
                        onClick={() => navigate(`/service-inner/${item._id}`)}
                      >
                        <Text
                          w="55px"
                          h="55px"
                          display={'flex'}
                          alignItems={'center'}
                          justifyContent={'center'}
                          margin={'0 0 25px 0'}
                          position={'relative'}
                          _before={{
                            content: "''",
                            position: 'absolute',
                            width: '55px',
                            height: '55px',
                            bgGradient:
                              'linear(to-r, primaryGreen.100, primaryGreen.200)',
                            top: 0,
                            left: 0,
                            right: 0,
                            margin: '0 auto',
                            transform: 'rotate(45deg)',
                            zIndex: '0',
                          }}
                        >
                          <Image
                            w="60%"
                            src={`${imgUrl}/${item.icon}`}
                            position={'relative'}
                            zIndex={1}
                          />
                        </Text>
                        <Text>{item.title}</Text>
                      </Box>
                    ))}
                  </Stack>
                </TabPanel>
                <TabPanel pt={10}>
                  <Stack
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    flexWrap={'wrap'}
                    spacing={0}
                    gap={{ base: '5spx', xl: '10px' }}
                  >
                    {serviceData?.practionerData?.map((item, index) => (
                      <Box
                        role="group"
                        key={index}
                        w={{ base: '46%', xl: '20%' }}
                        position={'relative'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        padding={'15px 0'}
                        flexDir={'column'}
                        boxShadow={'0px 15px 25px -15px #adadad'}
                        m={{ base: '5px !important', xl: '15px !important' }}
                        cursor={'pointer'}
                        onClick={() => navigate(`/service-inner/${item._id}`)}
                      >
                        <Text
                          w="55px"
                          h="55px"
                          display={'flex'}
                          alignItems={'center'}
                          justifyContent={'center'}
                          margin={'0 0 25px 0'}
                          position={'relative'}
                          _before={{
                            content: "''",
                            position: 'absolute',
                            width: '55px',
                            height: '55px',
                            bgGradient:
                              'linear(to-r, primaryGreen.100, primaryGreen.200)',
                            top: 0,
                            left: 0,
                            right: 0,
                            margin: '0 auto',
                            transform: 'rotate(45deg)',
                            zIndex: '0',
                          }}
                        >
                          <Image
                            w="60%"
                            src={`${imgUrl}/${item.icon}`}
                            position={'relative'}
                            zIndex={1}
                          />
                        </Text>
                        <Text>{item.title}</Text>
                      </Box>
                    ))}
                  </Stack>
                </TabPanel>
                <TabPanel pt={10}>
                  <Stack
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    flexWrap={'wrap'}
                    spacing={0}
                    gap={{ base: '5spx', xl: '10px' }}
                  >
                    {serviceData?.hospitalData?.map((item, index) => (
                      <Box
                        role="group"
                        key={index}
                        w={{ base: '46%', xl: '20%' }}
                        position={'relative'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        padding={'15px 0'}
                        flexDir={'column'}
                        boxShadow={'0px 15px 25px -15px #adadad'}
                        m={{ base: '5px !important', xl: '15px !important' }}
                        cursor={'pointer'}
                        onClick={() => navigate(`/service-inner/${item._id}`)}
                      >
                        <Text
                          w="55px"
                          h="55px"
                          display={'flex'}
                          alignItems={'center'}
                          justifyContent={'center'}
                          margin={'0 0 25px 0'}
                          position={'relative'}
                          _before={{
                            content: "''",
                            position: 'absolute',
                            width: '55px',
                            height: '55px',
                            bgGradient:
                              'linear(to-r, primaryGreen.100, primaryGreen.200)',
                            top: 0,
                            left: 0,
                            right: 0,
                            margin: '0 auto',
                            transform: 'rotate(45deg)',
                            zIndex: '0',
                          }}
                        >
                          <Image
                            w="60%"
                            src={`${imgUrl}/${item.icon}`}
                            position={'relative'}
                            zIndex={1}
                          />
                        </Text>
                        <Text>{item.title}</Text>
                      </Box>
                    ))}
                  </Stack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Stack>
        </Box>
      </Container>
    </Container>
  );
};

export default AboutService;
