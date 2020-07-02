import './global.css';
import './global.scss';
import { en } from '../locales/en.yml';
import { zh } from '../locales/zh.yml';
import config from './config.toml';
import styles1 from './styles.module.css';
import styles2 from './styles.module.scss';

console.log(config);
console.log({ styles1, styles2 });

const el = document.getElementById('app');
const locales = { en, zh };
const lang = window.location.search.substr(1);
const locale = locales[lang === 'en' ? 'en' : 'zh'];

console.log('locale', locale);

el.innerHTML = `<h1 class="test">${
  locale.hello
} ${window.location.pathname.substr(
  1
)}</h1> <img src=${require('./test.png')}/>`;
