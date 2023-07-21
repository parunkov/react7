const initialState = {
    posts: [],
    currentPage: 1,
}

const LOAD_POSTS = 'posts/LOAD_POSTS';

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_POSTS: {
            return {
                ...state,
                posts: action.posts
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

export const loadPosts = (currentPage) => async(dispatch) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${currentPage * 10 - 1}&_limit=10`);
    const posts = await response.json();
    console.log("🚀 ~ file: posts-reducer.js:30 ~ loadPosts ~ posts:", posts);
    dispatch(load(posts));
}

export default postsReducer;
