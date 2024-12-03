import React, { useEffect } from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  useDisclosure,
  DrawerContent,
  BoxProps,
  FlexProps,
  Image,
  UnorderedList,
  ListItem,
  Collapse,
  Button,
  Text,
  Stack,
} from '@chakra-ui/react';
import {
  FiHome,
  FiCalendar,
  FiCompass,
  FiSettings,
  FiMenu,
} from 'react-icons/fi';
import { BsChat, BsPieChart, BsShop, BsCalendar2Event } from 'react-icons/bs';
import { BiWallet, BiSupport } from 'react-icons/bi';
import { AiOutlineShop } from 'react-icons/ai';
import { IoIosArrowDown } from 'react-icons/io';
import { RiFileList3Line } from 'react-icons/ri';
import { HiOutlineSpeakerphone, HiOutlineUserGroup } from 'react-icons/hi';
import { Link as ReactLink } from 'react-router-dom';
// import shapeb from '../../assets/images/icon/black.png'
import { IconType } from 'react-icons';
import { ReactText, useState } from 'react';
// import logo from '../../assets/images/logo/logo.svg';
import { useNavigate } from 'react-router';
import { RiHome2Line, RiShoppingCartLine } from 'react-icons/ri';
import { useLocation } from 'react-router-dom';
import { RiHospitalLine } from 'react-icons/ri';

import {
  FaRegChartBar,
  FaBloggerB,
  FaRegUser,
  FaShapes,
  FaUserAltSlash,
  FaUserSlash,
} from 'react-icons/fa';
import { FiPlusCircle, FiHelpCircle } from 'react-icons/fi';
import { LuUserX2 } from 'react-icons/lu';
import { TbBuildingHospital, TbUserQuestion } from 'react-icons/tb';
import { RiHomeSmile2Line } from 'react-icons/ri';
import { LuCalendarClock } from 'react-icons/lu';
import { LiaHospitalAltSolid } from 'react-icons/lia';

import { MdEventNote, MdOutlineBed } from 'react-icons/md';
import Logo from '../../assets/images/website/eMedst Logo.svg';
import simpleSearchesLogo from '../../assets/images/website/simpleLogo.jpg';
import { useSelector } from 'react-redux';
import { TbEmergencyBed, TbLibrary } from 'react-icons/tb';
import { BsChatSquareText } from 'react-icons/bs';
import { GrDocumentText } from 'react-icons/gr';
import { LuUsers } from 'react-icons/lu';
import { BsJournalMedical } from 'react-icons/bs';
import { LiaNotesMedicalSolid } from 'react-icons/lia';
import { HiOutlineComputerDesktop } from 'react-icons/hi2';
import { FaRegHeart } from 'react-icons/fa';
import { LuFileInput } from 'react-icons/lu';
import { PiToolbox } from 'react-icons/pi';

export default function Sidenav({ children, type }) {
  const user = useSelector(state => state?.user?.value);
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  let arr_doctor = [
    {
      label: 'Home',
      icon: RiHomeSmile2Line,
      url: '/dashboard',
    },
    {
      label: 'Appointments',
      icon: LuCalendarClock,
      url: '/dashboard/appointments',
    },

    {
      label: 'Hospital Profile',
      icon: RiHospitalLine,
      url: '/dashboard/hospital-profile',
    },
    {
      label: 'My Profile',
      icon: LiaHospitalAltSolid,
      url: `/dashboard/doctor-profile/${user?.doctor}`,
    },
    {
      label: 'Chat',
      icon: BsChatSquareText,
      url: '/dashboard/chat',
    },
    {
      label: 'Patients List',
      icon: TbEmergencyBed,
      url: '/dashboard/patients',
    },
    // {
    //   label: 'Services',
    //   icon: FiPlusCircle,
    //   url: '/dashboard/services',
    // },
    {
      label: 'Training Hub',
      icon: HiOutlineComputerDesktop,
      url: '/dashboard/services/training-hub',
    },

    {
      label: 'Help & Support',
      icon: FiHelpCircle,
      url: '/dashboard/help-support',
    },
  ];
  let arr_hospital = [
    {
      label: 'Home',
      icon: RiHomeSmile2Line,
      url: '/dashboard',
    },
    {
      label: 'Hospital Profile',
      icon: RiHospitalLine,
      url: '/dashboard/hospital-profile',
    },
    {
      label: 'Hospital Staff',
      icon: RiHospitalLine,
      url: '/dashboard/hospital-staff',
    },
    {
      label: 'Services',
      icon: FiPlusCircle,
      url: '/dashboard/services',
    },
    {
      label: 'Appointments',
      icon: LuCalendarClock,
      url: '/dashboard/appointments',
    },
    {
      label: 'Health Practitioner',
      icon: LiaHospitalAltSolid,
      url: '/dashboard/doctors',
    },
    {
      label: 'Jobs',
      icon: GrDocumentText,
      url: `/dashboard/jobs/${user?.hospital}`,
    },

    {
      label: 'Patients',
      icon: TbEmergencyBed,
      url: '/dashboard/patients',
    },
    {
      label: 'Chat',
      icon: BsChatSquareText,
      url: '/dashboard/chat/doctors',
    },
    {
      label: 'Wards',
      icon: BsJournalMedical,
      url: '/dashboard/wards',
    },
    {
      label: 'Departments',
      icon: LiaNotesMedicalSolid,
      url: '/dashboard/departments',
    },

    {
      label: 'Form Request',
      icon: GrDocumentText,
      url: '/dashboard/form-request',
    },
    {
      label: 'View Form Request',
      icon: GrDocumentText,
      url: `/dashboard/form-request/${user?.hospital}`,
    },
    {
      label: 'Block Users',
      icon: LuUsers,
      url: '/dashboard/block-users',
    },
    // {
    //   label: 'Electronic Advertising',
    //   icon: RiFileList3Line,
    //   url: '/dashboard/blogs',
    // },
    // {
    //   label: 'Hospital Services',
    //   icon: TbBuildingHospital,
    //   url: '/dashboard/hospital-services',
    // },
    // {
    //   label: 'Inquiries',
    //   icon: TbUserQuestion,
    //   url: '/dashboard/inquiries',
    // },
    {
      label: 'Help & Support',
      icon: FiHelpCircle,
      url: '/dashboard/help-support',
    },
  ];
  let arr_admin = [
    {
      label: 'Home',
      icon: RiHomeSmile2Line,
      url: '/dashboard',
    },
    {
      label: 'View Requests',
      icon: LuFileInput,
      url: '/dashboard/hospital-requests',
    },
    {
      label: 'Hospitals',
      icon: TbBuildingHospital,
      url: '/dashboard/hospitals',
    },
    {
      label: 'Patient List',
      icon: TbEmergencyBed,
      url: '/dashboard/patients',
    },
    {
      label: 'External Doctors',
      icon: LiaHospitalAltSolid,
      url: '/dashboard/external-doctors',
    },
    {
      label: 'Jobs',
      icon: PiToolbox,
      url: '/dashboard/jobs',
    },
    {
      label: 'Form Request',
      icon: GrDocumentText,
      url: '/dashboard/form-request',
    },
    {
      label: 'Advertising',
      icon: PiToolbox,
      url: '/dashboard/electronic-advertising',
    },
    {
      label: 'Block Users',
      icon: LuUsers,
      url: '/dashboard/block-users',
    },
    {
      label: 'Blogs',
      icon: RiFileList3Line,
      url: '/dashboard/blogs',
    },
    {
      label: 'Services',
      icon: FiPlusCircle,
      url: '/dashboard/hospital-services',
    },
    {
      label: 'Contact Inquiries',
      icon: TbUserQuestion,
      url: '/dashboard/inquiries',
    },
    {
      label: 'Support Inquiries',
      icon: BiSupport,
      url: '/dashboard/supportinquiries',
    },
  ];
  let arr_web_doctorr = [
    {
      label: 'Form Request',
      icon: GrDocumentText,
      url: '/dashboard/form-request',
    },
  ];
  let arr_patient = [
    {
      label: 'Home',
      icon: RiHomeSmile2Line,
      url: '/dashboard',
    },
    {
      label: 'Services',
      icon: FiPlusCircle,
      url: '/dashboard/services/patient',
    },
    {
      label: 'Follow-Up',
      icon: LuCalendarClock,
      url: '/dashboard/appointments',
    },
    {
      label: 'Offers',
      icon: FiPlusCircle,
      url: '/dashboard/offers',
    },

    {
      label: 'Chat',
      icon: BsChatSquareText,
      url: '/dashboard/chat',
    },
    {
      label: 'Favourites',
      icon: FaRegHeart,
      url: '/dashboard/favourites',
    },
    {
      label: 'Help & Support',
      icon: FiHelpCircle,
      url: '/dashboard/help-support',
    },
  ];

  const [navigationList, setNavigationList] = useState([]);
  useEffect(() => {
    // console.log(user)
    setNavigationList(customerList);

  }, [user]);

  const [superNavigationList, setSuperNavigationList] = useState([
    {
      label: 'Home',
      icon: RiHome2Line,
      url: '/super-dashboard',
    },
    {
      label: 'Store Request',
      icon: RiShoppingCartLine,
      url: '/super-dashboard/store-request',
    },
    {
      label: 'Partners',
      icon: HiOutlineUserGroup,
      url: '/super-dashboard/partners',
    },
    {
      label: 'Categories',
      icon: FaShapes,
      url: '/super-dashboard/categories',
    },
    {
      label: 'Users',
      icon: FaRegUser,
      url: '/super-dashboard/users',
    },
    // {
    //   label: 'Promotion',
    //   icon: HiOutlineSpeakerphone,
    //   url: '/super-dashboard/promotion'
    // },
    {
      label: 'Events',
      icon: MdEventNote,
      url: '/super-dashboard/events',
    },
    {
      label: 'Blogs',
      icon: FaBloggerB,
      url: '/super-dashboard/blogs',
    },
    {
      label: 'Banners',
      icon: FaBloggerB,
      url: '/super-dashboard/banners',
    },
    {
      label: 'Analytics',
      icon: FaRegChartBar,
      url: '/super-dashboard/analytics',
    },
    {
      label: 'Help & Contact',
      icon: FiHelpCircle,
      url: '/super-dashboard/help',
    },
    {
      label: 'Setting',
      icon: FiSettings,
      url: '/super-dashboard/setting',
    },
  ]);
  const [customerList, setSuperMasterNavigationList] = useState([
    {
      label: 'Home',
      icon: RiHome2Line,
      url: '/dashboard',
    },
    {
      label: 'New Search',
      icon: RiShoppingCartLine,
      url: '/dashboard/new-search',
    },
    {
      label: 'Buy More Credits',
      icon: HiOutlineUserGroup,
      url: '/dashboard/buy-credits',
    },
    {
      label: 'Search History',
      icon: FaShapes,
      url: '/dashboard/search-history',
    },
    {
      label: 'Support',
      icon: FaRegUser,
      url: '/dashboard/help-support',
    }
  ]);

  return (
    <>
      <Box
        minH={{ base: 'fit-content', lg: '100vh' }}
        bg={'primaryYellow.100'}
        position={{ base: 'absolute', lg: 'initial' }}
        zIndex={'1'}
        // left={'40px'}
        // top={'32px'}
        w={{ base: '0px', lg: 'auto' }}
        // backgroundImage={shapeb}
      >
        <SidebarContent
          navigationList={
            customerList
          }
          onClose={() => onClose}
          display={{ base: 'none', lg: 'block' }}
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SidebarContent
              navigationList={
                customerList
              }
              onClose={onClose}
            />
          </DrawerContent>
        </Drawer>
        <MobileNav display={{ base: 'flex', lg: 'none' }} onOpen={onOpen} />
        <Box ml={{ base: 0, md: 60 }} p={{ base: '0', md: '4' }}>
          {children}
        </Box>
      </Box>
    </>
  );
}

const SidebarContent = ({ navigationList, onClose, ...rest }) => {
  const { isOpen, onToggle } = useDisclosure();
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Box
      bg={'primaryYellow.100'}
      w={{ base: 'full', lg: 72 }}
      pos="fixed"
      // backgroundImage={shapeb}
      h="full"
      {...rest}
    >
      <Flex mt={'20px'} h="20" alignItems="center" pl={8}>
        <Image alt={'Logo'} src={simpleSearchesLogo} draggable={false} w="181px" h="auto" />
        <CloseButton
          color={'#fff'}
          display={{ base: 'flex', lg: 'none' }}
          onClick={onClose}
        />
      </Flex>

      <Stack pl={4} pt={'40px'}>
        <UnorderedList className="sidemenu" listStyleType={'none'}>
          {navigationList.map(val => (
            <ListItem key={val.label} mb={'5px !important'}>
              <Stack gap={'5px'}>
                <Button
                  onClick={() => navigate(val.url)}
                  w={'max-content'}
                  padding={'10px 20px'}
                  borderRadius={'21.5px'}
                  // bgImage={location.pathname === `${val.url}` ? greenBtnTexture : 'none'}
                  // bgPos={'center'}
                  // bgSize={'cover'}
                  // bgRepeat={'no-repeat'}
                  // bg={location.pathname === `${val.url}` ? 'primaryGreen.700' : 'transparent'}
                  bgGradient={
                    location.pathname === `${val.url}`
                      ? 'linear(to-r, #295377, #208C74)'
                      : 'none'
                  }
                  background={'none'}
                  justifyContent={'flex-start'}
                  color={location.pathname === `${val.url}` ? '#fff' : '#000'}
                  fontWeight={'400'}
                  // border={'2px solid'}
                  // borderColor={location.pathname === `${val.url}` ? 'primaryGreen.100' : 'transparent'}
                  // _hover={{
                  //   borderColor: 'primaryGreen.100'
                  // }}
                >
                  <Text as={'span'}>
                    <Icon
                      fontSize={'20px'}
                      as={val.icon}
                      mr={'10px'}
                      mb="-3px"
                    />
                  </Text>
                  <Text as={'span'}>{val.label}</Text>
                </Button>
              </Stack>
            </ListItem>
          ))}
        </UnorderedList>
        {/* <UnorderedList className="sidemenu" listStyleType={'none'}>
          <ListItem mb={'5px !important'}>
            <Link as={ReactLink} to={'/'}>
              <Icon as={FiCompass} />
              Logout
            </Link>
          </ListItem>
        </UnorderedList> */}
      </Stack>
    </Box>
  );
};

const NavItem = ({ icon, url, children, ...rest }) => {
  const navigate = useNavigate();

  return (
    <Link
      onClick={() => navigate(url)}
      style={{ textDecoration: 'none', color: '#000' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: '#FFC728',
          color: '#000',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: '#000',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: '35px' }}
      px={{ base: 0, md: 0 }}
      height="auto"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="0px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />
    </Flex>
  );
};
