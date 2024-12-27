// config imports
import './infrastructure/ethers/ethers.service.ts';

// react imports
import React from 'react';
import ReactDOM from 'react-dom/client';

// style imports
import GlobalStyle from './presentation/styles/global.style';

// component imports
import App from './app';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<GlobalStyle />
		<App />
	</React.StrictMode>,
);
