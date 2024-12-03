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
import meds from '../../../assets/images/website/meds.svg';

export default function AboutVision({ location }) {
  return (
    <Stack position={'relative'} pb="60px" mt={8}>
      <Container
        maxW={{ base: '1366px', xl: '6xl', '2xl': '6xl' }}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Box flex={1}>
          <Text mb="25px" color={'primaryGray.100'} fontSize={'14px'}>
            We are an electronic marketing platform working in the health field
            and providing our services to patients, health practitioners and
            hospitals around the world.
          </Text>
          <Stack
            direction={'row'}
            flexDir={{ base: 'column', xl: 'row' }}
            justifyContent={'space-between'}
            maxW={'80%'}
            mx={'auto'}
            gap="30px"
          >
            <Box
              flex={1}
              bgColor={'#EDEDED'}
              borderRadius={'12px'}
              padding={'25px 15px'}
              transition={'0.3s'}
              role="group"
              _hover={{ bgColor: 'primaryGreen.200' }}
            >
              <Heading
                color={'primaryBlack.100'}
                transition={'0.3s'}
                _groupHover={{ color: '#fff' }}
                fontWeight={'600'}
                fontSize={'20px'}
                pb="15px"
              >
                Our Vision
              </Heading>
              <Text
                color={'primaryGray.100'}
                fontWeight={'400'}
                fontSize={'14px'}
                transition={'0.3s'}
                _groupHover={{ color: '#fff' }}
                // textAlign={'center'}
              >
                To provide the largest number of services needed by patients,
                health practitioners and hospitals through one platform.
              </Text>
            </Box>
            <Box
              flex={1}
              bgColor={'#EDEDED'}
              borderRadius={'12px'}
              padding={'25px 15px'}
              transition={'0.3s'}
              role="group"
              _hover={{ bgColor: 'primaryGreen.200' }}
            >
              <Heading
                color={'primaryBlack.100'}
                transition={'0.3s'}
                _groupHover={{ color: '#fff' }}
                fontWeight={'600'}
                fontSize={'20px'}
                pb="15px"
              >
                Our Mission
              </Heading>
              <Text
                color={'primaryGray.100'}
                fontWeight={'400'}
                fontSize={'14px'}
                transition={'0.3s'}
                _groupHover={{ color: '#fff' }}
              >
                We are committed to helping patients reach their correct
                treatment destination, support health practitioners
                professionally, and support hospitals logistically.
              </Text>
            </Box>
            <Box
              flex={1}
              bgColor={'#EDEDED'}
              borderRadius={'12px'}
              padding={'25px 15px'}
              transition={'0.3s'}
              role="group"
              _hover={{ bgColor: 'primaryGreen.200' }}
            >
              <Heading
                color={'primaryBlack.100'}
                transition={'0.3s'}
                _groupHover={{ color: '#fff' }}
                fontWeight={'600'}
                fontSize={'20px'}
                pb="15px"
              >
                Our Values
              </Heading>
              <Text
                color={'primaryGray.100'}
                fontWeight={'400'}
                fontSize={'14px'}
                transition={'0.3s'}
                _groupHover={{ color: '#fff' }}
              >
                - Credibility <br /> - Commitment <br /> - Creativity
              </Text>
            </Box>
          </Stack>
        </Box>
      </Container>
      {/* {location !== 'home' && (
        <Image
          src={meds}
          position={'absolute'}
          right={{ base: '-5%', xl: '5%', '2xl': '10%' }}
          bottom={'15%'}
        />
      )} */}
    </Stack>
  );
}
