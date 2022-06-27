/* @refresh reload */
import { render } from 'solid-js/web';

import App from './App';
import { Router } from 'solid-app-router';
import Framer from './Framer';

render(() => <Framer><Router><App /></Router></Framer>, document.getElementById('root') as HTMLElement);
