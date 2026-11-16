import southMithai from '../assets/south-mithai.webp';
import kaaikaniDelivery from '../assets/kaaikani-delivery.webp';
import kaaikani from '../assets/kaaikani.webp';
import swadKerala from '../assets/swad-kerala.webp';
import prabhas from '../assets/prabhas-aari-designs.webp';
import avsEcomhub from '../assets/avs-ecomhub.webp';

// `url` only where the address was checked and loads.
// A project without `image` shows a title panel in place of a screenshot.
export const projects = [
  {
    id: 'south-mithai',
    title: 'South Mithai',
    image: southMithai,
    period: 'Sep – Dec 2025',
    summary:
      'Web and mobile storefronts for a sweets and snacks brand that sells across India and overseas.',
    built: [
      'A Remix storefront on a multi-tenant Vendure back end that serves several stores from shared infrastructure.',
      'Google sign-in and Razorpay checkout with explicit order states: verified capture on success, clean rollback on failure, and a retry that keeps the customer’s cart.',
      'Redis caching for the busiest product and collection pages, and rewrites of the slowest MySQL queries behind them.',
      'Weight-based shipping, and a Frequently Ordered Products shortcut so repeat buyers reorder in a few taps.',
      'International orders through Shiprocket’s quote, order-creation and tracking APIs.',
      'The Flutter app released on Google Play and the App Store, with Firebase push notifications and Remote Config for version prompts.',
    ],
    stack: 'Remix, React, Flutter, Node.js, TypeScript, Vendure, GraphQL, MySQL, Redis',
    url: 'https://southmithai.com/',
    domain: 'southmithai.com',
  },
  {
    id: 'kaaikani-delivery',
    title: 'KaaiKani Delivery',
    // Fleet page. Rider names and phone numbers are blurred in the file itself.
    image: kaaikaniDelivery,
    period: 'Since Aug 2026',
    summary:
      'The delivery partner app and operations console behind KaaiKani’s stores. Built with a team; my part is the delivery map and live GPS tracking.',
    built: [
      'A full-screen delivery map: customer and rider pins, the driving route, distance and ETA, with each GPS fix snapped to the route while a ride is live.',
      'Background tracking on Android: a Capacitor shell around the Next.js PWA keeps GPS streaming while a delivery is active, and stops the moment it is delivered.',
      'A graded GPS accuracy policy and a ride odometer that ignore weak fixes, impossible jumps and doorstep jitter, so the recorded distance stays honest.',
      'A live fleet map for the owner: riders update over Socket.IO, with polling as the fallback.',
      'Around it, the operations side: payment collection by cash, QR or payment link, goods transfers between branches, stock by location, price updates, GST invoices and sales reports.',
    ],
    stack: 'Next.js, TypeScript, Capacitor, Google Maps, Socket.IO, GraphQL, Vendure',
  },
  {
    id: 'kaaikani',
    title: 'KaaiKani',
    image: kaaikani,
    period: 'Apr – Jul 2025',
    summary:
      'A grocery store for fresh vegetables, fruit and dairy, delivering across Coimbatore, Madurai and Salem.',
    built: [
      'A mobile-first Remix storefront designed around daily repeat purchases rather than one-off orders.',
      'Product listing, category navigation, product pages, cart and checkout, using Remix loaders and actions on Vendure’s GraphQL API.',
      'Hygraph CMS for content and media, Razorpay for payments, and MSG91 for SMS order confirmations and status updates.',
      'Meta Pixel and GA4 events for page views, add-to-cart and purchases, so marketing can measure ad-to-order conversion.',
    ],
    stack: 'Remix, React, Node.js, TypeScript, Vendure, GraphQL, MySQL, Hygraph, Razorpay, MSG91',
  },
  {
    id: 'swad-kerala',
    title: 'Swad Kerala and SipNnourish',
    image: swadKerala,
    summary:
      'Platform features for two more stores on the shared Vendure back end. Swad Kerala sells spices from Kerala.',
    built: [
      'A TypeScript Vendure plugin for one-time-passcode login by email, extending the GraphQL schema and resolvers, after password resets became a recurring support request.',
      'Add-on items, so customers can customise a product at checkout: the platform’s main upsell.',
      'Shiprocket hyperlocal delivery with live tracking and automatic order assignment.',
    ],
    stack: 'Node.js, TypeScript, Vendure, GraphQL',
    url: 'https://www.swadkerala.com/',
    domain: 'swadkerala.com',
  },
  {
    id: 'prabhas-aari-designs',
    title: 'Prabha’s Aari Designs',
    image: prabhas,
    period: 'May – Jun 2026',
    summary: 'An online store for hand-crafted aari work.',
    built: [
      'The whole storefront flow: product listing and details, search, cart, checkout, sign-in and order management.',
      'Vendure as the headless back end, over GraphQL, for products, customers, orders and inventory.',
      'Razorpay payments and Google sign-in.',
      'Automatic emails for registration and order confirmation.',
      'Light and dark themes on reusable Tailwind CSS components, server-side rendered.',
    ],
    stack: 'Vendure, GraphQL, Tailwind CSS, Razorpay, Google OAuth',
    url: 'https://prabhasaaridesigns.com/',
    domain: 'prabhasaaridesigns.com',
  },
  {
    id: 'avs-ecomhub',
    title: 'AVS EComHub',
    image: avsEcomhub,
    summary:
      'The company website for AVS EComHub, an enterprise of KaaiKani, presenting its SaaS products and e-commerce services.',
    built: [
      'Designed and developed the whole site as a static Next.js build.',
      'A clean, modern interface, responsive across desktop, tablet and mobile.',
      'Meta Pixel for tracking visitors, interactions and marketing campaign performance.',
      'Tuned for performance and loading speed.',
    ],
    stack: 'Next.js, Meta Pixel',
    url: 'https://avsecomhub.com/',
    domain: 'avsecomhub.com',
  },
];

// Personal projects from before the job.
export const earlierProjects = [
  {
    title: 'Quick Serve',
    period: 'Oct 2024 – May 2025',
    summary:
      'A service-booking web app with separate user and admin panels in React. Redux-Saga manages the REST API state, and image uploads go through AWS S3 so admins stopped moving files by hand.',
    stack: 'React, Redux-Saga, AWS S3',
  },
  {
    title: 'Periyanachi HiTech Solutions',
    summary:
      'A static business site deployed through cPanel. EmailJS enquiry forms land in the owner’s inbox, with no back end to host or maintain.',
    stack: 'HTML, CSS, JavaScript, cPanel, EmailJS',
    url: 'https://www.periyanachisolutions.com/',
    domain: 'periyanachisolutions.com',
  },
];
