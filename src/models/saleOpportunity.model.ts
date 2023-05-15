export interface SaleOpportunity {
    uuid: string;
    name: string;
    status: 'NEW' | 'CLOSED_WON' | 'CLOSED_LOST';
    customer: {
        uuid: string;
        firstName: string;
        lastName: string;
    }
}