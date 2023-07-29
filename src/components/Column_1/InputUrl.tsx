import { useEffect, useRef, useState } from 'react'
import { Button } from '@chakra-ui/react';
import styles from './InputUrl.module.css'

type IframeRenderProps = {
  iframeRef: React.RefObject<HTMLIFrameElement>
  iframeurl: string
}
function IframeRender(props: IframeRenderProps) {
  return (
    <>
      <iframe
        ref={props.iframeRef}
        is='x-frame-bypass'
        src={props.iframeurl}
        className={styles.iframe}
        title="iframe"
        width="100%"
        height="100%"
      />
    </>
  )
}

function InputUrl() {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [url, setUrl] = useState("")
  const [iframeurl, setIframeurl] = useState("")
  const [listurl, setListurl] = useState([
    {
      id: Date.now() + Math.random(),
      url: "https://www.google.com/",
      updateTime: Date.now()

    },
    {
      id: Date.now() + Math.random(),
      url: "https://www.youtube.com/",
      updateTime: Date.now()
    },
    {
      id: Date.now() + Math.random(),
      url: "https://www.facebook.com/",
      updateTime: Date.now()
    },
  ])


  useEffect(() => {
    function getUrlList() {
      console.log("Url list")
    }
    getUrlList()
  }, [])


  function saveUrl() {
    console.log("Url saved")
  }

  function setSelection() {
    console.log(iframeRef.current?.contentWindow?.getSelection()?.toString())
  }

  function deleteUrl(id: string) {
    console.log("Url deleted ", id)
  }

  return (
    <>
      <div className={styles.container}>

        <input
          disabled={iframeurl !== "" ? true : false}
          type="text"
          className={styles.input}
          placeholder="https://www.google.com/"
          value={url} onChange={(e) => setUrl(e.target.value)}
        />
        <Button className={styles.btn}
          // style={iframeurl !== "" ? { display: "none" } : { display: "block" }}
          onClick={
            () => {
              iframeurl !== "" ? saveUrl() : setIframeurl(url)
            }
          }
        >{iframeurl !== "" ? "Save" : "Go"}</Button>
      </div>
      <div className={styles.iframe_container}>
        {
          iframeurl !== "" ?
            <IframeRender iframeRef={iframeRef} iframeurl={iframeurl} /> :
            <div className={styles.urllist_container}>
              <h1>Enter URL or select from the list</h1>

              {
                listurl.map((item: any, index: number) => {
                  return (
                    <div className={styles.urlitem} key={index}>
                      <p className={styles.urlitem_name}
                        onClick={() => {
                          setUrl(item.url)
                          setIframeurl(item.url)
                        }}
                      >{item.url}</p>
                      <div className={styles.urlitem_trash}
                        onClick={() => {
                          deleteUrl(item.id)
                        }}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </div>
                    </div>
                  )
                })
              }

            </div>
        }
      </div>
      <div className={styles.btn_gr}>
        <Button

          className={styles.btn}
          onClick={
            () => {
              setSelection()
            }
          }
        >Get Selection</Button>
      </div>
    </>
  )
}
export default InputUrl