import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Container,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import Logo from '../../../assets/images/website/eMedst Logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { imgUrl } from '../../../utilities/config';

export default function TopNav() {
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();
  const { seo } = useSelector(state => state.website.data);

  return (
    <Box>
      <Container maxW={{ base: '8xl', xl: '6xl', '2xl': '8xl' }}>
        <Flex
          px={{ base: 4 }}
          align={'center'}
          alignItems={'center'}
          py="20px"
          flexDir={{ base: 'row-reverse', md: 'row' }}
        >
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          <Flex w="full" justifyContent={'space-between'} alignItems={'center'}>
            {/* <Menu>
              <MenuButton
                backgroundColor="transparent"
                _hover={{ backgroundColor: 'transparent' }}
                _active={{ backgroundColor: 'transparent' }}
                as={Button}
              > */}
            <Image
              cursor={'pointer'}
              src={`${imgUrl}/${seo?.logo}` || Logo}
              w={{ base: '120px', xl: '200px' }}
              onClick={() => navigate('/')}
            />
            {/* </MenuButton>
              <MenuList>
                <MenuItem onClick={() => navigate('/')}>Home</MenuItem>
                <MenuItem onClick={() => navigate('/about-us')}>About</MenuItem>
              </MenuList>
            </Menu> */}

            <Flex display={{ base: 'none', md: 'flex' }} ml={0}>
              <DesktopNav />
            </Flex>

            <Stack
              flex={{ base: 1, md: 0 }}
              justify={'flex-end'}
              direction={'row'}
              gap="15px"
              display={{ base: 'none', xl: 'flex' }}
            >
              <Button
                bgGradient="linear(to-r, #295377, #208C74)"
                as={Link}
                fontSize={{ base: '12px', xl: '14px' }}
                fontWeight={500}
                to={'/login'}
                color={'#fff'}
                borderRadius={'25px'}
                w="80px"
                outline={'none'}
                border={'1px solid primaryGreen.200'}
                transition={'.3s'}
                h={{ base: '35px', xl: '45px' }}
                _hover={{
                  bgGradient: 'none',
                  border: '2px solid',
                  // border: '2px solid primaryGreen.200',
                  borderColor: 'primaryGreen.200',
                  color: 'primaryGreen.200',
                }}
              >
                Log In
              </Button>
              <Button
                bgGradient="linear(to-r, #295377, #208C74)"
                as={Link}
                fontSize={{ base: '12px', xl: '14px' }}
                fontWeight={500}
                to={'/register'}
                color={'#fff'}
                borderRadius={'25px'}
                w="80px"
                transition={'.3s'}
                h={{ base: '35px', xl: '45px' }}
                outline={'none'}
                border={'1px solid primaryGreen.200'}
                _hover={{
                  bgGradient: 'none',
                  border: '2px solid',
                  // border: '2px solid primaryGreen.200',
                  borderColor: 'primaryGreen.200',
                  color: 'primaryGreen.200',
                }}
              >
                Sign Up
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Container>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  return (
    <Stack direction={'row'} spacing={4} ml={0}>
      {NAV_ITEMS.map(navItem => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Box
                as={Link}
                m={2}
                to={navItem.href ?? '#'}
                fontSize={{ base: '12px', xl: '14px' }}
                textTransform={'uppercase'}
                fontWeight={600}
                transition={'.3s'}
                _hover={{
                  color: 'primaryGreen.200',
                  _before: { width: '80%' },
                }}
                position={'relative'}
                _before={{
                  content: '""',
                  position: 'absolute',
                  transition: '.3s',
                  left: 0,
                  top: '20px',
                  width: '0%',
                  height: '2px',
                  bgGradient:
                    'linear(to-r, primaryGreen.100, primaryGreen.200)',
                }}
              >
                {navItem.label}
                {navItem.children && (
                  <Icon ml="5px" fontSize={'10px'} as={FaPlus} />
                )}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map(child => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Box
      as={Link}
      to={href}
      role={'group'}
      display={'block'}
      py={'0px'}
      rounded={'md'}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text transition={'all .3s ease'} fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'12px'} transition={'all .3s ease'} fontWeight={500}>
            {subLabel}
          </Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
  return (
    <Stack p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map(navItem => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as={Link}
        to={href ?? '#'}
        justifyContent="left"
        alignItems="center"
        display={'flex'}
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text fontWeight={600}>{label}</Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map(child => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  // {
  //     label: 'Home',
  //     href: '/'
  // },
  // {
  //     label: 'About Us',
  //     href: '/about-us'
  // },
  {
    label: 'About Us',
    href: '/about-us',
  },
  {
    label: 'Service',
    children: [
      {
        label: 'Patient Services',
        href: '/services/patient',
        // href: '/register?type=patient',
      },
      {
        label: 'Health Practitioners Service',
        href: '/services/practitioner',
        // href: '/register?type=practitioner',
      },
      {
        label: 'Hospitals Service',
        href: '/services/hospital',
        // href: '/register?type=hospital',
      },
    ],
  },

  {
    label: 'Recruitment of Health Practitioners',
    href: '/careers',
  },

  {
    label: 'Contact Us',
    href: '/contact-us',
  },
  {
    label: 'Blogs',
    href: '/blogs',
  },
];
