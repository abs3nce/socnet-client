import React, { Component } from "react";
import { Link } from "react-router-dom";

class AdminDashboard extends Component {
    render() {
        return (
            <div className="container-fluid">
                {/* <div className="row">
                    <div className="col-12 col-md-6">
                        <h2 className="mt-3">Posts</h2>
                        <hr />
                        <AdminAllPosts />
                    </div>
                    <div className="col-12 col-md-6">
                        <h2 className="mt-3">Users</h2>
                        <hr />
                    </div>
                </div> */}
                <div className="row">
                    <div className="col-12">
                        <Link to="/administrationdashboard/posts">Posts</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Link to="/administrationdashboard/users">Users</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminDashboard;
