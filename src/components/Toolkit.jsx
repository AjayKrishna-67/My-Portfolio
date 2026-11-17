import {
  SiAppstore,
  SiCss,
  SiDocker,
  SiFirebase,
  SiFlutter,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGoogle,
  SiGoogleanalytics,
  SiGoogleplay,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiJira,
  SiLinux,
  SiMeta,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenjdk,
  SiPostman,
  SiRazorpay,
  SiReact,
  SiRedis,
  SiReduxsaga,
  SiRemix,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';
import {
  TbApi,
  TbBrandAws,
  TbLayoutDashboard,
  TbMail,
  TbMessage2,
  TbPackage,
  TbTruckDelivery,
} from 'react-icons/tb';
import LogoLoop from './LogoLoop';

// Languages, front end, back end and data, from the resume.
const buildTools = [
  { node: <SiJavascript />, title: 'JavaScript', hoverColor: '#f0db4f' },
  { node: <SiTypescript />, title: 'TypeScript', hoverColor: '#3178c6' },
  { node: <SiOpenjdk />, title: 'Java (basics)', hoverColor: '#e76f00' },
  { node: <SiReact />, title: 'React', hoverColor: '#61dafb' },
  { node: <SiRemix />, title: 'Remix' },
  { node: <SiNextdotjs />, title: 'Next.js' },
  { node: <SiHtml5 />, title: 'HTML5', hoverColor: '#e34f26' },
  { node: <SiCss />, title: 'CSS3', hoverColor: '#1572b6' },
  { node: <SiTailwindcss />, title: 'Tailwind CSS', hoverColor: '#38bdf8' },
  { node: <SiReduxsaga />, title: 'Redux-Saga', hoverColor: '#86d46b' },
  { node: <SiNodedotjs />, title: 'Node.js', hoverColor: '#5fa04e' },
  { node: <SiGraphql />, title: 'GraphQL', hoverColor: '#e10098' },
  { node: <TbApi />, title: 'REST APIs' },
  { node: <TbPackage />, title: 'Vendure', hoverColor: '#17c1ff' },
  { node: <SiRedis />, title: 'Redis', hoverColor: '#ff4438' },
  { node: <SiMysql />, title: 'MySQL', hoverColor: '#4479a1' },
  { node: <SiMongodb />, title: 'MongoDB', hoverColor: '#47a248' },
];

// Integrations, app release and the way the work gets shipped.
const shipTools = [
  { node: <SiRazorpay />, title: 'Razorpay', hoverColor: '#3395ff' },
  { node: <SiGoogle />, title: 'Google OAuth', hoverColor: '#4285f4' },
  { node: <TbTruckDelivery />, title: 'Shiprocket' },
  { node: <TbTruckDelivery />, title: 'Adloggs' },
  { node: <TbMessage2 />, title: 'MSG91' },
  { node: <TbLayoutDashboard />, title: 'Hygraph' },
  { node: <SiFirebase />, title: 'Firebase', hoverColor: '#ffca28' },
  { node: <SiMeta />, title: 'Meta Pixel', hoverColor: '#0081fb' },
  { node: <SiGoogleanalytics />, title: 'Google Analytics 4', hoverColor: '#e37400' },
  { node: <TbBrandAws />, title: 'AWS S3', hoverColor: '#ff9900' },
  { node: <TbMail />, title: 'EmailJS' },
  { node: <SiGoogleplay />, title: 'Google Play Console', hoverColor: '#01875f' },
  { node: <SiAppstore />, title: 'App Store Connect', hoverColor: '#0d96f6' },
  { node: <SiPostman />, title: 'Postman', hoverColor: '#ff6c37' },
  { node: <SiJira />, title: 'Jira', hoverColor: '#2684ff' },
  { node: <SiGit />, title: 'Git', hoverColor: '#f05032' },
  { node: <SiGithub />, title: 'GitHub' },
  { node: <SiLinux />, title: 'Linux', hoverColor: '#fcc624' },
];

const learning = [
  { Icon: SiDocker, name: 'Docker' },
  { Icon: SiGithubactions, name: 'CI/CD with GitHub Actions' },
  { Icon: SiFlutter, name: 'Flutter' },
];

// Two rows of tools that drift in opposite directions. Hovering pauses a
// row, and it can be dragged or flicked.
function Toolkit() {
  return (
    <section
      id="toolkit"
      className="border-t border-neutral-200 py-24 lg:py-32 dark:border-neutral-800"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-x-10 gap-y-4 px-6">
        <h2 className="display text-5xl sm:text-6xl">Toolkit</h2>
        <p className="max-w-[40ch] text-xl text-neutral-600 dark:text-neutral-400">
          Everything I work with, from the first screen to the store listing.
        </p>
      </div>

      <div className="mt-14 space-y-6 text-neutral-800 lg:mt-16 dark:text-neutral-200">
        <LogoLoop
          logos={buildTools}
          speed={40}
          direction="left"
          logoHeight={30}
          gap={56}
          hoverSpeed={0}
          labels="inline"
          fadeOutWidth={0.1}
          ariaLabel="Languages, frameworks and databases"
        />
        <LogoLoop
          logos={shipTools}
          speed={40}
          direction="right"
          logoHeight={30}
          gap={56}
          hoverSpeed={0}
          labels="inline"
          fadeOutWidth={0.1}
          ariaLabel="Integrations, app release and process tools"
        />
      </div>

      <div className="mx-auto mt-14 max-w-7xl px-6">
        <p className="flex flex-wrap items-center gap-x-6 gap-y-3 text-lg text-neutral-600 dark:text-neutral-400">
          <span className="font-semibold text-neutral-900 dark:text-neutral-100">
            Learning now
          </span>
          {learning.map((tool) => {
            const Icon = tool.Icon;
            return (
              <span key={tool.name} className="inline-flex items-center gap-2">
                <Icon aria-hidden="true" className="size-5" />
                {tool.name}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}

export default Toolkit;
