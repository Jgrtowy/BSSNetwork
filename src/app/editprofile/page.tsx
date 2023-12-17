'use client';

import { Accordion, AccordionItem, Button, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function page() {
    const { status } = useSession();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [profile, setProfile] = useState<PublicProfile>();

    useEffect(() => {
        const get = async () => {
            if (status !== 'authenticated') return;
            const req = await fetch(`/api/users/getcurrent`).then((res) => (res.ok ? (res.json() as unknown as { profile: PublicProfile }) : null));
            if (!req) return;
            setProfile(req.profile);
        };
        get().catch((e) => console.error(e));
    }, [status]);

    const saveChanges = async () => {
        const req = (await fetch(`/api/users/edit`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                displayName: profile?.displayName,
                ign: profile?.ign,
            }),
        }).then((res) => (res.ok ? res.json() : null))) as { profile: PublicProfile };
        if (!req) return;
        onOpen();
    };

    return (
        <div className="w-screen flex justify-center text-2xl mt-4">
            <div className="flex">
                {status === 'authenticated' ? (
                    <div className="px-3 py-2 border-2 rounded-lg">
                        <Accordion className="w-72" defaultExpandedKeys={['1', '2', '3']} selectionMode="multiple">
                            <AccordionItem key="1" title="Social Information">
                                <Input placeholder="On site display name" label="Display name" value={profile?.displayName} onChange={(e) => profile && setProfile({ ...profile, displayName: e.currentTarget.value })} />
                                <Input placeholder="In game username" label="IGN" className="my-2" value={profile?.ign ?? undefined} onChange={(e) => profile && setProfile({ ...profile, ign: e.currentTarget.value })} />
                            </AccordionItem>
                            <AccordionItem key="2" title="Game information"></AccordionItem>
                            <AccordionItem key="3" title="Social media"></AccordionItem>
                        </Accordion>
                        <Button onPress={saveChanges} color="primary">
                            Save
                        </Button>
                    </div>
                ) : (
                    <div>
                        <h1>You need to be logged in to edit your profile!</h1>
                    </div>
                )}
                <Modal isOpen={isOpen} onClose={onOpenChange}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader>Profile updated successfully!</ModalHeader>
                                <ModalBody>
                                    <Button color="primary" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                </ModalBody>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
        </div>
    );
}
