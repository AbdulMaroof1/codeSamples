import {
  Container,
  Heading,
  Stack,
  Text,
  Box,
  Icon,
  Button,
} from '@chakra-ui/react';
import SerBg from '../../../assets/images/website/serBg.png';
import { RiHospitalLine } from 'react-icons/ri';
import { BiBed } from 'react-icons/bi';
import { GiHealthPotion } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { imgUrl } from '../../../utilities/config';

export default function AccTypeSec() {
  const { accountTypes } = useSelector(state => state.website.data);
console.log(accountTypes)
  const typeData = [
    {
      icon: RiHospitalLine,
      heading: 'Hospital Authenticator',
      text: 'Lorem ipsum dolor sit, adipiscing',
    },
    {
      icon: BiBed,
      heading: 'Patients',
      text: 'Lorem ipsum dolor sit, adipiscing',
    },
  ];
  const icons=[RiHospitalLine,BiBed,RiHospitalLine]

  return (
    <Container py="60px" maxW={{ base: '1366px', '2xl': '8xl' }}>
      <Container maxW={{ base: '1366px', '2xl': '6xl' }}>
        <Box flex={1} textAlign={'center'} mb="40px">
          <Heading
            fontSize={{ base: '32px', xl: '38px' }}
            fontWeight={'600'}
            color={'primaryBlack.100'}
            mb="15px"
          >
            Choose Your Account Type
          </Heading>
          <Text
            mb="45px"
            color={'primaryGray.100'}
            fontSize={{ base: '12px', xl: '14px' }}
          >
            Which type of account you would like to create
          </Text>
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'center'}
            gap={'20px'}
            spacing={0}
            flexWrap={{ base: 'wrap', xl: 'no-wrap' }}
          >
            {accountTypes?.length > 0 &&
              accountTypes?.map((val,ind) => (
                <Box
                  key={val?._id}
                  border={'2px solid #75767A'}
                  p={{ base: '15px 20px', xl: '25px 40px' }}
                  borderRadius={'12px'}
                  display={'flex'}
                  w="225px"
                  flexDir={'column'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  role="group"
                  transition={'0.3s'}
                  _hover={{
                    borderColor: 'primaryGreen.200',
                  }}
                >
                  <Box
                    w={{ base: '70px', xl: '100px' }}
                    h={{ base: '60px', xl: '90px' }}
                    bgColor={'#E2E2E2'}
                    display={'flex'}
                    alignItems={'center'}
                    transition={'0.3s'}
                    borderRadius={'12px'}
                    mb="25px"
                    justifyContent={'center'}
                    _groupHover={{
                      bgColor: 'primaryGreen.200',
                    }}
                  >
                    <Icon
                      _groupHover={{
                        color: '#fff',
                      }}
                      transition={'0.3s'}
                      fontSize={{ base: '26px', xl: '52px' }}
                    //   as={`${imgUrl}/${val.icon}`}
                    as={icons[ind]}
                    />
                  </Box>
                  <Heading
                    fontWeight={'600'}
                    fontSize={'16px'}
                    textTransform={'capitalize'}
                    mb="5px"
                  >
                    {val?.name}
                  </Heading>
                  <Text
                    fontSize={{ base: '12px', xl: '14px' }}
                    color={'primaryGray.100'}
                    mb="15px"
                  >
                    {val?.sudoName}
                  </Text>
                  <Button
                    as={Link}
                    to="/"
                    bgGradient={'linear(to-r, #295377, #208C74)'}
                    fontSize={{ base: '12px', xl: '14px' }}
                    fontWeight={500}
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
                    Continue
                  </Button>
                </Box>
              ))}
          </Stack>
        </Box>
      </Container>
    </Container>
  );
}
