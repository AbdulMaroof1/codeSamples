import {
  Box,
  Heading,
  Icon,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image,
  Center,
} from '@chakra-ui/react';
import React from 'react';
import { BiBed } from 'react-icons/bi';
import { GiHealthPotion } from 'react-icons/gi';
import { RiHospitalLine } from 'react-icons/ri';
import { MdOutlineHealthAndSafety } from 'react-icons/md';
import { FaUserDoctor } from 'react-icons/fa6';
import LogoIcon from '../../../assets/images/website/logoIcon.jpg';
import googleDownloadBtn from '../../../assets/images/website/googleDownloadBtn.svg';
import appleDownloadBtn from '../../../assets/images/website/appleDownloadBtn.svg';
import { Link } from 'react-router-dom';

export default function ChooseAccount({ setRegistrationLvl }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack>
      <Heading
        fontWeight={'500'}
        color={'primaryBlack.100'}
        fontSize={'32px'}
        pb="20px"
      >
        Choose your account type
      </Heading>
      <Text
        fontWeight={'500'}
        color={'primaryGray.100'}
        fontSize={'14px'}
        pb="20px"
      >
        Which type of account you would like to create
      </Text>
      <Stack
        onClick={() => setRegistrationLvl(1)}
        role="group"
        cursor={'pointer'}
        mb="5px !important"
        border={'2px solid'}
        borderColor={'primaryGray.100'}
        borderRadius={'12px'}
        p={'15px'}
        color={'primaryGray.100'}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        transition={'.3s'}
        _hover={{ borderColor: 'primaryGreen.200' }}
      >
        <Box>
          <Heading
            fontSize={'26px'}
            fontWeight={'500'}
            mb="5px"
            transition={'.3s'}
            _groupHover={{ color: 'primaryBlack.100' }}
          >
            Hospital
          </Heading>
          <Text fontSize={'14px'}>Lorem ipsum dolor sit amet, adipiscing</Text>
        </Box>
        <Box
          w="90px"
          h="80px"
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          fontSize={'42px'}
          bgColor={'#e2e2e2'}
          borderRadius={'8px'}
          transition={'.3s'}
          _groupHover={{ bgColor: 'primaryGreen.200', color: '#fff' }}
        >
          <Icon as={RiHospitalLine} />
        </Box>
      </Stack>
      <Stack
        onClick={() => setRegistrationLvl(-2)}
        // onClick={onOpen}
        transition={'.3s'}
        role="group"
        cursor={'pointer'}
        mb="5px !important"
        border={'2px solid'}
        borderColor={'primaryGray.100'}
        borderRadius={'12px'}
        p={'15px'}
        color={'primaryGray.100'}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        _hover={{ borderColor: 'primaryGreen.200' }}
      >
        <Box>
          <Heading
            fontSize={'26px'}
            fontWeight={'500'}
            mb="5px"
            transition={'.3s'}
            _groupHover={{ color: 'primaryBlack.100' }}
          >
            Patients
          </Heading>
          <Text fontSize={'14px'}>Lorem ipsum dolor sit amet, adipiscing</Text>
        </Box>
        <Box
          w="90px"
          h="80px"
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          fontSize={'42px'}
          bgColor={'#e2e2e2'}
          borderRadius={'8px'}
          transition={'.3s'}
          _groupHover={{ bgColor: 'primaryGreen.200', color: '#fff' }}
        >
          <Icon as={BiBed} />
        </Box>
      </Stack>
      <Stack
        onClick={() => setRegistrationLvl(-1)}
        role="group"
        cursor={'pointer'}
        mb="5px !important"
        border={'2px solid'}
        borderColor={'primaryGray.100'}
        borderRadius={'12px'}
        p={'15px'}
        color={'primaryGray.100'}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        transition={'.3s'}
        _hover={{ borderColor: 'primaryGreen.200' }}
      >
        <Box>
          <Heading
            fontSize={'26px'}
            fontWeight={'500'}
            mb="5px"
            transition={'.3s'}
            _groupHover={{ color: 'primaryBlack.100' }}
          >
            Health Practitioner
          </Heading>
          <Text fontSize={'14px'}>Lorem ipsum dolor sit amet, adipiscing</Text>
        </Box>
        <Box
          w="90px"
          h="80px"
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
          fontSize={'42px'}
          bgColor={'#e2e2e2'}
          borderRadius={'8px'}
          transition={'.3s'}
          _groupHover={{ bgColor: 'primaryGreen.200', color: '#fff' }}
        >
          <Icon as={FaUserDoctor} />
        </Box>
      </Stack>
      <Modal size={'xl'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={'12px'}>
          <ModalCloseButton />
          <ModalBody
            display={'flex'}
            flexDir={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            p="25px"
          >
            <Image src={LogoIcon} />
            <Heading
              fontSize={'26px'}
              fontWeight={'500'}
              my="15px"
              transition={'.3s'}
              _groupHover={{ color: 'primaryBlack.100' }}
            >
              Download The App
            </Heading>
            <Text fontSize={'14px'} color={'primaryGray.100'}>
              Ut enim ad minim veniam, quis nostrud exercitation
            </Text>
            <Stack
              direction={'row'}
              alignItems={'center'}
              justifyContent={'center'}
              gap={'10px'}
              mt="30px"
            >
              <Image cursor={'pointer'} src={appleDownloadBtn} w="140px" />
              <Image cursor={'pointer'} src={googleDownloadBtn} w="140px" />
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Stack>
  );
}
