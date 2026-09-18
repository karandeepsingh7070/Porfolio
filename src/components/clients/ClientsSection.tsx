'use client'

import { Fragment } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { clientGroups } from '@/data/clients'
import styles from './ClientsSection.module.scss'

export default function ClientsSection() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.groups}>
          {clientGroups.map((group, groupIndex) => (
            <Fragment key={group.title}>
              {groupIndex > 0 && <span className={styles.divider} aria-hidden="true" />}
              <div className={styles.group}>
                <p className={styles.groupTitle}>{group.title}</p>
                <div className={styles.row}>
                  {group.clients.map((client, i) => (
                    <motion.div
                      key={client.name}
                      className={styles.item}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 18, scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ delay: i * 0.08, type: 'spring', stiffness: 260, damping: 20 }}
                    >
                      <span className={styles.tile}>
                        {client.logo ? (
                          <Image src={client.logo} alt={client.name} className={styles.logoImg} />
                        ) : client.logoSrc ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={client.logoSrc} alt={client.name} className={styles.logoImg} />
                        ) : null}
                      </span>
                      <span className={styles.caption}>{client.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
