import { useRef, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '@/styles/capture.module.css'
import Image from 'next/image'
const Capture: NextPage = () => {
  const input = useRef<HTMLInputElement>(undefined!)

  const [loading, setLoading] = useState(false)

  const [screenshot, setScreenshot] = useState<string | null>(null)
  const submitHandler = async () => {
    const url = input.current.value
    if (url.includes('https://')) {
      const body = JSON.stringify({ url })
      setLoading(true)
      fetch('/api/capture', {
        body,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.text())
        .then((res) => {
            setLoading(fals)
            setScreenshot(res)
        })
        .catch((e) => {
          setLoading(false)
          console.log(JSON.stringify(e))
        })
    } else {
      const formattedUrl = 'https://' + url
      const body = JSON.stringify({ url: formattedUrl })
      setLoading(true)
      fetch('/api/capture', {
        body,
        method: 'POST',
      })
        .then((res) => res.text())
        .then((res) => {
          setLoading(false)
          setScreenshot(res)
        })
        .catch((e) => {
          setLoading(false)
          console.log(JSON.stringify(e))
        })
    }
  }
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
          <button className={styles.button} onClick={submitHandler}>
            Try it out
          </button>
        </div>
        {loading && (
          <div className={styles.main}>
            <p className={`${styles.description} ${styles.marginutility}`}>
              Here&apos;s a cute gif while your image is being prepared 🙂
            </p>
            <Image
              src={
                'https://c.tenor.com/D4UWrImI444AAAAM/milk-and-mocha-dance.gif'
              }
              alt="some cute dancing bears :)"
              width={350}
              height={200}
            />
          </div>
        )}
        {screenshot && (
          <div className={styles.main}>
            <Image src={screenshot} alt="your image" width={350} height={200} />
          </div>
        )}
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
