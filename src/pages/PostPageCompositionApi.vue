<template>
    <div>
        <h1>Страница с постами</h1>
        <my-input
        v-focus
        v-model="searchQuery"
        placeholder="Поиск..."
        />
        <div class="app__btns">
            <my-button
            >
                Создать пост
            </my-button>
            <my-select
            v-model="selectedSort"
            :options="sortOptions"
            />
        </div>
        <my-dialog v-model:show="dialogVisible">
            <post-form/>
        </my-dialog>
        <post-list
            :posts="sortedAndSearchedPosts"
            v-if="!isPostLoading"
        /> 
        <div class="loader" v-else></div>
    </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyButton from "@/components/UI/MyButton";
import MySelect from "@/components/UI/MySelect";
import axios from 'axios';
import MyInput from '@/components/UI/MyInput.vue';
import {ref} from 'vue';
import {usePosts} from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts";

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
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По содержимому'},
            ]
        }
    },
    setup(props) {
        const {posts, totalPages, isPostsLoading} = usePosts(10);
        const {sortedPosts, selectedSort} = useSortedPosts(posts);
        const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts)
        return {
            posts,
            totalPages,
            isPostsLoading,
            sortedPosts,
            selectedSort,
            searchQuery,
            sortedAndSearchedPosts,
        }
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