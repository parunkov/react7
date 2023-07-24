const initialState = {
    posts: [],
    currentPage: 1,
}

const LOAD_POSTS = 'posts/LOAD_POSTS';
const CHANGE_PAGE = 'posts/CHANGE_PAGE';

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_POSTS: {
            return {
                ...state,
                posts: action.posts
            }
        }
        case CHANGE_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        default:
            return state;
    }
} 

export const load = (posts) => ({
    type: LOAD_POSTS,
    posts
});

export const changePage = (currentPage) => ({
    type: CHANGE_PAGE,
    currentPage
})

export const loadPosts = (currentPage) => async(dispatch) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${(currentPage - 1) * 10}&_limit=10`);
    const posts = await response.json();
    dispatch(load(posts));
}

export default postsReducer;
