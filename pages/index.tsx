import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const { push } = useRouter() || { push: null }
  return (
    <div className={styles.container}>
      <Head>
        <title>Tortor</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Tortor🏝</h1>
        <p className={styles.description}>
          A utility for taking screenshots of websites.
        </p>
        <div className={styles.marginutility}>
          <button className={styles.button} onClick={() => push('/capture')}>
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

export default Home
