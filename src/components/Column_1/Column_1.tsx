import styles from './Column_1.module.css'
import { useState, ReactComponentElement, useId } from 'react'

import InputUrl from './InputUrl'
import InputFile from './InputFile'

type TabsList = {
  name: string,
  id: number,
  active: boolean
  body: ReactComponentElement<any>
}

function Column_1() {
  const [tabsList, setTabsList] = useState<TabsList[]>([])
  const [isPopUpOpen, setIsPopUpOpen] = useState(true)

  function addNewTab(type: string = "url" || "file") {
    const newTab: TabsList = {
      name: "New tab",
      id: Date.now()+Math.random(),
      active: true,
      body: type === "url" ? <InputUrl /> : <InputFile />
    }
    setTabsList((prev: TabsList[]) => {
      return prev.map((item: TabsList) => {
        return {
          ...item,
          active: false
        }
      })
    })
    setTabsList((prev: TabsList[]) => {
      return [...prev, newTab]
    })
    setIsPopUpOpen(false)
  }
  const idTabList = useId()
  return (
    <>
      <div className={styles.Tabs_container} id={idTabList}>
        {
          tabsList.map((tab, index) => {
            return (
              <div className={styles.Tabs_tab}
                key={index}
                style={tab.active ? { backgroundColor: "#D4E2D4" } : { backgroundColor: "#FAF3F0" }}
                onClick={() => {
                  setIsPopUpOpen(false)
                  setTabsList((prev: TabsList[]) => {
                    return prev.map((item: TabsList) => {
                      if (item.id === tab.id) {
                        return {
                          ...item,
                          active: true
                        }
                      } else {
                        return {
                          ...item,
                          active: false
                        }
                      }
                    })
                  })
                }}
              >
                <p className={styles.Tabs_tab_text}>{tab.name}</p>
                {
                  tab.active ?
                    <>
                      <div className={styles.Tabs_tab_close}
                        onClick={() => {
                          setTabsList((prev: TabsList[]) => {
                            return prev.filter((item: TabsList) => {
                              return item.id !== tab.id
                            })
                          })
                        }}
                      >
                        <i className="fa-regular fa-times"></i>
                      </div>
                    </>
                    :
                    null
                }
              </div>
            )
          })
        }
        <div className={styles.Tabs_tab_add}>
          <i className={"fa-regular fa-plus " + styles.Tabs_tab_add}
            style={{ marginLeft: "auto" }}
            onClick={() => {
              setIsPopUpOpen(true)
            }}
          ></i>
        </div>
      </div>

      {
        isPopUpOpen ?
          <>
            <div className={styles.PopUp_container}>
              <p>Choose a method</p>
              <div className={styles.PopUp_btn_list}>
                <button className={styles.PopUp_btn}
                  onClick={() => {
                    addNewTab("url")
                  }}
                >
                  via URL
                </button>
                <button className={styles.PopUp_btn}
                  onClick={() => {
                    addNewTab("file")
                  }}
                >
                  File upload
                </button>
              </div>
            </div>
          </>
          :
          null
      }
      {
        tabsList.map((tab, index) => {
          return (
            <div
              className={styles.Tabs_body} key={index}
              style={tab.active ? { display: "block" } : { display: "none" }}>
              {tab.body}
            </div >
          )
        })
      }
    </>
  )
}
export default Column_1