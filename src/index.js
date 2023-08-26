import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material';

import store from './store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

const theme = createTheme({
	pallete: {
		primary: {
			main: '#DBD9DB',
			light: '#D6C8E1',
			dark: '#82A2B5',
		},
		secondary: {
			main: '#D9E6EC',
			light: '#EBFFBF',
			dark: '#96B395',
		},
		btnDelete: {
			main: '#F9F6F5',
			dark: '#CBB8AF',
		},
	},
  typography: {
    fontSize: 20,
  }
});

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</Provider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
