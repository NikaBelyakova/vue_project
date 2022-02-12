<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input
        v-model="searchQuery"
        placeholder="Поиск..."
        />
        <div class="app__btns">
            <my-button
                @click="showDialog"
            >
                Создать пост
            </my-button>
            <my-select
            v-model="selectedSort"
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
        <div ref="observer" class="observer"></div>
        <!-- <div class="page__wrapper">
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
        </div> -->
    </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyButton from "@/components/UI/MyButton";
import MySelect from "@/components/UI/MySelect";
import axios from 'axios';
import MyInput from './components/UI/MyInput.vue';

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
            posts: [],
            dialogVisible: false,
            isPostLoading: false,
            selectedSort: '',
            searchQuery: '',
            page: 1,
            limit: 10,
            totalPages: 0,
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По содержимому'},
            ]
        }
    },
    methods: {
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
        // changePage (pageNumber) {
        //     this.page = pageNumber;
        // },
        async fetchPosts() {
            try {
                this.isPostLoading = true;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit,
                    }
                });
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                this.posts = response.data;
            } catch (e) {
                alert ('Ошибка')
            } finally {
                this.isPostLoading = false;
            }
        },
        async loadMorePost() {
            try {
                this.page += 1;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit,
                    }
                });
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit);
                this.posts = [...this.posts, ...response.data];
            } catch (e) {
                alert ('Ошибка')
            } 
        }
    },
    mounted () {
        this.fetchPosts();
        console.log(this.$refs.observer);
        const options = {
            rootMargin: '0px',
            threshold: 1.0
        }
        const callback = (entries, observer) => {
            if (entries[0].isIntersecting && this.page < this.totalPages) {
                this.loadMorePost()
            }
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(this.$refs.observer);
    },
    computed: {
        sortedPost() {
            return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
        },
        sortedAndSearchedPosts() {
            return this.sortedPost.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
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