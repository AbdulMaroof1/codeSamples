import { Container, Stack, Box, Heading, Image, Text } from '@chakra-ui/react';
import bannerBg from '../../../assets/images/website/miniBan.svg';
import headingIcon from '../../../assets/images/website/headingIcon.svg';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

export default function MiniBanner({
  page,
  subHeading,
  mainHeading,
  content,
  name,
}) {
  const navigate = useNavigate();
  return (
    <Stack>
      <Container maxW={{ base: '1366px', xl: '6xl', '2xl': '8xl' }}>
        <Box
          bg={'#28551A'}
          bgImage={bannerBg}
          bgPosition={'center'}
          bgRepeat={'no-repeat'}
          bgSize={'cover'}
          height={{ base: '140px', xl: '280px', '2xl': '320px' }}
          display={'flex'}
          alignItems={'center'}
        >
          <Container maxW={{ base: '1366px', '2xl': '6xl' }}>
            <Heading
              mb="5px"
              display={'flex'}
              alignItems={'center'}
              color={'primaryGreen.200'}
              as={'h6'}
              fontWeight={'600'}
              cursor={'pointer'}
              onClick={() => navigate(-1)}
            >
              <IoArrowBack />
              {/* {name === 'service_inner' && <IoArrowBack />} */}
              <Text
                ml="5px"
                fontSize={{ base: '18px', xl: '20px' }}
                textTransform={'uppercase'}
                as="span"
              >
                Back
              </Text>
            </Heading>
            <Heading
              mb="5px"
              display={'flex'}
              alignItems={'center'}
              color={'primaryGreen.200'}
              as={'h6'}
              fontWeight={'600'}
            >
              {subHeading && <Image src={headingIcon} />}
              <Text
                ml="10px"
                fontSize={{ base: '14px', xl: '16px' }}
                textTransform={'uppercase'}
                as="span"
              >
                {subHeading}
              </Text>
            </Heading>
            <Heading
              fontSize={{ base: '26px', xl: '52px' }}
              fontWeight={'700'}
              color={'primaryBlack.100'}
              mb="5px"
              textTransform={'capitalize'}
            >
              {mainHeading}
            </Heading>
            {page === 'services' ? (
              <Text
                display={{ base: 'none', xl: 'block' }}
                color={'primaryGray.100'}
                fontSize={'14px'}
                maxW={'1000px'}
                mt={'10px !important'}
              >
                {/* {content} */}
              </Text>
            ) : (
              <Text
                display={{ base: 'none', xl: 'block' }}
                color={'primaryGray.100'}
                fontSize={'14px'}
                maxW={'500px'}
              >
                {/* {content} */}
              </Text>
            )}
          </Container>
        </Box>
      </Container>
    </Stack>
  );
}
