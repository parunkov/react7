import Pagination from "./Pagination";
import { connect } from "react-redux";
import { changePage, loadPosts } from "../../redux/posts-reducer";

const mapStateToProps = (state) => {
    return {
        currentPage: state.posts.currentPage
    }
}

export default connect(mapStateToProps, { changePage, loadPosts })(Pagination);