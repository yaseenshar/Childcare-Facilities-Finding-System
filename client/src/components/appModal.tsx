import React from 'react'
import {
    ModalHeader,
    ModalDescription,
    ModalContent,
    ModalActions,
    Button,
    Header,
    Image,
    Modal,
    ModalProps,
} from 'semantic-ui-react'

interface AppModalProps extends ModalProps {
    open: boolean;
    setModalState: (state: boolean) => void;
    HeaderTitle: string,
    children?: React.ReactNode
}

const AppModal: React.FC<AppModalProps> = ({ open, setModalState, HeaderTitle, children, ...rest }) => {

    return (
        <Modal
            {...rest}
            onClose={() => setModalState(false)}
            onOpen={() => setModalState(true)}
            open={open}
        >
            <ModalHeader>{HeaderTitle}</ModalHeader>
            <ModalContent>
                {children}
            </ModalContent>
        </Modal>
    )
}

export default AppModal