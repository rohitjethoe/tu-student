import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia';
import './style.css'
import App from './App.vue'
import router from './routes'
import { en, nl } from '@/locale/index.js';

const pinia = createPinia();

const i18n = createI18n({
    locale: 'en',
    fallbackLocale: 'nl',
    messages: {
        en,
        nl,
    }
})

var host = window.location.host
var subdomain = host.split('.')[0]

if (subdomain.length === 2) {
    i18n.global.locale = subdomain;
}

createApp(App)
    .use(i18n)
    .use(router)
    .use(pinia)
    .mount('#app')
