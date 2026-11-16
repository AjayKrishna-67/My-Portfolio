import { useState } from 'react';
import { TextFlippingBoard } from '@/components/ui/text-flipping-board';

// The board's resting state: what gets wired up, and with what.
const OVERVIEW = {
  label:
    'A store, end to end. Catalogue: Vendure. Payments: Razorpay. Delivery: Shiprocket. Sign-in: Google.',
  rows: [
    ' A STORE, END TO END',
    '',
    ' CATALOGUE  VENDURE',
    ' PAYMENTS   RAZORPAY',
    ' DELIVERY   SHIPROCKET',
    ' SIGN-IN    GOOGLE',
  ],
};

const parts = [
  {
    name: 'Storefront',
    detail:
      'Product listing, category navigation, product pages, search, cart and checkout, server-side rendered with Remix loaders and actions so pages load fast and search engines can read them.',
    board: 'STOREFRONT \nREMIX + REACT \nSERVER-SIDE RENDERED',
  },
  {
    name: 'Catalogue and orders',
    detail:
      'Vendure as the headless back end over GraphQL, on MySQL: products, customers, orders and inventory. One back end serves several stores, and Hygraph holds content and media.',
    board: 'CATALOGUE + ORDERS \nVENDURE + GRAPHQL \nMYSQL',
  },
  {
    name: 'Sign-in',
    detail:
      'Google OAuth for quick sign-in, and a Vendure plugin I wrote for one-time-passcode login by email.',
    board: 'SIGN-IN \nGOOGLE OAUTH \nEMAIL OTP',
  },
  {
    name: 'Payments',
    detail:
      'Razorpay checkout with verified capture on success, a clean rollback on failure, and a retry that keeps the customer’s cart.',
    board: 'PAYMENTS \nRAZORPAY \nUPI, CARDS, WALLETS',
  },
  {
    name: 'Delivery',
    detail:
      'Shiprocket for rates, shipment creation and tracking, covering hyperlocal and international orders, plus Adloggs. Every endpoint is tested in Postman before it reaches checkout.',
    board: 'DELIVERY \nSHIPROCKET + ADLOGGS \nRATES + TRACKING',
  },
  {
    name: 'Notifications',
    detail:
      'SMS through MSG91, automatic email, and Firebase push notifications in the mobile app.',
    board: 'NOTIFICATIONS \nSMS, EMAIL, PUSH',
  },
  {
    name: 'Speed and analytics',
    detail:
      'Redis caching on the busiest pages, with Meta Pixel and Google Analytics 4 events to measure ad-to-order conversion.',
    board: 'SPEED + ANALYTICS \nREDIS \nMETA PIXEL + GA4',
  },
];

function Build() {
  const [selected, setSelected] = useState(null);
  const part = selected === null ? null : parts[selected];

  return (
    <section id="build">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
        <h2 className="display text-5xl sm:text-6xl">Build</h2>
        <p className="mt-6 max-w-[52ch] text-xl text-neutral-600 dark:text-neutral-400">
          What goes into a store before it can take its first order. Pick a
          part and the board shows what I use for it.
        </p>

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:sticky lg:top-24 lg:col-span-7">
            <div
              role="img"
              aria-label={`Split-flap board reading: ${
                part ? part.board.replace(/ \n/g, '. ') : OVERVIEW.label
              }`}
            >
              <TextFlippingBoard
                text={part?.board}
                rows={part ? undefined : OVERVIEW.rows}
              />
            </div>
          </div>

          <ul className="border-b border-neutral-200 lg:col-span-5 dark:border-neutral-800">
            {parts.map(({ name, detail }, index) => {
              const active = selected === index;
              return (
                <li
                  key={name}
                  className="border-t border-neutral-200 dark:border-neutral-800"
                >
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelected(active ? null : index)}
                    className={`block w-full cursor-pointer border-l-4 py-5 pr-2 pl-5 text-left transition-colors ${
                      active
                        ? 'border-signal bg-neutral-100 dark:bg-neutral-900'
                        : 'border-transparent hover:bg-neutral-100 dark:hover:bg-neutral-900'
                    }`}
                  >
                    <span className="block text-xl font-bold">{name}</span>
                    <span className="mt-2 block text-lg text-neutral-600 dark:text-neutral-400">
                      {detail}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Build;
