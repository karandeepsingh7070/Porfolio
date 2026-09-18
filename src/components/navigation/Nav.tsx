'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ListIcon, XIcon } from '@phosphor-icons/react/dist/ssr'
import { resumeHref } from '@/data/social'
import ThemeToggle from '@/components/ui/ThemeToggle'
import LogoBadge from './LogoBadge'
import styles from './Nav.module.scss'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const mobileMenu = (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          className={styles.mobileMenu}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <ul>
            {links.map((link, i) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.05 }}
              >
                <a href={link.href} onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              </motion.li>
            ))}
          </ul>
          <div className={styles.mobileFooter}>
            <ThemeToggle />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <nav className={styles.nav}>
      <LogoBadge onClick={() => setMenuOpen(false)} />
      <div className={styles.right}>
        <ul className={styles.links} onMouseLeave={() => setHovered(null)}>
          {links.map((link) => (
            <li key={link.href}>
              <a className={styles.link} href={link.href} onMouseEnter={() => setHovered(link.href)}>
                {hovered === link.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className={styles.pill}
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className={styles.desktopOnly}>
          <ThemeToggle />
        </div>
        <a className={styles.resume} href={resumeHref} target="_blank" rel="noopener noreferrer">
          Resume
        </a>
        <button
          type="button"
          className={styles.menuBtn}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <XIcon size={22} /> : <ListIcon size={22} />}
        </button>
      </div>

      {mounted && createPortal(mobileMenu, document.body)}
    </nav>
  )
}
