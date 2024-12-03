import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from '@chakra-ui/react';

function ModalWrapper({
  isOpen,
  onClose,
  title,
  subTitle,
  children,
  size,
  isCentered,
}) {
  return (
    <>
      <Modal
        isCentered={isCentered ? true : false}
        size={size ? size : 'lg'}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            margin={'0 auto'}
            fontSize={title === 'Health Practitioner Details' ? '36px' : '26px'}
            fontWeight={'500'}
          >
            {title}
            <Text color={'#75767A'} fontSize={'14px'} fontWeight={'400'}>
              {subTitle}
            </Text>
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalWrapper;
