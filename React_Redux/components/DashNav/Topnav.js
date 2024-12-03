import {
  Avatar,
  Button,
  ListItem,
  Menu,
  MenuItem,
  MenuList,
  Stack,
  Text,
  UnorderedList,
  MenuButton,
  Box,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoggedInPic from './LoggedInPic';
// import './TopNav.css'

export default function Topnav() {
  const user = useSelector(state => state);

  const [isNavShowed, setisNavShowed] = useState(false);
  const [navItems] = useState([
    {
      name: 'Home',
      url: '/',
    },
    {
      name: 'Company',
      url: '/company/who-we-are',
    },
    {
      name: 'Funds',
      url: '/Funds/Mutualfund',
    },
    {
      name: 'How to Invest',
      url: '/Howtoinvest/HowToInvest',
    },
    {
      name: 'Downloads',
      url: '/Downloads',
    },
    {
      name: 'Investor Education',
      url: '/Howtoinvest/MutualFundsBasic',
    },
  ]);

  return (
    <>
      <Stack
        position={'relative'}
        mb={'6'}
        direction={'row'}
        alignItems={'center'}
        justifyContent={'flex-end'}
        bg={'white'}
        style={{ boxShadow: '0px 0px 26px -10px #bdbdbd' }}
        borderRadius={7}
        mt={4}
        px={3}
        pl={6}
      >
        {/* <Stack>
  <Stack py={4} position={'relative'} top={'3px'} className='burgers' onClick={()=>setisNavShowed(!isNavShowed)}>
    <Box
      w={'35px'}
      h={'3px'}
      backgroundColor={'primaryHeading.100'}
      borderRadius={4}
    ></Box>
    <Box
      w={'25px'}
      h={'3px'}
      backgroundColor={'primaryHeading.100'}
      position={'relative'}
      top={'-4px'}
      borderRadius={4}
    ></Box>
    <Box
      w={'35px'}
      h={'3px'}
      backgroundColor={'primaryHeading.100'}
      position={'relative'}
      top={'-8px'}
      borderRadius={4}
    ></Box>
  </Stack>
  <UnorderedList
    className={isNavShowed ? 'list show' : 'list'}
    listStyleType={'none'}
    display={'flex'}
    gap={{ base: 2, lg: 4, 'xl': 7 }}
  >
    {
      navItems.map((v, i) => {
        return (
          <ListItem key={i} paddingBottom={3} paddingTop={1}>
            <TopNavLinks name={v.name} url={v.url} />
          </ListItem>
        )
      })
    }
  </UnorderedList>
</Stack> */}
        <Stack>
          <LoggedInPic />
        </Stack>
      </Stack>
    </>
  );
}

const TopNavLinks = ({ name, url }) => {
  return (
    <Button
      paddingY={3}
      _hover={{
        color: 'primaryHeading.100',
        _before: {
          transform: 'scaleX(1)',
          transformOrigin: 'bottom left',
        },
      }}
      _before={{
        content: `""`,
        position: 'absolute',
        w: '100%',
        h: '3px',
        transform: 'scaleX(0)',
        bottom: '-2px',
        left: '0px',
        borderRadius: '25px',
        backgroundColor: 'primaryHeading.100',
        transformOrigin: 'bottom right',
        transition: 'transform 0.3s ease-in-out',
      }}
      as={ReactLink}
      fontSize={{ base: '13px', xl: '16px' }}
      fontWeight={500}
      variant={'link'}
      color={'$666e82'}
      to={url}
    >
      {name}
    </Button>
  );
};
