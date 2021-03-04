import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'invoice-compact',
                title    : 'Create An Invoice',
                translate: 'NAV.CREATEINVOICE',
                type     : 'item',
                icon     : 'crop_portrait',
                url      : 'invoices/create',
            },
            {
                id       : 'invoice-modern',
                title    : 'Modern Invoice',
                translate: 'NAV.INVOICEMODERN',
                type     : 'item',
                icon     : 'crop_portrait',
                url      : 'invoices/modern',
            }
        ]
    }
];
