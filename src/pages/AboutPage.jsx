import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">About Full Flex</h1>
            <p className="mt-2 text-gray-600">Learn more about our mission, team and what we build.</p>
          </div>
          <Link to="/" className="text-sm text-blue-600 hover:underline">Back to Home</Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 lg:col-span-2">
            <h2 className="text-2xl font-medium text-gray-800">Our mission</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Full Flex is built to provide flexible, modern e-learning tooling for creators and
              learners. We focus on simple UX, fast performance, and features that make courses
              engaging and accessible.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-gray-800">For creators</h3>
                <p className="text-sm text-gray-600 mt-2">Easily upload content, manage sections and engage learners.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <h3 className="font-semibold text-gray-800">For learners</h3>
                <p className="text-sm text-gray-600 mt-2">Discover courses, track progress, and interact with instructors.</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold text-gray-800">Values</h3>
              <ul className="list-disc list-inside mt-3 text-gray-600">
                <li>Simple, intuitive UX</li>
                <li>Performance-first frontend</li>
                <li>Privacy and security by design</li>
              </ul>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-medium text-gray-800">Get in touch</h2>
            <p className="mt-3 text-gray-600 text-sm">Have questions or want to collaborate? Reach out to our team.</p>

            <div className="mt-6 space-y-3">
              <div className="text-sm text-gray-700">
                <strong>Email:</strong> <a href="mailto:hello@fullflex.app" className="text-blue-600">hello@fullflex.app</a>
              </div>
              <div className="text-sm text-gray-700">
                <strong>Location:</strong> Remote-first
              </div>
            </div>

            <div className="mt-6">
              <Button onClick={() => window.location.href = 'mailto:hello@fullflex.app'}>Contact us</Button>
            </div>
          </Card>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-medium text-gray-800 mb-4">Meet the team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Jibran', role: 'Founder & Engineer' },
              { name: 'Arshad', role: 'Product' },
              { name: 'Zubair', role: 'Design' },
              { name: 'Ranaji', role: 'Community' },
            ].map((member) => (
              <Card key={member.name} className="p-4 flex flex-col items-start">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">{member.name.charAt(0)}</div>
                <div className="mt-3">
                  <div className="font-medium text-gray-800">{member.name}</div>
                  <div className="text-sm text-gray-600">{member.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
