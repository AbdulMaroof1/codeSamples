import {
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  HStack,
  Stack,
  Text,
  Button,
  Icon,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import { FaRegBell } from 'react-icons/fa';
import { FaCircle } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
// import greenBtnTexture from '../../assets/images/greenBtnTexture.svg'
import { logout } from '../../reducers/useReducers.js';
import Cookies from 'js-cookie';
import { PUT } from '../../utilities/ApiProvider.js';
import { imgUrl } from '../../utilities/config.js';
import { loadStoreAvail } from '../../reducers/useReducers.js';

export default function LoggedInPic() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const user = useSelector(state => state.user.value);
  console.log(user);
  debugger;
  

  const [isLoading, setIsLoading] = useState(false);

  // const changeAvailability = async () => {
  //     setIsLoading(true)
  //     try {
  //         let res = await PUT('/vendor/store/availability', { isAvailable: !user?.isAvailable }, { authorization: `Bearer ${user?.verificationToken}` });
  //         if (res?.status === 200) {
  //             toast({
  //                 description: 'Store Availability Updated!',
  //                 status: 'success',
  //                 isCloseable: true,
  //                 duration: 3000,
  //                 position: 'top-right'
  //             });
  //             dispatch(loadStoreAvail(res?.data?.isAvailable))
  //         } else {
  //             toast({
  //                 description: res?.message,
  //                 status: 'error',
  //                 isCloseable: true,
  //                 duration: 3000,
  //                 position: 'top-right'
  //             });
  //         }
  //     } catch (err) {
  //         toast({
  //             description: err.message,
  //             status: 'error',
  //             isCloseable: true,
  //             duration: 3000,
  //             position: 'top-right'
  //         });
  //     }
  //     setIsLoading(false)
  // }

  return (
    <Stack gap={{ base: 1, lg: 2, xl: 12 }} py={4}>
      <Menu>
        <MenuButton
          className="loggedBtn"
          display="flex"
          as={Button}
          backgroundColor="transparent"
          padding={0}
          _hover={{ backgroundColor: 'transparent' }}
          _active={{ backgroundColor: 'transparent' }}
        >
          <HStack>
            <Avatar
              size={{ base: 'md' }}
              src={`${imgUrl}/${user?.picture || user?.photo}`}
              border="2px solid #f79e22"
              bg="#f79e22"
              color="#fff"
            />
            <Text
              textTransform="capitalize"
              fontWeight={500}
              fontSize={{ base: 13, md: 14 }}
            >
              {user?.firstName + user?.lastName || user?.name || 'John Anderson'}
            </Text>
            <Icon as={FiChevronDown} />
          </HStack>
        </MenuButton>
        <MenuList fontSize={14}>
          <MenuItem as={ReactLink} to="/dashboard/profile">
            Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(logout());
              navigate('/login');
            }}
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Stack>
  );
}
