/* eslint-disable react-hooks/exhaustive-deps */
import {Text} from 'native-base';
import React, {FC, useMemo, useState} from 'react';
import {Caption} from '../Typography';
import ConfirmModalContext from './ConfirmModalContext';
import CustomConfirmModal from './CustomConfirmModal';

export type VariantTypes = 'success' | 'warning' | 'error';

export type ShowParams = {
  message?: JSX.Element | undefined;
  title?: JSX.Element | undefined;
  submitLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
};

interface ProviderState extends ShowParams {
  open: boolean;
}

export interface ConfirmModalContextType {
  show: (params: ShowParams) => void;
}

// eslint-disable-next-line react/function-component-definition
const ConfirmModalProvider: FC = ({children}) => {
  const [state, setState] = useState<ProviderState>({
    open: false,
    message: <Caption>Message</Caption>,
    title: <Caption>Title</Caption>,
    submitLabel: 'Confirm',
    cancelLabel: '',
  });

  const show = (params: ShowParams) => {
    setState(v => ({...v, ...params, open: true}));
  };
  const handleCancel = () => {
    const {onCancel} = state;
    setState(v => ({...v, open: false}));
    onCancel?.();
  };
  const handleConfirm = () => {
    const {onConfirm} = state;
    setState(v => ({...v, open: false}));
    onConfirm?.();
  };

  const handleClose = () => {
    setState(v => ({...v, open: false}));
  };

  const context = useMemo(() => ({show}), [show]);

  return (
    <>
      <ConfirmModalContext.Provider value={context}>
        {children}
      </ConfirmModalContext.Provider>
      <CustomConfirmModal
        open={state.open}
        title={state.title || undefined}
        message={state.message || undefined}
        submitLabel={state.submitLabel || ''}
        cancelLabel={state.cancelLabel || ''}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        onClose={handleClose}
      />
    </>
  );
};

export default ConfirmModalProvider;
