import { FuseNavigation } from "@fuse/types";

export const navigation: FuseNavigation[] = [
    {
        id: "services",
        title: "Our Services",
        type: "item",
        url: "/main/services",
        icon: "crop_portrait",
        exactMatch: true,
    },
    {
        id: "projects",
        title: "Projects",
        type: "item",
        url: "/main/projects",
        icon: "crop_portrait",
        exactMatch: true,
    },
    {
        id: "invoices",
        title: "Invoices",
        type: "item",
        url: "/main/invoices",
        icon: "crop_portrait",
        exactMatch: true,
    },
];
