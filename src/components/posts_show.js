import React, { Component } from 'react'; 
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom'; 
import { fetchPost, deletePost } from '../actions'; 

class PostsShow extends Component {
    componentDidMount() {
        const { id } = this.props.match.params; 
        this.props.fetchPost(id); 
    }

    onDeleteClick() {
        const { id } = this.props.match.params;
        this.props.deletePost(id, () => {
            this.props.history.push('/');
        }); 
    }

    render() {
        const { post } = this.props; 
        if (!post) {
            return <div>Loading...</div>
        }
        // console.log(`this.props:${JSON.stringify(this.props, null, 2)}`); 
        return (
            <div>
                <Link to="/">HOME</Link>
                <button
                    className="btn btn-danger float-right"
                    onClick={this.onDeleteClick.bind(this)}
                >
                    Delete Post
                </button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    }
}

function mapStateToProps({ posts }, ownProps) {  //this.props === ownProps
    return { post: posts[ownProps.match.params.id] }; 
}

export default connect(mapStateToProps, { fetchPost, deletePost }) (PostsShow); 