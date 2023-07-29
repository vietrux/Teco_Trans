import { useState } from "react"
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels"
import { ChakraProvider } from '@chakra-ui/react'
import styles from './App.module.css'

import Column_1 from "./components/Column_1/Column_1"

function App() {
	const [isCollapse_1, setIsCollapse_1] = useState(true)
	const [isCollapse_2, setIsCollapse_2] = useState(true)

	function arrowIcon(state: boolean) {
		if (state) {
			return <i className="fa-regular fa-arrow-right"></i>
		} else {
			return <i className="fa-regular fa-arrow-left"></i>
		}
	}
	return (
		<ChakraProvider>
			<PanelGroup direction="horizontal">
				<Panel
					defaultSize={27}
					minSize={0}
					collapsible={true}
					order={1}
					className={styles.Panel}
					style={
						isCollapse_1 ? { 
							display: "block",
							overflow: "hidden"
					 } : { display: "none" }
						

					}
				>
					<Column_1 />
				</Panel>
				<PanelResizeHandle
					className={styles.PanelResizeHandle}
					style={
						isCollapse_1 ? { display: "block" } : { display: "none" }
					}
				/>

				<Panel minSize={37} maxSize={50} order={2} className={styles.Panel + " " + styles.Panel_middle}>
					<button
						className={styles.btn_state + " " + styles.btn_state_left}
						onClick={() => setIsCollapse_1(!isCollapse_1)}>
						{isCollapse_1 ? arrowIcon(!isCollapse_1) : arrowIcon(!isCollapse_1)}
					</button>
					<button
						className={styles.btn_state + " " + styles.btn_state_right}
						onClick={() => setIsCollapse_2(!isCollapse_2)}>
						{isCollapse_2 ? arrowIcon(isCollapse_2) : arrowIcon(isCollapse_2)}
					</button>

				</Panel>

				<PanelResizeHandle className={styles.PanelResizeHandle}
					style={
						isCollapse_2 ? { display: "block" } : { display: "none" }
					}
				/>
				<Panel
					defaultSize={25}
					minSize={0}
					collapsible={true}
					order={3}
					className={styles.Panel}
					style={
						isCollapse_2 ? { display: "block" } : { display: "none" }
					}
				>
					right
				</Panel>


			</PanelGroup>
		</ChakraProvider>
	)
}

export default App