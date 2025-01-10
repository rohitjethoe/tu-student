import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia';
import './style.css'
import App from './App.vue'
import router from './routes'
import 'katex/dist/katex.min.css'; 

const pinia = createPinia();

const messages = {};
const localeModules = import.meta.glob('./locale/*.js', { eager: true });

Object.entries(localeModules).forEach(([path, module]) => {
    const locale = path.match(/\/locale\/(.*)\.js$/)[1];
    messages[locale] = module.default;
});

const i18n = createI18n({
    legacy: false, 
    globalInjection: true,
    locale: 'en',
    fallbackLocale: 'nl',
    messages
})

var host = window.location.host
var subdomain = host.split('.')[0]

if (subdomain.length === 2) {
    i18n.global.locale.value = subdomain;
}

createApp(App)
    .use(i18n)
    .use(router)
    .use(pinia)
    .mount('#app')
