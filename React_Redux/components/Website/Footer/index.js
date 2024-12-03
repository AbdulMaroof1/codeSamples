import {
  Container,
  Heading,
  Stack,
  Box,
  Image,
  Accordion,
  Input,
  Button,
  Text,
  UnorderedList,
  ListItem,
  Icon,
  useToast,
} from '@chakra-ui/react';
// import logo from '../../../assets/images/website/logo.jpg'
import {
  FaChevronRight,
  FaEnvelope,
  FaFacebookF,
  FaLinkedinIn,
  FaMapMarker,
  FaPhoneAlt,
  FaRegCalendar,
  FaTwitter,
  FaWhatsapp,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import blog1 from '../../../assets/images/website/blog1.svg';
import blog2 from '../../../assets/images/website/blog2.svg';
import googleBtn from '../../../assets/images/website/googleDownloadBtn.svg';
import appleBtn from '../../../assets/images/website/appleDownloadBtn.svg';
// import Logo from '../../../assets/images/website/eMedst Logo.svg';
import Logo from '../../../assets/images/website/eMedst Logo.svg';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { imgUrl } from '../../../utilities/config';
import moment from 'moment';
import { POST } from '../../../utilities/ApiProvider';

export default function Footer() {
  const toast = useToast();
  const latestBlogs = useSelector(state => state.website.data.latestBlogs);
  const latestBlog = useMemo(() => {
    if (!latestBlogs) return [];
    return [...latestBlogs] // Creating a shallow copy to avoid mutating the original array
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 2);
  }, [latestBlogs]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const form = new FormData(e.target);
      form.append('type', 'newsletter');
      const response = await POST('/web/inquiry', form);
      if (response.status === 200) {
        toast({
          description: 'Thank you for subscribing!',
          status: 'success',
          isClosable: true,
          position: 'top-right',
          duration: 3000,
        });
        e.target.reset();
      } else {
        toast({
          description: response?.message,
          status: 'error',
          isClosable: true,
          position: 'top-right',
          duration: 3000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Container
        px={{ base: '20px', xl: '40px' }}
        bgColor={'#000F1A'}
        maxW={{ base: '1366px', xl: '6xl', '2xl': '8xl' }}
      >
        <Container maxW={{ base: '1366px', xl: '6xl' }}>
          <Stack
            borderBottom={'1px solid #78809466'}
            py="40px"
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            flexDir={{ base: 'column', xl: 'row' }}
            spacing={0}
          >
            <Box>
              <Heading
                textAlign={{ base: 'center', xl: 'left' }}
                color={'#fff'}
                fontSize={{ base: '32px', xl: '36px' }}
                mb={{ base: '20px', xl: '0px' }}
              >
                Subscribe For Newsletter
              </Heading>
            </Box>
            <form onSubmit={handleSubmit}>
              <Box
                display={'flex'}
                flexDir={{ base: 'column', xl: 'row' }}
                alignItems={'center'}
                justifyContent={'flex-end'}
                gap="15px"
              >
                <Input
                  name="email"
                  type="email"
                  required
                  bgColor={'#fff'}
                  borderRadius={'50px'}
                  color={'primaryGray.100'}
                  h={{ base: '35px', xl: '45px' }}
                  placeholder="Email address"
                />
                <Button
                  bgGradient="linear(to-r, #295377, #208C74)"
                  fontSize={{ base: '12px', xl: '14px' }}
                  fontWeight={500}
                  color={'#fff'}
                  borderRadius={'25px'}
                  bgColor={'transparent'}
                  px="30px"
                  textTransform={'uppercase'}
                  h={{ base: '35px', xl: '45px' }}
                  border={'2px solid primaryGreen.200'}
                  _hover={{
                    bgGradient: 'none',
                    border: '2px solid',
                    borderColor: '#fff',
                    color: '#fff',
                  }}
                  type="submit"
                >
                  Subscribe
                </Button>
              </Box>
            </form>
          </Stack>
          <Stack
            py="40px"
            direction={'row'}
            justifyContent={'space-between'}
            flexDir={{ base: 'column', xl: 'row' }}
            gap={{ base: '25px', xl: '0px' }}
          >
            <Box flex={1} color={'primaryGray.100'}>
              <Image src={Logo} mb="20px" />
              <Text fontSize={{ base: '12px', xl: '14px' }} maxW={'80%'}>
                Subscribe to out newsletter today to receive latest news
                administrate cost effective for tactical data.
              </Text>
              <Text py="10px" fontSize={{ base: '16px', xl: '18px' }}>
                Dr. Abdullah
              </Text>
              <UnorderedList m="0">
                <ListItem
                  py="5px"
                  display={'flex'}
                  alignItems={'center'}
                  gap="5px"
                >
                  <Text
                    borderRadius={'100%'}
                    border={'1px solid'}
                    borderColor={'primaryGreen.200'}
                    w="20px"
                    h={'20px'}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                  >
                    <Icon fontSize={'10px'} color={'#fff'} as={FaMapMarker} />
                  </Text>
                  <Text fontSize={{ base: '12px', xl: '14px' }}>
                    2478 Street City Ohio 90255
                  </Text>
                </ListItem>
                <ListItem
                  py="5px"
                  display={'flex'}
                  alignItems={'center'}
                  gap="5px"
                >
                  <Text
                    borderRadius={'100%'}
                    border={'1px solid'}
                    borderColor={'primaryGreen.200'}
                    w="20px"
                    h={'20px'}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                  >
                    <Icon fontSize={'10px'} color={'#fff'} as={FaEnvelope} />
                  </Text>
                  <Text fontSize={{ base: '12px', xl: '14px' }}>
                    info@emedst.com
                  </Text>
                </ListItem>
                <ListItem
                  py="5px"
                  display={'flex'}
                  alignItems={'center'}
                  gap="5px"
                >
                  <Text
                    borderRadius={'100%'}
                    border={'1px solid'}
                    borderColor={'primaryGreen.200'}
                    w="20px"
                    h={'20px'}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                  >
                    <Icon fontSize={'10px'} color={'#fff'} as={FaPhoneAlt} />
                  </Text>
                  <Text fontSize={{ base: '12px', xl: '14px' }}>
                    +966 763 282 46
                  </Text>
                </ListItem>
              </UnorderedList>
            </Box>
            <Box flex={1}>
              <Heading
                fontWeight={'400'}
                color={'#fff'}
                fontSize={'26px'}
                w={'fit-content'}
                padding={'0 0 40px 0'}
                position={'relative'}
                _before={{
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: '40px',
                  width: '80%',
                  height: '2px',
                  bgGradient:
                    'linear(to-r, primaryGreen.100, primaryGreen.200)',
                }}
              >
                Quick Links
              </Heading>
              <UnorderedList m="0" color={'primaryGray.100'}>
                <ListItem
                  py="3px"
                  display={'flex'}
                  alignItems={'center'}
                  gap="5px"
                >
                  <Icon fontSize={'10px'} as={FaChevronRight} />
                  <Text
                    fontSize={{ base: '12px', xl: '14px' }}
                    fontWeight={'400'}
                    as={Link}
                    to="/about-us"
                  >
                    About Us
                  </Text>
                </ListItem>
                <ListItem
                  py="3px"
                  display={'flex'}
                  alignItems={'center'}
                  gap="5px"
                >
                  <Icon fontSize={'10px'} as={FaChevronRight} />
                  <Text
                    fontSize={{ base: '12px', xl: '14px' }}
                    fontWeight={'400'}
                    as={Link}
                    to="/register"
                  >
                    Join As Hospital
                  </Text>
                </ListItem>
                <ListItem
                  py="3px"
                  display={'flex'}
                  alignItems={'center'}
                  gap="5px"
                >
                  <Icon fontSize={'10px'} as={FaChevronRight} />
                  <Text
                    fontSize={{ base: '12px', xl: '14px' }}
                    fontWeight={'400'}
                    as={Link}
                    to="/register"
                  >
                    Join As Patient
                  </Text>
                </ListItem>
                <ListItem
                  py="3px"
                  display={'flex'}
                  alignItems={'center'}
                  gap="5px"
                >
                  <Icon fontSize={'10px'} as={FaChevronRight} />
                  <Text
                    fontSize={{ base: '12px', xl: '14px' }}
                    fontWeight={'400'}
                    as={Link}
                    to="/register"
                  >
                    Join As Practitioner
                  </Text>
                </ListItem>
                <ListItem
                  py="3px"
                  display={'flex'}
                  alignItems={'center'}
                  gap="5px"
                >
                  <Icon fontSize={'10px'} as={FaChevronRight} />
                  <Text
                    fontSize={{ base: '12px', xl: '14px' }}
                    fontWeight={'400'}
                    as={Link}
                    to="/careers"
                  >
                    Careers
                  </Text>
                </ListItem>
                <ListItem
                  py="3px"
                  display={'flex'}
                  alignItems={'center'}
                  gap="5px"
                >
                  <Icon fontSize={'10px'} as={FaChevronRight} />
                  <Text
                    fontSize={{ base: '12px', xl: '14px' }}
                    fontWeight={'400'}
                    as={Link}
                    to="/contact-us"
                  >
                    Contact Us
                  </Text>
                </ListItem>
                <ListItem
                  py="3px"
                  display={'flex'}
                  alignItems={'start'}
                  gap="5px"
                >
                  <Icon mt={1} fontSize={'10px'} as={FaChevronRight} />
                  <Text
                    fontSize={{ base: '12px', xl: '14px' }}
                    fontWeight={'400'}
                    as={Link}
                    to="/terms-and-conditions"
                    lineHeight={'1.2 !important'}
                  >
                    Terms & Conditions <br />
                    Privacy Policy
                  </Text>
                </ListItem>

                {/* <ListItem
                  py="3px"
                  display={'flex'}
                  alignItems={'center'}
                  gap="5px"
                >
                  <Icon fontSize={'10px'} as={FaChevronRight} />
                  <Text
                    fontSize={{ base: '12px', xl: '14px' }}
                    fontWeight={'400'}
                    as={Link}
                    to="/privacy-policy"
                  >
                    Privacy Policy
                  </Text>
                </ListItem> */}
              </UnorderedList>
            </Box>
            <Box flex={1}>
              <Heading
                fontWeight={'400'}
                color={'#fff'}
                fontSize={'26px'}
                w={'fit-content'}
                padding={'0 0 40px 0'}
                position={'relative'}
                _before={{
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: '40px',
                  width: '80%',
                  height: '2px',
                  bgGradient:
                    'linear(to-r, primaryGreen.100, primaryGreen.200)',
                }}
              >
                Our Services
              </Heading>
              <UnorderedList m="0" color={'primaryGray.100'}>
                <ListItem
                  py="3px"
                  display={'flex'}
                  alignItems={'center'}
                  gap="5px"
                >
                  <Icon fontSize={'10px'} as={FaChevronRight} />
                  <Text
                    fontSize={{ base: '12px', xl: '14px' }}
                    fontWeight={'400'}
                    as={Link}
                    to="/service-inner/662bb75e63e3ced8f8ef11e0"
                  >
                    Clinic Appointment
                  </Text>
                </ListItem>
                <ListItem
                  py="3px"
                  display={'flex'}
                  alignItems={'center'}
                  gap="5px"
                >
                  <Icon fontSize={'10px'} as={FaChevronRight} />
                  <Text
                    fontSize={{ base: '12px', xl: '14px' }}
                    fontWeight={'400'}
                    as={Link}
                    to="/service-inner/662bb78063e3ced8f8ef11e7"
                  >
                    Virtual Clinic
                  </Text>
                </ListItem>
                <ListItem
                  py="3px"
                  display={'flex'}
                  alignItems={'center'}
                  gap="5px"
                >
                  <Icon fontSize={'10px'} as={FaChevronRight} />
                  <Text
                    fontSize={{ base: '12px', xl: '14px' }}
                    fontWeight={'400'}
                    as={Link}
                    to="/service-inner/662bb63863e3ced8f8ef11c9"
                  >
                    Bed Booking
                  </Text>
                </ListItem>
                <ListItem
                  py="3px"
                  display={'flex'}
                  alignItems={'center'}
                  gap="5px"
                >
                  <Icon fontSize={'10px'} as={FaChevronRight} />
                  <Text
                    fontSize={{ base: '12px', xl: '14px' }}
                    fontWeight={'400'}
                    as={Link}
                    to="/service-inner/662bb67c63e3ced8f8ef11cd"
                  >
                    Digital Medical Library
                  </Text>
                </ListItem>
                <ListItem
                  py="3px"
                  display={'flex'}
                  alignItems={'center'}
                  gap="5px"
                >
                  <Icon fontSize={'10px'} as={FaChevronRight} />
                  <Text
                    fontSize={{ base: '12px', xl: '14px' }}
                    fontWeight={'400'}
                    as={Link}
                    to="/service-inner/662bb8ef63e3ced8f8ef1204"
                  >
                    Medical Education & Training
                  </Text>
                </ListItem>
                <ListItem
                  py="3px"
                  display={'flex'}
                  alignItems={'center'}
                  gap="5px"
                >
                  <Icon fontSize={'10px'} as={FaChevronRight} />
                  <Text
                    fontSize={{ base: '12px', xl: '14px' }}
                    fontWeight={'400'}
                    as={Link}
                    to="/service-inner/662bb6e363e3ced8f8ef11d4"
                  >
                    Electronic Advertisement
                  </Text>
                </ListItem>
                <ListItem
                  py="3px"
                  display={'flex'}
                  alignItems={'center'}
                  gap="5px"
                >
                  <Icon fontSize={'10px'} as={FaChevronRight} />
                  <Text
                    fontSize={{ base: '12px', xl: '14px' }}
                    fontWeight={'400'}
                    as={Link}
                    to="/service-inner/662bbaea63e3ced8f8ef1233"
                  >
                    Ticket & Visa Transportation
                  </Text>
                </ListItem>
              </UnorderedList>
            </Box>
            <Box flex={1}>
              <Heading
                fontWeight={'400'}
                color={'#fff'}
                fontSize={'26px'}
                w={'fit-content'}
                padding={'0 0 40px 0'}
                position={'relative'}
                _before={{
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: '40px',
                  width: '80%',
                  height: '2px',
                  bgGradient:
                    'linear(to-r, primaryGreen.100, primaryGreen.200)',
                }}
              >
                Recent Posts
              </Heading>
              <UnorderedList m="0" color={'primaryGray.100'}>
                {!latestBlog ? (
                  <Text>Loading...</Text>
                ) : (
                  latestBlog?.map(val => (
                    <ListItem
                      py="3px"
                      display={'flex'}
                      alignItems={'center'}
                      gap={2}
                      key={val._id}
                      as={Link}
                      to={`/single-blog/${val._id}`}
                    >
                      <Image
                        display={{ base: 'none', xl: 'initial' }}
                        w="100px"
                        borderRadius={'12px'}
                        src={`${imgUrl}/${val?.thumbnail}`}
                      />
                      <Box>
                        <Text
                          color={'#fff'}
                          fontSize={{ base: '14px', xl: '16px' }}
                        >
                          {val?.title}
                        </Text>
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
                          {moment(val?.createdAt).format('D MMMM YYYY') ||
                            '07 December 2023'}
                        </Text>
                      </Box>
                    </ListItem>
                  ))
                )}
              </UnorderedList>
            </Box>
          </Stack>
          <Stack
            gap="20px"
            py="30px"
            direction={'row'}
            alignItems={'center'}
            justifyContent={'center'}
            flexDir={{ base: 'column', xl: 'row' }}
          >
            <Heading
              fontWeight={'600'}
              color={'#fff'}
              fontSize={{ base: '20px', xl: '26px' }}
            >
              Download Our App!
            </Heading>
            <Image src={googleBtn} w={{ base: '140px', xl: 'initial' }} />
            <Image src={appleBtn} w={{ base: '140px', xl: 'initial' }} />
          </Stack>
        </Container>
      </Container>
      <Container
        bgGradient={'linear(to-r, primaryGreen.100, primaryGreen.200)'}
        py="10px"
        maxW={{ base: '1366px', xl: '6xl', '2xl': '8xl' }}
      >
        <Container maxW={{ base: '1366px', xl: '6xl' }}>
          <Stack
            flexDir={{ base: 'column', xl: 'row' }}
            gap={{ base: '15px', xl: '0' }}
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            color={'#fff'}
          >
            <Text fontSize={{ base: '12px', xl: '14px' }}>
              Copyright &copy; 2024 Emedst. All Rights Reserved.
            </Text>
            <Text
              fontSize={{ base: '12px', xl: '14px' }}
              as={Link}
              to="/terms-and-conditions"
            >
              Terms & Conditions / Privacy Policy
            </Text>
            {/* <Text
              fontSize={{ base: '12px', xl: '14px' }}
              as={Link}
              to="/privacy-policy"
            >
              Privacy Policy
            </Text> */}

            {/* <UnorderedList></UnorderedList> */}
          </Stack>
        </Container>
      </Container>
    </>
  );
}
