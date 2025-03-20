import Image from 'next/image';

const impactData = [
  {
    title: 'Children Reached',
    value: '10,000+',
    description: 'Direct impact on children through our educational programs',
  },
  {
    title: 'Communities Served',
    value: '50+',
    description: 'Communities transformed through education',
  },
  {
    title: 'Success Rate',
    value: '95%',
    description: 'Of our students continue their education',
  },
  {
    title: 'Volunteers',
    value: '1,000+',
    description: 'Dedicated volunteers supporting our mission',
  },
];

const successStories = [
  {
    name: "Sarah Johnson",
    role: "Program Graduate",
    content: "Thanks to TheEducationForAll, I was able to complete my education and now I'm pursuing my dream of becoming a teacher.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Michael Chen",
    role: "Community Leader",
    content: "TheEducationForAll has transformed our community by providing quality education to our children. The impact is visible in every aspect of our community.",
    image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Emma Rodriguez",
    role: "Volunteer",
    content: "Being part of TheEducationForAll has been one of the most rewarding experiences of my life. Seeing the impact on children&apos;s lives is truly inspiring.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

export default function Impact() {
  return (
    <div className="bg-white">
      <div className="mx-auto px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Our Impact</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Making a Real Difference in Children Lives
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Through our programs and initiatives, we&apos;ve helped thousands of children access quality education and build better futures.
          </p>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;re making a difference in communities around the world through our educational programs.
          </p>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us in our mission to transform lives through education.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {impactData.map((item) => (
              <div key={item.title} className="flex flex-col">
                <dt className="text-base font-semibold leading-7 text-gray-900">{item.title}</dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="text-3xl font-bold text-indigo-600">{item.value}</p>
                  <p className="mt-2">{item.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="text-center">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">Success Stories</h3>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Read about how our programs have transformed lives and communities.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-10 lg:max-w-none lg:grid-cols-3">
            {successStories.map((story) => (
              <article key={story.name} className="flex flex-col items-start">
                <div className="relative w-full">
                  <Image
                    src={story.image}
                    alt=""
                    className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                    width={800}
                    height={600}
                  />
                </div>
                <div className="max-w-xl">
                  <div className="mt-6 flex items-center gap-x-4 text-xs">
                    <time dateTime="2020-03-16" className="text-gray-500">
                      Success Story
                    </time>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      {story.name}
                    </h3>
                    <p className="mt-5 text-sm leading-6 text-gray-600">{story.content}</p>
                    <p className="mt-2 text-sm font-semibold text-indigo-600">{story.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="text-center">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900">Join Our Mission</h3>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Be part of our journey to make education accessible to all children.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/donate"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Support Our Impact
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