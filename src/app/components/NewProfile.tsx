'use client';

import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import axios from 'axios';
import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
export default function NewProfile() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [username, setUsername] = useState('');

    useEffect(() => {
        onOpen();
    }, []);

    const submit = async () => {
        if (!username) return;
        await axios
            .post(`/api/profiles/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    username,
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    onOpenChange();
                    return;
                }
                console.error(res);
            })
            .catch((e) => console.error(e));
    };

    return (
        <>
            <Modal isOpen={isOpen} placement="top-center" isDismissable={false} size={'lg'} hideCloseButton={true}>
                <ModalContent>
                    {() => {
                        return (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Complete your profile</ModalHeader>
                                <ModalBody>
                                    <div className="flex py-2 px-1 justify-between">
                                        <Input label="Username" width="100%" isRequired={true} value={username} onChange={(e) => setUsername(e.target.value)} />
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="flat" onPress={() => signOut()}>
                                        Cancel and log out
                                    </Button>
                                    <Button color="primary" onPress={submit}>
                                        Save
                                    </Button>
                                </ModalFooter>
                            </>
                        );
                    }}
                </ModalContent>
            </Modal>
        </>
    );
}
