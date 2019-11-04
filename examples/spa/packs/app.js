import './global.scss';
import { en } from '../locales/en.yml';
import { zh } from '../locales/zh.yml';

const el = document.getElementById('app');
const locales = { en, zh };
const lang = window.location.search.substr(1);
const locale = locales[lang === 'en' ? 'en' : 'zh'];

console.log('locale', locale);

el.innerHTML = `<h1>${locale.hello} ${window.location.pathname.substr(1)}</h1>`;
