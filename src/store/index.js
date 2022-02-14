import { createStore } from "vuex";
import { postModule } from "@/store/postModule";

export default createStore ({
    // Само состояние (данные, кот в нашем приложении)
    // state: {
    //     likes: 2,
    //     isAuth: false
    // },
    // Компьютед свойства, своего рода кэшируемые вычисляемые значения 
    // getters: {
    //     doubleLikes(state) {
    //         return state.likes * 2
    //     }
    // },
    // Изменять состояние напрямую не можем, но можем с помощью мутаций - функций, внутри кот изменяем поле состояний
    // mutations: {
    //     incrementLikes(state) {
    //         state.likes +=1
    //     },
    //     decrementLikes(state) {
    //         state.likes -=1
    //     }
    // },
    // функции, кот внутри себя используют мутации, внутри них делаем сайд-эффекты - получаем данные с сервера и сохраняем состояние
    // actions: {

    // },
    // модуль - изолированный кусочек состояния со своими геттерами,мутаци и экшионами
    modules: {
        post: postModule
    }
})