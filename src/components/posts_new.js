import React, { Component } from 'react'; 
import { Field, reduxForm } from 'redux-form'; 
import { Link } from 'react-router-dom';    
import { connect } from 'react-redux'; 
import { createPost } from '../actions'

class PostsNew extends Component {
    renderField(field) {
        // const { meta } = field;
        // destructuring code - it pulls the key named mata from the object named field
        // instead of writing field.meta.touched you can write meta.touched inside this function
        const { meta: { touched, error } } = field; 
        // more destructuring code
        // now you olny write touched or error instead of field.meta.touched 
        const className = `form-group ${touched && error ? 'has-danger' : ''}`; 
        
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input 
                    className ="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-danger">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }

    onSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push('/'); 
        }); 
    }

    render() {
        const { handleSubmit } = this.props; 

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field 
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field 
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field 
                    label="Post content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Save</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
    const errors = {}; 

    //Validate the inputs from values
    if (!values.title) {
        errors.title = "Enter a title!"; 
    }
    if (!values.categories) {
        errors.categories = "Enter some categories."; 
    }
    if (!values.content) {
        errors.content = "Enter some content, please."; 
    }

    // if eerors is empty, the form is fine to submit
    // if errors has *any* proprties, redux form assumes form is invalid
    return errors; 
}

export default reduxForm({
    validate, 
    form: 'PostsNewForm'
}) (
    connect(null, { createPost })(PostsNew)
);