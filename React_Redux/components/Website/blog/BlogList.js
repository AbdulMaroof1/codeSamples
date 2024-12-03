import {
  Container,
  Heading,
  Stack,
  Text,
  Box,
  Icon,
  Button,
  Image,
  Spinner,
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
import { useEffect, useState } from 'react';
import { GET } from '../../../utilities/ApiProvider';
import { imgUrl } from '../../../utilities/config';

export default function BlogList() {
  let [blogs, setBlogs] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GET('/web/blogs');
        console.log(response);
        if (response.status === 200) setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const typeData = [
    {
      img: blog1,
      heading: 'Healthcare Tips Navigating Business & Patient Care',
      url: '/single-blog',
    },
    {
      img: blog2,
      heading: 'Preserving Care Strategy Amidst Food Changes',
      url: '/single-blog',
    },
    {
      img: blog3,
      heading: 'Health vs. Wealth Navigate Business in Medicine',
      url: '/single-blog',
    },
    {
      img: blog1,
      heading: 'Healthcare Tips Navigating Business & Patient Care',
      url: '/single-blog',
    },
    {
      img: blog2,
      heading: 'Preserving Care Strategy Amidst Food Changes',
      url: '/single-blog',
    },
    {
      img: blog3,
      heading: 'Health vs. Wealth Navigate Business in Medicine',
      url: '/single-blog',
    },
    {
      img: blog1,
      heading: 'Healthcare Tips Navigating Business & Patient Care',
      url: '/single-blog',
    },
    {
      img: blog2,
      heading: 'Preserving Care Strategy Amidst Food Changes',
      url: '/single-blog',
    },
    {
      img: blog3,
      heading: 'Health vs. Wealth Navigate Business in Medicine',
      url: '/single-blog',
    },
  ];

  return (
    <Container
      py="60px"
      px="40px"
      maxW={{ base: '1366px', xl: '6xl', '2xl': '8xl' }}
    >
      <Container maxW={{ base: '1366px', '2xl': '6xl' }}>
        <Box flex={1} mb="40px">
          <Stack
            direction={'row'}
            alignItems={'center'}
            flexWrap={'wrap'}
            spacing={0}
            gap={'4%'}
          >
            {!blogs ? (
              <Spinner textAlign={'center'} />
            ) : blogs && blogs.length > 0 ? (
              blogs.map((val, index) => (
                <Box
                  key={index}
                  w={{ base: '100%', xl: '30%' }}
                  borderRadius={'12px'}
                  mb="30px !important"
                  boxShadow={'0px 15px 25px -15px #adadad'}
                >
                  <Image
                    src={`${imgUrl}/${val.thumbnail}`}
                    w="100%"
                    h="200px"
                  />
                  <Box p="15px">
                    <Text py="5px" fontSize={'14px'} color="primaryGray.100">
                      <Icon
                        as={FaRegCalendar}
                        color={'primaryGreen.200'}
                        mr="5px"
                      />
                      07 December 2023
                    </Text>
                    <Heading
                      fontWeight={'600'}
                      fontSize={'18px'}
                      color={'primaryBlack.100'}
                      mb="15px"
                    >
                      {val.title}
                    </Heading>
                    <Button
                      as={Link}
                      to={`/single-blog/${val._id}`}
                      bgGradient={'linear(to-r, #295377, #208C74)'}
                      fontSize={'14px'}
                      fontWeight={500}
                      color={'#fff'}
                      borderRadius={'25px'}
                      h="45px"
                      textTransform={'uppercase'}
                      border={'1px solid primaryGreen.200'}
                      _hover={{
                        bgGradient: 'none',
                        border: '2px solid',
                        // border: '2px solid primaryGreen.200',
                        borderColor: 'primaryGreen.200',
                        color: 'primaryGreen.200',
                      }}
                    >
                      Read More
                    </Button>
                  </Box>
                </Box>
              ))
            ) : (
              <Heading color={'primaryBlack.100'}>No Blog Found</Heading>
            )}
          </Stack>
        </Box>
      </Container>
    </Container>
  );
}
