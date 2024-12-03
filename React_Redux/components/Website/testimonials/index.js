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
  FaQuoteRight,
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
import test1 from '../../../assets/images/website/test1.svg';
import test2 from '../../../assets/images/website/test2.svg';
import { useSelector } from 'react-redux';
import { imgUrl } from '../../../utilities/config';

export default function Testimonials() {
  const [selectedService, setSelectedService] = useState('patients');

  const { reviews } = useSelector(state => state.website.data);

  const sliderData = [
    {
      img: test1,
      name: 'Pelican Steve',
      designation: 'Neurologist',
      content:
        'Objectively deploy open-source web-readiness impactful bandwidth. Compellingly coordinate business deliverables rather equity invested technologies. Phosfluorescently reinvent maintainable.',
    },
    {
      img: test2,
      name: 'Alexa Milton',
      designation: 'Physiotherapist',
      content:
        'Objectively deploy open-source web-readiness impactful bandwidth. Compellingly coordinate business deliverables rather equity invested technologies. Phosfluorescently reinvent maintainable.',
    },
    {
      img: test1,
      name: 'Pelican Steve',
      designation: 'Neurologist',
      content:
        'Objectively deploy open-source web-readiness impactful bandwidth. Compellingly coordinate business deliverables rather equity invested technologies. Phosfluorescently reinvent maintainable.',
    },
    {
      img: test2,
      name: 'Alexa Milton',
      designation: 'Physiotherapist',
      content:
        'Objectively deploy open-source web-readiness impactful bandwidth. Compellingly coordinate business deliverables rather equity invested technologies. Phosfluorescently reinvent maintainable.',
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
    <Container py="60px" maxW={{ base: '1366px', '2xl': '8xl' }}>
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
              mb={2}
              fontSize={{ base: '18px', xl: '20px' }}
              textTransform={'uppercase'}
              as="span"
            >
              Testimonials
            </Text>
          </Heading>
          {/* <Heading fontSize={{ base: '32px', xl: '38px' }} fontWeight={'600'} color={'primaryBlack.100'} mb="35px">What Our Customers Says?</Heading> */}
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'center'}
            gap={'20px'}
          >
            <Button
              bgGradient={
                selectedService === 'patients'
                  ? 'linear(to-r, #295377, #208C74)'
                  : 'linear(to-b, #C2D4FF, #fff)'
              }
              fontSize={{ base: '12px', xl: '14px' }}
              fontWeight={500}
              color={
                selectedService === 'patients' ? '#fff' : 'primaryBlack.100'
              }
              borderRadius={'25px'}
              h={{ base: '35px', xl: '45px' }}
              textTransform={'uppercase'}
              onClick={() => setSelectedService('patients')}
              _hover={{
                bgGradient: 'linear(to-r, #295377, #208C74)',
                color: '#fff',
              }}
            >
              Patients
            </Button>
            <Button
              bgGradient={
                selectedService === 'doctors'
                  ? 'linear(to-r, #295377, #208C74)'
                  : 'linear(to-b, #C2D4FF, #fff)'
              }
              fontSize={{ base: '12px', xl: '14px' }}
              fontWeight={500}
              color={
                selectedService === 'doctors' ? '#fff' : 'primaryBlack.100'
              }
              borderRadius={'25px'}
              h={{ base: '35px', xl: '45px' }}
              textTransform={'uppercase'}
              onClick={() => setSelectedService('doctors')}
              _hover={{
                bgGradient: 'linear(to-r, #295377, #208C74)',
                color: '#fff',
              }}
            >
              Health Practitioners
            </Button>
            <Button
              bgGradient={
                selectedService === 'hospital'
                  ? 'linear(to-r, #295377, #208C74)'
                  : 'linear(to-b, #C2D4FF, #fff)'
              }
              fontSize={{ base: '12px', xl: '14px' }}
              fontWeight={500}
              color={
                selectedService === 'hospital' ? '#fff' : 'primaryBlack.100'
              }
              borderRadius={'25px'}
              h={{ base: '35px', xl: '45px' }}
              textTransform={'uppercase'}
              onClick={() => setSelectedService('hospital')}
              _hover={{
                bgGradient: 'linear(to-r, #295377, #208C74)',
                color: '#fff',
              }}
            >
              Hospitals
            </Button>
          </Stack>
        </Box>
        <Swiper
          ref={swiperRef}
          slidesPerView={2}
          spaceBetween={'80px'}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          loop={true}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 8,
            },
            480: {
              slidesPerView: 1.2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 12,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1366: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1600: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1920: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {reviews?.[0]?.[selectedService]?.map(val => (
            <SwiperSlide key={val._id}>
              <Box px={{ base: '20px', xl: '40px' }}>
                <Stack direction={'row'} pb="15px" color={'yellow.500'}>
                  <Icon as={FaStar} />
                  <Icon as={FaStar} />
                  <Icon as={FaStar} />
                  <Icon as={FaStar} />
                  <Icon as={FaStar} />
                </Stack>
                <Text
                  color={'primaryGray.100'}
                  fontSize={{ base: '12px', md: '13px', xl: '14px' }}
                  lineHeight={{ base: '1.4', md: '1.5', xl: '1.6' }}
                  pb="25px"
                  maxWidth="100%"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  height={'100px'}
                >
                  "
                  {val?.message.length > 150
                    ? `${val.message.slice(0, 150)}...`
                    : val.message}
                  "
                </Text>
                <Stack direction={'row'} justifyContent={'space-between'}>
                  <Stack direction={'row'} gap="15px" alignItems={'center'}>
                    <Image src={`${imgUrl}/${val.profile}`} />
                    <Box>
                      <Heading
                        pb="5px"
                        color={'primaryBlack.100'}
                        fontWeight={'600'}
                        fontSize={{ base: '1px', xl: '18px' }}
                      >
                        {val.customer}
                      </Heading>
                      <Heading
                        color={'primaryGray.100'}
                        fontWeight={'400'}
                        fontSize={{ base: '12px', xl: '14px' }}
                      >
                        {val.occupation}
                      </Heading>
                    </Box>
                  </Stack>
                </Stack>
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
