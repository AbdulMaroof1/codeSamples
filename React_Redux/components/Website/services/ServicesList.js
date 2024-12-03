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
} from 'react-icons/fa';
import { BiBed } from 'react-icons/bi';
import { MdPersonalVideo, MdFlight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react';
import bannerBg from '../../../assets/images/website/banner.svg';
import { GET } from '../../../utilities/ApiProvider';
import { useNavigate, useLocation } from 'react-router-dom';
import { imgUrl } from '../../../utilities/config';
import MiniBanner from '../banner/MiniBanner';
import Testimonials from '../testimonials';

export default function ServicesList() {
  const navigate = useNavigate();
  const location = useLocation();
  let [service, setService] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await GET('/web/services');
        console.log(response);
        console.log(location.pathname);
        if (response.status === 200) {
          if (location.pathname === '/services/patient') {
            response?.data.map(val => {
              if (val.serviceName === 'patients') {
                setService(val);
              }
            });
          } else if (location.pathname === '/services/practitioner') {
            response?.data.map(val => {
              if (val.serviceName === 'Practitioners') {
                setService(val);
              }
            });
          } else {
            response?.data.map(val => {
              if (val.serviceName === 'hospital') {
                setService(val);
              }
            });
          }
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);

        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [location]);

  const sliderDataHospital = [
    {
      icon: FaRegCalendar,
      text: 'Clinic Appointment',
      url: '/service-inner',
    },
    {
      icon: MdPersonalVideo,
      text: 'Virtual Clinic',
      url: '/service-inner',
    },
    {
      icon: BiBed,
      text: 'Bed Booking',
      url: '/service-inner',
    },
    {
      icon: MdFlight,
      text: 'Transportation',
      url: '/service-inner',
    },
    {
      icon: BiBed,
      text: 'Bed Booking',
      url: '/service-inner',
    },
    {
      icon: FaRegCalendar,
      text: 'Clinic Appointment',
      url: '/service-inner',
    },
    {
      icon: MdPersonalVideo,
      text: 'Virtual Clinic',
      url: '/service-inner',
    },
  ];
  const sliderDataHealth = [
    {
      icon: FaRegCalendar,
      text: 'Clinic Appointment',
      url: '/service-inner',
    },
    {
      icon: MdPersonalVideo,
      text: 'Virtual Clinic',
      url: '/service-inner',
    },
    {
      icon: BiBed,
      text: 'Bed Booking',
      url: '/service-inner',
    },
    {
      icon: MdFlight,
      text: 'Transportation',
      url: '/service-inner',
    },
  ];
  const sliderDataPatients = [
    {
      icon: FaRegCalendar,
      text: 'Clinic Appointment',
      url: '/service-inner',
    },
    {
      icon: MdPersonalVideo,
      text: 'Virtual Clinic',
      url: '/service-inner',
    },
    {
      icon: BiBed,
      text: 'Bed Booking',
      url: '/service-inner',
    },
    {
      icon: MdFlight,
      text: 'Transportation',
      url: '/service-inner',
    },
    {
      icon: BiBed,
      text: 'Bed Booking',
    },
  ];

  if (loading)
    return (
      <Stack h={'50vh'} w={'100%'} align={'center'} justify={'center'}>
        <Spinner color={'primaryGreen'} />
      </Stack>
    );

  return (
    <Container py="60px" maxW={{ base: '1366px', xl: '6xl', '2xl': '8xl' }}>
      <MiniBanner
        page="services"
        mainHeading={`${
          service?.serviceName === 'Practitioners'
            ? 'Health Practitioners Service'
            : service?.serviceName === 'hospital'
            ? `${service?.serviceName}s Service`
            : `${service?.serviceName} Service`
        }`}
        content={
          service?.serviceName === 'patients'
            ? `Our services at eMedst.com target patients, hospitals and health practitioners around the world. This
requires the presence of our partners from various countries of the world who provide part of our services,
such as marketing, employment, publishing, travel, housing, and translation services. We are happy for you
to participate with us in providing our services wherever you are, whether you are individuals or institutions.`
            : service?.serviceName === 'Practitioners'
            ? `If you are a health practitioner, whether you are a doctor, pharmacist, nurse, specialist, or paramedic, and
you are looking for a job, seeking admission to a medical education and training program or looking for a
publishing house that provides you with digital medical books, medical journals, articles and medical
research you need at a competitive price and within a short period of time, or if you wish to inform patients
and hospitals of where you will provide your current service, you can join eMedst.com for free and obtain
these desired services.`
            : service?.serviceName === 'hospital'
            ? `If you are a hospital and wish to market your medical treatment services around the world for free, or you
are looking for someone to provide you with your medical workforce needs from different countries of the
world, or you are looking to contract with a publishing house to provide you with the digital medical
information sources you desire, or to provide you with medical education and training opportunities that
your employees need, or to advertise your services electronically, join us at eMedst.com for free and get
the services you wish to have.`
            : ''
        }
      />
      <Container maxW={{ base: '1366px', xl: '6xl' }}>
        {/* <Heading
          fontSize={{ base: '32px', xl: '38px' }}
          fontWeight={'600'}
          color={'primaryBlack.100'}
          mb="35px"
          mt="40px"
          textTransform={'capitalize'}
        >
          Services
        
        </Heading> */}
        <>
          <Stack
            direction={'row'}
            alignItems={'center'}
            flexWrap={'wrap'}
            spacing={0}
            justifyContent={{ base: 'space-between', xl: 'flex-start' }}
            gap={{ base: '5spx', xl: '20px' }}
            mt={'40px'}
          >
            {service?.service?.map((item, ind) => (
              <Box
                role="group"
                key={ind}
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
                  {/* <Icon fontSize={'26px'} color={'#fff'} as={val.icon} position={'relative'} zIndex={1} /> */}
                </Text>
                <Text
                  _groupHover={{ color: 'primaryGreen.200' }}
                  transition={'0.3s'}
                  fontWeight={'600'}
                  fontSize={{ base: '12px', lg: '16px' }}
                  textAlign={'center'}
                >
                  {item.title}
                </Text>
              </Box>
            ))}
          </Stack>
          <Testimonials />
        </>

        {/* 
                <Heading fontSize={{ base: '32px', xl: '38px' }} fontWeight={'600'} color={'primaryBlack.100'} mb="35px" mt="40px">Patients</Heading>
                <Stack
                    direction={'row'}
                    alignItems={'center'}
                    flexWrap={'wrap'}
                    spacing={0}
                    justifyContent={{ base: 'space-between', xl: 'flex-start' }}
                    gap={{ base: '5spx', xl: '20px' }}
                >
                    {
                        sliderDataPatients.map((val, ind) =>
                            <Box role='group'
                                key={ind}
                                w={{ base: "46%", xl: "20%" }}
                                position={'relative'}
                                display={'flex'}
                                alignItems={'center'}
                                justifyContent={'center'}
                                padding={'15px 0'}
                                flexDir={'column'}
                                boxShadow={"0px 15px 25px -15px #adadad"}
                                m={{ base: '5px !important', xl: '15px !important' }}
                                cursor={'pointer'}
                                onClick={() => navigate(val.url)}
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
                                        bgGradient: 'linear(to-r, primaryGreen.100, primaryGreen.200)',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        margin: '0 auto',
                                        transform: 'rotate(45deg)',
                                        zIndex: '0'
                                    }}
                                >
                                    <Icon fontSize={'26px'} color={'#fff'} as={val.icon} position={'relative'} zIndex={1} />
                                </Text>
                                <Text _groupHover={{ color: 'primaryGreen.200' }} transition={'0.3s'} fontWeight={'600'} fontSize={'16px'}>{val.text}</Text>
                            </Box>
                        )
                    }
                </Stack> */}
      </Container>
    </Container>
  );
}
