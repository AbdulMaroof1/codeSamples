import {
  Box,
  Container,
  Icon,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaMapMarker,
  FaMapMarkerAlt,
  FaPhone,
  FaTwitter,
  FaWhatsapp,
  FaSkype,
  FaInstagram,
} from 'react-icons/fa';
import { SiThreads } from 'react-icons/si';
import { BsEnvelopeFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function TopBar() {
  const { seo } = useSelector(state => state.website.data);
  console.log(seo, 'topBar');
  return (
    <Stack
      bgGradient="linear(to-r, #295377, #208C74)"
      py="5px"
      display={{ base: 'none', md: 'block' }}
    >
      <Container maxW={{ base: '8xl', lg: '6xl', '2xl': '8xl' }}>
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <UnorderedList
            display={'flex'}
            alignItems={'center'}
            gap={{ base: '10px', '2xl': '40px' }}
            listStyleType={'none'}
            color={'white'}
          >
            <ListItem
              display={'flex'}
              alignItems={'center'}
              gap={{ base: '5px', '2xl': '15px' }}
            >
              <Box
                w="35px"
                h="35px"
                border={'1px solid #fff'}
                borderRadius={'100%'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Icon as={FaPhone} />
              </Box>
              <Text fontSize={{ base: '12px', xl: '14px' }}>
                Phone:{' '}
                <Text as="a" href="tel:+164-654-3569">
                  {seo?.number || '+164-654-3569'}
                </Text>
              </Text>
            </ListItem>
            <ListItem
              display={'flex'}
              alignItems={'center'}
              gap={{ base: '5px', '2xl': '15px' }}
            >
              <Box
                w="35px"
                h="35px"
                border={'1px solid #fff'}
                borderRadius={'100%'}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Icon as={BsEnvelopeFill} />
              </Box>
              <Text fontSize={{ base: '12px', xl: '14px' }}>
                Email:{' '}
                <Text as="a" href="mailto:info@emedii.com">
                  {seo?.email || 'info@emedii.com'}
                </Text>
              </Text>
            </ListItem>
          </UnorderedList>
          <UnorderedList
            display={'flex'}
            alignItems={'center'}
            gap={{ base: '10px', '2xl': '40px' }}
            listStyleType={'none'}
            color={'white'}
          >
            {/* <ListItem
                            display={'flex'}
                            alignItems={'center'}
                            gap={{ base: '5px', '2xl': '15px' }}
                        >
                            <Text
                                fontSize={{ base: "12px", xl: "14px" }}
                            >Language</Text>
                        </ListItem> */}
            <ListItem
              display={{ base: 'none', xl: 'flex' }}
              alignItems={'center'}
              gap={{ base: '5px', '2xl': '15px' }}
            >
              <Text fontSize={{ base: '12px', xl: '14px' }}>Follow Us On:</Text>
              <Stack direction={'row'} alignItems={'center'} gap="5px">
                {seo?.socials?.map(val => {
                  if (val.name === 'facebook' && val?.isActive) {
                    return (
                      <Box
                        w="35px"
                        h="35px"
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        bgColor={'#fff'}
                        borderRadius={'100%'}
                        cursor={'pointer'}
                        as={'a'}
                        href={val?.url}
                        target="_blank"
                      >
                        <Icon
                          color={'primaryGreen.100'}
                          fontSize={'14px'}
                          as={FaFacebookF}
                        />
                      </Box>
                    );
                  } else if (val.name === 'twitter' && val?.isActive) {
                    return (
                      <Box
                        w="35px"
                        h="35px"
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        bgColor={'#fff'}
                        borderRadius={'100%'}
                        cursor={'pointer'}
                        as={'a'}
                        href={val?.url}
                        target="_blank"
                      >
                        <Icon
                          color={'primaryGreen.100'}
                          fontSize={'14px'}
                          as={FaTwitter}
                        />
                      </Box>
                    );
                  } else if (val.name === 'linkedIn' && val?.isActive) {
                    return (
                      <Box
                        w="35px"
                        h="35px"
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        bgColor={'#fff'}
                        borderRadius={'100%'}
                        cursor={'pointer'}
                        as={'a'}
                        href={val?.url}
                        target="_blank"
                      >
                        <Icon
                          color={'primaryGreen.100'}
                          fontSize={'14px'}
                          as={FaLinkedinIn}
                        />
                      </Box>
                    );
                  } else if (val.name === 'whatsapp' && val?.isActive) {
                    return (
                      <Box
                        w="35px"
                        h="35px"
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        bgColor={'#fff'}
                        borderRadius={'100%'}
                        cursor={'pointer'}
                        as={'a'}
                        href={val?.url}
                        target="_blank"
                      >
                        <Icon
                          color={'primaryGreen.100'}
                          fontSize={'14px'}
                          as={FaWhatsapp}
                        />
                      </Box>
                    );
                  } else if (val.name === 'skype' && val?.isActive) {
                    return (
                      <Box
                        w="35px"
                        h="35px"
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        bgColor={'#fff'}
                        borderRadius={'100%'}
                        cursor={'pointer'}
                        as={'a'}
                        href={val?.url}
                        target="_blank"
                      >
                        <Icon
                          color={'primaryGreen.100'}
                          fontSize={'14px'}
                          as={FaSkype}
                        />
                      </Box>
                    );
                  } else if (val.name === 'instagram' && val?.isActive) {
                    return (
                      <Box
                        w="35px"
                        h="35px"
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        bgColor={'#fff'}
                        borderRadius={'100%'}
                        cursor={'pointer'}
                        as={'a'}
                        href={val?.url}
                        target="_blank"
                      >
                        <Icon
                          color={'primaryGreen.100'}
                          fontSize={'14px'}
                          as={FaInstagram}
                        />
                      </Box>
                    );
                  } else if (val?.name === 'other' && val?.isActive) {
                    return (
                      <Box
                        w="35px"
                        h="35px"
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        bgColor={'#fff'}
                        borderRadius={'100%'}
                        cursor={'pointer'}
                        as={'a'}
                        href={val?.url}
                        target="_blank"
                      >
                        <Icon
                          color={'primaryGreen.100'}
                          fontSize={'14px'}
                          as={SiThreads}
                        />
                      </Box>
                    );
                  }
                })}
              </Stack>
            </ListItem>
          </UnorderedList>
        </Stack>
      </Container>
    </Stack>
  );
}
