import { useEffect, useState } from "react";
import styles from './Column_2.module.css'

type TranslateContent = {
  id: number,
  content: string,
  translate: string
}
type Column_2Props = {
  data: TranslateContent
}
function Column_2(props: Column_2Props) {
  const [listsegment, setListsegment] = useState([] as TranslateContent[])
  useEffect(() => {
    setListsegment([
      ...listsegment,
      props.data
    ])
  }, [props.data])
  return (
    <div className={styles.container}>
      {listsegment.map((item: TranslateContent) => {
        return (
          item.content && <div className={styles.card} key={item.id}>
            <div className={styles.card_left}>{item.content}</div>
            <i className="fa-regular fa-arrow-right"></i>
            <div className={styles.card_right}>{item.translate}</div>
          </div>
        )
      })}
    </div>
  );
}

export default Column_2;