import { Container, Stack, Box } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import bannerBg from '../../../assets/images/website/banner.svg';
import { useRef } from 'react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useSelector } from 'react-redux';
import { baseURL } from '../../../utilities/ApiProvider';
import { imgUrl } from '../../../utilities/config';

export default function Banner() {
  const { seo } = useSelector(state => state.website.data);

  // 1st Swiper
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
    <Stack>
      <Container maxW={{ base: '1366px', xl: '6xl', '2xl': '1440px' }}>
        <Swiper
          ref={swiperRef}
          slidesPerView={1}
          spaceBetween={'20px'}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          loop={true}
          breakpoints={{
            375: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            1366: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
          }}
        >
          {seo?.banners && seo?.banners.length > 0 ? (
            seo?.banners.map(item => (
              <SwiperSlide className="desktopView" key={item?._id}>
                <Box
                  bg={'#28551A'}
                  bgImage={`${imgUrl}/${item?.url}`}
                  bgPosition={'center'}
                  bgRepeat={'no-repeat'}
                  bgSize={'cover'}
                  height={{
                    base: '190px',
                    sm: '280px',
                    md: '420px',
                    xl: '490px',
                    '2xl': '590px',
                  }}
                ></Box>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide className="desktopView">
              <Box
                bg={'#28551A'}
                bgImage={bannerBg}
                bgPosition={'center'}
                bgRepeat={'no-repeat'}
                bgSize={'cover'}
                height={{ base: '240px', xl: '280px', '2xl': '590px' }}
              ></Box>
            </SwiperSlide>
          )}
        </Swiper>
      </Container>
    </Stack>
  );
}
