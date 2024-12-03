import {
  Button,
  Container,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  Box,
  Spinner,
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
import { useEffect, useRef, useState } from 'react';
import bannerBg from '../../../assets/images/website/banner.svg';
import expert1 from '../../../assets/images/website/expert1.svg';
import expert2 from '../../../assets/images/website/expert2.svg';
import expert3 from '../../../assets/images/website/expert3.svg';
import { GET } from '../../../utilities/ApiProvider';
import { imgUrl } from '../../../utilities/config';

export default function CareerList() {
  const sliderData = [
    {
      img: expert1,
      rating: '4.5',
      text: 'Bascom Palmer Anne Bates',
      designation: 'Neurologist',
      url: '/single-career',
    },
    {
      img: expert2,
      rating: '4.5',
      text: 'California Pacific Medical Center',
      designation: 'Neurologist',
      url: '/single-career',
    },
    {
      img: expert3,
      rating: '4.5',
      text: 'Dana-Faber Cancer',
      designation: 'Neurologist',
      url: '/single-career',
    },
    {
      img: expert2,
      rating: '4.5',
      text: 'California Pacific Medical Center',
      designation: 'Neurologist',
      url: '/single-career',
    },
    {
      img: expert1,
      rating: '4.5',
      text: 'Bascom Palmer Anne Bates',
      designation: 'Neurologist',
      url: '/single-career',
    },
    {
      img: expert1,
      rating: '4.5',
      text: 'Bascom Palmer Anne Bates',
      designation: 'Neurologist',
      url: '/single-career',
    },
    {
      img: expert2,
      rating: '4.5',
      text: 'California Pacific Medical Center',
      designation: 'Neurologist',
      url: '/single-career',
    },
    {
      img: expert3,
      rating: '4.5',
      text: 'Dana-Faber Cancer',
      designation: 'Neurologist',
      url: '/single-career',
    },
    {
      img: expert2,
      rating: '4.5',
      text: 'California Pacific Medical Center',
      designation: 'Neurologist',
      url: '/single-career',
    },
    {
      img: expert1,
      rating: '4.5',
      text: 'Bascom Palmer Anne Bates',
      designation: 'Neurologist',
      url: '/single-career',
    },
    {
      img: expert2,
      rating: '4.5',
      text: 'California Pacific Medical Center',
      designation: 'Neurologist',
      url: '/single-career',
    },
    {
      img: expert3,
      rating: '4.5',
      text: 'Dana-Faber Cancer',
      designation: 'Neurologist',
      url: '/single-career',
    },
    {
      img: expert2,
      rating: '4.5',
      text: 'California Pacific Medical Center',
      designation: 'Neurologist',
      url: '/single-career',
    },
    {
      img: expert1,
      rating: '4.5',
      text: 'Bascom Palmer Anne Bates',
      designation: 'Neurologist',
      url: '/single-career',
    },
    {
      img: expert2,
      rating: '4.5',
      text: 'California Pacific Medical Center',
      designation: 'Neurologist',
      url: '/single-career',
    },
    {
      img: expert3,
      rating: '4.5',
      text: 'Dana-Faber Cancer',
      designation: 'Neurologist',
      url: '/single-career',
    },
    {
      img: expert2,
      rating: '4.5',
      text: 'California Pacific Medical Center',
      designation: 'Neurologist',
      url: '/single-career',
    },
  ];
  let [hospitals, setHospitals] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GET('/web/hospitals');
        console.log(response);
        if (response.status === 200) setHospitals(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container py="60px" maxW={{ base: '1366px', xl: '6xl', '2xl': '8xl' }}>
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
            List Of Hospitals
          </Heading> */}
        </Box>
        <Stack direction={'row'} flexWrap={'wrap'} justifyContent={'center'}>
          {!hospitals ? (
            <Spinner />
          ) : hospitals && hospitals.length > 0 ? (
            hospitals.map((val, index) => (
              <Box
                w="332px"
                key={index}
                px="30px"
                mb="40px !important"
                alignItems={'center'}
              >
                <Image
                  w="100%"
                  height={'150px'}
                  src={`${imgUrl}/${val.banner}`}
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
                  fontSize={'18px'}
                  color={'primaryBlack.100'}
                >
                  {val.name}
                </Heading>
                <Heading
                  alignSelf={'start'}
                  fontStyle={'14px'}
                  fontSize={'16px'}
                  color={'primaryGray.100'}
                  h={'40px'}
                  fontWeight={'400'}
                >
                  {val.about.length > 70
                    ? val.about.slice(0, 70) + '....'
                    : val.about}
                </Heading>
                <Button
                  mt="20px"
                  as={Link}
                  to={`/single-career/${val._id}`}
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
                  View Jobs
                </Button>
              </Box>
            ))
          ) : (
            <h1>No Data Found</h1>
          )}
        </Stack>
      </Container>
    </Container>
  );
}
