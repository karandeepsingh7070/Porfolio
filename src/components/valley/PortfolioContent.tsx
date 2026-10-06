import { Fragment } from 'react'
import Image from 'next/image'
import { ArrowDownIcon, ArrowUpRightIcon, PlusIcon } from '@phosphor-icons/react/dist/ssr'
import { caseStudies, indexProjects, type CaseStudy } from '@/data/projects'
import { experience, writing } from '@/data/experience'
import { capabilities } from '@/data/capabilities'
import { clientGroups } from '@/data/clients'
import { email, resumeHref, socialLinks } from '@/data/social'
import { soundtrack } from '@/data/soundtrack'
import CopyAddress from './CopyAddress'
import { ProjectLandmark, WorkshopCard } from './WorkshopContext'
import styles from './PortfolioContent.module.scss'

const pixabayTracks = soundtrack.filter(track => track.credit)
const ownTracks = soundtrack.filter(track => !track.credit)

function Links({ links }: { links: { label: string; href: string }[] }) {
  return <div className={styles.links}>{links.map(link => (
    <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRightIcon size={14} /></a>
  ))}</div>
}

function CaseStudyContent({ project }: { project: CaseStudy }) {
  const preview = project.gallery?.[1] ?? project.gallery?.[0]
  return <>
    <p className={styles.projectMeta}>{project.badge} <span>/</span> {project.role}</p>
    <h2>{project.name}<span className={styles.titleDot}>.</span></h2>
    <p className={styles.projectType}>{project.heading}</p>
    <p className={styles.description}>{project.solution}</p>
    <ul className={styles.techBadges} aria-label="Technology stack">{project.tech.map(tech => <li key={tech}>{tech}</li>)}</ul>
    <Links links={project.links} />
    {preview && <a href={preview.src.src} target="_blank" rel="noopener noreferrer" className={styles.projectImage} aria-label={`Open ${preview.alt}`}>
      <Image src={preview.src} alt={preview.alt} sizes="(max-width: 900px) 90vw, 36vw" />
    </a>}
    <details className={styles.details}>
      <summary>The thinking behind it <PlusIcon size={18} /></summary>
      <div className={styles.detailBody}>
        <h3>The problem</h3><p>{project.problem}</p>
        <h3>The approach</h3><p>{project.thinking}</p>
        <h3>The result</h3><p>{project.result}</p>
        <div className={styles.gallery}>{project.gallery?.map(item => <a key={item.alt} href={item.src.src} target="_blank" rel="noopener noreferrer"><Image src={item.src} alt={item.alt} sizes="(max-width: 900px) 85vw, 34vw" /></a>)}</div>
      </div>
    </details>
  </>
}

export default function PortfolioContent() {
  const groups = Array.from(new Set(capabilities.map(cap => cap.group)))
  return <>
    <section id="arrival" data-scene-step="0" className={`${styles.section} ${styles.hero}`}>
      <div className={styles.reading}>
        <p className={styles.eyebrow}>01. ARRIVAL — HIGH RIDGE</p>
        <h1>Thoughtful interfaces.<br />Resilient systems<span className={styles.titleDot}>.</span></h1>
        <p className={styles.intro}>I&apos;m <strong>Karan</strong>, a software engineer building thoughtful interfaces, resilient systems, and tools for other builders.</p>
        <div className={styles.heroActions}>
          <a href="#work" className={styles.primary}><span className={styles.arrowCircle}><ArrowDownIcon size={19} /></span>Explore the valley</a>
          <a href={resumeHref} className={styles.secondary} target="_blank" rel="noopener noreferrer">Resume <ArrowUpRightIcon size={15} /></a>
        </div>
      </div>
    </section>

    <section id="work" data-scene-step="1" className={`${styles.section} ${styles.workshops}`}>
      <div className={styles.reading}>
        <div className={styles.workshopIntro}>
        <p className={styles.eyebrow}>02. THE WORKSHOPS — SELECTED WORK</p>
        <h2>Built for the<br />real world<span className={styles.titleDot}>.</span></h2>
        <p className={styles.description}>Streaming platforms, live experiences, and the systems that keep them running.</p>
        <p className={styles.trailNote}>Two projects. Two stops along the stream.</p>
        </div>
        {indexProjects.slice(0, 2).map((project, index) => <WorkshopCard key={project.name} index={index}>
          <div className={styles.productionHeader}><span className={styles.projectIndex}>{String(index + 1).padStart(2, '0')}</span><div><p className={styles.projectMeta}>Viewlift / {index === 0 ? 'Team lead' : 'Frontend engineering'}</p><h3 id={`workshop-project-${index}`}>{project.name}</h3></div></div>
          <p>{project.description}</p>
          <p className={styles.impact}><span aria-hidden="true" />{index === 0 ? 'Live streaming · Led a team of 5' : 'Live data · Real-time analytics'}</p>
          <ul className={styles.techBadges} aria-label="Technology stack">{project.tech.map(tech => <li key={tech}>{tech}</li>)}</ul>
          <div className={styles.projectFooter}><Links links={project.links} /><span className={styles.landmarkLabel}>{index === 0 ? '01 / Broadcast workshop' : '02 / Outdoor station'}</span></div>
        </WorkshopCard>)}
        <div className={styles.clientGroups}>{clientGroups.map(group => <div key={group.title}>
          <p>{group.title}</p>
          <div className={styles.clients}>{group.clients.map(client => <div key={client.name}>
            {client.logo ? <Image src={client.logo} alt={client.name} sizes="80px" /> : client.logoSrc ? <Image src={client.logoSrc} width={85} height={34} alt={client.name} /> : <span>{client.name}</span>}
          </div>)}</div>
        </div>)}</div>
      </div>
    </section>

    <section id="overwatch" data-scene-step="2" className={styles.section}>
      <div className={styles.reading}><ProjectLandmark index={2} label="Overwatch TS"><p className={styles.landmarkCaption}>01 / The open observatory</p><CaseStudyContent project={caseStudies[0]} /></ProjectLandmark></div>
    </section>
    <section id="memory" data-scene-step="3" className={styles.section}>
      <div className={styles.reading}>
        <ProjectLandmark index={3} label="LLM Recall API"><p className={styles.landmarkCaption}>02 / The memory archive</p><CaseStudyContent project={caseStudies[1]} /></ProjectLandmark>
        <details className={`${styles.details} ${styles.moreWork}`}>
          <summary>More tools & experiments <span>{indexProjects.length - 2}<PlusIcon size={18} /></span></summary>
          <div className={styles.projectList}>{indexProjects.slice(2).map((project, index) => <ProjectLandmark key={project.name} index={index + 4} label={project.name}>
            <h3>{project.name}</h3><p>{project.description}</p><ul className={styles.techBadges} aria-label="Technology stack">{project.tech.map(tech => <li key={tech}>{tech}</li>)}</ul><Links links={project.links} />
          </ProjectLandmark>)}</div>
        </details>
      </div>
    </section>

    <section id="freelance" data-scene-step="4" className={styles.section}>
      <div className={styles.reading}>
        <ProjectLandmark index={10} label="Client and freelance work">
          <p className={styles.landmarkCaption}>03 / The riverside trade outpost</p>
          <p className={styles.projectMeta}>Client work <span>/</span> Freelance</p>
          <h2>Built around<br />your business<span className={styles.titleDot}>.</span></h2>
          <p className={styles.description}>Custom interfaces and systems shaped around the way your team works. From content management to operational dashboards, I help turn a difficult frontend problem into a practical tool.</p>
          <ul className={styles.techBadges} aria-label="Areas of work"><li>Custom CMS</li><li>Dashboards</li><li>Business applications</li></ul>
          <p className={styles.trailNote}>Have a project in mind? Let’s talk through what it needs.</p>
          <div className={styles.links}><a href="#contact">Discuss a project <ArrowUpRightIcon size={14} /></a></div>
        </ProjectLandmark>
      </div>
    </section>

    <section id="experience" data-scene-step="5" className={styles.section}>
      <div className={styles.reading}>
        <p className={styles.eyebrow}>03. THE STONE BRIDGE — EXPERIENCE</p>
        <h2>Every layer<br />matters<span className={styles.titleDot}>.</span></h2>
        <p className={styles.description}>From my first frontend to leading a team. A steady climb in responsibility.</p>
        <ol className={styles.experience}>{experience.map(entry => <li key={entry.period}>
          <p className={styles.period}>{entry.period}</p><h3>{entry.title}</h3><p className={styles.organisation}>{entry.organisation}</p>
          <ul>{entry.points.map(point => <li key={point}>{point}</li>)}</ul>
        </li>)}</ol>
        <details className={styles.details}>
          <summary>The tools I build with <PlusIcon size={18} /></summary>
          <dl className={styles.capabilities}>{groups.map(group => <div key={group}><dt>{group}</dt><dd>{capabilities.filter(cap => cap.group === group).map(cap => cap.label).join(', ')}</dd></div>)}</dl>
        </details>
      </div>
    </section>

    <section id="about" data-scene-step="6" className={styles.section}>
      <div className={styles.reading}>
        <p className={styles.eyebrow}>04. THE SHELTERED GARDEN — ABOUT</p>
        <h2>Always<br />a builder<span className={styles.titleDot}>.</span></h2>
        <div className={styles.aboutBody}>
          <p>I started with robots and PCBs. Then I got hooked on web development.</p>
          <p>That shift led to building frontend systems for streaming platforms, then open-source libraries and developer tools. These days, I also freelance on difficult frontend problems.</p>
          <p><strong>I prefer building the tools to using them.</strong> Managing state, speeding up data loads, eliminating lag: the less visible parts of software are often where I feel most at home.</p>
          <p>And when I get stuck, I put on my headphones and go for a walk.</p>
        </div>
        <div className={styles.writing}>
          <h3>Some things I&apos;ve written</h3>
          {writing.map(item => <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer"><span><small>{item.source}</small>{item.title}</span><ArrowUpRightIcon size={19} /></a>)}
        </div>
      </div>
    </section>

    <section id="contact" data-scene-step="7" className={`${styles.section} ${styles.contact}`}>
      <div className={styles.reading}>
        <p className={styles.eyebrow}>05. THE FLORAL HAVEN — CONTACT</p>
        <h2>What shall<br />we build<span className={styles.titleDot}>?</span></h2>
        <p className={styles.description}>Have a tricky frontend problem, a project in mind, or just something interesting to share?</p>
        <a className={styles.email} href={`mailto:${email}`}>{email}<ArrowUpRightIcon size={20} /></a>
        <CopyAddress />
        <div className={styles.socials}>{socialLinks.map(link => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<ArrowUpRightIcon size={13} /></a>)}</div>
        <p className={styles.location}>Based in New Delhi. Building for the web.</p>
        <p className={styles.credits}>Music by {pixabayTracks.map((track, i) => <Fragment key={track.src}>
          {i ? i === pixabayTracks.length - 1 ? ' and ' : ', ' : ''}<a href={track.credit} target="_blank" rel="noopener noreferrer">{track.artist}</a>
        </Fragment>)} from <a href="https://pixabay.com/music/" target="_blank" rel="noopener noreferrer">Pixabay</a>{ownTracks.map(track => <Fragment key={track.src}>, and “{track.title}” by {track.artist}</Fragment>)}.</p>
        <footer className={styles.footer}><span>© {new Date().getFullYear()} Karandeep Singh</span><a href="#arrival">Back to top ↑</a></footer>
      </div>
    </section>
  </>
}
