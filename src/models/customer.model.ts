export interface Customer {
    uuid: string;
    firstName: string;
    lastName?: string;
    status: 'ACTIVE' | 'NON_ACTIVE' | 'LEAD';
    email: string;
}
