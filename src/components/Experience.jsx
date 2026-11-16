import { Timeline } from '@/components/ui/timeline';

const when = 'text-lg font-semibold';
const body = 'mt-2 max-w-[56ch] text-lg text-neutral-600 dark:text-neutral-400';

// Oldest first, so the line you scroll along ends at today.
const steps = [
  {
    title: 'Engineering',
    content: (
      <>
        <p className={when}>
          PSNA College of Engineering and Technology, Dindigul, 2020 to 2024
        </p>
        <p className={body}>
          B.E. in Electrical and Electronics Engineering.
        </p>
      </>
    ),
  },
  {
    title: 'Edex',
    content: (
      <>
        <p className={when}>
          Full-Stack Developer Certification, Edex IT Solutions, March to
          October 2024
        </p>
        <p className={body}>
          Full-stack web development course and certification.
        </p>
      </>
    ),
  },
  {
    title: 'AVS EComHub',
    content: (
      <>
        <p className={when}>Full-Stack Developer, June 2025 to now, Madurai</p>
        <ul className={`${body} list-disc space-y-2 pl-5 marker:text-neutral-400`}>
          <li>
            Develop and maintain four production e-commerce platforms end to
            end, each serving live customers every day.
          </li>
          <li>
            Own seven production integrations: Razorpay, Google OAuth,
            Shiprocket, Redis, SMS and email, Meta Pixel and Google Analytics
            4, including failure handling, webhooks and vendor API changes.
          </li>
          <li>
            Test every third-party API in Postman before it reaches checkout.
          </li>
          <li>
            Ship in 15-day Scrum sprints tracked in Jira, with code review on
            every pull request.
          </li>
        </ul>
      </>
    ),
  },
  {
    title: 'IBM certificate',
    content: (
      <>
        <p className={when}>
          Exploratory Data Analysis for Machine Learning, January 2026
        </p>
        <p className={body}>Credential ID MGTAQ0ZTVY1P.</p>
      </>
    ),
  },
];

function Experience() {
  return (
    <section
      id="experience"
      className="border-t border-neutral-200 dark:border-neutral-800"
    >
      <div className="mx-auto max-w-7xl px-6 pt-24 lg:pt-32">
        <h2 className="display text-5xl sm:text-6xl">Experience</h2>
        <p className="mt-6 text-xl text-neutral-600 dark:text-neutral-400">
          From circuits to commerce.
        </p>
      </div>
      <div className="mx-auto max-w-7xl md:px-6">
        <Timeline data={steps} />
      </div>
    </section>
  );
}

export default Experience;
