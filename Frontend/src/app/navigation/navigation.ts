import {FuseNavigation} from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'vbs',
        title: 'VBS',
        translate: 'NAV.VBS',
        type: 'group',
        children: [
            // {
            //     id: 'invoice-compact',
            //     title: 'Create An Invoice',
            //     translate: 'NAV.CREATEINVOICE',
            //     type: 'item',
            //     icon: 'crop_portrait',
            //     url: 'invoices1/create',
            // },
            // {
            //     id: 'invoice-modern',
            //     title: 'Modern Invoice',
            //     translate: 'NAV.INVOICEMODERN',
            //     type: 'item',
            //     icon: 'crop_portrait',
            //     url: 'invoices1/modern',
            // },
            {
                id: 'services',
                title: 'Our Services',
                type: 'item',
                translate: 'NAV.SERVICES',
                url: '/main/services',
                icon: 'crop_portrait',
                exactMatch: true
            },
            {
                id: 'invoices',
                title: 'Invoices',
                type: 'item',
                url: '/main/invoices',
                icon: 'crop_portrait',
                exactMatch: true
            }
        ]
    }
];
