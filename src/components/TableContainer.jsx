import Table from "./Table";
import { connect } from "react-redux";
import { loadPosts } from "../redux/posts-reducer";

const mapStateToProps = (state) => {
    return {
        posts: state.posts.posts,
        currentPage: state.posts.currentPage
    }
}

export default connect(mapStateToProps, { loadPosts })(Table);