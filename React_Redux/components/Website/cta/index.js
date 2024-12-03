import { Container, Heading, Stack, Text, Box, Image } from '@chakra-ui/react'
import GoogleBtn from '../../../assets/images/website/googleDownloadBtn.svg'
import AppleBtn from '../../../assets/images/website/appleDownloadBtn.svg'
import Docs from '../../../assets/images/website/doc.svg'

export default function Cta() {

    return (
        <Container
            py="60px"
            bgGradient='linear(to-r, #295377, #208C74)'
            maxW={{ base: "1366px", xl: '6xl', '2xl': "8xl" }}
        >
            <Container
                maxW={{ base: "1366px", '2xl': "6xl" }}
                position={'relative'}
                textAlign={{ base: 'center', xl: 'left' }}
            >
                <Heading fontSize={{ base: '22px', xl: '38px' }} fontWeight={'600'} color={'#fff'} mb="15px">We’re welcoming new patients <br /> and can’t wait to meet you!</Heading>
                <Text mb="45px" color={'#fff'} fontSize={{ base: '12px', xl: '14px' }}>A brief statement outlining the purpose and mission of the clinic. This can include the
                    <br /> commitment to patient care, community health, and any specific goals or values. Specify
                    <br /> the types of medical services provided</Text>
                <Stack direction={'row'} justifyContent={{ base: 'center', xl: 'start' }} w="100%">
                    <Image width={{ base: '120px', xl: 'initial' }} src={AppleBtn} mr="20px" />
                    <Image width={{ base: '120px', xl: 'initial' }} src={GoogleBtn} />
                </Stack>
                <Image src={Docs} position={'absolute'} right="-50px" top={'-105px'} display={{ base: 'none', xl: 'initial' }} />
            </Container>
        </Container>
    )
}
