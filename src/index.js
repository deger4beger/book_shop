import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { AppContainer } from './AppContainer'
import { YMaps } from 'react-yandex-maps'
import store from "./redux/store"
import NotificationProvider from './components/other/Alert/AlertProvider';

ReactDOM.render(
	<HashRouter>
		<YMaps>
			<NotificationProvider>
				<Provider store={store}>
					<AppContainer />
				</Provider>
			</NotificationProvider>
		</YMaps>
	</HashRouter>,
  document.getElementById('root')
);


