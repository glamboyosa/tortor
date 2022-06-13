import { useRef, useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '@/styles/capture.module.css'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { TInputRef, TSelectRef, TWebsocket } from 'lib/types'
import Input from '@/components/Input'
import Select from '@/components/Select'

const Capture: NextPage = () => {
  const prod = process.env.NODE_ENV === 'production'
  const ws = useRef<TWebsocket>(undefined!)
  const input = useRef<TInputRef>(undefined!)
  const select = useRef<TSelectRef>(undefined!)
  const [downloadName, setDownloadName] = useState('')

  const [loading, setLoading] = useState(false)

  const [screenshot, setScreenshot] = useState<string | null>(null)

  const [error, setError] = useState(false)

  const notify = (type: 'error' | 'info', message?: string) =>
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
  useEffect(() => {
    ws.current = new WebSocket(
      prod
        ? 'wss://tortor-ws.herokuapp.com/api/capture'
        : 'ws://localhost:4000/api/capture',
    )
    ws.current.onmessage = function (event) {
      const data = JSON.parse(event.data)
      if (data.error) {
        setTimeout(
          () =>
            notify(
              'info',
              "We weren't able to get your screenshot. Please try again later.",
            ),
          5000,
        )
        setLoading(false)
        setError(false)
      } else {
        setLoading(false)
        setError(false)
        setScreenshot(data.img)
      }
    }
  }, [])
  const submitHandler = () => {
    const url = input.current.value
    const device = select.current.value

    if (url.includes('https://')) {
      setDownloadName(url.split('https://')[1])
      const body = JSON.stringify({ url, device })
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
          ws.current?.send(body)
          setError(true)
          notify('info', 'Have no fear your image will soon be with you')
        })
    } else {
      const formattedUrl = 'https://' + url
      setDownloadName(formattedUrl.split('https://')[1])
      const body = JSON.stringify({ url: formattedUrl, device })
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
          ws.current?.send(body)
          setError(true)
          notify('info', 'Have no fear your image will soon be with you')
        })
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Tortor⚡️</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Enter a web URL to experience Tortor. </h1>
        <div className={`${styles.marginutility} ${styles.grid}`}>
          <Input ref={input} />
          <Select ref={select} />
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
        {screenshot && !loading && !error ? (
          <div className={styles.main}>
            <img
              className={styles.screenshot}
              src={`data:image/png;base64,${screenshot}`}
              alt="your image"
            />
            <a
              href={`data:image/png;base64,${screenshot}`}
              download={`${downloadName}.png`}
              className={`${styles.marginutility} ${styles.button}`}
            >
              download your image 🚀
            </a>
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
