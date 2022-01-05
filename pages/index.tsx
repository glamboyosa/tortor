import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
const Home: NextPage = () => {
  const { push } = useRouter() || { push: null }
  return (
    <div className={styles.container}>
      <Head>
        <title>Tortor⚡️</title>
      </Head>
      <NextSeo
        title="Tortor⚡️"
        description="A utility for taking screenshots of websites."
        canonical="https://tortor.app"
        openGraph={{
          url: 'https://tortor.app',
          title: 'Tortor⚡️',
          description: 'A utility for taking screenshots of websites.',
          images: [
            {
              url: 'https://tortor.vercel.app/images/og-image.png',
              width: 800,
              height: 600,
              alt: 'Tortor Homepage',
              type: 'image/png',
            },
            {
              url: 'https://www.tortor.app/images/og-image.png',
              alt: 'Tortor homepage',
              type: 'image/png',
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <main className={styles.main}>
        <h1 className={styles.title}>Tortor⚡️</h1>
        <p className={styles.description}>
          A utility for taking screenshots of websites.
        </p>
        <div className={styles.marginutility}>
          <button className={styles.button} onClick={() => push('/capture')}>
            Try it out
          </button>
        </div>
        <img
          className={`${styles.animationcontrols} ${styles.cube}`}
          src="/icons/triangle.png"
          alt="a triangle image provided by Darius Dan https://www.flaticon.com/authors/darius-dan"
        />
        <img
          className={`${styles.animationcontrols} ${styles.triangle}`}
          src="/icons/cube.png"
          alt="a cube image provided by Darius Dan https://www.flaticon.com/authors/darius-dan"
        />
        <img
          className={`${styles.animationcontrols} ${styles.shape}`}
          src="/icons/geometric-shape.png"
          alt="a geometric shape image provided by Darius Dan https://www.flaticon.com/authors/darius-dan"
        />
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
