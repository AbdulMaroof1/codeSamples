import {
  Button,
  Container,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  Box,
  GridItem,
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
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useRef, useState } from 'react';
import bannerBg from '../../../assets/images/website/banner.svg';
import expert1 from '../../../assets/images/website/expert1.svg';
import expert2 from '../../../assets/images/website/expert2.svg';
import expert3 from '../../../assets/images/website/expert3.svg';
import { useSelector } from 'react-redux';
import { imgUrl } from '../../../utilities/config';

export default function Expert() {
  const { topRatedHospital } = useSelector(state => state.website.data);

  const sliderData = [
    {
      banner: expert1,
      rating: '4.5',
      name: 'Bascom Palmer Anne Bates',
      about: 'Neurologist',
    },
    {
      banner: expert2,
      rating: '4.5',
      name: 'California Pacific Medical Center',
      about: 'Neurologist',
    },
    {
      banner: expert3,
      rating: '4.5',
      name: 'Dana-Faber Cancer',
      about: 'Neurologist',
    },
    {
      banner: expert2,
      rating: '4.5',
      name: 'California Pacific Medical Center',
      about: 'Neurologist',
    },
  ];
  const swiperRef = useRef(null);
  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };
  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };
  return (
    <Container
      py="60px"
      bgImage={SerBg}
      bgSize={'cover'}
      bgPos={'center'}
      bgRepeat={'no-repeat'}
      maxW={{ base: '1366px', xl: '6xl', '2xl': '8xl' }}
    >
      <Container maxW={{ base: '1366px', xl: '6xl' }}>
        <Box flex={1} textAlign={'center'} mb="40px">
          <Heading
            mb="15px"
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
              Expert Hospitals
            </Text>
          </Heading>
          {/* <Heading
            fontSize={{ base: '32px', xl: '38px' }}
            fontWeight={'600'}
            color={'primaryBlack.100'}
            mb="35px"
          >
            Top Rated Hospitals
          </Heading> */}
        </Box>
        <Swiper
          ref={swiperRef}
          slidesPerView={3}
          spaceBetween={'80px'}
          loop={true}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            375: {
              slidesPerView: 1.5,
              spaceBetween: 15,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2.5,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
            1366: {
              slidesPerView: 3,
              spaceBetween: 60,
            },
          }}
        >
          {(topRatedHospital && topRatedHospital.length > 0
            ? topRatedHospital
            : sliderData
          )?.map(val => (
            <SwiperSlide key={val?._id}>
              <Box
                px={{ base: '5px', xl: '30px' }}
                display={'flex'}
                flexDir={'column'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Image
                  w="100%"
                  h="150px"
                  src={
                    topRatedHospital && topRatedHospital.length > 0
                      ? `${imgUrl}/${val.banner}`
                      : val.banner
                  }
                  // src={val.banner  || `${baseURL}/${val.banner}`}
                />
                <Stack
                  direction={'row'}
                  w="100%"
                  alignItems={'center'}
                  justifyContent={'flex-end'}
                >
                  <Icon as={FaStar} color={'yellow.500'} />{' '}
                  <Text>{val.rating}</Text>
                </Stack>
                <Heading
                  alignSelf={'start'}
                  fontWeight={'600'}
                  pb="5px"
                  fontSize={{ base: '16px', xl: '18px' }}
                  color={'primaryBlack.100'}
                >
                  {val.name}
                </Heading>
                <Heading
                  alignSelf={'start'}
                  fontStyle={'14px'}
                  fontSize={{ base: '14px', xl: '16px' }}
                  color={'primaryGray.100'}
                  fontWeight={'400'}
                >
                  {val.about.length > 124
                    ? val.about.slice(0, 124) + '....'
                    : val.about}
                </Heading>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
        <Stack
          mt="30px"
          direction={'row'}
          alignItems={'center'}
          fontSize={{ base: '16px', xl: '20px', '2xl': '24px' }}
          color={'primaryGreen.100'}
          justifyContent={'center'}
        >
          <FaChevronLeft onClick={handlePrev} cursor={'pointer'} />
          <FaChevronRight onClick={handleNext} cursor={'pointer'} />
        </Stack>
      </Container>
    </Container>
  );
}
