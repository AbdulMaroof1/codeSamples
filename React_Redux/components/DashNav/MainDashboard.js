import { Stack } from '@chakra-ui/react';
import { useEffect, React } from 'react';
import { useLocation } from 'react-router';
import Sidenav from './Sidenav';
// import shapeb from '../../assets/images/icon/black.png'

export default function MainDashboard({ children, type }) {
  return (
    <>
      <Stack
        bg={'primaryYellow.100'}
        direction={'row'}
        // gap={{ base: '3', md: '12' }}
        gap={{ base: '3', md: '0' }}
        overflow={{ base: 'hidden', md: 'initial' }}
        // backgroundImage={shapeb}
        border={'1px solid #EFEFEF'}
      >
        <Stack >
          <Sidenav type={type} />
        </Stack>
        <Stack height={'100vh'} w={'full'} >
          {children}
        </Stack>
      </Stack>
    </>
  );
}
