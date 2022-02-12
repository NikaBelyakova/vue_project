import Main from "@/pages/Main";
import { createRouter, createWebHistory } from "vue-router";


const routes = [
    {
        path: '/',
        component: Main
    }
]

const router = createRouter ({
    routes,
    hystory: createWebHistory(process.env.BASE_URL)
})

export default router;