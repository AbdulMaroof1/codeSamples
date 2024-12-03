import { Button, Container, Heading, Icon, Image, Stack, Text, Box } from '@chakra-ui/react'
import SerBg from '../../../assets/images/website/serBg.png'
import headingIcon from '../../../assets/images/website/headingIcon.svg'
import { FaChevronLeft, FaChevronRight, FaHeartbeat, FaRegCalendar, FaStar } from 'react-icons/fa'
import { BiBed } from 'react-icons/bi'
import { MdPersonalVideo, MdFlight } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/swiper-bundle.css";
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useRef, useState } from 'react'
import bannerBg from '../../../assets/images/website/banner.svg'
import work1 from '../../../assets/images/website/work1.svg'
import work2 from '../../../assets/images/website/work2.svg'
import work3 from '../../../assets/images/website/work3.svg'
import work4 from '../../../assets/images/website/work4.svg'

export default function Work() {

    const sliderData = [
        {
            _id:1,
            img: work1,
            heading: 'Patient Registration',
            text: 'The first step in our process is to welcome our patients and ensure they have a experience.'
        },
        {
            _id:2,
            img: work2,
            heading: 'Check-Ups',
            text: 'Once the patient is checked in, healthcare professional conduct a thorough evaluation.'
        },
        {
            _id:3,
            img: work3,
            heading: 'Get Report',
            text: 'Analyzing the result of diagnostic tests & incorporating them into the diagnosis.'
        },
        {
            _id:4,
            img: work4,
            heading: 'Ongoing Care',
            text: 'Our commitment to our patient extend beyond the initial visit. we ensure continuity of care.'
        },
    ];

    return (
        <Container
            py="60px"
            maxW={{ base: "1366px", '2xl': "8xl" }}
        >
            <Container
                maxW={{ base: "1366px", 'xl': "6xl" }}
            >
                <Box flex={1} textAlign={'center'} mb="40px">
                    <Heading mb="15px" display={'flex'} justifyContent={'center'} alignItems={'center'} color={'primaryGreen.200'} as={'h6'} fontWeight={'600'}>
                        <Image src={headingIcon} />
                        <Text ml="10px" fontSize={{ base: '14px', xl: '16px' }} textTransform={'uppercase'} as="span">Work Process</Text>
                    </Heading>
                    <Heading fontSize={{ base: '32px', xl: '38px' }} fontWeight={'600'} color={'primaryBlack.100'} mb="35px">Let’s See How We Work Process</Heading>
                </Box>
                <Stack direction={'row'} spacing={0} justifyContent={'space-between'} alignItems={'flex-start'} flexDir={{ base: 'column', md: 'row' }}>
                    {
                        sliderData.map((val, ind) =>
                            <Box
                                flex={1}
                                key={val._id}
                                _before={{
                                    content: `'0${++ind}'`,
                                    position: 'absolute',
                                    top: '10px',
                                    right: { base: '50px', md: '20px', xl: '70px' },
                                    borderRadius: '100%',
                                    w: '40px',
                                    h: '40px',
                                    color: '#fff',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: "center",
                                    justifyContent: 'center',
                                    bgColor: 'primaryGreen.200'
                                }}
                                position={'relative'} textAlign={'center'} px="10px" display={'flex'} flexDir={'column'} alignItems={'center'} justifyContent={'center'}>
                                <Image border={'2px solid'} borderColor={'primaryGreen.200'} w="135px" h="135px" borderRadius={"100%"} objectFit={'cover'} src={val.img} />
                                <Heading fontWeight={'600'} py="10px" fontSize={{ base: "16px", xl: "18px" }} color={'primaryBlack.100'}>{val.heading}</Heading>
                                <Heading mb="20px" fontStyle={'14px'} fontSize={{ base: "14px", xl: "16px" }} color={'primaryGray.100'} fontWeight={'400'}>{val.text}</Heading>
                            </Box>
                        )
                    }
                </Stack>
            </Container>
        </Container>
    )
}
