import {
  Button,
  Container,
  Heading,
  Icon,
  Image,
  Stack,
  Text,
  Box,
  FormLabel,
  Input,
  Checkbox,
  useToast,
} from '@chakra-ui/react';
import SerBg from '../../../assets/images/website/serBg.png';
import headingIcon from '../../../assets/images/website/headingIcon.svg';
import {
  FaChevronLeft,
  FaChevronRight,
  FaHeartbeat,
  FaRegCalendar,
  FaStar,
} from 'react-icons/fa';
import { BiBed } from 'react-icons/bi';
import { MdPersonalVideo, MdFlight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useRef, useState } from 'react';
import bannerBg from '../../../assets/images/website/banner.svg';
import expert1 from '../../../assets/images/website/expert1.svg';
import expert2 from '../../../assets/images/website/expert2.svg';
import expert3 from '../../../assets/images/website/expert3.svg';
import { AttachmentIcon } from '@chakra-ui/icons';
import { POST } from '../../../utilities/ApiProvider';

export default function ApplyForm({ id }) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [contractType, setContractType] = useState('Annual');
  const [requestedEmploymentCountry, setRequestedEmploymentCountry] = useState(
    'Desired Employment Country'
  );
  const handleFileChange = event => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleButtonClick = () => {
    document.getElementById('file-input').click();
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const form = new FormData(e.target);
      form.append('job', id);
      form.append('contract', contractType);
      console.log(
        Array.from(form.entries())?.forEach(([key, value]) =>
          console.log(key, value)
        )
      );
      const response = await POST(`/web/job/${id}/apply`, form);

      toast({
        description:
          response.status === 200
            ? 'Thank you for applying'
            : response?.message,
        status: response.status === 200 ? 'success' : 'error',
        isClosable: true,
        position: 'top-right',
        duration: 3000,
      });
    } catch (err) {
      toast({
        description: err?.message,
        status: 'error',
        isClosable: true,
        position: 'top-right',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
      e.target.reset();
      setSelectedFile(null);
    }
  };

  return (
    <Container py="60px" maxW={{ base: '1366px', xl: '6xl', '2xl': '8xl' }}>
      <Container maxW={{ base: '1366px', xl: '6xl', '2xl': '6xl' }}>
        <Heading
          fontSize={{ base: '32px', xl: '38px' }}
          fontWeight={'600'}
          color={'primaryBlack.100'}
          mb="35px"
        >
          Neurologist Required
        </Heading>
        <Text
          mb="25px"
          color={'primaryGray.100'}
          fontSize={{ base: '12px', xl: '14px' }}
        >
          Quisque pellentesque nibh ut sem elementum pulvinar. Integer bibendum,
          ligula a dapibus bibendum, massa lectus condimentum augue, sit amet
          rhoncus nibh arcu ut urna. Nam imperdiet id lectus sed vestibulum. Ut
          tempor libero sit amet metus fermentum ullamcorper. Nullam scelerisque
          iaculis purus eu varius. Integer molestie in leo et consectetur.
        </Text>
        <Box flex={1} my="40px" textAlign={'center'}>
          <Heading
            mb="15px"
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
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
              Careers
            </Text>
          </Heading>
          <Heading
            fontSize={'38px'}
            fontWeight={'600'}
            color={'primaryBlack.100'}
            mb="35px"
          >
            Submit Your Details
          </Heading>
        </Box>
        <form onSubmit={handleSubmit} className="applyForm">
          <Stack
            spacing={0}
            direction={'row'}
            flexWrap={'wrap'}
            justifyContent={'space-between'}
          >
            <Box w={{ base: '100%', xl: '48%' }}>
              <FormLabel>Full Name</FormLabel>
              <Input required name="fullName" placeholder="Enter here" />
            </Box>
            <Box w={{ base: '100%', xl: '48%' }}>
              <FormLabel>Gender</FormLabel>
              <Input required name="gender" placeholder="Enter here" />
            </Box>
            <Box w={{ base: '100%', xl: '48%' }}>
              <FormLabel>Age</FormLabel>
              <Input required name="age" placeholder="Enter here" />
            </Box>
            <Box w={{ base: '100%', xl: '48%' }}>
              <FormLabel>General Specialty</FormLabel>
              <Input
                required
                name="generalSpeciality"
                placeholder="Enter here"
              />
            </Box>
            <Box w={{ base: '100%', xl: '48%' }}>
              <FormLabel>Subspecialty</FormLabel>
              <Input required name="subspecialty" placeholder="Enter here" />
            </Box>
            <Box w={{ base: '100%', xl: '48%' }}>
              <FormLabel>Profesional Classification Degree</FormLabel>
              <Input
                name="profesionalClassificationDegree"
                placeholder="Enter here"
                required
              />
            </Box>
            <Box w={{ base: '100%', xl: '48%' }}>
              <FormLabel>Academic Qualification</FormLabel>
              <Input
                required
                name="academicQualification"
                placeholder="Enter here"
              />
            </Box>
            <Box w={{ base: '100%', xl: '48%' }}>
              <FormLabel>Years of Experience</FormLabel>
              <Input
                required
                name="yearsOfExperience"
                placeholder="Enter here"
              />
            </Box>

            <Heading
              fontSize={'18px'}
              color={'primaryBlack.100'}
              mb="20px !important"
            >
              Type of Contract Required:
            </Heading>
            <Box w="100%" className="checkboxFamily">
              <FormLabel>Choose an option</FormLabel>
              <Stack
                direction={'row'}
                spacing={0}
                gap="10px"
                flexDir={{ base: 'column', xl: 'row' }}
                justifyContent={'space-between'}
              >
                <Box w={{ base: '100%', xl: '31%' }}>
                  <Checkbox
                    isChecked={contractType === 'Annual'}
                    onChange={e => setContractType(e.target.value)}
                    value={'Annual'}
                    colorScheme="teal"
                  >
                    Annual
                  </Checkbox>
                </Box>
                <Box w={{ base: '100%', xl: '31%' }}>
                  <Checkbox
                    isChecked={contractType === 'Partial'}
                    onChange={e => setContractType(e.target.value)}
                    value={'Partial'}
                    colorScheme="teal"
                  >
                    Partial
                  </Checkbox>
                </Box>
                <Box w={{ base: '100%', xl: '31%' }}>
                  <Checkbox
                    isChecked={contractType === 'Temporary'}
                    onChange={e => setContractType(e.target.value)}
                    value={'Temporary'}
                    colorScheme="teal"
                  >
                    Temporary
                  </Checkbox>
                </Box>
              </Stack>
            </Box>
            <Heading
              fontSize={'18px'}
              color={'primaryBlack.100'}
              mb="20px !important"
            >
              Requested Employment Country:
            </Heading>
            <Box w="100%" className="checkboxFamily">
              <FormLabel>Choose an option</FormLabel>
              <Stack
                spacing={0}
                gap="10px"
                direction={'row'}
                flexDir={{ base: 'column', xl: 'row' }}
                justifyContent={'space-between'}
              >
                <Box w={{ base: '100%', xl: '49%' }}>
                  <Checkbox
                    colorScheme="teal"
                    isChecked={
                      requestedEmploymentCountry ===
                      'Desired Employment Country'
                    }
                    value={'Desired Employment Country'}
                    onChange={e =>
                      setRequestedEmploymentCountry(e.target.value)
                    }
                  >
                    Desired Employment Country
                  </Checkbox>
                </Box>
                <Box w={{ base: '100%', xl: '49%' }}>
                  <Checkbox
                    colorScheme="teal"
                    isChecked={
                      requestedEmploymentCountry === 'A Specific Country'
                    }
                    value={'A Specific Country'}
                    onChange={() =>
                      setRequestedEmploymentCountry('A Specific Country')
                    }
                  >
                    A Specific Country
                  </Checkbox>
                </Box>
                {/* <Box w={{ base: '100%', xl: '31%' }}>
                  <Checkbox colorScheme="teal">Select</Checkbox>
                </Box> */}
              </Stack>
            </Box>
            <Box w={{ base: '100%', xl: '48%' }}>
              <FormLabel>Request Contract Duration</FormLabel>
              <Input
                required
                name="requestContractDuration"
                placeholder="Enter here"
              />
            </Box>
            <Box w={{ base: '100%', xl: '48%' }}>
              <FormLabel>Request Salary</FormLabel>
              <Input
                required
                name="requestContractSalary"
                placeholder="Enter here"
              />
            </Box>
            <Box w={{ base: '100%', xl: '48%' }}>
              <FormLabel>A specific amount in US Dollars per month</FormLabel>
              <Input required name="salaryPerMonth" placeholder="Enter here" />
            </Box>
            <Box w={{ base: '100%', xl: '48%' }}>
              <FormLabel>Determined by Employer</FormLabel>
              <Input
                required
                name="determinedByEmployer"
                placeholder="Enter here"
              />
            </Box>
            <Box w="100%">
              <FormLabel>
                You can attach a copy of your academic certificates and
                professional experience, if any
              </FormLabel>
              <Input
                name="document"
                type="file"
                id="file-input"
                required
                display="none"
                onChange={handleFileChange}
              />
              <Text fontSize="14px" color="primaryGray.100">
                <Button
                  cursor={'pointer'}
                  as="span"
                  border="1px solid #75767A"
                  bgColor="transparent"
                  fontSize="14px"
                  color="primaryGray.100"
                  transition=".3s"
                  _hover={{
                    bgColor: 'primaryGreen.200',
                    color: '#fff',
                    borderColor: 'primaryGreen.200',
                  }}
                  mr="10px"
                  onClick={handleButtonClick}
                >
                  <AttachmentIcon mr="10px" /> Attach File
                </Button>
                {selectedFile ? selectedFile.name : 'No File chosen'}
              </Text>
            </Box>
            <Box w="100%" display={'flex'} justifyContent={'center'}>
              <Box w="100%" display={'flex'} justifyContent={'center'}>
                <Button
                  bgGradient={'linear(to-r, #295377, #208C74)'}
                  fontSize={'14px'}
                  isLoading={isLoading}
                  fontWeight={500}
                  color={'#fff'}
                  w={'100%'}
                  borderRadius={'25px'}
                  px="80px"
                  h="45px"
                  textTransform={'uppercase'}
                  border={'1px solid primaryGreen.200'}
                  _hover={{
                    bgGradient: 'none',
                    border: '2px solid',
                    borderColor: 'primaryGreen.200',
                    color: 'primaryGreen.200',
                  }}
                  type="submit"
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </Stack>
        </form>
      </Container>
    </Container>
  );
}
