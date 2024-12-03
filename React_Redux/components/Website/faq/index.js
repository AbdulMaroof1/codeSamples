import {
  Container,
  Heading,
  Stack,
  Text,
  Box,
  Image,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
} from '@chakra-ui/react';
import headingIcon from '../../../assets/images/website/headingIcon.svg';
import DocsGirl from '../../../assets/images/website/docGirl.svg';
import faqBg from '../../../assets/images/website/faqBg.svg';
import { useNavigate } from 'react-router-dom';

export default function Faq() {
  const navigate = useNavigate();
  return (
    <Container
      py="70px"
      px={{ base: '20px', xl: '40px' }}
      bgImage={faqBg}
      bgSize={'cover'}
      bgPos={'center'}
      bgRepeat={'no-repeat'}
      maxW={{ base: '1366px', xl: '6xl', '2xl': '8xl' }}
      position={'relative'}
      h={'620px'}
    >
      <Container maxW={{ base: '1366px', xl: '6xl' }}>
        <Box
          pos={'absolute'}
          top={{ base: '33%', xl: '30%' }}
          p={{ base: '0 40px' }}
          right={{ base: '0%', xl: '60%' }}
          maxW={{ base: '100%', xl: '50%' }}
          display={'flex'}
          justifyContent={'center'}
          flexDir={'column'}
        >
          <Heading
            justifyContent={{ base: 'center', xl: 'flex-start' }}
            mb="15px"
            fontWeight={'600'}
            display={'flex'}
            alignItems={'center'}
            color={'primaryGreen.200'}
            as={'h6'}
          >
            <Image src={headingIcon} />
            <Text
              ml="10px"
              fontSize={{ base: '18px', xl: '20px' }}
              textTransform={'uppercase'}
              as="span"
            >
              FAQs
            </Text>
          </Heading>
          <Heading
            display={{ base: 'none', xl: 'block' }}
            fontSize={{ base: '32px', xl: '38px' }}
            fontWeight={'600'}
            color={'#fff'}
            mb="25px"
          >
            Frequently Asked <br />
            Have Any Question?
          </Heading>
          <Heading
            textAlign={{ base: 'center', xl: 'left' }}
            display={{ base: 'block', xl: 'none' }}
            fontSize={{ base: '28px', xl: '38px' }}
            fontWeight={'600'}
            color={'#fff'}
            mb="25px"
          >
            Frequently Asked Have Any Question?
          </Heading>
          {/* <Accordion defaultIndex={[0]}> */}
          {/* <AccordionItem mb="20px" bgColor={'#fff'} borderRadius={'12px'}>
              <h2>
                <AccordionButton padding={'15px 25px'}>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    color={'primaryBlack.100'}
                    fontWeight={'600'}
                    fontSize={{ base: '16px', xl: '18px' }}
                  >
                    01. What services does the clinic offer?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel
                pb={4}
                color={'primaryGray.100'}
                fontSize={{ base: '12px', xl: '14px' }}
                fontWeight={'400'}
              >
                Our clinic is strategically located for easy access, ensuring
                that you can reach us conveniently from various parts of the
                community. We also provide accessibility.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem mb="20px" bgColor={'#fff'} borderRadius={'12px'}>
              <h2>
                <AccordionButton padding={'15px 25px'}>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    color={'primaryBlack.100'}
                    fontWeight={'600'}
                    fontSize={{ base: '16px', xl: '18px' }}
                  >
                    02. How do I schedule an appointment?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel
                pb={4}
                color={'primaryGray.100'}
                fontSize={{ base: '12px', xl: '14px' }}
                fontWeight={'400'}
              >
                Our clinic is strategically located for easy access, ensuring
                that you can reach us conveniently from various parts of the
                community. We also provide accessibility.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem mb="20px" bgColor={'#fff'} borderRadius={'12px'}>
              <h2>
                <AccordionButton padding={'15px 25px'}>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    color={'primaryBlack.100'}
                    fontWeight={'600'}
                    fontSize={{ base: '16px', xl: '18px' }}
                  >
                    03. What are the clinic hours of operations?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel
                pb={4}
                color={'primaryGray.100'}
                fontSize={{ base: '12px', xl: '14px' }}
                fontWeight={'400'}
              >
                Our clinic is strategically located for easy access, ensuring
                that you can reach us conveniently from various parts of the
                community. We also provide accessibility.
              </AccordionPanel>
            </AccordionItem> */}
          {/* </Accordion> */}
          <Box>
            <Button
              justifyContent={'center'}
              alignItems={'center'}
              padding={'12.25px 29px 11.75px 30px'}
              borderRadius={'22px'}
              border={'1px solid primaryGreen.200'}
              color={'#FFFFFF'}
              bg={
                'var(--Gradient-1, linear-gradient(109deg, #295377 -22.91%, #208C74 93.87%))'
              }
              _hover={{
                bgGradient: 'none',
                border: '2px solid',
                borderColor: 'primaryGreen.200',
                color: 'primaryGreen.200',
              }}
              width={'100%'}
              onClick={() => navigate('/faq')}
            >
              View All
            </Button>
          </Box>
        </Box>
        <Image
          src={DocsGirl}
          position={'absolute'}
          display={{ base: 'none', xl: 'initial' }}
          right={{ base: '0%', xl: '8%' }}
          bottom={'0px'}
        />
      </Container>
    </Container>
  );
}
