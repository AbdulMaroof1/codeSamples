import {
  Heading,
  Stack,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  FormLabel,
  Input,
  Button,
  IconButton,
  HStack,
  Avatar,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { GET, POST, PUT } from '../../../utilities/ApiProvider';
import { ViewIcon } from '@chakra-ui/icons';
import moment from 'moment';
import { imgUrl } from '../../../utilities/config';
import ModalWrapper from '../../Dashboard/Modal';

function PractitionerDetails({ modalData }) {
  const downloadFile = ({ fileUrl, fileName }) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'download';
    link.target = '_blank';
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <form className="applyForm">
      <Stack
        w="100%"
        flexDirection={'row'}
        alignItems={'center'}
        // gap={4}
        justifyContent={'space-around'}
        // spacingX={'10px'}
        flexWrap={'wrap'}
      >
        <Box w="48%">
          <FormLabel>Name</FormLabel>
          <Input
            value={modalData.fullName}
            name="name"
            type="text"
            placeholder="Enter Name"
          />
        </Box>
        <Box w="48%">
          <FormLabel>Gender</FormLabel>
          <Input
            value={modalData?.gender || ''}
            name="address"
            type="text"
            placeholder="Enter Name"
          />
        </Box>
        <Box w="48%">
          <FormLabel>Age</FormLabel>
          <Input
            value={modalData.age}
            name="address"
            type="text"
            placeholder="Enter Name"
          />
        </Box>
        <Box w="48%">
          <FormLabel>General Specialty</FormLabel>
          <Input
            value={modalData.generalSpeciality}
            name="address"
            type="text"
            placeholder="Enter Name"
          />
        </Box>
        <Box w="48%">
          <FormLabel>Subspecialty</FormLabel>
          <Input
            value={modalData.subspecialty}
            name="address"
            type="text"
            placeholder="Enter Name"
          />
        </Box>
        <Box w="48%">
          <FormLabel>Professional Classification Degree</FormLabel>
          <Input
            value={modalData.profesionalClassificationDegree}
            name="address"
            type="text"
            placeholder="Enter Name"
          />
        </Box>
        <Box w="48%">
          <FormLabel>Academic Qualification</FormLabel>
          <Input
            value={modalData.academicQualification}
            name="address"
            type="text"
            placeholder="Enter Name"
          />
        </Box>
        <Box w="48%">
          <FormLabel>Years of Experience</FormLabel>
          <Input
            value={modalData.yearsOfExperience}
            name="address"
            type="text"
            placeholder="Enter Name"
          />
        </Box>
      </Stack>
      <Text fontWeight={'500'} fontSize={'20px'} py={5}>
        Requested Employment Country:
      </Text>
      <Stack
        w="100%"
        flexDirection={'row'}
        alignItems={'center'}
        justify={'space-around'}
        flexWrap={'wrap'}
      >
        <Box w="48%">
          <FormLabel>Type</FormLabel>
          <Input
            value={modalData.contract}
            name="name"
            type="text"
            placeholder="Enter Name"
          />
        </Box>
        <Box w="48%">
          <FormLabel>Request Contract Duration</FormLabel>
          <Input
            value={modalData.requestContractDuration}
            name="name"
            type="text"
            placeholder="Enter Name"
          />
        </Box>
        <Box w="48%">
          <FormLabel>Request Salary</FormLabel>
          <Input
            value={modalData.requestContractSalary}
            name="name"
            type="text"
            placeholder="Enter Name"
          />
        </Box>
        <Box w="48%">
          <FormLabel>A specific amount in US Dollars per month</FormLabel>
          <Input
            value={modalData.salaryPerMonth}
            name="name"
            type="text"
            placeholder="Enter Name"
          />
        </Box>
        <Box w="48%">
          <FormLabel>Determined by Employer</FormLabel>
          <Input
            value={modalData.determinedByEmployer}
            name="name"
            type="text"
            placeholder="Enter Name"
          />
        </Box>
        <Box w="48%">
          <FormLabel>View Academic Certificate</FormLabel>
          {/* <Input
            value={modalData.document}
            name="name"
            type="text"
            placeholder="Enter Name"
          /> */}
          <Button
            cursor={'pointer'}
            as="span"
            border="1px solid #75767A"
            mb="10px"
            height={'50px'}
            bgColor="transparent"
            fontSize="14px"
            w="100%"
            color="primaryGray.100"
            transition=".3s"
            onClick={() =>
              downloadFile({
                fileUrl: `https://e-medical.thewebtestlink.xyz/${modalData.document}`,
                fileName: 'certificate.pdf',
              })
            }
            _hover={{
              bgColor: 'primaryGreen.200',
              color: '#fff',
              borderColor: 'primaryGreen.200',
            }}
            mr="10px"
          >
            Download
          </Button>
        </Box>
      </Stack>
    </form>
  );
}

const JobDetail = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams();
  const toast = useToast();
  const user = useSelector(state => state?.user?.value);
  const navigate = useNavigate();
  const [modalData, setmodalData] = useState({});
  const [formValue, setformValue] = useState({
    name: '',
    address: '',
    email: '',
    requestingStaff: '',
    number: '',
    practitionerSpecialty: '',
    practitionerClassificationDegree: '',
    practitionerAcademicQualifications: '',
    practitionerYearsOfExperience: '',
    practitionerSex: '',
    practitionerNationality: '',
    contractType: '',
  });
  const url = window.location.href;
  const hasEdit = url.includes('edit');

  const [details, setDetails] = useState(null);

  const getJobDetails = async () => {
    try {
      const response = await GET(`/admin/jobs/detail/${id}`);
      if (response.status === 200) {
        console.log('response', response);
        setDetails(response.data);
        let abc = JSON.parse(
          response.data.detail?.request_service?.completeData
        );
        setformValue(abc);
        console.log('formValue', abc);
      } else {
        setDetails({});
        console.log('error', response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getJobDetails();
  }, [id]);

  function openModal(val) {
    onOpen();
    console.log('val', val);
    setmodalData(val);
  }

  const handleAcceptDecline = async (id, type) => {
    try {
      const response = await PUT(`/admin/jobs/${id}`, {
        type,
      });
      console.log('response', response);
      if (response.status === 200) {
        toast({
          description: `Job has been ${type}`,
          status: 'success',
          position: 'top-right',
          duration: 3000,
          isClosable: true,
        });
        navigate('/dashboard/jobs');
      } else {
        console.log('error', response);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSubmit = async e => {
    try {
      e.preventDefault();
      const form = new FormData(e.target);
      form.append('service', details?.detail?.request_service?._id);
      const response = await PUT(`/admin/form-requests/${id}`, form);
      console.log('response', response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack gap={10}>
      <Stack>
        <Heading
          display={'flex'}
          alignItems={'center'}
          fontSize={'36px'}
          fontWeight={'500'}
        >
          Job Details {''}/
          <Text
            mt={'8px'}
            ml={'2px'}
            color={'#208C74'}
            fontSize={'20px'}
            fontWeight={'500'}
          >
            Jobs
          </Text>
        </Heading>
        <Text fontSize={'15px'} color={'#75767A'} fontWeight={'400'}>
          Here is the latest update...Check Now!
        </Text>
      </Stack>
      <Stack>
        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem border={'none'}>
            <AccordionButton
              _hover={{
                bg: '#fff',
              }}
            >
              <Box as="span" flex="1" textAlign="left">
                <Heading
                  display={'flex'}
                  alignItems={'center'}
                  fontSize={'24px'}
                  fontWeight={'500'}
                >
                  View Job Details
                </Heading>
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel pb={6}>
              <Stack>
                <form className="applyForm" onSubmit={handleSubmit}>
                  <Stack
                    w="100%"
                    flexDirection={'row'}
                    alignItems={'center'}
                    gap={4}
                    flexWrap={'wrap'}
                  >
                    <Box w="49%">
                      <FormLabel>Name</FormLabel>
                      <Input
                        defaultValue={formValue.name}
                        name="name"
                        type="text"
                        placeholder="Enter Name"
                      />
                    </Box>
                    <Box w="49%">
                      <FormLabel>Address</FormLabel>
                      <Input
                        defaultValue={formValue.address}
                        name="address"
                        type="text"
                        placeholder="Enter Name"
                      />
                    </Box>
                    <Box w="49%">
                      <FormLabel>Email Address</FormLabel>
                      <Input
                        defaultValue={formValue.email}
                        name="email"
                        type="text"
                        placeholder="Enter Name"
                      />
                    </Box>
                    <Box w="49%">
                      <FormLabel>Requesting Staff</FormLabel>
                      <Input
                        defaultValue={formValue.requestingStaff}
                        name="requestingStaff"
                        type="text"
                        placeholder="Enter Name"
                      />
                    </Box>
                    <Box w="49%">
                      <FormLabel>Mobile No.</FormLabel>
                      <Input
                        defaultValue={formValue.number}
                        name="number"
                        type="text"
                        placeholder="Enter Name"
                      />
                    </Box>
                  </Stack>
                  <Text fontWeight={'500'} fontSize={'20px'} py={5}>
                    Particulars of Requested Health Practitioners:
                  </Text>
                  <Stack
                    w="100%"
                    flexDirection={'row'}
                    alignItems={'center'}
                    gap={4}
                    flexWrap={'wrap'}
                  >
                    <Box w="49%">
                      <FormLabel>Specialty</FormLabel>
                      <Input
                        name="practitionerSpecialty"
                        defaultValue={formValue.practitionerSpecialty}
                        type="text"
                        placeholder="Enter Name"
                      />
                    </Box>
                    <Box w="49%">
                      <FormLabel>Professional Classification Degree</FormLabel>
                      <Input
                        defaultValue={
                          formValue.practitionerClassificationDegree
                        }
                        name="practitionerClassificationDegree"
                        type="text"
                        placeholder="Enter Name"
                      />
                    </Box>
                    <Box w="49%">
                      <FormLabel>Academic Qualifications</FormLabel>
                      <Input
                        defaultValue={
                          formValue.practitionerAcademicQualifications
                        }
                        name="practitionerAcademicQualifications"
                        type="text"
                        placeholder="Enter Name"
                      />
                    </Box>
                    <Box w="49%">
                      <FormLabel>Years of Experience</FormLabel>
                      <Input
                        defaultValue={formValue.practitionerYearsOfExperience}
                        name="practitionerYearsOfExperience"
                        type="text"
                        placeholder="Enter Name"
                      />
                    </Box>
                    <Box w="49%">
                      <FormLabel>Sex</FormLabel>
                      <Input
                        defaultValue={formValue.practitionerSex}
                        name="practitionerSex"
                        type="text"
                        placeholder="Enter Name"
                      />
                    </Box>
                    <Box w="49%">
                      <FormLabel>Nationality</FormLabel>
                      <Input
                        defaultValue={formValue.practitionerNationality}
                        name="practitionerNationality"
                        type="text"
                        placeholder="Enter Name"
                      />
                    </Box>
                  </Stack>
                  <Text fontWeight={'500'} fontSize={'20px'} py={5}>
                    Contract Type:
                  </Text>
                  <Stack
                    spacing={0}
                    gap={4}
                    direction={'row'}
                    flexDir={{ base: 'column', xl: 'row' }}
                    justifyContent={'space-between'}
                  >
                    <Box w="49%">
                      <FormLabel>Type</FormLabel>
                      <Input
                        defaultValue={formValue.advertisementDisplayMeans}
                        name="contractType"
                        type="text"
                        placeholder="Enter Name"
                      />
                    </Box>
                  </Stack>
                  {hasEdit && (
                    <Stack>
                      <Button
                        width={'200px'}
                        bgGradient="linear(to-r, #295377, #208C74)"
                        color="#E9E9E9"
                        fontWeight={'500'}
                        type="submit"
                        fontSize={'15px'}
                        borderRadius={'21px'}
                        border={'2px solid transparent'}
                        _hover={{
                          bgGradient: 'none',
                          borderColor: 'primaryGreen.200',
                          color: 'primaryGreen.200',
                        }}
                      >
                        Save
                      </Button>
                    </Stack>
                  )}

                  {details?.detail?.type === 'requested' &&
                    user?.type === 'superadmin' && (
                      <Stack
                        w={'48%'}
                        display={'flex'}
                        justifyContent={'center'}
                        direction={'row'}
                        pt={2}
                      >
                        <Button
                          width={'90%'}
                          bgGradient="linear(to-r, #295377, #208C74)"
                          color="#E9E9E9"
                          fontWeight={'500'}
                          fontSize={'15px'}
                          borderRadius={'21px'}
                          border={'2px solid transparent'}
                          _hover={{
                            bgGradient: 'none',
                            borderColor: 'primaryGreen.200',
                            color: 'primaryGreen.200',
                          }}
                          onClick={() => handleAcceptDecline(id, 'accepted')}
                        >
                          Accept
                        </Button>
                        <Button
                          width={'90%'}
                          bg={'#FBFBFB'}
                          border={'1px solid #1B1C1D'}
                          color="#1B1C1D"
                          fontWeight={'500'}
                          fontSize={'15px'}
                          borderRadius={'21px'}
                          _hover={{
                            bgGradient: '#FBFBFB',
                            borderColor: '#1B1C1D',
                            color: '#1B1C1D',
                          }}
                          onClick={() => handleAcceptDecline(id, 'rejected')}
                        >
                          Decline
                        </Button>
                      </Stack>
                    )}
                </form>
              </Stack>
            </AccordionPanel>
          </AccordionItem>
          {details?.detail?.type == 'accepted' && details?.count > 0 && (
            <AccordionItem border={'none'}>
              <AccordionButton
                _hover={{
                  bg: '#fff',
                }}
              >
                <Box as="span" flex="1" textAlign="left">
                  <Heading
                    display={'flex'}
                    alignItems={'center'}
                    fontSize={'24px'}
                    fontWeight={'500'}
                  >
                    Health Practitioners
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>

              <AccordionPanel pb={4}>
                <Stack display={'flex'} flexDirection={'column'} gap={2}>
                  <HStack display={'flex'} w="100%" px={4}>
                    <Box
                      fontSize="15px"
                      fontWeight={'400'}
                      color="#75767A"
                      flex={1}
                    >
                      NO.
                    </Box>
                    <Box
                      fontSize="15px"
                      fontWeight={'400'}
                      color="#75767A"
                      flex={1}
                    >
                      ID
                    </Box>
                    <Box
                      fontSize="15px"
                      fontWeight={'400'}
                      color="#75767A"
                      flex={2}
                    >
                      Full Name
                    </Box>
                    <Box
                      fontSize="15px"
                      fontWeight={'400'}
                      color="#75767A"
                      flex={1}
                    >
                      Age
                    </Box>
                    <Box
                      fontSize="15px"
                      fontWeight={'400'}
                      color="#75767A"
                      flex={2}
                    >
                      Applied Date
                    </Box>
                    <Box
                      fontSize="15px"
                      fontWeight={'400'}
                      color="#75767A"
                      flex={1}
                    >
                      Applied Time
                    </Box>
                    <Box
                      fontSize="15px"
                      fontWeight={'400'}
                      color="#75767A"
                      flex={1}
                    >
                      Years Of Experience
                    </Box>
                    <Box
                      fontSize="15px"
                      fontWeight={'400'}
                      color="#75767A"
                      flex={1}
                    >
                      Action
                    </Box>
                  </HStack>
                  {/* {patients.length > 0 ? } */}
                  {details?.data?.length > 0 ? (
                    details?.data?.map((val, ind) => (
                      <>
                        <HStack
                          key={val._id}
                          display={'flex'}
                          w="100%"
                          h="70px"
                          bg={'#fff'}
                          shadow={'0px 16px 38px 0px #0000000F'}
                          px={4}
                          borderRadius={'16px'}
                        >
                          <Box
                            fontSize="15px"
                            fontWeight={'500'}
                            color="#1B1C1D"
                            flex={1}
                          >
                            {ind + 1}
                          </Box>
                          <Box
                            fontSize="15px"
                            fontWeight={'500'}
                            color="#1B1C1D"
                            flex={1}
                          >
                            #{val?._id?.slice(-5)}
                          </Box>
                          <Box
                            fontSize="15px"
                            fontWeight={'500'}
                            color="#1B1C1D"
                            flex={2}
                          >
                            <VStack
                              flexDirection={'row'}
                              alignItems={'center'}
                              justifyContent={'flex-start'}
                              gap={2}
                            >
                              <Avatar
                                size="sm"
                                name="Kent Dodds"
                                src={`${imgUrl}/${val?.patientPicture}`}
                              />
                              <Text> {val?.fullName}</Text>
                            </VStack>
                          </Box>
                          <Box
                            fontSize="15px"
                            fontWeight={'500'}
                            color="#1B1C1D"
                            flex={1}
                          >
                            {val?.age || '27'}
                          </Box>
                          <Box
                            fontSize="15px"
                            fontWeight={'500'}
                            color="#1B1C1D"
                            flex={2}
                          >
                            {moment(val.createdAt).format('MM/DD/YYYY') ||
                              '2/27/2024'}
                          </Box>
                          <Box
                            fontSize="15px"
                            fontWeight={'500'}
                            color="#1B1C1D"
                            flex={1}
                          >
                            {moment(val?.createdAt).format('hh:mm A')}
                          </Box>
                          <Box
                            fontSize="15px"
                            fontWeight={'500'}
                            color="#1B1C1D"
                            flex={1}
                          >
                            {val?.yearsOfExperience || '15'}
                          </Box>
                          <Box
                            fontSize="15px"
                            fontWeight={'500'}
                            color="#1B1C1D"
                            flex={1}
                          >
                            <HStack>
                              {' '}
                              {/* {type !== 'superadmin' && (
                        <IconButton
                          onClick={() => {
                            setId(val._id);
                            onOpen();
                          }}
                          isRound={true}
                          variant="solid"
                          colorScheme="#D9D9D9"
                          w={'40px'}
                          h={'40px'}
                          fontSize="16px"
                          bgGradient="linear(to-r, #295377, #208C74)"
                          bg={'#D9D9D9'}
                          aria-label="Done"
                          icon={<EditIcon fontSize="16px" color="#1B1C1D" />}
                        />
                      )} */}
                              <IconButton
                                isRound={true}
                                variant="solid"
                                colorScheme="#F2F2F2"
                                w={'40px'}
                                h={'40px'}
                                fontSize="16px"
                                bgGradient="linear(to-r, #295377, #208C74)"
                                aria-label="Done"
                                onClick={() => openModal(val)}
                                icon={
                                  <ViewIcon fontSize="16px" color="#F2F2F2" />
                                }
                              />
                            </HStack>
                          </Box>
                        </HStack>
                      </>
                    ))
                  ) : (
                    <Heading>No patient found</Heading>
                  )}
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          )}
        </Accordion>
      </Stack>

      <ModalWrapper
        isOpen={isOpen}
        onClose={onClose}
        title={'Health Practitioner Details'}
        size={'4xl'}
        children={<PractitionerDetails modalData={modalData} />}
      />
    </Stack>
  );
};

export default JobDetail;
