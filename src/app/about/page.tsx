'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="w-full px-4 md:px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-5xl font-bold text-gray-900 mb-8">About Us</h1>
                <p className="text-xl text-gray-600">
                  We believe that every child deserves access to quality education, regardless of their circumstances. 
                  Our mission is to break down barriers to education and create opportunities for children to learn, 
                  grow, and thrive. Since our inception, we have been committed to transforming lives through education, 
                  working tirelessly to ensure that no child is left behind in their educational journey.
                </p>
                <p className="text-xl text-gray-600 mt-8">
                  Through our innovative programs and dedicated team, we work tirelessly to ensure that education 
                  becomes a powerful tool for transformation in communities around the world. Our approach combines 
                  traditional teaching methods with cutting-edge technology, creating an engaging and effective 
                  learning environment that prepares students for the challenges of tomorrow.
                </p>
                <p className="text-xl text-gray-600 mt-8">
                  We believe in the power of community and collaboration. By working closely with local leaders, 
                  educators, and families, we create sustainable educational solutions that are tailored to the 
                  unique needs of each community. Our success is measured not just in numbers, but in the lasting 
                  impact we make on the lives of children and their families.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Vision</h3>
                  <p className="text-lg text-gray-600">
                    A world where every child has access to quality education and opportunities to reach their full potential. 
                    We envision a future where education is not a privilege but a fundamental right, where every child can 
                    dream big and have the tools to achieve those dreams.
                  </p>
                </div>
                <div className="bg-gray-50 p-8 rounded-lg border border-gray-100">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Our Values</h3>
                  <p className="text-lg text-gray-600">
                    Excellence in everything we do, Innovation in our teaching methods, Integrity in our operations, 
                    and unwavering Commitment to creating lasting change. We believe in transparency, accountability, 
                    and the power of education to transform lives.
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-lg overflow-hidden shadow-lg"
            >
              <Image
                src="/images/about/mission.jpg"
                alt="Children in classroom"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 bg-gray-50">
        <div className="w-full px-4 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to global impact, our organization has grown to become a leading force in educational development. 
              Our journey is marked by continuous growth, innovation, and an unwavering commitment to our mission of providing 
              quality education to all children.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                year: "2008",
                title: "Our Beginning",
                description: `Founded with a vision to transform education in underserved communities. Started with a single classroom 
                and a passionate team of educators dedicated to making a difference.`
              },
              {
                year: "2015",
                title: "Global Expansion",
                description: `Expanded our reach to multiple countries, serving diverse communities. Established partnerships with 
                local organizations and governments to create sustainable educational programs.`
              },
              {
                year: "2023",
                title: "Innovation Hub",
                description: `Launched our digital learning platform, reaching even more children. Introduced cutting-edge technology 
                and innovative teaching methods to enhance learning outcomes.`
              }
            ].map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg shadow-md border border-gray-100"
              >
                <div className="text-5xl font-bold text-blue-600 mb-6">{milestone.year}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{milestone.title}</h3>
                <p className="text-lg text-gray-600">{milestone.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="w-full px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50K+", label: "Children Reached Through Our Programs" },
              { number: "100+", label: "Communities Transformed" },
              { number: "95%", label: "Success Rate in Primary Education" },
              { number: "15+", label: "Years of Dedicated Service" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-blue-600 mb-4">{stat.number}</div>
                <div className="text-xl text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-gray-50">
        <div className="w-full px-4 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Impact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Through our programs and initiatives, we&apos;ve made a significant difference in the lives of children 
              and their communities. Our comprehensive approach to education has created lasting positive change 
              in countless lives, building stronger communities and brighter futures.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Education Access",
                description: `Providing quality education to children in underserved communities through innovative programs and partnerships. 
                Our mobile schools and digital learning platforms ensure that no child is left behind, regardless of their location or circumstances.`,
                icon: (
                  <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                )
              },
              {
                title: "Community Development",
                description: `Building stronger communities through education, support, and sustainable development initiatives. 
                Our programs extend beyond the classroom, creating lasting positive change in the social and economic fabric of communities.`,
                icon: (
                  <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )
              },
              {
                title: "Future Leaders",
                description: `Nurturing the next generation of leaders and innovators through comprehensive education and mentorship programs. 
                Our leadership development initiatives prepare students to become change-makers in their communities and beyond.`,
                icon: (
                  <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-lg text-center border border-gray-100 shadow-md"
              >
                <div className="flex justify-center mb-8">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{item.title}</h3>
                <p className="text-lg text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-white">
        <div className="w-full px-4 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Programs</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer a comprehensive range of educational programs designed to meet the unique needs of each community. 
              Our programs are carefully crafted to ensure maximum impact and sustainable results, combining traditional 
              teaching methods with modern educational approaches.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Primary Education Initiative",
                description: `Quality primary education for underserved children, focusing on core subjects and essential life skills. 
                Our curriculum is designed to be engaging and relevant, preparing students for future success while instilling 
                a love for learning.`,
                image: "/images/programs/primary.jpg"
              },
              {
                title: "Community Learning Centers",
                description: `Learning centers for children unable to attend traditional schools, providing flexible education options. 
                These centers serve as hubs of learning and community engagement, offering both academic support and 
                extracurricular activities.`,
                image: "/images/programs/community.jpg"
              }
            ].map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative h-[400px] rounded-lg overflow-hidden shadow-lg group"
              >
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-6">{program.title}</h3>
                    <p className="text-xl text-gray-200">{program.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="w-full px-4 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the passionate individuals who are dedicated to making a difference in children&apos;s lives. Our team brings 
              together diverse expertise and experience to create innovative solutions for educational challenges.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Executive Director",
                bio: `With over 15 years of experience in education and community development, Sarah leads our organization with vision and dedication. 
                She has spearheaded numerous successful initiatives and continues to drive innovation in educational programming.`,
                image: "/images/team/sarah.jpg"
              },
              {
                name: "Michael Chen",
                role: "Program Director",
                bio: `Michael brings innovative approaches to education and has successfully implemented programs in multiple countries. 
                His expertise in curriculum development and teacher training has transformed our educational delivery methods.`,
                image: "/images/team/michael.jpg"
              },
              {
                name: "Priya Patel",
                role: "Community Outreach",
                bio: `Priya&apos;s expertise in community engagement has helped us build strong partnerships and expand our reach. 
                She has developed effective strategies for community involvement and sustainable program implementation.`,
                image: "/images/team/priya.jpg"
              }
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-md"
              >
                <div className="relative h-[300px]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{member.name}</h3>
                  <p className="text-xl text-blue-600 font-semibold mb-6">{member.role}</p>
                  <p className="text-lg text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-600">
        <div className="w-full px-4 md:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center space-y-8"
          >
            <h2 className="text-4xl font-bold text-white">Join Our Mission</h2>
            <p className="text-xl text-white">
              Be part of our journey to transform lives through education. Together, we can create a brighter future 
              for children around the world. Your support, whether through donations, volunteering, or spreading awareness, 
              helps us reach more children and create lasting positive change in communities worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
              <button className="px-10 py-5 bg-white text-blue-600 rounded-md font-semibold text-lg hover:bg-gray-100 transition-colors">
                Donate Now
              </button>
              <button className="px-10 py-5 bg-transparent border-2 border-white text-white rounded-md font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors">
                Get Involved
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 