import { useRef, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '@/styles/capture.module.css'
import Image from 'next/image'
const Capture: NextPage = () => {
  const input = useRef<HTMLInputElement>(undefined!)

  const [loading, setLoading] = useState(false)

  return (
    <div className={styles.container}>
      <Head>
        <title>Tortor</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Enter a web URL to experience Tortor. </h1>
        <div className={`${styles.marginutility} ${styles.grid}`}>
          <input
            ref={input}
            className={styles.input}
            placeholder="Enter a valid web url"
          />
          <button
            className={styles.button}
            onClick={() => console.log('click')}
          >
            Try it out
          </button>
        </div>
      </main>

      <footer className={styles.footer}>
        <p className={styles.fontutility}>
          Made with ❤️ by{' '}
          <a
            className={styles.link}
            href="https://github.com/glamboyosa"
            target="_blank"
            rel="noreferrer"
          >
            Timothy Ogbemudia
          </a>{' '}
        </p>
      </footer>
    </div>
  )
}

export default Capture
