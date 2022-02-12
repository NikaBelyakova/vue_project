import { createApp } from 'vue'
import App from './App'
import components from "@/components/UI";
import router from "@/router/router";


const app = createApp(App)


// Зарегистрируем компонент глобально, чтоб каждый раз его отдельно импортировать
components.forEach(component => {
    app.component(component.name, component)
});

app
    .use(router)
    .mount('#app');