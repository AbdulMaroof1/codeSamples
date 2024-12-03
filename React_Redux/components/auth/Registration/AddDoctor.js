import React, { useEffect, useState } from 'react';
import DashboardHeader from '../../../components/Header/DashboardHeader';
import MainDashboard from '../../../components/DashNav/MainDashboard';
import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
  useToast,
  useDisclosure,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  Image,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';
import { PhoneInput } from 'react-international-phone';
import { FaRegTrashAlt } from 'react-icons/fa';
import { AttachmentIcon } from '@chakra-ui/icons';
import LogoIcon from '../../../assets/images/website/logoIcon.jpg';

import { GET, POST } from '../../../utilities/ApiProvider';
import { Country, City } from 'country-state-city';

export default function AddDoctor() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [openingHours, setOpeningHours] = useState([
    {
      on: true,
      day: 'Monday',
      startTime: '09:00',
      endTime: '22:00',
    },
    {
      on: true,
      day: 'Tuesday',
      startTime: '09:00',
      endTime: '22:00',
    },
    {
      on: true,
      day: 'Wednesday',
      startTime: '09:00',
      endTime: '22:00',
    },
    {
      on: true,
      day: 'Thursday',
      startTime: '09:00',
      endTime: '22:00',
    },
    {
      on: true,
      day: 'Friday',
      startTime: '09:00',
      endTime: '22:00',
    },
    {
      on: true,
      day: 'Saturday',
      startTime: '09:00',
      endTime: '22:00',
    },
    {
      on: true,
      day: 'Sunday',
      startTime: '09:00',
      endTime: '22:00',
    },
  ]);
  const toast = useToast();
  const [departments, setDepartments] = useState(null);
  async function fetchDepartments() {
    try {
      const response = await GET('/hospital/department');
      console.log(response);
      if (response.status === 200) setDepartments(response.data);
    } catch (error) {
      console.log('Error while fetching departments', error);
    }
  }

  const handleFileChange = event => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleButtonClick = () => {
    document.getElementById('file-input').click();
  };

  const handleFileChange2 = event => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleButtonClick2 = () => {
    document.getElementById('file-input').click();
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const form = new FormData(e.target);
      form.append('role', '666c66a53ed6aa52cb950788');
      const formDataEntries = Array.from(form.entries());
      console.log(formDataEntries.map(([key, value]) => ({ [key]: value })));
      const response = await POST('/hospital/doctor-onboarding-web', form);
      console.log(response);
      if (response.status === 200) {
        setLoading(false);
        toast({
          description: 'Health Practitioner created Sucessfully!!',
          status: 'success',
          isClosable: true,
          position: 'top-right',
          duration: 3000,
        });
        setLoading(false);
        e.target.reset();
        setSelectedFile(null);
      } else {
        toast({
          description: response?.message,
          status: 'error',
          isClosable: true,
          position: 'top-right',
          duration: 3000,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log('Erorr while submitting form ', error);
    }
  };
  const handleCountryChange = e => {
    const countryCode = e.target.value?.split('-')[1].trim();

    const fetchedCities = City.getCitiesOfCountry(countryCode);
    console.log(fetchedCities, countryCode);
    setCities(fetchedCities);
  };
  useEffect(() => {
    const countryData = Country.getAllCountries().map(country => ({
      value: country.isoCode,
      displayValue: `${country.name} - ${country.isoCode}`,
    }));
    setCountries(countryData);
  }, []);

  return (
    <Stack>
      <Modal size={'6xl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={'12px'}>
          <ModalCloseButton />
          <Image my={5} src={LogoIcon} display={'flex'} mx="auto" />
          <Heading
            fontSize={'26px'}
            fontWeight={'500'}
            my="15px"
            transition={'.3s'}
            _groupHover={{ color: 'primaryBlack.100' }}
            px={'25px'}
          >
            Agreement of Contract:
          </Heading>
          <ModalBody p="25px" className="modalBody">
            <Box>
              <Text mb={4}>
                We thank you for choosing emedii.com to obtain its services if
                you wish. Please note that by electronically agreeing to this
                agreement, you agree to the terms and conditions and privacy
                policy contained therein as stated below, and to join with your
                legal capacity and agree to the following:
              </Text>
              <Text fontWeight="bold">
                1. The preceding preamble shall form an integral part of this
                agreement.
              </Text>
              <Text mt={4}>2. Definitions:</Text>
              <Text ml={4}>
                2.1 <b>emedii.com:</b> It is a brokerage platform and website
                for marketing a group of services in the health field, aiming to
                provide its services to three categories: patients, hospitals,
                and health practitioners. This platform belongs to ………………..….Co.
                with address at ……………………………………………………. .
              </Text>
              <Text ml={4}>
                2.2 <b>Platform and Website User:</b> Every health practitioner
                who was able to register on the platform and website and use the
                services provided by it.
              </Text>
              <Text ml={4}>
                2.3 <b>Health Practitioners:</b> They are the people who provide
                preventive, curative and rehabilitative medical services in
                medical facilities. They are classified into doctors,
                pharmacists, nurses, health specialists other than doctors, and
                paramedics.
              </Text>
              <Text ml={4}>
                2.4 <b>Basic Information:</b> This means the basic information
                of the health practitioner, such as his name, photo, address,
                and email.
              </Text>
              <Text ml={4}>
                2.5{' '}
                <b>Qualification and Professional Experience Information:</b>{' '}
                This means the information that includes academic degrees,
                general specialty, subspecialty, professional classification,
                years of experience, and medical services.
              </Text>
              <Text ml={4}>
                2.6 <b>Agreement:</b> This means the agreement for the health
                practitioner to obtain emedii.com services, the conditions
                contained therein, and the privacy policy, accepted
                electronically by the health practitioner.
              </Text>
              <Text ml={4}>
                2.7 <b>Password and Username:</b> This means, respectively, a
                password and a username with features issued by the website and
                platform (emedii.com) for the health practitioner.
              </Text>
              <Text ml={4}>
                2.8 <b>Information Protection Laws:</b> means all laws,
                regulations, and any other legislation issued and in effect at
                the headquarters of emedii.com to regulate the privacy,
                processing, and obtaining of personal information.
              </Text>
              <Text ml={4}>
                2.9 <b>Marketing Offers:</b> These mean discounts granted by
                stores around the world to health practitioners who hold valid
                membership of emedii.com.
              </Text>
              <Text ml={4}>
                2.10 <b>Membership:</b> It is when the health practitioner
                obtains a membership number in emedii.com that enables him to
                obtain the services provided by it.
              </Text>
              <Text mt={4} fontWeight="bold">
                3. Services Provided by emedii.com to Health Practitioners:
              </Text>
              <Text ml={4}>
                3.1 Searching for job opportunities for health practitioners who
                wish to do so, whether the required employment contracts are
                permanent, temporary, or part-time.
              </Text>
              <Text ml={4}>
                3.2 Providing sources of medical information for health
                practitioners, including scientific medical journals, scientific
                medical books – scientific medical articles, and medical
                research studies.
              </Text>
              <Text ml={4}>
                3.3 Providing admission opportunities to medical education and
                training programs in coordination with the specialized centers
                that provide these programs.
              </Text>
              <Text ml={4}>
                3.4 Displaying information and experiences of health
                practitioners on emedii.com to hospitals and patients searching
                for their services and facilities where they are provided.
              </Text>
              <Text ml={4}>
                3.5 Obtaining marketing offers and discounts offered by stores
                around the world for health practitioners who have valid
                memberships in emedii.com.
              </Text>
              <Text ml={4}>
                3.6 Publishing and displaying medical content on emedii.com to
                health practitioners who wish to do so.
              </Text>
              <Text mt={4} fontWeight="bold">
                4. Obligations of emedii.com Towards Health Practitioners
                Registered on the Website and Platform:
              </Text>
              <Text ml={4}>
                4.1 emedii.com is committed to displaying the health
                practitioner’s professional information and expertise as stated
                in the terms of this agreement.
              </Text>
              <Text ml={4}>
                4.2 emedii.com is committed to the health practitioner to
                providing him with the ability to add, delete, and cancel his
                information throughout the subscription period within (24)
                hours.
              </Text>
              <Text ml={4}>
                4.3 emedii.com is committed to the health practitioner to
                providing free registration and subscription.
              </Text>
              <Text ml={4}>
                4.4 emedii.com is not considered, in any way, to be involved in
                or associated in any way with any advertisements, logos, or
                other means or commercial, service symbols, or any other means
                used on websites linked to the emedii.com platform and website
                or any of its contents.
              </Text>
              <Text mt={4} fontWeight="bold">
                5. Obligations of the Health Practitioner Towards emedii.com:
              </Text>
              <Text ml={4}>
                5.1 Maintaining the username and password given to him by
                emedii.com.
              </Text>
              <Text ml={4}>
                5.2 Filling out all required data completely and correctly.
              </Text>
              <Text ml={4}>
                5.3 Ensuring that the health practitioner’s contact information,
                including mobile number and email, through which the service
                will be provided to him is correct.
              </Text>
              <Text ml={4}>
                5.4 Abstaining from announcing the provision of a medical
                treatment service that may place emedii.com in violation of any
                law or regulation applied in any field.
              </Text>
              <Text ml={4}>
                5.5 Abstaining from providing any illegal or unlawful service
                through emedii.com.
              </Text>
              <Text ml={4}>
                5.6 Abstaining from displaying data or services that contain
                defamation, violation of laws, pornographic or obscene
                materials, violation of public morals, or illegal materials or
                information through emedii.com.
              </Text>
              <Text ml={4}>
                5.7 Abstaining from uploading files containing software,
                materials, data, or information that he does not own or for
                which he does not have a license.
              </Text>
              <Text ml={4}>
                5.8 Abstaining from uploading files onto emedii.com that contain
                viruses or corrupted data.
              </Text>
              <Text ml={4}>
                5.9 Abstaining from using any means, program, or procedure to
                intercept or attempt to intercept the correct configuration of
                emedii.com.
              </Text>
              <Text ml={4}>
                5.10 Abstaining from taking any action that exposes immovable or
                large work in a way that constitutes a burden on the
                infrastructure of emedii.com.
              </Text>
              <Text ml={4}>
                5.11 The information that the health practitioner publishes via
                emedii.com shall not have the right to ownership or the right to
                guarantee its confidentiality. Also, any use or interaction on
                emedii.com does not guarantee the user any rights, license, or
                any privileges of any kind.
              </Text>
              <Text mt={4} fontWeight="bold">
                6. Limits of Liability:
              </Text>
              <Text ml={4}>
                The electronic services provided by emedii.com and the
                information contained therein regarding the health practitioner
                are provided only for him to obtain its services, as well as to
                introduce him to patients and medical facilities seeking his
                services. Thus, the health practitioner acknowledges his full
                knowledge that communications via the Internet may be exposed to
                interference or interception by third parties, and emedii.com
                does not replace the information available through the health
                practitioner, and therefore resorting to emedii.com remains
                under the health practitioner’s own responsibility. Also,
                emedii.com will in no way be responsible for any loss or damage
                of any kind that the health practitioner may incur due to using
                or visiting the site and the platform, or relying on any data or
                opinion on emedii.com, or resulting from any delay in operation,
                connection failure, problems accessing Internet networks,
                equipment or software malfunctions, or the behavior or thoughts
                of any person accessing emedii.com. The health practitioner
                hereby acknowledges and agrees that his sole and exclusive means
                of remedying any damage or loss that may occur as a result of
                his access or use of the site and platform is to refrain from
                using it, accessing it, or discontinuing it.
              </Text>
              <Text mt={4} fontWeight="bold">
                7. Termination of Use:
              </Text>
              <Text ml={4}>
                emedii.com may, in its absolute discretion, terminate, restrict,
                or suspend the health practitioner’s right to access and use its
                website and platform without notice and for any reason,
                including violation of the terms or conditions of this agreement
                or any other conduct that it may consider, in its sole
                discretion, illegal or harmful to others. If this is proved, the
                health practitioner will not be authorized to access emedii.com.
              </Text>
              <Text mt={4} fontWeight="bold">
                8. Compensation:
              </Text>
              <Text ml={4}>
                The health practitioner acknowledges that he will not take any
                action against emedii.com, or any of its management and that he
                will not be responsible for any entities or employees who are
                responsible for managing, maintaining, or updating emedii.com,
                for any claim, obligations, or responsibilities that may relate
                to any claim arising from a breach on his part of the terms and
                conditions of the agreement and the privacy policy or any of the
                applicable laws, whether at the headquarters of emedii.com or
                the place where the health practitioner resides.
              </Text>
              <Text mt={4} fontWeight="bold">
                9. Propriety Rights:
              </Text>
              <Text ml={4}>
                The materials available on emedii.com are protected by
                copyrights, trademarks, and other proprietary rights. Except as
                otherwise stated, the Health Practitioner may not sell, license,
                rent, modify, copy, reproduce, reprint, upload, transmit,
                distribute, publicly display, edit, or create derivative works
                from any materials or contents from the website and the platform
                to the public or for commercial purposes, without obtaining the
                prior written consent of emedii.com. Any modification of any of
                the contents of the website and the platform is strictly
                prohibited. The graphics and images therein are protected by
                copyright and may not be reproduced or exploited in any way
                without obtaining prior permission from emedii.com.
              </Text>
              <Text mt={4} fontWeight="bold">
                10. Privacy Policy:
              </Text>
              <Text ml={4}>
                Providing the health practitioner with his data, personal
                information, and professional expertise to emedii.com
                constitutes consent to the storage, processing, and use of that
                data by emedii.com and sharing it with parties that achieve its
                goals. It may also be provided to the entities that provide its
                services, medical facilities, and patients to introduce them to
                the health practitioner. It has the right at all times to
                disclose any information to the competent authorities when this
                is necessary to comply with any law, regulation, or government
                request. The health practitioner is solely responsible for the
                completeness, validity, and truthfulness of the personal
                information and professional experiences that he has completed
                on the website. emedii.com shall do its best to secure health
                practitioner information using appropriate security
                technologies. emedii.com may contain electronic links to sites
                or portals that may use methods to protect information and its
                privacy that differ from those used by it. It is not responsible
                for the contents and methods of privacy of other sites and
                advises referring to the privacy notices of those sites. The
                health practitioner acknowledges his consent to receive notices,
                notifications, and announcements on the number registered on
                emedii.com or to use it for the purposes of verification and
                authentication of the electronic services of any public or
                private entity, and acknowledges his responsibility for the
                resulting legal effects.
              </Text>
              <Text mt={4} fontWeight="bold">
                11. Judicial Authority and Settlement of Disputes:
              </Text>
              <Text ml={4}>
                This agreement shall be governed by and construed in accordance
                with the laws and regulations applicable at emedii.com's
                headquarters. Any dispute that arises between the two parties,
                if it cannot be resolved amicably between them, shall be decided
                by the competent courts at the headquarters of emedii.com.
              </Text>
              <Text textAlign="center" mt={4}>
                ✅ We agree to subscribe and to the terms and conditions and
                privacy policy.
              </Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Stack>
        <Heading fontSize={'36px'} fontWeight={'500'}>
          Add New Health Practitioners
        </Heading>
        <Text fontSize={'15px'} color={'#75767A'} fontWeight={'400'}>
          Enter the doctor details to add
        </Text>
      </Stack>
      <form onSubmit={handleSubmit} className="applyForm" id="registerForm">
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Box
            w="100%"
            display={'flex'}
            flexWrap={'wrap'}
            justifyContent={'space-between'}
          >
            {/* <Box w="100%" mb="10px">
              <FormLabel>Practitioner Category*</FormLabel>
              <Select name="category" placeholder="Enter here">
                {categories?.map(category => (
                  <option value={category._id}>{category.name}</option>
                ))}
              </Select>
            </Box> */}

            <Heading
              w="100%"
              fontSize={'20px'}
              fontWeight={'500'}
              color={'primaryBlack.100'}
              my="10px"
            >
              Health Practitioner Particulars
            </Heading>
            <Box w="48%" mb="10px">
              <FormLabel>First Name*</FormLabel>
              <Input name="name" placeholder="Enter here" />
            </Box>
            <Box w="48%" mb="10px">
              <FormLabel>Family Name*</FormLabel>
              <Input name="familyName" placeholder="Enter here" />
            </Box>
            {/* <Box w="48%" mb="10px">
              <FormLabel>Employer</FormLabel>
              <Input name="employer" placeholder="Enter here" />
            </Box> */}
            <Box w="100%" mb="10px">
              <FormLabel>Age*</FormLabel>
              <Input type="number" name="age" placeholder="Enter here" />
            </Box>
            <Box w="100%" mb="10px">
              <FormLabel>Nationality*</FormLabel>
              <Input type="text" name="nationality" placeholder="Enter here" />
            </Box>
            <Box w="100%" mb="10px">
              <FormLabel>Address*</FormLabel>
              <Input type="text" name="address" placeholder="Enter here" />
            </Box>
            <Box w="100%" mb="10px">
              <FormLabel>Email</FormLabel>
              <Input name="email" placeholder="Enter here" />
            </Box>
            <Box w="100%" mb="10px">
              <FormLabel>Gender*</FormLabel>
              <Select name="gender" placeholder="Choose here">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Select>
            </Box>
            <Box w="100%" mb="10px">
              <FormLabel>Phone No.*</FormLabel>
              <PhoneInput
                name="number"
                required
                containerStyle={{ background: 'none', border: 'none' }}
                inputStyle={{ background: 'none', border: 'none' }}
                dropdownStyle={{ background: 'none', border: 'none' }}
                id="phone-input"
                defaultCountry="sa"
                inputClass="custom-phone-input"
              />
            </Box>
            <Box width={'100%'} mb="10px">
              <FormLabel>Country</FormLabel>
              <Select
                name="country"
                onChange={handleCountryChange}
                placeholder="Select option"
              >
                {countries.map(country => (
                  <option key={country.isoCode} value={country.isoCode}>
                    {country.displayValue}
                  </option>
                ))}
              </Select>
            </Box>
            <Box width={'100%'} mb="10px">
              <FormLabel>City</FormLabel>
              <Select name="city" placeholder="Select option">
                {cities.map(city => (
                  <option
                    key={city?.name?.toLowerCase()}
                    value={city?.name?.toLowerCase()}
                  >
                    {city.name}
                  </option>
                ))}
              </Select>
            </Box>
            <Heading
              w="100%"
              fontSize={'20px'}
              fontWeight={'500'}
              color={'primaryBlack.100'}
              my="10px"
            >
              Professional Data of the Health Practitioner
            </Heading>
            <Box w="48%" mb="10px">
              <FormLabel>General Specialty</FormLabel>
              <Select name="generalSpeciality" placeholder="Select here">
                <option value="medicine">Medicine</option>
                <option value="general-surgery">General Surgery</option>
                <option value="pediatric">Pediatric</option>
                <option value="obstetrics-gynecology">
                  Obstetrics and Gynecology
                </option>
                <option value="ophthalmology">Ophthalmology</option>
                <option value="ent">Ear Nose and Throat (ENT)</option>
                <option value="dermatology">Dermatology</option>
                <option value="dental">Dental</option>
                <option value="cardiology">Cardiology</option>
                <option value="pulmonologist">Pulmonologist</option>
                <option value="endocrinology">Endocrinology</option>
                <option value="diabetics">Diabetics</option>
                <option value="thoracic-surgery">Thoracic Surgery</option>
                <option value="infertility">Infertility</option>
                <option value="orthopedic">Orthopedic</option>
                <option value="urology">Urology</option>
                <option value="pediatric-surgery">Pediatric Surgery</option>
                <option value="vascular-surgery">Vascular Surgery</option>
                <option value="rheumatology">Rheumatology</option>
                <option value="hematology">Hematology</option>
                <option value="neurology">Neurology</option>
                <option value="neurosurgery">Neurosurgery</option>
                <option value="plastic-surgery">Plastic Surgery</option>
              </Select>
              {/* <Input name="generalSpeciality" placeholder="Enter here" /> */}
            </Box>
            <Box w="48%" mb="10px">
              <FormLabel>Subspecialty</FormLabel>
              <Input name="subspeciality" placeholder="Enter here" />
            </Box>
            <Box w="48%" mb="10px">
              <FormLabel>Academic Qualification</FormLabel>
              <Input name="academicQualification" placeholder="Enter here" />
            </Box>
            <Box w="48%" mb="10px">
              <FormLabel>Years of experience</FormLabel>
              <Input name="yearsOfExperience" placeholder="Enter here" />
            </Box>
            <Box w="100%" mb="10px">
              <FormLabel>Category*</FormLabel>
              <Select name="doctorCategory" placeholder="Choose here">
                <option value="physician">Physician</option>
                <option value="dentist">Dentist</option>
                <option value="pharmacist">Pharmacist</option>
                <option value="nurse">Nurse</option>
                <option value="health specialist">Health Specialist</option>
                <option value="paramedic">Paramedic</option>
                <option value="health assistant">Health Assistant</option>
                <option value="health college student">
                  Health College Student
                </option>
              </Select>
            </Box>
            <Box w="100%" mb="10px">
              <FormLabel>Medical Treatment Services</FormLabel>
              <Input name="medicalTreatmentService" placeholder="Enter here" />
            </Box>
            <Box w="100%" mb="10px">
              <FormLabel>Health Practitioner Price</FormLabel>
              <Input type="number" name="charges" placeholder="Enter here" />
            </Box>
            <Box w="100%">
              <FormLabel>Photo</FormLabel>
              <Input
                name="photo"
                type="file"
                id="file-input"
                required
                display="none"
                onChange={handleFileChange}
              />
              <Text fontSize="14px" color="primaryGray.100" textAlign={'right'}>
                <Button
                  cursor={'pointer'}
                  as="span"
                  border="1px solid #75767A"
                  mb="10px"
                  bgColor="transparent"
                  fontSize="14px"
                  w="100%"
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
            <Box w="100%" mb={'10px'}>
              <Box w="100%" mb="10px">
                <HStack alignItems="center" py="10px">
                  <Checkbox
                    colorScheme="blue"
                    onChange={e => setAgreeToTerms(e.target.checked)}
                  ></Checkbox>
                  <Text fontSize="14px" color="primaryGray.100">
                    Review and accept the{' '}
                    <Link
                      color="blue.500"
                      cursor={'pointer'}
                      textDecoration="underline"
                      onClick={onOpen}
                    >
                      "Agreement Contract"
                    </Link>{' '}
                    to proceed further{' '}
                  </Text>
                </HStack>
              </Box>
            </Box>
            <Box mt="20px">
              <Button
                bgGradient={'linear(to-r, #295377, #208C74)'}
                fontSize={'16px'}
                fontWeight={500}
                color={'#fff'}
                borderRadius={'25px'}
                h="45px"
                px="80px"
                type="submit"
                isLoading={loading}
                disabled={!agreeToTerms}
                border={'2px solid transparent'}
                _hover={{
                  bgGradient: 'none',
                  borderColor: 'primaryGreen.200',
                  color: 'primaryGreen.200',
                }}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Stack>
      </form>
    </Stack>
  );
}
