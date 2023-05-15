import * as RouteKeys from './routeKeys';

// pages
import Home from '../features/home';
import CustomersPage from '../features/customers';
import SaleOpportunityPage from '../features/saleOpportunities';

// interface
export interface Route {
    key: string;
    title: string;
    path: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    component: Function;
}

export const routes: Array<Route> = [
    {
        key: RouteKeys.ROUTE_KEY_CUSTOMERS,
        title: 'Home',
        path: '/',
        component: Home,
    },
    {
        key: RouteKeys.ROUTE_KEY_CUSTOMERS,
        title: 'Customers',
        path: '/customers',
        component: CustomersPage,
    },
    {
        key: RouteKeys.ROUTE_KEY_SALE_OPPORTUNITIES,
        title: 'Sale Opportunities',
        path: '/sale-opportunities',
        component: SaleOpportunityPage,
    },
];

export const getRoutePath = (routeKey: RouteKeys.RouteKey) => {
    const route: Route = routes.filter((r: Route) => r.key === routeKey)[0];

    return route.path;
};
