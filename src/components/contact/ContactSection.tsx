import Reveal from '@/components/ui/Reveal'
import { email, socialLinks } from '@/data/social'
import CopyEmail from './CopyEmail'
import styles from './ContactSection.module.scss'

export default function ContactSection() {
  return (
    <section id="contact" className={styles.section}>
      <div className="container">
        <Reveal>
          <h2 className={styles.heading}>You&apos;ve reached the bottom.</h2>
          <p className={styles.subheading}>Or maybe, a new beginning — let&apos;s connect.</p>
          <CopyEmail email={email} />

          <div className={styles.socials}>
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.label}
                  className={styles.socialLink}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  {Icon ? (
                    <Icon size={20} weight="regular" />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={social.imgSrc} alt="" className={styles.socialImg} />
                  )}
                </a>
              )
            })}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
