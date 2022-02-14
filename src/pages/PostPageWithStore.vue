<template>
    <div>
         <!-- <h1>{{ $store.state.isAuth ? "Пользователь авторизован" : "Авторизуйтесь, чтобы использовать сервис"}}</h1>
        <h1>{{ $store.getters.doubleLikes }}</h1> -->
        <!-- <div>
            <my-button @click="$store.commit('incrementLikes')">Лайк</my-button>
            <my-button @click="$store.commit('decrementLikes')">Дизлайк</my-button>
        </div> -->
        <h1>Страница с постами</h1>
        <my-input
        v-focus
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        placeholder="Поиск..."
        />
        <div class="app__btns">
            <my-button
                @click="showDialog"
            >
                Создать пост
            </my-button>
            <my-select
            :model-value="selectedSort"
            @update:model-value="setSelectedSort"
            :options="sortOptions"
            />
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form
                @create="createPost"
            />
        </my-dialog>
        <post-list
            :posts="sortedAndSearchedPosts"
            @remove="removePost"
            v-if="!isPostLoading"
        /> 
        <div class="loader" v-else></div>
        <div v-intersection="loadMorePosts" class="observer"></div>
        <div class="page__wrapper">
            <div
            v-for="pageNumber in totalPages"
            :key="pageNumber"
            class="page"
            :class="{
                'current_page': page === pageNumber
            }"
            @click="changePage(pageNumber)"
            >
                {{ pageNumber }}
            </div>
        </div>
    </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyButton from "@/components/UI/MyButton";
import MySelect from "@/components/UI/MySelect";
import axios from 'axios';
import MyInput from '@/components/UI/MyInput.vue';
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

export default {
    components: {
        MySelect,
        MyButton,
        PostList, 
        PostForm,
        MyInput,
    },
    data () {
        return {
            dialogVisible: false,
        }
    },
    methods: {
        ...mapMutations({
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort',
        }),
        ...mapActions ({
            loadMorePosts: 'post/loadMorePosts',
            fetchPosts: 'post/fetchPosts'
        }),
        createPost (post) {
            this.posts.push(post);
            this.dialogVisible = false;
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id)
        },
        showDialog () {
            this.dialogVisible = true
        },

    },
    mounted () {
        this.fetchPosts();
    },
    computed: {
        ...mapState ({
            posts: state => state.post.posts,
            isPostLoading: state => state.post.isPostLoading,
            selectedSort: state => state.post.selectedSort,
            searchQuery: state => state.post.searchQuery,
            page: state => state.post.page,
            limit: state => state.post.limit,
            totalPages: state => state.post.totalPages,
            sortOptions: state => state.post.sortOptions,
        }),
        ...mapGetters ({
            sortedPost: 'post/sortedPost',
            sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
        })
    },
    watch: {
        // page() {
        //     this.fetchPosts()
        // }
    }
}
</script>

<style>
/* Атрибут scoped - говорит о том, что стили будут применены только к этому компоненту и не будут доступны извне */
    .loader{
	margin: 20px;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	border: 5px solid rgb(202, 202, 202);
	border-top: 5px solid #1abc9c;
	animation: spin 2s linear infinite;
}

    @keyframes spin{
        0%{
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }

    .app__btns {
        margin: 15px 0;
        display: flex;
        justify-content: space-between;
    }

    .page__wrapper {
        display: flex;
        margin-top: 15px;
    }

    .page {
        border: 1px solid black;
        padding: 10px;
    }

    .current_page {
        border: 2px solid teal;
    }

    .observer {
        height: 30px;
        background: green;
    }

</style>