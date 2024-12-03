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
import AbtPic from '../../../assets/images/website/abtPic.svg';
import meds from '../../../assets/images/website/meds.svg';
import headingIcon from '../../../assets/images/website/headingIcon.svg';
import { FaHeartbeat } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AboutVision from './AboutVision';

export default function About() {
  return (
    <Stack position={'relative'} py="60px">
      <Container
        maxW={{ base: '1366px', xl: '6xl', '2xl': '6xl' }}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        flexDir={{ base: 'column-reverse', xl: 'row' }}
      >
        {/* <Box flex={1}>
          <Image mt="40px" src={AbtPic} />
        </Box> */}
        <Box flex={1}>
          <Heading
            mb="15px"
            display={'flex'}
            alignItems={'center'}
            // justifyContent={{ base: 'center', xl: 'flex-start' }}
            color={'primaryGreen.200'}
            as={'h6'}
            fontWeight={'600'}
            justifyContent={'center'}
          >
            <Image src={headingIcon} />
            <Text
              ml="10px"
              fontSize={{ base: '18px', xl: '20px' }}
              textTransform={'uppercase'}
              as="span"
            >
              About Our Company
            </Text>
          </Heading>
          {/* <Heading
            textAlign={{ base: 'center', xl: 'left' }}
            fontSize={{ base: '32px', xl: '38px' }}
            fontWeight={'600'}
            color={'primaryBlack.100'}
            mb="25px"
          >
            About Our Company
          </Heading> */}
          <AboutVision location={'home'} />
          {/* <Text
            textAlign={{ base: 'center', xl: 'left' }}
            mb="25px"
            color={'primaryGray.100'}
            fontSize={{ base: '12px', xl: '14px' }}
          >
            A brief statement outlining the purpose and mission of the clinic.
            This can <br />
            include the commitment to patient care, community health, and any
            specifical
            <br />
            goals for our values.
          </Text>
          <Stack
            direction={'row'}
            flexWrap={'wrap'}
            spacing={0}
            justifyContent={{ base: 'center', xl: 'flex-start' }}
          >
            <Box
              mb="10px !important"
              w="40%"
              display={'flex'}
              alignItems={'center'}
            >
              <Icon color={'primaryGreen.200'} as={FaHeartbeat} />
              <Text
                fontSize={{ base: '14px', xl: '14px' }}
                fontWeight={'600'}
                ml="10px"
              >
                Medical Professionals
              </Text>
            </Box>
            <Box
              mb="10px !important"
              w="40%"
              display={'flex'}
              alignItems={'center'}
            >
              <Icon color={'primaryGreen.200'} as={FaHeartbeat} />
              <Text
                fontSize={{ base: '14px', xl: '14px' }}
                fontWeight={'600'}
                ml="10px"
              >
                Facilities and Equipment
              </Text>
            </Box>
            <Box
              mb="10px !important"
              w="40%"
              display={'flex'}
              alignItems={'center'}
            >
              <Icon color={'primaryGreen.200'} as={FaHeartbeat} />
              <Text
                fontSize={{ base: '14px', xl: '14px' }}
                fontWeight={'600'}
                ml="10px"
              >
                Emergency Care
              </Text>
            </Box>
            <Box
              mb="10px !important"
              w="40%"
              display={'flex'}
              alignItems={'center'}
            >
              <Icon color={'primaryGreen.200'} as={FaHeartbeat} />
              <Text
                fontSize={{ base: '14px', xl: '14px' }}
                fontWeight={'600'}
                ml="10px"
              >
                Medical Consulting
              </Text>
            </Box>
            <Box
              mb="10px !important"
              w="40%"
              display={'flex'}
              alignItems={'center'}
            >
              <Icon color={'primaryGreen.200'} as={FaHeartbeat} />
              <Text
                fontSize={{ base: '14px', xl: '14px' }}
                fontWeight={'600'}
                ml="10px"
              >
                Services Offered
              </Text>
            </Box>
            <Box
              mb="10px !important"
              w="40%"
              display={'flex'}
              alignItems={'center'}
            >
              <Icon color={'primaryGreen.200'} as={FaHeartbeat} />
              <Text
                fontSize={{ base: '14px', xl: '14px' }}
                fontWeight={'600'}
                ml="10px"
              >
                Specializations
              </Text>
            </Box>
          </Stack>
          <Stack
            direction={'row'}
            justifyContent={{ base: 'center', xl: 'flex-start' }}
          >
            <Button
              mt="30px"
              bgGradient="linear(to-r, #295377, #208C74)"
              as={Link}
              fontSize={{ base: '12px', xl: '14px' }}
              fontWeight={500}
              to={'/about-us'}
              color={'#fff'}
              borderRadius={'25px'}
              h={{ base: '35px', xl: '45px' }}
              textTransform={'uppercase'}
              border={'2px solid transparent'}
              _hover={{
                bgGradient: 'none',
                borderColor: 'primaryGreen.200',
                color: 'primaryGreen.200',
              }}
            >
              More about us
            </Button>
          </Stack> */}
        </Box>
      </Container>
      {/* <Image
        src={meds}
        position={'absolute'}
        right={{ base: '0%', xl: '5%', '2xl': '10%' }}
        bottom={'15%'}
      /> */}
    </Stack>
  );
}
