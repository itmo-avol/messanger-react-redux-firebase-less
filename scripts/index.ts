import {render} from 'preact';
import AppRoot from './components/AppRoot';
import './data/init';
import subscribe from './data/subscribe';

subscribe();
render( AppRoot, document.body );
