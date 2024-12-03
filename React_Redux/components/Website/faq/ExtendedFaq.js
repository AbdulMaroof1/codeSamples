import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Spinner,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { GET, POST } from '../../../utilities/ApiProvider';
import { faqArray } from './UploadFaq';

const ExtendedFaq = () => {
  const [Faq, setFaq] = useState([]);
  const [searchValue, setsearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // TODO: Fetch faqs from API and render them here.
  const getFaq = async () => {
    try {
      setIsLoading(true);
      const response = await GET('/web/page?type=faq');
      if (response?.status === 200) {
        setIsLoading(false);
        setFaq(response?.data);
      }
    } catch (error) {
      console.error('While Fetching FAQs', error);
    }
  };

  const createFaqLoop = async () => {
    for (let i = 0; i < faqArray.length; i++) {
      try {
        const faq = faqArray[i];
        const response = await POST('/admin/page', faq);
        if (response.status === 200) {
          console.log(`FAQ ${i + 1} uploaded successfully.`);
        } else {
          console.error(`Failed to upload FAQ ${i + 1}:`, response?.message);
          return;
        }
      } catch (error) {
        console.error(`Error while uploading FAQ ${i + 1}:`, error);
      }
    }
  };

  const filteredFaq = Faq.filter(val =>
    val?.title?.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    getFaq();
  }, []);

  return (
    <Stack position={'relative'} py="60px">
      <Container
        maxW={{ base: '1366px', xl: '6xl', '2xl': '6xl' }}
        display={'flex'}
        alignItems={'center'}
      >
        <Box
          display={'flex'}
          flexDir={{ base: 'column', xl: 'column' }}
          alignItems={'center'}
          width={'100%'}
          gap={12}
          justifyContent={'space-around'}
        >
          {isLoading ? (
            <Stack
              w={'100%'}
              h={'60vh'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Spinner />
            </Stack>
          ) : (
            <>
              <Stack
                display={'flex'}
                direction={'row'}
                width={'100%'}
                justifyContent={'space-between'}
              >
                <Heading>What Are You Looking For</Heading>
                <InputGroup width={'50%'}>
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.300" />
                  </InputLeftElement>
                  <Input
                    bgColor={'#fff'}
                    borderRadius={'50px'}
                    color={'primaryGray.100'}
                    placeholder="Type your question here"
                    value={searchValue}
                    onChange={e => setsearchValue(e.target.value)}
                  />
                </InputGroup>
              </Stack>
              <Stack>
                <Box>
                  <Accordion allowMultiple>
                    {filteredFaq.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        mb="20px"
                        bgColor={'#fff'}
                        borderRadius={'12px'}
                      >
                        <AccordionButton
                          padding={'15px 25px'}
                          transition={'0.3s'}
                          _hover={{ color: '#fff' }}
                        >
                          <Box
                            as="span"
                            flex="1"
                            textAlign="left"
                            color="primaryBlack.100"
                            fontWeight="600"
                            fontSize={{ base: '16px', xl: '18px' }}
                          >
                            {faq.title}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel
                          pb={4}
                          color={'primaryGray.100'}
                          fontSize={{ base: '12px', xl: '14px' }}
                          fontWeight={'400'}
                        >
                          <Box>{faq.content}</Box>
                        </AccordionPanel>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </Box>
              </Stack>
            </>
          )}
        </Box>
      </Container>
    </Stack>
  );
};

export default ExtendedFaq;
