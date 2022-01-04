import { useRef, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '@/styles/capture.module.css'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Capture: NextPage = () => {
  const input = useRef<HTMLInputElement>(undefined!)

  const [loading, setLoading] = useState(false)

  const [screenshot, setScreenshot] = useState<string | null>(null)

  const notify = (type: 'error', message?: string) =>
    toast(message, {
      position: 'top-center',
      type,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

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
        .then((res) => res.json())
        .then((res: { img: string }) => {
          setLoading(false)
          setScreenshot(res.img)
        })
        .catch((e) => {
          setLoading(false)
          notify('error', e.message)
        })
    } else {
      const formattedUrl = 'https://' + url
      const body = JSON.stringify({ url: formattedUrl })
      setLoading(true)
      fetch('/api/capture', {
        body,
        method: 'POST',
      })
        .then((res) => res.json())
        .then((res: { img: string }) => {
          setLoading(false)
          setScreenshot(res.img)
        })
        .catch((e) => {
          setLoading(false)
          notify('error', e.message)
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
            Submit
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
        {screenshot && !loading ? (
          <div className={styles.main}>
            <img
              className={styles.bs}
              src={`data:image/png;base64,${screenshot}`}
              alt="your image"
            />
            <button
              className={`${styles.marginutility} ${styles.button}`}
              onClick={submitHandler}
            >
              download your image 🚀
            </button>
          </div>
        ) : null}
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
      <ToastContainer />
    </div>
  )
}

export default Capture
