import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import Home from './components/screens/home/Home'
import './assets/styles/global.scss'
import { store } from './store/store'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<Home />
		</Provider>
	</React.StrictMode>
)
