import React, { Component } from 'react'

class PostEditor extends Component {
    render() {
        return (
            <div>
                <h2>EDIT POST</h2>
                {this.props.match.params.postID}
            </div>
        )
    }
}
export default  PostEditor