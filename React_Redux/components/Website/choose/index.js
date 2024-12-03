import {
  Button,
  Container,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  Box,
  Input,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from '@chakra-ui/react';
import SurgeonPic from '../../../assets/images/website/surgeon.svg';
import meds from '../../../assets/images/website/meds.svg';
import headingIcon from '../../../assets/images/website/headingIcon.svg';
import { FaHandshake, FaHeartbeat } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { RiHospitalLine } from 'react-icons/ri';
import { FaUserDoctor } from 'react-icons/fa6';

export default function Choose() {
  const navigate = useNavigate();

  return (
    <Stack position="relative" py="60px">
      <Container
        maxW={{ base: '1366px', xl: '6xl' }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDir={{ base: 'column', xl: 'row' }}
        gap={'50px'}
      >
        <Box flex={1}>
          <Heading
            as="h6"
            display="flex"
            alignItems="center"
            justifyContent={{ base: 'center', xl: 'flex-start' }}
            mb="15px"
            mx="15px"
            fontWeight="600"
            color="primaryGreen.200"
          >
            <Image src={headingIcon} />
            <Text
              as="span"
              ml="10px"
              fontSize={{ base: '18px', xl: '20px' }}
              textTransform="uppercase"
              textAlign="center"
            >
              Join Us
            </Text>
          </Heading>

          <Heading
            textAlign={{ base: 'center', xl: 'left' }}
            fontSize={{ base: '30px', xl: '38px' }}
            fontWeight="600"
            color="primaryBlack.100"
            mb="25px"
          >
            {/* We Are Always Open For <br /> Your Health Services */}
          </Heading>

          <Accordion allowToggle>
            {accordionItems.map((item, index) => (
              <AccordionItem
                key={index}
                border="2px solid"
                borderColor="primaryGray.100"
                borderRadius="12px"
                mb="20px !important"
                transition=".3s"
                _hover={{ borderColor: 'primaryGreen.200' }}
              >
                <AccordionButton>
                  <Stack
                    role="group"
                    cursor="pointer"
                    p="10px"
                    width="100%"
                    color="primaryGray.100"
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Box
                      w="90px"
                      h="80px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="42px"
                      bgColor="#e2e2e2"
                      borderRadius="8px"
                      transition=".3s"
                      _groupHover={{
                        bgColor: 'primaryGreen.200',
                        color: '#fff',
                      }}
                    >
                      <Icon as={item.icon} />
                    </Box>
                    <Box>
                      <Heading
                        fontSize="26px"
                        fontWeight="500"
                        textAlign={'start'}
                        mb="5px"
                        transition=".3s"
                        _groupHover={{ color: 'primaryBlack.100' }}
                      >
                        {item.title}
                      </Heading>
                      <Text fontSize="14px">{item.description}</Text>
                    </Box>
                    <AccordionIcon />
                  </Stack>
                </AccordionButton>

                <AccordionPanel pb={4}>
                  {item.panelContent(navigate)}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>

        <Box flex={1}>
          <Image src={SurgeonPic} />
        </Box>
      </Container>

      {/* <Image
        src={meds}
        position="absolute"
        right={{ base: '5%', '2xl': '10%' }}
        bottom="15%"
      /> */}
    </Stack>
  );
}

const accordionItems = [
  {
    title: 'Hospital Authenticator',
    // description: 'Lorem ipsum dolor sit amet, adipiscing',
    icon: RiHospitalLine,
    panelContent: navigate => (
      <>
        <Text color={'#788094'}>
          If you are a hospital and wish to market your medical treatment
          services around the world for free, or you are looking for someone to
          provide you with your medical workforce needs from different countries
          of the world, or you are looking to contract with a publishing house
          to provide you with the digital medical information sources you
          desire, or to provide you with medical education and training
          opportunities that your employees need, or to advertise your services
          electronically, join us at eMedst.com for free and get the services
          you wish to have.
        </Text>
        <Button
          justifyContent="center"
          alignItems="center"
          w={'100%'}
          mt={'10px'}
          padding="12.25px 29px 11.75px 30px"
          borderRadius="22px"
          color="#FFFFFF"
          boxShadow="0px 2.25px 11.25px 0px #B0BAD3"
          bg="var(--Gradient-1, linear-gradient(109deg, #295377 -22.91%, #208C74 93.87%))"
          border="1px solid primaryGreen.200"
          _hover={{
            bgGradient: 'none',
            border: '2px solid',
            borderColor: 'primaryGreen.200',
            color: 'primaryGreen.200',
          }}
          onClick={() => navigate('/register?type=hospital')}
        >
          Continue
        </Button>
      </>
    ),
  },
  {
    title: 'Health Practitioner',
    // description: 'Lorem ipsum dolor sit amet, adipiscing',
    icon: FaUserDoctor,
    panelContent: navigate => (
      <>
        <Text color={'#788094'}>
          If you are a health practitioner, whether you are a doctor,
          pharmacist, nurse, specialist, or paramedic, and you are looking for a
          job, seeking admission to a medical education and training program or
          looking for a publishing house that provides you with digital medical
          books, medical journals, articles and medical research you need at a
          competitive price and within a short period of time, or if you wish to
          inform patients and hospitals of where you will provide your current
          service, you can join eMedst.com for free and obtain these desired
          services.
        </Text>
        <Button
          justifyContent="center"
          alignItems="center"
          w={'100%'}
          mt={'10px'}
          padding="12.25px 29px 11.75px 30px"
          borderRadius="22px"
          color="#FFFFFF"
          boxShadow="0px 2.25px 11.25px 0px #B0BAD3"
          bg="var(--Gradient-1, linear-gradient(109deg, #295377 -22.91%, #208C74 93.87%))"
          border="1px solid primaryGreen.200"
          _hover={{
            bgGradient: 'none',
            border: '2px solid',
            borderColor: 'primaryGreen.200',
            color: 'primaryGreen.200',
          }}
          onClick={() => navigate('/register?type=practitioner')}
        >
          Continue
        </Button>
      </>
    ),
  },
  {
    title: 'Partnership    ',
    // description: 'Lorem ipsum dolor sit amet, adipiscing',
    icon: FaHandshake,
    panelContent: () => (
      <Stack>
        <Text color={'#788094'}>
          Our services at eMedst.com target patients, hospitals and health
          practitioners around the world. This requires the presence of our
          partners from various countries of the world who provide part of our
          services, such as marketing, employment, publishing, travel, housing,
          and translation services. We are happy for you to participate with us
          in providing our services wherever you are, whether you are
          individuals or institutions.
        </Text>
        <Text color="#208C74">Email Address*</Text>
        <Box display="flex" gap={10}>
          <Input
            borderRadius="9px"
            border="3px solid #208C74"
            placeholder="Enter Here"
          />
          <Button
            justifyContent="center"
            alignItems="center"
            padding="12.25px 29px 11.75px 30px"
            borderRadius="22.5px"
            color="#FFFFFF"
            bg="var(--Gradient-1, linear-gradient(109deg, #295377 -22.91%, #208C74 93.87%))"
            border="2px solid primaryGreen.200"
            _hover={{
              bgGradient: 'none',
              border: '2px solid',
              borderColor: 'primaryGreen.200',
              color: 'primaryGreen.200',
            }}
          >
            Submit
          </Button>
        </Box>
      </Stack>
    ),
  },
];
