export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register/:type',

    // Dashboard base routes
    TECH: '/tech',
    SALES: '/sales',
    MARKETING: '/marketing',
    ADMIN: '/admin',

    // Nested route paths (without parent prefix)
    NESTED: {
        PROPOSALS: 'proposals',
        CURRICULUM: 'curriculum',
        TEAM: 'team',
        RESOURCES: 'resources',
        SETTINGS: 'settings',
        HELP: 'help',
        LEAD: 'lead',
        ORDERS: 'orders',
        BILLING: 'billing',
        TEACHERS: 'teachers',
        FEEDBACK: 'feedback',
        PROMOTION: 'promotion',
        APPROVALS: 'approvals',
        INVOICES: 'invoices',
        NOTIFICATIONS: 'notifications',
        CONTROL: 'control'
    }
};
