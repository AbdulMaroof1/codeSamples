import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  Textarea,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Image,
  useToast,
  ModalHeader,
  Select,
  HStack,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import 'react-international-phone/style.css';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import LogoIcon from '../../../assets/images/website/logoIcon.jpg';
import { POST } from '../../../utilities/ApiProvider';
import { Country, City } from 'country-state-city';

export default function RegistrationForm({
  registrationLvl,
  setRegistrationLvl,
}) {
  const toast = useToast();
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isSuccessOpen,
    onOpen: onSuccessOpen,
    onClose: onSuccessClose,
  } = useDisclosure();

  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
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

  const showFormData = async () => {
    setIsLoading(true);
    try {
      let form = document.getElementById('registerForm');
      let data = new FormData(form);

      let socialLinks = [
        { platform: 'facebook', url: data.get('facebook') },
        { platform: 'instagram', url: data.get('instagram') },
        { platform: 'twitter', url: data.get('twitter') },
        { platform: 'whatsapp', url: data.get('whatsapp') },
      ];

      data.append('socialLinks', JSON.stringify(socialLinks));
      data.append('opening_hours', JSON.stringify(openingHours));

      data.delete('facebook');
      data.delete('instagram');
      data.delete('twitter');
      data.delete('whatsapp');

      let res = await POST(`/authentication/hospital`, data);

      toast({
        description:
          res?.status === 200 ? 'Application Submitted!' : res?.message,
        status: res?.status === 200 ? 'success' : 'error',
        isClosable: true,
        position: 'top-right',
        duration: 3000,
      });

      if (res.status === 200) {
        onSuccessOpen();
      }
    } catch (err) {
      toast({
        description: err?.message,
        status: 'error',
        isClosable: true,
        position: 'top-right',
        duration: 3000,
      });
    }
    setIsLoading(false);
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
      <Heading fontWeight={'500'} color={'primaryBlack.100'} fontSize={'32px'}>
        Register your hospital
      </Heading>
      <Text
        fontWeight={'500'}
        color={'primaryGray.100'}
        fontSize={'14px'}
        pb="20px"
      >
        Enter your hospital details to register
      </Text>

      <form className="applyForm" id="registerForm">
        <FirstLevelForm
          registrationLvl={registrationLvl}
          cities={cities}
          countries={countries}
          handleCountryChange={handleCountryChange}
        />
        <SecondLevelForm registrationLvl={registrationLvl} />
        <ThirdLevelForm
          registrationLvl={registrationLvl}
          openingHours={openingHours}
          setOpeningHours={setOpeningHours}
        />
        <FourthLevelForm
          registrationLvl={registrationLvl}
          onOpen={onOpen}
          setAgreeToTerms={setAgreeToTerms}
          agreeToTerms={agreeToTerms}
          isOpen={isOpen}
          onClose={onClose}
        />
      </form>
      {registrationLvl === 4 ? (
        <Button
          isLoading={isLoading}
          isDisabled={!agreeToTerms}
          display={'flex'}
          onClick={showFormData}
          m="20px auto !important"
          bgGradient={'linear(to-r, #295377, #208C74)'}
          fontSize={'14px'}
          fontWeight={500}
          color={'#fff'}
          borderRadius={'25px'}
          w="100%"
          h="45px"
          textTransform={'uppercase'}
          border={'2px solid transparent'}
          _hover={{
            bgGradient: 'none',
            borderColor: 'primaryGreen.200',
            color: 'primaryGreen.200',
          }}
        >
          Submit
        </Button>
      ) : (
        <Button
          onClick={() => {
            registrationLvl === 4
              ? onOpen()
              : setRegistrationLvl(registrationLvl + 1);
          }}
          m="20px 0 !important"
          bgGradient={'linear(to-r, #295377, #208C74)'}
          fontSize={'14px'}
          fontWeight={500}
          color={'#fff'}
          borderRadius={'25px'}
          w="100%"
          h="45px"
          textTransform={'uppercase'}
          border={'2px solid transparent'}
          _hover={{
            bgGradient: 'none',
            borderColor: 'primaryGreen.200',
            color: 'primaryGreen.200',
          }}
        >
          Next
        </Button>
      )}

      <Text textAlign={'center'} color={'primaryGray.100'} fontSize={'14px'}>
        Already have an account?
        <Link
          as={ReactLink}
          to="/login"
          color={'primaryGreen.200'}
          borderBottom={'1px solid'}
          borderColor={'primaryGreen.200'}
          fontSize={'14px'}
          ml="5px"
        >
          Log in
        </Link>
      </Text>

      <Modal
        isOpen={isSuccessOpen}
        onClose={onSuccessClose}
        size={'lg'}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent p="40px 0" textAlign={'center'}>
          <ModalHeader>
            <ModalCloseButton onClick={() => navigate('/login')} />
          </ModalHeader>
          <Image w="100px" marginX={'auto'} src={LogoIcon} />
          <Heading color="primaryGreen.100" fontSize={'32px'} m="20px 0">
            Congratulations
          </Heading>
          <Text fontSize={'16px'} fontWeight={'500'}>
            Your registration is done, we’ll review and get back to you!
          </Text>
        </ModalContent>
      </Modal>
    </Stack>
  );
}

export const FirstLevelForm = ({
  registrationLvl,
  cities,
  countries,
  handleCountryChange,
}) => {
  return (
    <Stack display={registrationLvl === 1 ? 'block' : 'none'}>
      <Box>
        <FormLabel>Hospital Name*</FormLabel>
        <Input name="name" placeholder="Enter here" />
      </Box>
      <Box>
        <FormLabel>Hospital Category*</FormLabel>
        <Select name="hospitalCategory" placeholder="Choose here">
          <option value="general hospital"> General Hospital</option>
          <option value="specialist hospital"> Specialist Hospital</option>
          <option value="tertiary hospital"> Tertiary Hospital</option>
          <option value="medical center">Medical Center</option>
          <option value="clinics complex">Clinics Complex</option>
        </Select>
      </Box>
      <Box>
        <FormLabel>Email Address*</FormLabel>
        <Input name="email" placeholder="Enter here" autocomplete="off" />
      </Box>
      <Box>
        <FormLabel>Phone No.*</FormLabel>
        <PhoneInput
          name="number"
          containerStyle={{ background: 'none', border: 'none' }}
          inputStyle={{ background: 'none', border: 'none' }}
          dropdownStyle={{ background: 'none', border: 'none' }}
          id="phone-input"
          defaultCountry="sa"
          inputClass="custom-phone-input"
        />
      </Box>
      <Box width={'100%'}>
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
      <Box width={'100%'}>
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
      <Box>
        <FormLabel>Website*</FormLabel>
        <Input name="website" placeholder="Enter here" />
      </Box>
      <Box>
        <FormLabel>Location*</FormLabel>
        <Input name="address" placeholder="Enter here" />
      </Box>
    </Stack>
  );
};

export const SecondLevelForm = ({ registrationLvl }) => {
  const logoRef = useRef(null);
  const bannerRef = useRef(null);
  const docRef = useRef(null);

  const [imgData, setImgData] = useState({
    logo: { name: 'Upload File' },
    banner: { name: 'Upload File' },
    doc: { name: 'Upload File' },
  });

  return (
    <Stack
      direction={'row'}
      gap="3%"
      flexWrap={'wrap'}
      spacing={'0'}
      display={registrationLvl === 2 ? 'flex' : 'none'}
    >
      <Box w="33%">
        <FormLabel>Upload Hospital Logo*</FormLabel>
        <Input
          name="logo"
          ref={logoRef}
          onChange={e => setImgData({ ...imgData, logo: e.target.files[0] })}
          placeholder="Enter here"
          type="file"
          display={'none'}
        />
        <Button onClick={() => logoRef.current.click()}>
          {imgData.logo.name}
        </Button>
      </Box>
      <Box w="64%">
        <FormLabel>Upload Hospital Banner*</FormLabel>
        <Input
          name="banner"
          ref={bannerRef}
          onChange={e => setImgData({ ...imgData, banner: e.target.files[0] })}
          placeholder="Enter here"
          type="file"
          display={'none'}
        />
        <Button onClick={() => bannerRef.current.click()}>
          {imgData.banner.name}
        </Button>
      </Box>
      <Box w="100%">
        <FormLabel>About Hospital</FormLabel>
        <Textarea
          name="about"
          resize={'none'}
          placeholder="Enter here"
        ></Textarea>
      </Box>
      <Box w="33%">
        <FormLabel>Upload Hospital Document*</FormLabel>
        <Input
          name="document"
          ref={docRef}
          onChange={e => setImgData({ ...imgData, doc: e.target.files[0] })}
          placeholder="Enter here"
          type="file"
          display={'none'}
        />
        <Button onClick={() => docRef.current.click()}>
          {imgData.doc.name}
        </Button>
      </Box>
      <Box w="64%">
        <FormLabel>IBAN No*</FormLabel>
        <Input name="ibanNo" placeholder="Enter here" />
      </Box>
      <Box w="48%">
        <FormLabel>Facebook*</FormLabel>
        <Input name="facebook" placeholder="Enter here" />
      </Box>
      <Box w="48%">
        <FormLabel>Instagram*</FormLabel>
        <Input name="instagram" placeholder="Enter here" />
      </Box>
      <Box w="48%">
        <FormLabel>Twitter*</FormLabel>
        <Input name="twitter" placeholder="Enter here" />
      </Box>
      <Box w="48%">
        <FormLabel>WhatsApp*</FormLabel>
        <Input name="whatsapp" placeholder="Enter here" />
      </Box>
    </Stack>
  );
};

export const ThirdLevelForm = ({
  registrationLvl,
  openingHours,
  setOpeningHours,
}) => {
  function changeOnStatus(itemIndex, value) {
    let modifiedArray = openingHours.map((val, ind) => {
      if (ind === itemIndex) {
        return {
          ...val,
          on: value,
        };
      } else return val;
    });
    setOpeningHours(modifiedArray);
  }

  function changeStartingTime(itemIndex, value) {
    let modifiedArray = openingHours.map((val, ind) => {
      if (ind === itemIndex) {
        return {
          ...val,
          startTime: value,
        };
      } else return val;
    });
    setOpeningHours(modifiedArray);
  }

  function changeEndingTime(itemIndex, value) {
    let modifiedArray = openingHours.map((val, ind) => {
      if (ind === itemIndex) {
        return {
          ...val,
          endTime: value,
        };
      } else {
        return val;
      }
    });
    setOpeningHours(modifiedArray);
  }

  return (
    <Box display={registrationLvl === 3 ? 'block' : 'none'}>
      <FormLabel>Set Hospital Availability</FormLabel>
      {openingHours.map((val, ind) => (
        <Stack
          border={'2px solid'}
          borderRadius={'12px'}
          borderColor={!val.on ? '#75767A' : 'primaryGreen.200'}
          p="5px 5px 5px 10px"
          key={val.day}
          direction={'row'}
          alignItems={'center'}
          mb="0px !important"
          width={{ base: 'max-content', md: '100%' }}
        >
          <Text flex={'1'}>
            <Checkbox
              colorScheme="teal"
              defaultChecked={val?.on}
              onChange={e => changeOnStatus(ind, e.target.checked)}
              mr="5px"
              mt="3px"
              transform="translateY(2px)"
            ></Checkbox>
            {val.day}:
          </Text>
          <Text
            bgColor={!val.on ? '#75767A' : 'primaryGreen.200'}
            borderRadius={'12px'}
            color={'#fff'}
          >
            <Input
              isDisabled={!val.on}
              height={{ base: '30px !important', md: '42px !important' }}
              borderColor={'primaryGreen.200 !important'}
              onChange={e => changeStartingTime(ind, e.target.value)}
              type="time"
              defaultValue={val.startTime}
              value={val.startTime}
              padding={{ base: '0px 0px 0px 5px', md: '10px' }}
              fontSize={{ base: 'xs', md: 'md' }}
            />
          </Text>
          <Text
            bgColor={!val.on ? '#75767A' : 'primaryGreen.200'}
            borderRadius={'12px'}
            color={'#fff'}
          >
            <Input
              isDisabled={!val.on}
              height={'42px !important'}
              borderColor={'primaryGreen.200 !important'}
              onChange={e => changeEndingTime(ind, e.target.value)}
              type="time"
              defaultValue={val.endTime}
              value={val.endTime}
              padding={{ base: '0px 0px 0px 5px', md: '10px' }}
              fontSize={{ base: 'xs', md: 'md' }}
            />
          </Text>
        </Stack>
      ))}
    </Box>
  );
};

export const FourthLevelForm = ({
  registrationLvl,
  onOpen,
  setAgreeToTerms,
  agreeToTerms,
  isOpen,
  onClose,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <Stack display={registrationLvl === 4 ? 'block' : 'none'}>
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
            Hospital Subscription Agreement:
          </Heading>
          <ModalBody p="25px" className="modalBody">
            <Box mb={4}>
              <Text fontWeight="bold">Preamble:</Text>
              <Text mb={4}>
                Thank you for choosing emedii.com as your digital marketing
                intermediary offering a range of services. Please note that by
                electronically agreeing to this agreement, you agree to the
                terms and conditions set forth herein, as well as joining with
                the legal capacity required by law and agreeing to the
                following:
              </Text>
              <Text fontWeight="bold">1. Preamble:</Text>
              <Text mb={4}>
                The foregoing preamble is an integral part of this Agreement.
              </Text>
              <Text fontWeight="bold">2. Definitions:</Text>
              <Text mb={2}>
                <span fontWeight="bold">2.1 emedii.com:</span> A website and
                platform for electronic marketing intermediation in the field of
                healthcare services, targeting patients, hospitals, and
                healthcare practitioners with its services.
              </Text>
              <Text mb={2}>
                <span fontWeight="bold">2.2 Hospital:</span> Any hospital
                authorized by the competent authorities in its location to
                provide medical services.
              </Text>
              <Text mb={2}>
                <span fontWeight="bold">
                  2.3 Patient - Visitor - Platform and Website User:
                </span>{' '}
                Anyone who has been able to register on emedii.com and use its
                services provided by specialized and reference hospitals that
                offer their services on it.
              </Text>
              <Text mb={2}>
                <span fontWeight="bold">2.4 Medical Services:</span> This refers
                to the medical care provided by hospitals specializing in
                certain diseases, requiring advanced equipment and delivered by
                highly specialized doctors.
              </Text>
              <Text mb={2}>
                <span fontWeight="bold">
                  2.5 Booking an In-Person Clinic Appointment:
                </span>{' '}
                This is booking an appointment for a patient to see a consultant
                doctor in their clinic at the specialized hospital where they
                work.
              </Text>
              <Text mb={2}>
                <span fontWeight="bold">2.6 Booking an Inpatient Bed:</span> A
                service that allows the patient to book a bed for
                hospitalization with the approval of the chosen consultant
                doctor at a specific specialized hospital.
              </Text>
              <Text mb={2}>
                <span fontWeight="bold">
                  2.7 Booking a Virtual Clinic Appointment:
                </span>{' '}
                Booking a remote visual communication session between the
                patient and the chosen consultant doctor at a specific
                specialized hospital.
              </Text>
              <Text mb={2}>
                <span fontWeight="bold">2.8 Timetable:</span> The schedule of
                appointments available for each consultant doctor, prepared by
                emedii.com and completed by the hospital on a monthly basis.
              </Text>
              <Text mb={2}>
                <span fontWeight="bold">2.9 Dashboard:</span> The dashboard of
                data, information, and special services provided by emedii.com
                to each hospital that subscribes to its services.
              </Text>
              <Text mb={2}>
                <span fontWeight="bold">2.10 Agreement:</span> This refers to
                the hospital's approval to subscribe to the services offered by
                emedii.com, whether all or some of them, and the terms and
                conditions contained therein, which are approved electronically
                by the hospital.
              </Text>
              <Text mb={2}>
                <span fontWeight="bold">2.11 Medical Content:</span> Any medical
                information (written, audio, or visual) provided by emedii.com
                to customers. The medical content is prepared by the hospital or
                one of its doctors.
              </Text>
              <Text mb={2}>
                <span fontWeight="bold">2.12 Direct Cash Payment:</span> The
                patient's payment for his medical costs to the hospital from
                their own account. This includes cash payment, credit card
                payment, bank check, or bank transfer.
              </Text>
              <Text mb={2}>
                <span fontWeight="bold">
                  2.13 Payment Through Health Insurance Company:
                </span>{' '}
                The patient's payment for his medical costs to the hospital
                through a health insurance company that covers the patient.
              </Text>
              <Text mb={2}>
                <span fontWeight="bold">2.14 Fees:</span> Refers to the fees and
                charges mentioned in this agreement. The agreement specifies how
                the fees are collected, distributed, and the due date for
                payment.
              </Text>
              <Text mb={2}>
                <span fontWeight="bold">2.15 Business Day:</span> Any day
                (excluding weekly holidays) on which the hospital normally
                operates at its location. This does not include the hospital's
                official holidays.
              </Text>
              <Text mb={2}>
                <span fontWeight="bold">2.16 Patient Data:</span> Includes all
                information collected about the patient, including personal
                data.
              </Text>
              <Text mb={2}>
                <span fontWeight="bold">2.17 Electronic Payment Portal:</span> A
                service that enables and facilitates the electronic payment
                process for the value of medical services and advertisements
                immediately. The payment process is done through direct
                connection.
              </Text>
              <Text mb={2}>
                <span fontWeight="bold">2-18 Username and Password:</span> These
                refer to a unique username and password granted by emedii.com to
                authorized hospital personnel in order for them to provide
                services through the platform.
              </Text>
              <Text mb={2}>
                <span fontWeight="bold">2-19 Data Protection Laws:</span> This
                refers to all laws, regulations, and any other legislation
                issued and in effect at the headquarters of emedii.com to
                regulate the privacy, processing, and access of personal
                information.
              </Text>
              <Text mb={2}>
                <span fontWeight="bold">2.20 Force Majeure:</span> This means
                any situation beyond the reasonable control of the relevant
                party, including acts of God, an act or inaction by a
                governmental entity or a competent body, or the inability to
                obtain materials, or Embargoes or refusal to grant licenses,
                theft or destruction, riots, wars or invasions, acts of foreign
                aggression, acts of terrorism, civil wars, hostilities in
                declared or undeclared wars, rebellions or revolutions, Or
                military mutinies, usurps of authority, seizures, confiscations,
                interdictions or other appropriations by a government body,
                fires, floods, tornadoes, earthquakes, hurricanes, storms,
                tsunamis, or diseases. Epidemic or other natural disasters,
                explosions, acts of sabotage, civil commotion, industrial
                disturbances or disputes, unavailability or poor performance of
                communications networks or power sources, denial-of-service
                attacks, or unauthorized entry into systems, records, software,
                hardware, data, services, or downtime of plant or machinery.
              </Text>
              <Text mb={2}>
                <Text fontWeight="bold">2.21 Health practitioners:</Text> They
                mean doctors, pharmacists, nurses, health specialists, and
                paramedics who search for work contracts in hospitals through
                emedii.com or wish to introduce their services to them.
              </Text>
              <Text fontWeight="bold">
                3. Services Provided by emedii.com to the Hospital:
              </Text>
              <Text mb={2}>
                3.1 In-person clinic appointment booking service for patients
                through its platform.
              </Text>
              <Text mb={2}>
                3.2 Virtual clinic appointment booking service for patients
                through its platform.
              </Text>
              <Text mb={2}>
                3.3 Inpatient bed booking service for patients via its platform.
              </Text>
              <Text mb={2}>
                3.4 Health practitioner recruitment services in hospitals.
              </Text>
              <Text mb={2}>
                3.5 Medical education and training services in coordination with
                medical training and education centers.
              </Text>
              <Text mb={2}>3.6 Digital medical library services.</Text>
              <Text mb={2}>3.7 Electronic advertising services.</Text>
              <Text fontWeight="bold">
                4. Emedii.com’s Obligations towards the Hospital:
              </Text>
              <Text mb={2}>
                4.1 emedii.com gives the hospital a username and password to
                access its website.
              </Text>
              <Text mb={2}>
                4.2 emedii.com provides each hospital with a dashboard specific
                to its services.
              </Text>
              <Text mb={2}>
                4.3 emedii.com enables the hospital to build timetables for
                clinic appointments and virtual clinics.
              </Text>
              <Text mb={2}>
                4.4 emedii.com provides the hospital with the service of
                requesting, modifying, adding, deleting, and following up on its
                services through the dashboard and timetables within (24) hours.
              </Text>
              <Text mb={2}>
                4.5 emedii.com provides 24-hour technical support throughout the
                duration of the hospital’s subscription.
              </Text>
              <Text mb={2}>
                4.6 emedii.com is committed to providing the hospital with the
                data of every patient who books any service, including his name,
                his mobile number and his email address.
              </Text>
              <Text mb={2}>
                4.7 emedii.com provides access to its website and platform to
                one or more people and one or more departments in the hospital
                so that they can manage its services.
              </Text>
              <Text mb={2}>
                4.8 emedii.com gives the hospital the option to subscribe to one
                or more of its services.
              </Text>
              <Text mb={2}>
                4.9 emedii.com uploads the data of the hospital’s medical
                services to the website and platform upon completion of all its
                requirements within (5) working days of completion.
              </Text>
              <Text mb={2}>
                4.10 Emedii.com provides the hospital, when it begins offering
                its services, with a free, one-time electronic introductory
                advertisement service for the hospital prepared by it, through
                its website, platform, social media, and e-mail to all its
                customers.
              </Text>
              <Text mb={2}>
                4.11 Circumstances may require emedii.com from time to time to
                perform maintenance on its systems. If this is likely to result
                in unavailability of services, then try to notify the hospital
                early.
              </Text>
              <Text mb={2}>
                4.12 emedii.com may from time to time make mandatory upgrades or
                improvements, and will inform the hospital about them so that
                they can be implemented, provided that this does not result in
                payment of amounts or fees for any mandatory improvements
                throughout the duration of the agreement with the hospital.
              </Text>
              <Text mb={2}>
                4.13 emedii.com is committed to compensating the hospital that
                lists its services with an additional subscription period equal
                to the period of service cessation, provided that this cessation
                is not due to the force majeure circumstances mentioned in
                Clause (2).
              </Text>
              <Text mb={2}>
                4.14 emedii.com provides auxiliary services to the hospital,
                including issuing annual electronic reports to all its clients
                related to the processes of booking medical services by clients,
                the most requested medical services, and the type and age of
                those requesting them.
              </Text>
              <Text mb={2}>
                4.15 emedii.com pledges not to publish any insults affecting the
                person himself, illegal or explicit obscene expressions or
                language, hate speech or violence or political comments in
                patients’ evaluation of the paid service provided by the
                hospital on the website and platform after (7) working days of
                providing the service.
              </Text>

              <Text fontWeight="bold">
                5. The Hospital’s Obligations towards emedii.com:
              </Text>
              <Text mb={2}>
                5.1 emedii.com gives the hospital a username and a password and
                it is the hospital’s responsibility to keep the username and
                password in a secure manner.
              </Text>
              <Text mb={2}>
                5.2 The username and password may not be disclosed to any other
                party, and other users of the hospital username and password
                must abide by the terms of this agreement and bear
                responsibility for their actions or omissions as if they were
                the employee who carried out the registration process.
              </Text>
              <Text mb={2}>
                5.3 The hospital is committed to quickly notifying emedii.com of
                any unauthorized use of the username or password, or any
                security breach or violation of this agreement of which the
                hospital becomes aware.
              </Text>
              <Text mb={2}>
                5.4 The hospital is committed to filling out the timetable
                (Timetables) for each doctor who is included in the service
                (booking an in-person clinic appointment) and (booking a virtual
                clinic appointment) for the next month, and renewed for an
                additional month at the middle of the first month throughout the
                duration of the agreement.
              </Text>
              <Text mb={2}>
                5.5 The hospital is obligated to complete the complete data for
                the inpatient bed booking form, indicating the name of the
                treating physician, the expected duration of admission, the
                estimated cost of admission, the method of payment and the bank
                account in which it is deposited.
              </Text>
              <Text mb={2}>
                5.6 The hospital is committed to specifying the bank account
                number that will be linked to emedii.com in the registration
                data form upon subscription, so that the value of the services
                that are booked will be transferred directly to this account.
              </Text>
              <Text mb={2}>
                5.7 After uploading the data of its medical services to the
                website, the hospital will provide emedii.com with a short
                visual introductory material about the hospital, so that
                emedii.com can display it on its website, platform and e-mail to
                its customers, with the aim of introducing the hospital at the
                beginning of listing.
              </Text>
              <Text mb={2}>
                5.8 The hospital is committed to ensuring the presence of all
                regulatory approvals and licenses necessary to provide medical
                services from the competent authorities at its headquarters, and
                to provide emedii.com with the numbers and dates of these
                permits and the authorities issuing them in a letter addressed
                to it.
              </Text>
              <Text mb={2}>
                5.9 When building dashboards and timetables by the hospital on
                the emedii.com website, all data required for the service must
                be completed. If there is a deficiency, it will not be displayed
                until it is completed.
              </Text>
              <Text mb={2}>
                5.10 Deletion, modification and addition to the dashboard and
                timetable by the hospital does not cancel a service that was
                previously booked according to this data before it was modified,
                and the hospital is obligated to provide the service that was
                booked before this procedure to the patient.
              </Text>
              <Text mb={2}>
                5.11 The hospital selects an employee from its technical support
                department, and provides emedii.com with his name, mobile
                number, and email so that we can communicate with him when any
                technical problems occur.
              </Text>
              <Text mb={2}>
                5.12 The hospital is committed to providing emedii.com with a
                list of services that have been booked and actually provided to
                the customer at the end of each calendar month in the service
                including booking an in-person clinic appointment, booking a
                virtual clinic appointment and booking an inpatient bed in order
                to settle his emedii.com dues.
              </Text>
              <Text mb={2}>
                5.13 The hospital bears the legal consequences of any service
                that is offered, marketed and provided via emedii.com without
                the approval of the competent authorities at its headquarters.
              </Text>
              <Text mb={2}>
                5.14 The hospital bears the legal consequences resulting from
                dealing with patients or the services provided to them and
                emedii.com’s responsibility is limited to displaying the private
                data and information that the hospital completed on emedii.com
                only.
              </Text>
              <Text mb={2}>
                5.15 The hospital is committed to announcing this agreement on
                its website, its social media accounts and within the hospital.
              </Text>
              <Text fontWeight="bold">
                6. Hospital’s Obligations towards Patients:
              </Text>
              <Text mb={2}>
                6.1 The hospital is committed to implementing patient rights
                policies and procedures that it applies to all its patients for
                whom medical services are booked through emedii.com.
              </Text>
              <Text mb={2}>
                6.2 The hospital is committed to providing the medical service
                that the patient has booked through emedii.com, and bears full
                responsibility for paying any rights of the patient as a result
                of cancellation or postponement approved by the system in such
                cases in the country of its presence, with the exception of
                force majeure circumstances.
              </Text>
              <Text mb={2}>
                6.3 The appointments recorded in timetables on the hospital’s
                platform and website for the services of booking an in-person
                clinic appointment and booking a virtual clinic appointment are
                considered available, and booking by patients is confirmed.
              </Text>
              <Text mb={2}>
                6.4 The hospital is committed to the service of booking an
                inpatient bed by responding to the patient’s request within 48
                hours.
              </Text>
              <Text mb={2}>
                6.5 When booking a bed for a patient, all data required to be
                completed by the hospital must be recorded, specifically the
                name of the treating physician, the bed number and type, the
                expected financial cost, and the expected length of stay for the
                patient.
              </Text>
              <Text mb={2}>
                6.6 The hospital determines for the patient, in the service of
                booking a bed for hospitalization, the method of paying the
                financial cost, the account number through which it is paid and
                the date of payment.
              </Text>
              <Text mb={2}>
                6.7 The hospital determines the period of time that the bed
                remains booked in the patient’s name on the booking form, taking
                into account the patient’s location and the time he takes to
                reach the hospital.
              </Text>
              <Text mb={2}>
                6.8 The hospital specifies for the patient for whom a bed has
                been booked, all the requirements that he wishes to meet before
                arriving for admission, and he does not have the right to cancel
                the bed booking due to a requirement that was not mentioned to
                him in advance.
              </Text>
              <Text mb={2}>
                6.9 The hospital is committed to providing medical services to
                the patient according to the data displayed on the platform and
                the website, in terms of their prices, quality, people providing
                it, the medical department that provides it and the dates and
                times of their provision.
              </Text>
              <Text mb={2}>
                6.10 The hospital is committed to ensuring that the medical
                opinion, which is decided by the patient’s consulting physician
                in the virtual clinic service, is a clear and specific medical
                opinion and recommends the validity of the medical plan it
                receives (if any) based on the medical report submitted to it,
                or that there is no other medical treatment may be added to the
                case, or it may be recommended that the patient needs a new
                medical plan, specifying the procedures that must be taken
                according to the latest findings in the medical field. These
                procedures must be approved by the competent medical
                authorities, specifying the medical authority in which medical
                treatment is available for the patient.
              </Text>
              <Text mb={2}>
                6.11 In the event of disputes or disagreements between the
                hospital and the patient, he has the right to file a grievance
                with the competent authorities in the hospital’s country without
                any responsibility on the part of emedii.com.
              </Text>
              <Text mb={2}>
                6.12 The patient who actually received the medical service at
                the medical facility has the right to evaluate it and submit
                this evaluation on emedii.com, provided that it is consistent
                with what was stated in Clause 15-4.
              </Text>
              <Text fontWeight="bold">
                7. Service Fees for Displaying Medical Services on emedii.com:
              </Text>
              <Text mb={2}>
                7.1 Clinic appointment booking service: 5% of the value of the
                service actually provided the price of which was previously
                specified in the offer will be deducted for emedii.com.
              </Text>
              <Text mb={2}>
                7.2 Virtual clinic appointment booking service: 5% of the actual
                value of the service, the price of which was previously
                specified in the offer, will be discounted for emedii.com.
              </Text>
              <Text mb={2}>
                7.3 Bed booking service for admission: A fee of $200 for each
                admission case paid by the hospital on behalf of emedii.com.
              </Text>
              <Text mb={2}>
                7.4 At the end of each month, the hospital is committed to
                transferring to emedii.co account the amount of the agreed upon
                commission percentage for appointments and booking inpatient bed
                services that have actually been provided.
              </Text>
              <Text mb={2}>
                7.5 The hospital collects the amounts for appointments that
                patients did not attend or cancel within the period specified
                for cancellation, with 5% of it transferred to the emedii.com
                account at the end of each month for the month of the
                appointment.
              </Text>
              <Text mb={2}>
                7.6 The hospital pays the amounts for electronic advertising
                services, digital medical library services and medical education
                and training services to the emedii.com account according to the
                agreement for those services at the time.
              </Text>
              <Text mb={2}>
                7.7 Appointments that are booked and paid for to the hospital
                upon booking and are canceled within the period specified for
                cancellation, will be repaid by emedii.com, provided that they
                are deducted from the insurance amount paid by the hospital at
                the beginning of the subscription for the benefit of the
                emedii.com account.
              </Text>
              <Text mb={2}>
                7.8 Upon approval of the subscription, the hospital shall pay a
                deposit of $5,000 to the emedii.com account to cover the amounts
                recovered for patients who cancel their bookings within the
                period specified for cancellation.
              </Text>
              <Text fontWeight="bold">
                8. Duration and Termination of the Agreement:
              </Text>
              <Text mb={2}>
                8.1 This agreement comes into effect from the date of its
                electronic approval by the authorized person for a period of 3
                years.
              </Text>
              <Text mb={2}>
                8.2 This agreement will be renewed before the start of its
                expiration period (60 days) upon the request of the hospital.
              </Text>
              <Text mb={2}>
                8.3 The hospital has the right to request termination of this
                agreement if it so wishes at any time during the validity of the
                agreement, and the information about offering its medical
                services will be uploaded 7 working days after its request.
              </Text>
              <Text mb={2}>
                emidi.com has the right to terminate the agreement in the
                following cases: 8.4.1 If the hospital fails to complete
                timetables within the time specified in this agreement, or
                exceeds the periods specified in response to booking an
                inpatient bed. 8.4.2 If, in the first year of the agreement, the
                hospital scores less than 4 out of 10 in patient evaluation.
              </Text>
              <Text fontWeight="bold">
                9. Judicial Authority and Settlement of Disputes:{' '}
              </Text>
              <Text mb={2}>
                9.1 This agreement is subject to and construed in accordance
                with the laws and regulations applicable at emedii.com
                headquarters.
              </Text>
              <Text mb={2}>
                9.2 Any dispute that arises between the two parties, if it is
                not resolved amicably between them, shall be decided by the
                competent courts at emedii.com headquarters.
              </Text>
              <Text textAlign="center" mt={4}>
                ✅ We agree to subscribe and to the terms and conditions and
                privacy policy.
              </Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Box>
        <FormLabel>Full Name*</FormLabel>
        <Input name="username" placeholder="Enter here" />
      </Box>
      <Box>
        <FormLabel>Email Address*</FormLabel>
        <Input name="userEmail" placeholder="Enter here" autocomplete="off" />
      </Box>
      <Box>
        <FormLabel>Phone No.*</FormLabel>
        <PhoneInput
          name="UserNumber"
          containerStyle={{ background: 'none', border: 'none' }}
          inputStyle={{ background: 'none', border: 'none' }}
          dropdownStyle={{ background: 'none', border: 'none' }}
          id="phone-input"
          defaultCountry="sa"
          inputClass="custom-phone-input"
        />
      </Box>
      <Box>
        <FormLabel>Password*</FormLabel>
        <Box position={'relative'}>
          <Input
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter here"
            autocomplete="off"
          />
          <Button
            w={'40px !important'}
            fontSize={'18px !important'}
            border={'none !important'}
            zIndex={1}
            bgColor={'transparent'}
            _hover={{ bgColor: 'transparent' }}
            _active={{ bgColor: 'transparent' }}
            onClick={() => setShowPassword(!showPassword)}
            position={'absolute'}
            right={'0'}
            top="5px"
          >
            {showPassword ? (
              <Icon as={FaRegEyeSlash} />
            ) : (
              <Icon fontSize={'18px'} color={'primaryGray.100'} as={FaRegEye} />
            )}
          </Button>
        </Box>
      </Box>
      <Box>
        <FormLabel>Confirm Password*</FormLabel>
        <Box position={'relative'}>
          <Input
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Enter here"
            autocomplete="off"
          />
          <Button
            zIndex={1}
            w={'40px !important'}
            fontSize={'16px !important'}
            border={'none !important'}
            bgColor={'transparent'}
            _hover={{ bgColor: 'transparent' }}
            _active={{ bgColor: 'transparent' }}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            position={'absolute'}
            right={'0'}
            top="5px"
          >
            {showConfirmPassword ? (
              <Icon as={FaRegEyeSlash} />
            ) : (
              <Icon fontSize={'18px'} color={'primaryGray.100'} as={FaRegEye} />
            )}
          </Button>
        </Box>
      </Box>
      <Box w="100%" mb={'10px'}>
        <Box w="100%" mb="10px">
          <HStack alignItems="center" py="10px">
            <Checkbox
              colorScheme="blue"
              onChange={e => setAgreeToTerms(e.target.checked)}
            ></Checkbox>
            <Text fontSize="14px" color="primaryGray.100">
              Accept the{' '}
              <Link
                color="blue.500"
                cursor={'pointer'}
                textDecoration="underline"
                onClick={onOpen}
              >
                "Hospital Subscription Agreement"
              </Link>{' '}
              to register your hospital.{' '}
            </Text>
          </HStack>
        </Box>
      </Box>
    </Stack>
  );
};
