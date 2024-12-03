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
import headingIcon from '../../../assets/images/website/headingIcon.svg';
import docMachine from '../../../assets/images/website/docMachine.svg';
import blog1 from '../../../assets/images/website/blog1.svg';
import blog2 from '../../../assets/images/website/blog2.svg';
import blog3 from '../../../assets/images/website/blog3.svg';
import { FaRegCalendar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GET } from '../../../utilities/ApiProvider';
import { imgUrl } from '../../../utilities/config';
import { useSelector } from 'react-redux';
import moment from 'moment';

export default function SingleBlogData({ id }) {
  let [blog, setBlog] = useState([]);
  const { latestBlogs } = useSelector(state => state.website.data);
  console.log(latestBlogs);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await GET(`/web/blog/${id}`);
        console.log(response);
        if (response.status === 200) setBlog(response.data);
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
    },
    {
      img: blog2,
      heading: 'Preserving Care Strategy Amidst Food Changes',
    },
    {
      img: blog3,
      heading: 'Health vs. Wealth Navigate Business in Medicine',
    },
  ];

  return (
    <Container py="60px" maxW={{ base: '1366px', xl: '6xl', '2xl': '8xl' }}>
      <Container maxW={{ base: '1366px', xl: '6xl' }}>
        {blog && (
          <>
            <Image src={`${imgUrl}/${blog?.cover}`} w="100%" h="300px" />
            <Box flex={1} my="40px">
              {/* <Heading
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
                  fontSize={'16px'}
                  textTransform={'uppercase'}
                  as="span"
                >
                  24/7 Emergency Service
                </Text>
              </Heading> */}
              <Heading
                textAlign={{ base: 'center', xl: 'left' }}
                fontSize={'38px'}
                fontWeight={'600'}
                color={'primaryBlack.100'}
                mb="35px"
              >
                {blog?.title}
              </Heading>
              <Text
                textAlign={{ base: 'center', xl: 'left' }}
                mb="25px"
                color={'primaryGray.100'}
                fontSize={'14px'}
                dangerouslySetInnerHTML={{ __html: blog.description }}
              >
                {/* {blog?.description} */}
              </Text>
              {/* <Text
                textAlign={{ base: 'center', xl: 'left' }}
                mb="25px"
                color={'primaryGray.100'}
                fontSize={'14px'}
              >
                Donec varius velit quis tellus eleifend iaculis. Aenean mi
                nulla, aliquam placerat orci non, maximus semper ligula.Etiam
                porta urna eget neque imperdiet efficitur. Aliquam odio orci,
                vehicula in interdum ultricies, bibendum in velit. Quisque
                pellentesque nibh ut sem elementum pulvinar. Integer bibendum,
                ligula a dapibus bibendum, massa lectus condimentum augue, sit
                amet rhoncus nibh arcu ut urna. Nam imperdiet id lectus sed
                vestibulum. Ut tempor libero sit amet metus fermentum
                ullamcorper. Nullam scelerisque iaculis purus eu varius. Integer
                molestie in leo et consectetur.
              </Text>
              <Text
                textAlign={{ base: 'center', xl: 'left' }}
                mb="25px"
                color={'primaryGray.100'}
                fontSize={'14px'}
              >
                Quisque pellentesque nibh ut sem elementum pulvinar. Integer
                bibendum, ligula a dapibus bibendum, massa lectus condimentum
                augue, sit amet rhoncus nibh arcu ut urna. Nam imperdiet id
                lectus sed vestibulum. Ut tempor libero sit amet metus fermentum
                ullamcorper. Nullam scelerisque iaculis purus eu varius. Integer
                molestie in leo et consectetur.
              </Text>
              <Text
                textAlign={{ base: 'center', xl: 'left' }}
                mb="25px"
                color={'primaryGray.100'}
                fontSize={'14px'}
              >
                Donec varius velit quis tellus eleifend iaculis. Aenean mi
                nulla, aliquam placerat orci non, maximus semper ligula.Etiam
                porta urna eget neque imperdiet efficitur. Aliquam odio orci,
                vehicula in interdum ultricies, bibendum in velit. Quisque
                pellentesque nibh ut sem elementum pulvinar. Integer bibendum,
                ligula a dapibus bibendum, massa lectus condimentum augue, sit
                amet rhoncus nibh arcu ut urna. Nam imperdiet id lectus sed
                vestibulum. Ut tempor libero sit amet metus fermentum
                ullamcorper. Nullam scelerisque iaculis purus eu varius. Integer
                molestie in leo et consectetur.
              </Text> */}
            </Box>
          </>
        )}
        <Heading
          fontSize={{ base: '32px', xl: '38px' }}
          fontWeight={'600'}
          color={'primaryBlack.100'}
          mb="35px"
        >
          Other Blogs
        </Heading>

        {/* {latestBlogs && latestBlogs.length > 0 ? 
      latestBlogs.map((val, index) => (
       
      ))  
      :<Heading>No Other Blogs</Heading>
      } */}

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
                  reloadDocument
                  to={`/single-blog/${val._id}`}
                  bgGradient={'linear(to-r, #295377, #208C74)'}
                  fontSize={{ base: '12px', xl: '14px' }}
                  fontWeight={500}
                  color={'#fff'}
                  borderRadius={'25px'}
                  h={{ base: '35px', xl: '45px' }}
                  textTransform={'uppercase'}
                  border={'2px solid primaryGreen.200'}
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
      </Container>
    </Container>
  );
}
