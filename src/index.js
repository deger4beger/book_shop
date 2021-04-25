import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from './AppContainer'
import { YMaps } from 'react-yandex-maps'
import store from "./redux/store"
import NotificationProvider from './components/other/Alert/AlertProvider';

ReactDOM.render(
	<BrowserRouter>
		<YMaps>
			<NotificationProvider>
				<Provider store={store}>
					<AppContainer />
				</Provider>
			</NotificationProvider>
		</YMaps>
	</BrowserRouter>,
  document.getElementById('root')
);


