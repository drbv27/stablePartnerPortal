interface SeedProduct {
    description: string;
    short: string;
    images: string[];
    inStock: number;
    price: number;
    sizes: ValidSizes[];
    slug: string;
    tags: string[];
    title: string;
    type: ValidTypes;
    gender: 'voip'|'equipement'|'internet'|'service'
    recurrent?: boolean;
}

type ValidSizes = 'XS'|'S'|'M'|'L'|'XL'|'XXL'|'XXXL';
type ValidTypes = 'shirts'|'pants'|'hoodies'|'hats';

interface SeedData {
    products: SeedProduct[],
}




export const initialData: SeedData = {
    products: [
        {
            description: "Business VoIP Phone Service Nationwide Unlimited Calling",
            images: [
                'voip2.jpg',
                'VOIPIMAGEN.jpg',
            ],
            inStock: 7,
            price: 29.99,
            sizes: ['XS','S','M','L','XL','XXL'],
            slug: "voip-4p-bussiness-voip-phone-service",
            type: 'shirts',
            tags: ['sweatshirt'],
            title: "VOIP-4P",
            gender: 'voip',
            short: 'per user/month',
            recurrent: true,
        },
        {
            description: "Business SMS / MMS Texting: 1,000",
            images: [
                'SMSIMAGE.jpg',
                'SMS2.jpg',
            ],
            inStock: 5,
            price: 14.99,
            sizes: ['XS','S','M','XL','XXL'],
            slug: "men_quilted_shirt_jacket",
            type: 'shirts',
            tags: ['jacket'],
            title: "SMS-Silver",
            gender: 'service',
            short: 'per user/month',
            recurrent: true,
        },
        
        {
            description: "Toll Free Business Calling: 1,000 inbound minutes",
            images: [
                'tollfree.jpg',
                'tollfree2.jpg'
            ],
            inStock: 10,
            price: 9.99,
            sizes: ['S','M','L','XL','XXL'],
            slug: "men_raven_lightweight_zip_up_bomber_jacket",
            type: 'shirts',
            tags: ['shirt'],
            title: "Toll-Free",
            gender: 'service',
            short: 'per phone number/month',
            recurrent: true,
        },
        {
            description: "The Grandstream GXP2135 is a sleek High-End IP phone that will bring higher levels of communication productivity to a network",
            images: [
                'gxp2135_frontB.png',
                'gpx-2135.png'
            ],
            inStock: 10,
            price: 4.50,
            sizes: ['S','M','L','XL','XXL'],
            slug: "gxp-2135-lease",
            type: 'shirts',
            tags: ['shirt'],
            title: "GXP 2135 Lease",
            gender: 'service',
            short: 'per device/month',
            recurrent: true,
        },
        {
            description: "Navent.iO Business CRM: Unlimited Users, Contacts, Customers, and Leads",
            images: [
                'navent1.jpg',
                'navent2.jpg'
            ],
            inStock: 10,
            price: 99.99,
            sizes: ['S','M','L','XL','XXL'],
            slug: "nvnt-crm",
            type: 'shirts',
            tags: ['shirt'],
            title: "NVNT CRM",
            gender: 'service',
            short: 'per month',
            recurrent: true,
        },
        {
            description: "Business Internet 5G Fixed Wireless (VZN Managed) 200MPBS",
            images: [
                '5gv2.jpg',
                '5gv1.jpg',
            ],
            inStock: 10,
            price: 149.99,
            sizes: ['S','M','L','XL','XXL'],
            slug: "uisp5gv",
            type: 'shirts',
            tags: ['shirt'],
            title: "UISP5GV",
            gender: 'service',
            short: 'per month',
            recurrent: true,
        },
        {
            description: "Business Internet 5G Fixed Wireless (TBM Managed) 200MBPS",
            images: [
                '5gtm1.jpg',
                '5gtm2.jpg'
            ],
            inStock: 10,
            price: 199.99,
            sizes: ['S','M','L','XL','XXL'],
            slug: "uisp5gtm",
            type: 'shirts',
            tags: ['shirt'],
            title: "UISP5GTM",
            gender: 'service',
            short: 'per month',
            recurrent: true,
        },
        {
            description: "Business IT & Cyber Security On-site Service Agreement 10 On-site Hours",
            images: [
                'cybrit1.jpg',
                'cybrit2.jpg'
            ],
            inStock: 10,
            price: 499,
            sizes: ['S','M','L','XL','XXL'],
            slug: "cybrit500",
            type: 'shirts',
            tags: ['shirt'],
            title: "CYBRIT500",
            gender: 'service',
            short: 'per month',
            recurrent: true,
        },
        {
            description: "Microsoft Office 365 Business Basic: Exchange, OneDrive, Teams, MS Apps",
            images: [
                'Office-logo.png',
                'o365a.png'
            ],
            inStock: 10,
            price: 8.99,
            sizes: ['S','M','L','XL','XXL'],
            slug: "mso365bb",
            type: 'shirts',
            tags: ['shirt'],
            title: "MSO365BB",
            gender: 'service',
            short: 'per user / month',
            recurrent: true,
        },
        {
            description: "On-Site IT/Tech Support: On-site Troubleshooting, Installation, Networking, PC Support",
            images: [
                'support1.jpg',
                'support2.jpg'
            ],
            inStock: 10,
            price: 75,
            sizes: ['S','M','L','XL','XXL'],
            slug: "it001",
            type: 'shirts',
            tags: ['shirt'],
            title: "IT001",
            gender: 'service',
            short: 'per hour',
            recurrent: false,
        },
        

    ]
}