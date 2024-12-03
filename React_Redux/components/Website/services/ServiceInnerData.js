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
import doc from '../../../assets/images/website/surgeon.svg';
import { Link } from 'react-router-dom';
import { imgUrl } from '../../../utilities/config';

export default function ServiceInnerData({ data }) {
  return (
    <Container py="60px" maxW={{ base: '1366px', xl: '6xl', '2xl': '8xl' }}>
      <Container maxW={{ base: '1366px', xl: '6xl' }}>
        {/* <Image src={`${imgUrl}/${data?.thumbnail}` || docMachine} w="100%" /> */}
        <Box flex={1} my="0px">
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
          {/* <Heading
            textAlign={{ base: 'center', xl: 'left' }}
            fontSize={{ base: '32px', xl: '38px' }}
            fontWeight={'600'}
            color={'primaryBlack.100'}
            mb="35px"
          >
            {data?.title ||
              'Get the right care based on your individual needs.'}
          </Heading> */}
          <Text
            fontSize={'16px'}
            color={'#75767A'}
            fontWeight={'400'}
            dangerouslySetInnerHTML={{ __html: data?.description }}
          ></Text>
          <Stack mt={'30px !important'}>
            <Button
              bgGradient={'linear(to-r, #295377, #208C74)'}
              fontSize={'16px'}
              fontWeight={500}
              color={'#fff'}
              borderRadius={'25px'}
              h="45px"
              px="80px"
              type="submit"
              border={'1px solid priamryGreen.200'}
              as={Link}
              to={`${
                data?.category === 'patients'
                  ? '/register?type=patient'
                  : data?.category === 'Practitioners'
                  ? '/register?type=practitioner'
                  : '/register?type=hospital'
              }`}
              _hover={{
                border: '2px solid',
                bgGradient: 'none',
                borderColor: 'primaryGreen.200',
                color: 'primaryGreen.200',
              }}
            >
              Continue
            </Button>
          </Stack>
          {/* <Text
            textAlign={{ base: 'center', xl: 'left' }}
            mb="25px"
            color={'primaryGray.100'}
            fontSize={'14px'}
          >
            Quisque pellentesque nibh ut sem elementum pulvinar. Integer
            bibendum, ligula a dapibus bibendum, massa lectus condimentum augue,
            sit amet rhoncus nibh arcu ut urna. Nam imperdiet id lectus sed
            vestibulum. Ut tempor libero sit amet metus fermentum ullamcorper.
            Nullam scelerisque iaculis purus eu varius. Integer molestie in leo
            et consectetur.
          </Text>
          <Text
            textAlign={{ base: 'center', xl: 'left' }}
            mb="25px"
            color={'primaryGray.100'}
            fontSize={'14px'}
          >
            Donec varius velit quis tellus eleifend iaculis. Aenean mi nulla,
            aliquam placerat orci non, maximus semper ligula.Etiam porta urna
            eget neque imperdiet efficitur. Aliquam odio orci, vehicula in
            interdum ultricies, bibendum in velit. Quisque pellentesque nibh ut
            sem elementum pulvinar. Integer bibendum, ligula a dapibus bibendum,
            massa lectus condimentum augue, sit amet rhoncus nibh arcu ut urna.
            Nam imperdiet id lectus sed vestibulum. Ut tempor libero sit amet
            metus fermentum ullamcorper. Nullam scelerisque iaculis purus eu
            varius. Integer molestie in leo et consectetur.
          </Text> */}
        </Box>
        {/* <Stack flexDir={{ base: 'column', xl: 'row' }} gap="60px" direction={'row'} justifyContent={'space-between'}>
                    <Box flex={1}>
                        <Heading textAlign={{ base: 'center', xl: 'left' }} fontSize={{ base: '32px', xl: '38px' }} fontWeight={'600'} color={'primaryBlack.100'} mb="35px">Nam imperdiet id lectus sed vestibulum</Heading>
                        <Text textAlign={{ base: 'center', xl: 'left' }} mb="25px" color={'primaryGray.100'} fontSize={'14px'}>Quisque pellentesque nibh ut sem elementum pulvinar. Integer bibendum, ligula a dapibus bibendum, massa lectus condimentum augue, sit amet rhoncus nibh arcu ut urna. Nam imperdiet id lectus sed vestibulum. Ut tempor libero sit amet metus fermentum ullamcorper. Nullam scelerisque iaculis purus eu varius. Integer molestie in leo et consectetur.</Text>
                        <Text textAlign={{ base: 'center', xl: 'left' }} mb="25px" color={'primaryGray.100'} fontSize={'14px'}>Donec varius velit quis tellus eleifend iaculis. Aenean mi nulla, aliquam placerat orci non, maximus semper ligula.Etiam porta urna eget neque imperdiet efficitur. Aliquam odio orci, vehicula in interdum ultricies, bibendum in velit. Quisque pellentesque nibh ut sem elementum pulvinar. Integer bibendum, ligula a dapibus bibendum, massa lectus condimentum augue, sit amet rhoncus nibh arcu ut urna. Nam imperdiet id lectus sed vestibulum. Ut tempor libero sit amet metus fermentum ullamcorper. Nullam scelerisque iaculis purus eu varius. Integer molestie in leo et consectetur.</Text>
                    </Box>
                    <Box flex={1}>
                        <Image src={doc} />
                    </Box>
                </Stack> */}
      </Container>
    </Container>
  );
}
