import {
  Stack,
  Box,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Badge,
  useDisclosure,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Button,
  Divider,
  Icon,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Search2Icon, BellIcon, CalendarIcon } from '@chakra-ui/icons';

import LoggedInPic from '../DashNav/LoggedInPic';
import { GET } from '../../utilities/ApiProvider';

export default function DashboardHeader() {
  const options = {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  const [notifications, setNotifications] = useState(0);
  const [notificationData, setnotificationData] = useState([]);
  const getNotifications = async () => {
    try {
      const response = await GET('/web/patient/notification');
      console.log(response);
      if (response.status === 200) {
        setNotifications(response.data.length);
        setnotificationData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNotifications();
  }, []);
  return (
    <Stack
      p={'10px'}
      margin={'0 !important'}
      direction={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
    >
      <Box
        w={'100%'}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        gap={'40px'}
      >
        <Stack w="100%">
          {/* <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Search2Icon color="gray.300" />
            </InputLeftElement>
            <Input
              borderRadius={'48px'}
              background={'#F2F2F2'}
              border={'none'}
              type="text"
              placeholder="Search anything here..."
            />
          </InputGroup> */}
        </Stack>
        <Stack direction={'row'} alignItems={'center'} gap={'20px'}>
          <VStack align="start">
            <Box position="relative">
              <Popover>
                <PopoverTrigger>
                  <IconButton
                    isRound
                    variant="solid"
                    colorScheme="teal"
                    aria-label="Notifications"
                    fontSize="20px"
                    icon={<BellIcon />}
                  />
                </PopoverTrigger>
                {notifications > 0 && (
                  <Badge
                    position="absolute"
                    top="-1"
                    right="-1"
                    fontSize="0.8em"
                    colorScheme="red"
                    borderRadius="full"
                  >
                    {notifications}
                  </Badge>
                )}
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>Notifications</PopoverHeader>
                  <PopoverBody>
                    <Text>You have {notifications} notifications</Text>
                    <Stack mt={'5px !important'}>
                      {notificationData.map((notification, index) => (
                        <Box key={index}>
                          <Stack
                            gap={3}
                            flexDirection={'row'}
                            alignItems={'center'}
                          >
                            <Stack
                              w="75px"
                              h="53px"
                              bg="#F2F2F2"
                              borderRadius="50%"
                              align="center"
                              justify="center"
                            >
                              <CalendarIcon />
                              {/* <Icon as={CalendarIcon} color={'#1B1C1D'} /> */}
                              {/* <Icon as={CalendarIcon} color={'#FFF'} /> */}
                            </Stack>
                            <Text fontSize={'14px'}>
                              {notification.message}
                            </Text>
                          </Stack>

                          <Divider my={'5px !important'} color={'#1B1C1D'} />
                        </Box>
                      ))}
                    </Stack>
                    {/* <Button
                      mt={2}
                      colorScheme="teal"
                      onClick={() => setNotifications(0)}
                    >
                      Mark all as read
                    </Button> */}
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Box>
          </VStack>
          <Box>
            <LoggedInPic />
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}
