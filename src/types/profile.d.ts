interface PublicProfile {
    displayName: string;
    image: string;
    badges: Badge[];
    ign: string | null;
}

interface Badge {
    name: string;
    description: string | null;
    color: string;
}
