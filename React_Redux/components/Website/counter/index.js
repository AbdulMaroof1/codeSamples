import { Container, Heading, Stack, Text, Box, Image } from '@chakra-ui/react'
import CountUp from "react-countup";
import { useState } from "react";
import ScrollTrigger from "react-scroll-trigger";

export default function Counter() {
    const [counterOn, setCounterOn] = useState(false);

    return (
        <Stack py="60px"
        >
            <Container
                maxW={{ base: "1366px", xl: '6xl', '2xl': "6xl" }}
                bgGradient='linear(to-r, #295377, #208C74)'
                position={'relative'}
                py="40px"
                borderRadius={'25px'}
            >
                <ScrollTrigger onEnter={() => setCounterOn(true)} onExit={() => setCounterOn(false)}>
                    <Stack direction={'row'} flexDir={{ base: 'column', md: 'row' }}>
                        <Box
                            flex={1}
                            pr={'20px'}
                            borderRight={{ base: 'none', md: "1px solid #fff" }}
                        >
                            <Text
                                color={"#fff"}
                                fontSize={{ base: "32px", sm: "unset", md: "unset", lg: "40px", xl: "50px", "2xl": "50px" }}
                                lineHeight={"45px"}
                                fontWeight={"600"}
                                textAlign={"center"}
                            >
                                {counterOn && <CountUp start={"0"} end={"69"} duration={4} />}k+
                            </Text>
                            <Text
                                color={"#fff"}
                                fontSize={{ base: "unset", sm: "unset", md: "unset", lg: "16px", xl: "16px" }}
                                lineHeight={"45px"}
                                textAlign={"center"}
                            >
                                Satisfied Patients
                            </Text>
                        </Box>
                        <Box
                            flex={1}
                            pr={'20px'}
                            borderRight={{ base: 'none', md: "1px solid #fff" }}
                        >
                            <Text
                                color={"#fff"}
                                fontSize={{ base: "32px", sm: "unset", md: "unset", lg: "40px", xl: "50px", "2xl": "50px" }}
                                lineHeight={"45px"}
                                fontWeight={"600"}
                                textAlign={"center"}
                            >
                                {counterOn && <CountUp start={"0"} end={"236"} duration={4} />}k+
                            </Text>
                            <Text
                                color={"#fff"}
                                fontSize={{ base: "unset", sm: "unset", md: "unset", lg: "16px", xl: "16px" }}
                                lineHeight={"45px"}
                                textAlign={"center"}
                            >
                                Professional Doctors
                            </Text>
                        </Box>
                        <Box
                            flex={1}
                            pr={'20px'}
                            borderRight={{ base: 'none', md: "1px solid #fff" }}
                        >
                            <Text
                                color={"#fff"}
                                fontSize={{ base: "32px", sm: "unset", md: "unset", lg: "40px", xl: "50px", "2xl": "50px" }}
                                lineHeight={"45px"}
                                fontWeight={"600"}
                                textAlign={"center"}
                            >
                                {counterOn && <CountUp start={"0"} end={"19"} duration={4} />}k+
                            </Text>
                            <Text
                                color={"#fff"}
                                fontSize={{ base: "unset", sm: "unset", md: "unset", lg: "16px", xl: "16px" }}
                                lineHeight={"45px"}
                                textAlign={"center"}
                            >
                                Operations Successful
                            </Text>
                        </Box>
                        <Box
                            flex={1}
                            pr={'20px'}
                        >
                            <Text
                                color={"#fff"}
                                fontSize={{ base: "32px", sm: "unset", md: "unset", lg: "40px", xl: "50px", "2xl": "50px" }}
                                lineHeight={"45px"}
                                fontWeight={"600"}
                                textAlign={"center"}
                            >
                                {counterOn && <CountUp start={"0"} end={"320"} duration={4} />}k+
                            </Text>
                            <Text
                                color={"#fff"}
                                fontSize={{ base: "unset", sm: "unset", md: "unset", lg: "16px", xl: "16px" }}
                                lineHeight={"45px"}
                                textAlign={"center"}
                            >
                                Experts Hospitals
                            </Text>
                        </Box>
                    </Stack>
                </ScrollTrigger>
            </Container>
        </Stack>
    )
}
