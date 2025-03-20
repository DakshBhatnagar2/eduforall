import { AcademicCapIcon, UserGroupIcon, GlobeAltIcon, HeartIcon } from '@heroicons/react/24/outline';

const programs = [
  {
    name: 'Primary Education Initiative',
    description: 'Providing quality primary education to children in underserved communities through our network of schools and learning centers.',
    icon: AcademicCapIcon,
    impact: 'Over 5,000 children enrolled in primary education programs',
  },
  {
    name: 'Community Learning Centers',
    description: 'Establishing community-based learning centers that provide education and support to children who cannot attend traditional schools.',
    icon: UserGroupIcon,
    impact: '50+ learning centers operating across different regions',
  },
  {
    name: 'Digital Education Program',
    description: 'Bridging the digital divide by providing access to technology and online learning resources to children in remote areas.',
    icon: GlobeAltIcon,
    impact: 'Digital education access provided to 2,000+ students',
  },
  {
    name: 'Teacher Training Program',
    description: 'Training and supporting local teachers to provide quality education in their communities.',
    icon: HeartIcon,
    impact: '500+ teachers trained and supported',
  },
];

export default function Programs() {
  return (
    <div className="bg-white">
      <div className="mx-auto px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Our Programs</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Educational Initiatives
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            We offer a range of programs designed to make quality education accessible to children in need.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
            {programs.map((program) => (
              <div key={program.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <program.icon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  {program.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{program.description}</p>
                  <p className="mt-6">
                    <span className="text-sm font-semibold leading-6 text-indigo-600">
                      Impact: {program.impact}
                    </span>
                  </p>
                </dd>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="text-center">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">Get Involved</h3>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Support our programs and help make education accessible to all children.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/donate"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Support Our Programs
              </a>
              <a href="/volunteer" className="text-sm font-semibold leading-6 text-gray-900">
                Become a Volunteer <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 