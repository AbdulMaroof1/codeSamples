import {
  Button,
  Container,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  Box,
} from '@chakra-ui/react';
import SerBg from '../../../assets/images/website/serBg.png';
import headingIcon from '../../../assets/images/website/headingIcon.svg';
import {
  FaChevronLeft,
  FaChevronRight,
  FaHeartbeat,
  FaRegCalendar,
  FaStar,
} from 'react-icons/fa';
import { BiBed } from 'react-icons/bi';
import { MdPersonalVideo, MdFlight } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useRef, useState } from 'react';
import bannerBg from '../../../assets/images/website/banner.svg';
import expert1 from '../../../assets/images/website/expert1.svg';
import expert2 from '../../../assets/images/website/expert2.svg';
import expert3 from '../../../assets/images/website/expert3.svg';
import expertHosLogo from '../../../assets/images/website/expertHospitalLogo.svg';
import { imgUrl } from '../../../utilities/config';

export default function SingleHospital({ data }) {
  console.log(data, 'single data for job opening');

  const sliderData = [
    {
      img: expert1,
      rating: '4.5',
      text: 'Bascom Palmer Anne Bates',
      designation: 'Neurologist',
      url: '/apply-career',
    },
    {
      img: expert2,
      rating: '4.5',
      text: 'California Pacific Medical Center',
      designation: 'Neurologist',
      url: '/apply-career',
    },
    {
      img: expert3,
      rating: '4.5',
      text: 'Dana-Faber Cancer',
      designation: 'Neurologist',
      url: '/apply-career',
    },
  ];

  return (
    <Container py="60px" maxW={{ base: '1366px', xl: '6xl', '2xl': '8xl' }}>
      <Container maxW={{ base: '1366px', xl: '6xl' }}>
        <Stack
          direction={'row'}
          alignItems={'center'}
          mb="40px"
          justifyContent={'space-between'}
          w="100%"
        >
          <Box display={'flex'} alignItems={'center'} gap="20px">
            <Image w="120px" h="120px" src={expertHosLogo} />
            <Box>
              <Heading fontSize={'18px'} color={'primaryBlack.100'}>
                {data?.name || 'Bascom Palmer Anne Bates'}
              </Heading>
              <Text fontSize={'16px'} color={'primaryGray.100'} mt="10px">
                {data?.desc || 'Neurologiest Required'}
              </Text>
            </Box>
          </Box>
          <Text fontSize={'14px'} color={'primaryGray.100'}>
            <Icon as={FaStar} color={'yellow.500'} /> 4.5
          </Text>
        </Stack>
        <Heading
          fontSize={{ base: '20px', xl: '24px' }}
          mb="40px"
          color={'primaryBlack.100'}
        >
          {data?.jobs?.length} Open Positions
        </Heading>
        <Stack
          direction={'row'}
          flexWrap={'wrap'}
          flexDir={{ base: 'column', xl: 'row' }}
        >
          {data?.jobs?.length > 0 ? (
            data?.jobs?.map((val, index) => {
              return (
                <Box
                  key={val.text}
                  w={{ base: '100%', xl: '31%' }}
                  px="30px"
                  mb="40px !important"
                >
                  <Image
                    w="100%"
                    src={
                      val.banner !== '' ? `${imgUrl}/${val.banner}` : expert1
                    }
                  />
                  <Stack
                    direction={'row'}
                    w="100%"
                    alignItems={'center'}
                    justifyContent={'flex-end'}
                  >
                    <Icon as={FaStar} color={'yellow.500'} /> <Text>4.5</Text>
                  </Stack>
                  <Heading
                    alignSelf={'start'}
                    fontWeight={'600'}
                    pb="5px"
                    fontSize={'18px'}
                    color={'primaryBlack.100'}
                  >
                    {val?.title}
                  </Heading>
                  <Heading
                    alignSelf={'start'}
                    fontStyle={'14px'}
                    fontSize={'16px'}
                    color={'primaryGray.100'}
                    fontWeight={'400'}
                  >
                    {val?.description}
                  </Heading>
                  <Button
                    mt="20px"
                    as={Link}
                    to={`/apply-career/${val._id}`}
                    px="40px"
                    bgGradient={'linear(to-r, #295377, #208C74)'}
                    fontSize={'14px'}
                    fontWeight={500}
                    color={'#fff'}
                    borderRadius={'25px'}
                    h="45px"
                    textTransform={'uppercase'}
                    border={'1px solid primaryGreen.200'}
                    _hover={{
                      border: '2px solid',
                      bgGradient: 'none',
                      borderColor: 'primaryGreen.200',
                      color: 'primaryGreen.200',
                    }}
                  >
                    Apply
                  </Button>
                </Box>
              );
            })
          ) : (
            <Text fontSize={'18px'} color={'primaryGray.100'}>
              No Open Positions
            </Text>
          )}
        </Stack>
      </Container>
    </Container>
  );
}
