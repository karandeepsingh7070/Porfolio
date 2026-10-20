'use client'
import { useEffect, useRef, useState } from 'react'
import { CheckIcon, CopyIcon } from '@phosphor-icons/react/dist/ssr'
import { email } from '@/data/social'
import styles from './PortfolioContent.module.scss'

export default function CopyAddress() {
  const [status, setStatus] = useState('Copy email')
  const timer = useRef<ReturnType<typeof setTimeout>>()
  useEffect(() => () => clearTimeout(timer.current), [])
  async function copy() {
    try {
      await navigator.clipboard.writeText(email)
      setStatus('Email copied')
    } catch { setStatus('Select the address above to copy') }
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setStatus('Copy email'), 3500)
  }
  return <button type="button" onClick={copy} className={styles.copy}>
    {status === 'Email copied' ? <CheckIcon size={14} /> : <CopyIcon size={14} />}<span aria-live="polite">{status}</span>
  </button>
}
