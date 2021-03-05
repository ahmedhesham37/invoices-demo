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
            },{
                id       : 'e-commerce',
                title    : 'E-Commerce',
                translate: 'NAV.ECOMMERCE',
                type     : 'collapsable',
                icon     : 'shopping_cart',
                children : [
                    {
                        id        : 'products',
                        title     : 'Products',
                        type      : 'item',
                        url       : '/e-commerce/products',
                        exactMatch: true
                    },
                    {
                        id        : 'productDetail',
                        title     : 'Product Detail',
                        type      : 'item',
                        url       : '/e-commerce/products/1',
                        // exactMatch: true
                    },
                    {
                        id        : 'orders',
                        title     : 'Orders',
                        type      : 'item',
                        url       : '/e-commerce/orders',
                        exactMatch: true
                    },
                    {
                        id        : 'orderDetail',
                        title     : 'Order Detail',
                        type      : 'item',
                        url       : '/e-commerce/orders/1',
                        exactMatch: true
                    }
                ]
            },
        ]
    }
];
