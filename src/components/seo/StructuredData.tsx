import { socialLinks, email } from '@/data/social'
import { capabilities } from '@/data/capabilities'
import { experience } from '@/data/experience'

const SITE_URL = 'https://www.karandeepsingh.space'

export default function StructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Karandeep Singh',
        alternateName: ['Karan', 'Karan Singh'],
        url: SITE_URL,
        image: `${SITE_URL}/portfolio.png`,
        email: `mailto:${email}`,
        jobTitle: ['Freelance Software Engineer', 'Frontend Engineer', 'Senior Software Engineer'],
        description:
          'Karan (Karandeep Singh) is a freelance software engineer and frontend engineer in New Delhi, building React and Next.js architecture for high-traffic platforms and open-source developer tools.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'New Delhi',
          addressCountry: 'IN',
        },
        worksFor: {
          '@type': 'Organization',
          name: experience[0]?.organisation ?? 'Viewlift',
        },
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'Guru Gobind Singh Indraprastha University',
        },
        knowsAbout: capabilities.map((c) => c.label),
        sameAs: socialLinks.map((s) => s.href),
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: 'Karandeep Singh',
        alternateName: 'Karan Singh Portfolio',
        url: SITE_URL,
        inLanguage: 'en',
        about: { '@id': `${SITE_URL}/#person` },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/#profilepage`,
        url: SITE_URL,
        mainEntity: { '@id': `${SITE_URL}/#person` },
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
