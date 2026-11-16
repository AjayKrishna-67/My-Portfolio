// What every store runs on, as label and value rows like the integrations list.
const storeStack = [
  ['Storefront', 'Remix and React'],
  ['Back end', 'Vendure on Node.js, TypeScript'],
  ['APIs', 'GraphQL and REST'],
  ['Data', 'MySQL, with Redis caching'],
];

const integrations = [
  ['Razorpay', 'payments'],
  ['Google OAuth', 'sign-in'],
  ['Shiprocket', 'logistics'],
  ['Redis', 'caching'],
  ['SMS and email', 'notifications'],
  ['Meta Pixel', 'ad tracking'],
  ['Google Analytics 4', 'analytics'],
];

// A sketch of the delivery map: a route between a rider and a customer.
function RouteSketch() {
  return (
    <svg
      viewBox="0 0 240 92"
      aria-hidden="true"
      className="h-auto w-full max-w-[17rem] text-neutral-300 dark:text-neutral-700"
    >
      <g stroke="currentColor" strokeWidth="1">
        <path d="M0 22h240M0 58h240M46 0v92M128 0v92M196 0v92" />
      </g>
      <path
        d="M22 74 C 46 74, 46 40, 88 40 S 128 58, 158 40 S 196 18, 214 18"
        fill="none"
        className="stroke-neutral-900 dark:stroke-neutral-100"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="0.5 7"
      />
      <circle cx="22" cy="74" r="6" className="fill-neutral-900 dark:fill-neutral-100" />
      <circle cx="22" cy="74" r="12" className="fill-neutral-900/10 dark:fill-neutral-100/15" />
      <path
        d="M214 4c-7 0-12 5-12 11.5C202 24 214 34 214 34s12-10 12-18.5C226 9 221 4 214 4z"
        className="fill-signal stroke-neutral-950"
        strokeWidth="1.5"
      />
      <circle cx="214" cy="15.5" r="4" className="fill-neutral-950" />
    </svg>
  );
}

// What the work covers, drawn from the resume. Each column carries its own
// kind of evidence rather than repeating one card three times.
function Areas() {
  return (
    <section
      aria-labelledby="areas-title"
      className="border-t border-neutral-200 dark:border-neutral-800"
    >
      <div className="mx-auto max-w-7xl px-6 pt-14 pb-16 lg:pt-20 lg:pb-24">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3">
          <h2 id="areas-title" className="display text-3xl sm:text-4xl">
            What I work on
          </h2>
          <p className="max-w-[46ch] text-neutral-600 dark:text-neutral-400">
            Shipped in 15-day Scrum sprints tracked in Jira, with code review on
            every pull request.
          </p>
        </div>


        <div className="mt-10 grid border-y border-neutral-200 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 dark:border-neutral-800">
          <article className="py-8 md:pr-8 lg:py-10">
            <h3 className="display text-2xl">Online stores</h3>
            <p className="mt-3 max-w-[40ch] text-lg text-neutral-600 dark:text-neutral-400">
              Four live B2C platforms that I build and run end to end, from the
              product page to a paid, shipped order.
            </p>
            <ul aria-label="What the stores run on" className="mt-5 text-[0.95rem]">
              {storeStack.map(([part, tech]) => (
                <li
                  key={part}
                  className="flex items-baseline justify-between gap-4 border-t border-neutral-200 py-2 first:border-t-0 dark:border-neutral-800"
                >
                  <span className="font-semibold">{part}</span>
                  <span className="text-right text-neutral-500 dark:text-neutral-400">{tech}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="border-t border-neutral-200 py-8 md:border-t-0 md:border-l md:pl-8 lg:py-10 lg:pr-8 dark:border-neutral-800">
            <h3 className="display text-2xl">Integrations</h3>
            <p className="mt-3 max-w-[40ch] text-lg text-neutral-600 dark:text-neutral-400">
              Seven in production that I own, from checkout to analytics. I
              test each third-party API in Postman.
            </p>
            <ul className="mt-5 text-[0.95rem]">
              {integrations.map(([name, role]) => (
                <li
                  key={name}
                  className="flex items-baseline justify-between gap-4 border-t border-neutral-200 py-2 first:border-t-0 dark:border-neutral-800"
                >
                  <span className="font-semibold">{name}</span>
                  <span className="text-neutral-500 dark:text-neutral-400">{role}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="border-t border-neutral-200 py-8 md:col-span-2 md:grid md:grid-cols-2 md:gap-8 lg:col-span-1 lg:block lg:border-t-0 lg:border-l lg:py-10 lg:pl-8 dark:border-neutral-800">
            <div>
              <h3 className="display text-2xl">Apps and delivery</h3>
              <p className="mt-3 max-w-[40ch] text-lg text-neutral-600 dark:text-neutral-400">
                South Mithai&rsquo;s Flutter app, released on Google Play and the
                App Store. KaaiKani Delivery, with live GPS tracking, a delivery
                map and a live fleet map.
              </p>
            </div>
            <div className="mt-6 md:mt-2 lg:mt-6">
              <RouteSketch />
              <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
                A Next.js PWA in a Capacitor Android shell.
              </p>
            </div>
          </article>
        </div>

        <div className="mt-8 grid items-center gap-6 rounded-2xl bg-neutral-950 p-8 text-neutral-50 sm:p-10 md:grid-cols-12 dark:bg-neutral-900 dark:ring-1 dark:ring-neutral-800">
          <h3 className="display text-3xl md:col-span-5 lg:col-span-4 lg:text-4xl">
            <span className="mr-4 inline-block size-4 rounded-sm bg-signal align-middle" aria-hidden="true" />
            CRM and ERP
          </h3>
          <p className="max-w-[52ch] text-xl text-neutral-300 md:col-span-7 lg:col-span-8">
            I have working knowledge of CRM and ERP systems, and of how a
            store&rsquo;s customers, orders and stock connect to them.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Areas;
