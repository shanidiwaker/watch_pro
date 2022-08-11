import React from 'react';
import {Button, Modal, VStack, HStack, Text} from 'native-base';
import {Caption} from '../Typography';
import {TouchableOpacity} from 'react-native';
import {theme} from '../../theme';

type IProps = {
  open: boolean;
  message: JSX.Element | undefined;
  title: JSX.Element | undefined;
  submitLabel: string;
  cancelLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
  onClose: () => void;
};

function CustomConfirmModal(props: IProps) {
  const {
    open,
    message,
    title,
    submitLabel,
    cancelLabel,
    onCancel,
    onConfirm,
    onClose,
  } = props;
  return (
    <Modal isOpen={open} onClose={onClose} size="lg">
      <Modal.Content maxWidth="350">
        {title && (
          <>
            <Modal.CloseButton onPress={onClose} />
            <Modal.Header>{title}</Modal.Header>
          </>
        )}

        <Modal.Body>
          <VStack space={3} pt={!title ? 3 : 0}>
            <HStack alignItems="center" justifyContent="space-between">
              <Caption fontWeight="medium">{message}</Caption>
            </HStack>
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group>
            <Button variant="ghost" colorScheme="blueGray" onPress={onCancel}
            justifyContent="center" alignItems="center">
              {cancelLabel}
            </Button>
            <TouchableOpacity
              onPress={onConfirm}
              style={{
                padding:5,
                paddingHorizontal:7,
                borderRadius:5,
                borderColor: theme.colors.appWhite[800],
                borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.colors.black[2000],
              }}>
              <Text style={{color:'#fff'}}>{submitLabel}</Text>
            </TouchableOpacity>
            {/* <Button onPress={onConfirm}>{submitLabel}</Button> */}
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

export default CustomConfirmModal;
