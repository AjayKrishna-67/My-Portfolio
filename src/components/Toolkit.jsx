const stack = [
  { area: 'Languages', tools: 'JavaScript (ES6+), TypeScript, Java (basics)' },
  {
    area: 'Front end',
    tools: 'React, Remix, Next.js, HTML5, CSS3, Tailwind CSS, Redux-Saga',
  },
  {
    area: 'Back end',
    tools: 'Node.js, GraphQL, REST APIs, Vendure, Redis',
  },
  { area: 'Databases', tools: 'MySQL, MongoDB' },
  {
    area: 'Services',
    tools:
      'Razorpay, Google OAuth, Shiprocket, Adloggs, MSG91, Hygraph, Firebase Cloud Messaging and Remote Config, Meta Pixel, Google Analytics 4, AWS S3, EmailJS',
  },
  {
    area: 'App release',
    tools:
      'Google Play Console and App Store Connect: app signing, release builds and store review',
  },
  {
    area: 'Process',
    tools:
      'Postman for API testing, Jira and Scrum sprints, Git and GitHub, code review, Linux',
  },
  {
    area: 'Learning',
    tools: 'Docker, CI/CD with GitHub Actions, Flutter',
  },
];

function Toolkit() {
  return (
    <section
      id="toolkit"
      className="border-t border-neutral-200 dark:border-neutral-800"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-24 lg:grid-cols-12 lg:py-32">
        <div className="lg:col-span-5">
          <h2 className="display text-5xl sm:text-6xl">Toolkit</h2>
          <p className="mt-6 max-w-[36ch] text-xl text-neutral-600 dark:text-neutral-400">
            Everything I work with, from the first screen to the store listing.
          </p>
        </div>

        <dl className="border-b border-neutral-200 lg:col-span-7 dark:border-neutral-800">
          {stack.map(({ area, tools }) => (
            <div
              key={area}
              className="grid gap-x-6 gap-y-2 border-t border-neutral-200 py-6 sm:grid-cols-[8rem_1fr] dark:border-neutral-800"
            >
              <dt className="text-lg font-semibold">{area}</dt>
              <dd className="text-lg text-neutral-600 dark:text-neutral-400">
                {tools}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default Toolkit;
