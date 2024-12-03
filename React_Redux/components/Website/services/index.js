import { Button, Container, Heading, Icon, Image, Stack, Text, Box } from '@chakra-ui/react'
import SerBg from '../../../assets/images/website/serBg.png'
import headingIcon from '../../../assets/images/website/headingIcon.svg'
import { FaChevronLeft, FaChevronRight, FaHeartbeat, FaRegCalendar } from 'react-icons/fa'
import { BiBed } from 'react-icons/bi'
import { MdPersonalVideo, MdFlight } from 'react-icons/md'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/swiper-bundle.css";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useEffect, useRef, useState } from 'react'
import bannerBg from '../../../assets/images/website/banner.svg'
import { useSelector } from 'react-redux'
import { imgUrl } from '../../../utilities/config'

export default function Services() {

    const [selectedService, setSelectedService] = useState('hospital');
    const { services } = useSelector(state => state.website.data)
    const navigate = useNavigate()
    const sliderData = [
        {
            icon: FaRegCalendar,
            text: 'Clinic Appointment'
        },
        {
            icon: MdPersonalVideo,
            text: 'Virtual Clinic'
        },
        {
            icon: BiBed,
            text: 'Bed Booking'
        },
        {
            icon: MdFlight,
            text: 'Transportation'
        },
        {
            icon: BiBed,
            text: 'Bed Booking'
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
            py="60px" bgImage={SerBg} bgSize={'cover'} bgPos={'center'} bgRepeat={'no-repeat'}
            maxW={{ base: "1366px", xl: '6xl', '2xl': "8xl" }}
        >
            <Container
                maxW={{ base: "1366px", '2xl': "6xl" }}
            >
                <Box flex={1} textAlign={'center'} mb="40px">
                    <Heading mb="15px" display={'flex'} justifyContent={'center'} alignItems={'center'} color={'primaryGreen.200'} as={'h6'} fontWeight={'600'}>
                        <Image src={headingIcon} />
                        <Text ml="10px" fontSize={{ base: '14px', xl: '16px' }} textTransform={'uppercase'} as="span">Our Services</Text>
                    </Heading>
                    <Heading display={{ base: 'none', xl: 'block' }} fontSize={{ base: '32px', xl: '38px' }} fontWeight={'600'} color={'primaryBlack.100'} mb="35px">Our Emedii Specialties <br /> Top Services</Heading>
                    <Heading display={{ base: 'block', xl: 'none' }} fontSize={{ base: '32px', xl: '38px' }} fontWeight={'600'} color={'primaryBlack.100'} mb="35px">Our Emedii Specialties Top Services</Heading>
                    <Stack
                        direction={'row'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        gap={{ base: '5px', xl: '20px' }}
                    >
                        <Button
                            bgGradient={selectedService === 'hospital' ? 'linear(to-r, #295377, #208C74)' : 'linear(to-b, #C2D4FF, #fff)'}
                            fontSize={{ base: "12px", xl: "14px" }} fontWeight={500}
                            color={selectedService === 'hospital' ? '#fff' : 'primaryBlack.100'}
                            borderRadius={"25px"}
                            h={{ base: "35px", xl: "45px" }}
                            textTransform={'uppercase'}
                            onClick={() => setSelectedService('hospital')}
                            _hover={{ bgGradient: 'linear(to-r, #295377, #208C74)', color: '#fff' }}
                        >
                            Hospitals
                        </Button>
                        <Button
                            bgGradient={selectedService === "patients" ? 'linear(to-r, #295377, #208C74)' : 'linear(to-b, #C2D4FF, #fff)'}
                            fontSize={{ base: "12px", xl: "14px" }} fontWeight={500}
                            color={selectedService === "patients" ? '#fff' : 'primaryBlack.100'}
                            borderRadius={"25px"}
                            h={{ base: "35px", xl: "45px" }}
                            textTransform={'uppercase'}
                            onClick={() => setSelectedService('patients')}
                            _hover={{ bgGradient: 'linear(to-r, #295377, #208C74)', color: '#fff' }}
                        >
                            Patients

                        </Button>
                        <Button
                            bgGradient={selectedService === "Practitioners" ? 'linear(to-r, #295377, #208C74)' : 'linear(to-b, #C2D4FF, #fff)'}
                            fontSize={{ base: "12px", xl: "14px" }} fontWeight={500}
                            color={selectedService === "Practitioners" ? '#fff' : 'primaryBlack.100'}
                            borderRadius={"25px"}
                            h={{ base: "35px", xl: "45px" }}
                            textTransform={'uppercase'}
                            onClick={() => setSelectedService('Practitioners')}
                            _hover={{ bgGradient: 'linear(to-r, #295377, #208C74)', color: '#fff' }}
                        >
                            Practitioners
                        </Button>

                    </Stack>
                </Box>
                <Swiper
                    ref={swiperRef}
                    slidesPerView={4}
                    spaceBetween={"80px"}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    loop={true}
                    breakpoints={{
                        375: {
                            slidesPerView: 2,
                            spaceBetween: 1,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 1,
                        },
                        1366: {
                            slidesPerView: 4,
                            spaceBetween: 1,
                        }
                    }}
                >
                    {
                        (services?.filter(service => service.serviceName === selectedService)?.[0]?.service || [])?.map(val =>
                            <SwiperSlide
                                style={{ textAlign: 'center' }}
                            >
                                <Box role='group'
                                    position={'relative'}
                                    display={'flex'}
                                    alignItems={'center'}
                                    justifyContent={'center'}
                                    padding={'15px 0'}
                                    flexDir={'column'}
                                    cursor={'pointer'}
                                    boxShadow={"0px 15px 25px -10px #adadad"}
                                    m={{ base: '5px', xl: '15px' }}
                                    onClick={() => navigate(`/service-inner/${val._id}`)}
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
                                            zIndex: '-1'
                                        }}
                                    >
                                        <Image w={'60%'} src={`${imgUrl}/${val.icon}`} />
                                        {/* <Icon fontSize={'26px'} color={'#fff'} as={`${imgUrl}/${val.icon}`} /> */}
                                    </Text>
                                    <Text _groupHover={{ color: 'primaryGreen.200' }} transition={'0.3s'} fontWeight={'600'} fontSize={{ base: '14px', xl: '16px' }}>{val.title}</Text>
                                </Box>
                            </SwiperSlide>
                        )
                    }
                </Swiper>
                {
                    (services?.filter(service => service.serviceName === selectedService)?.[0]?.service || []).length > 4 &&
                    <Stack
                        mt="30px"
                        direction={"row"}
                        alignItems={"center"}
                        fontSize={{ base: "16px", xl: "20px", "2xl": "24px" }}
                        color={'primaryGreen.100'}
                        justifyContent={'center'}
                    >
                        <FaChevronLeft onClick={handlePrev} cursor={"pointer"} />
                        <FaChevronRight onClick={handleNext} cursor={"pointer"} />
                    </Stack>
                }
            </Container>
        </Container>
    )
}
