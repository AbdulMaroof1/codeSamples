import {
  Container,
  Heading,
  Stack,
  Text,
  Box,
  Icon,
  Button,
  Image,
} from '@chakra-ui/react';
import SerBg from '../../../assets/images/website/serBg.png';
import { RiHospitalLine } from 'react-icons/ri';
import { BiBed } from 'react-icons/bi';
import { GiHealthPotion } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import headingIcon from '../../../assets/images/website/headingIcon.svg';
import blog1 from '../../../assets/images/website/blog1.svg';
import blog2 from '../../../assets/images/website/blog2.svg';
import blog3 from '../../../assets/images/website/blog3.svg';
import { FaCalendar, FaCalendarAlt, FaRegCalendar } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { imgUrl } from '../../../utilities/config';
import moment from 'moment';

export default function Blog() {
  const navigate = useNavigate();
  const { latestBlogs } = useSelector(state => state.website.data);

  const typeData = [
    {
      thumbnail: blog1,
      title: 'Healthcare Tips Navigating Business & Patient Care',
    },
    {
      thumbnail: blog2,
      title: 'Preserving Care Strategy Amidst Food Changes',
    },
    {
      thumbnail: blog3,
      title: 'Health vs. Wealth Navigate Business in Medicine',
    },
  ];

  return (
    <Container
      py="60px"
      px={{ base: '20px', xl: '40px' }}
      bgImage={SerBg}
      bgSize={'cover'}
      bgPos={'center'}
      bgRepeat={'no-repeat'}
      maxW={{ base: '1366px', xl: '6xl', '2xl': '8xl' }}
    >
      <Container maxW={{ base: '1366px', '2xl': '6xl' }}>
        <Box flex={1} mb="40px">
          <Stack
            direction={{ base: 'column', xl: 'row' }}
            mb="35px"
            alignItems={{ base: 'center', xl: 'flex-end' }}
            justifyContent={{ base: 'center', xl: 'space-between' }}
          >
            <Box>
              <Heading
                justifyContent={{ base: 'center', xl: 'flex-start' }}
                mb="15px"
                display={'flex'}
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
                  Our Blogs
                </Text>
              </Heading>
              {/* <Heading
                textAlign={{ base: 'center', xl: 'left' }}
                fontSize={{ base: '32px', xl: '38px' }}
                fontWeight={'600'}
                color={'primaryBlack.100'}
                mb={{ base: '30px', xl: '0px' }}
              >
                Our Latest Blogs
              </Heading> */}
            </Box>
            <Button
              as={Link}
              to="/blogs"
              bgGradient={'linear(to-r, #295377, #208C74)'}
              fontSize={{ base: '12px', xl: '14px' }}
              fontWeight={500}
              color={'#fff'}
              borderRadius={'25px'}
              h={{ base: '35px', xl: '45px' }}
              textTransform={'uppercase'}
              border={'1px solid primaryGreen.200'}
              _hover={{
                bgGradient: 'none',
                border: '2px solid',
                borderColor: 'primaryGreen.200',
                color: 'primaryGreen.200',
              }}
            >
              View All Post
            </Button>
          </Stack>
          <Stack
            direction={'row'}
            alignItems={'center'}
            // justifyContent={'space-between'}
            gap={'20px'}
            flexDir={{ base: 'column', md: 'row' }}
          >
            {(latestBlogs && latestBlogs.length > 0
              ? latestBlogs.slice(-3)
              : typeData
            )?.map(val => (
              <Box
                borderRadius={'12px'}
                boxShadow={'0px 15px 25px -10px #adadad'}
                w={{ base: '100%', lg: '31%' }}
              >
                <Image
                  // src={val.thumbnail || `${baseURL}/${val.thumbnail}`}
                  src={
                    latestBlogs && latestBlogs.length > 0
                      ? `${imgUrl}/${val.thumbnail}`
                      : val.thumbnail
                  }
                  w="100%"
                  h="200px"
                />
                <Box p="15px">
                  <Text
                    py="5px"
                    fontSize={{ base: '12px', xl: '14px' }}
                    color="primaryGray.100"
                  >
                    <Icon
                      as={FaRegCalendar}
                      color={'primaryGreen.200'}
                      mr="5px"
                    />
                    {moment(val.createdAt).format('D MMMM YYYY') ||
                      '07 December 2023'}
                  </Text>
                  <Heading
                    fontWeight={'600'}
                    fontSize={{ base: '18px', xl: '18px' }}
                    color={'primaryBlack.100'}
                    mb="15px"
                  >
                    {val.title}
                  </Heading>
                  <Button
                    as={Link}
                    to={`/single-blog/${val._id}`}
                    bgGradient={'linear(to-r, #295377, #208C74)'}
                    fontSize={{ base: '12px', xl: '14px' }}
                    fontWeight={500}
                    color={'#fff'}
                    borderRadius={'25px'}
                    h={{ base: '35px', xl: '45px' }}
                    textTransform={'uppercase'}
                    border={'1px solid primaryGreen.200'}
                    _hover={{
                      bgGradient: 'none',
                      border: '2px solid',
                      borderColor: 'primaryGreen.200',
                      color: 'primaryGreen.200',
                    }}
                  >
                    Read More
                  </Button>
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
      </Container>
    </Container>
  );
}
