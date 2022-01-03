import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../styles/variables.scss";

class AdminDashboard extends Component {
    render() {
        return (
            <div
                className="container d-flex justify-content-center flex-column text-center"
                style={{ height: "calc(100vh - 70px)" }}
            >
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
                <div className="row ">
                    <div className="col-12">
                        <Link to="/administrationdashboard/posts" style={{fontSize:"32px",textDecoration:"none",color:"black"}}>Manage Posts</Link>
                    </div>
                </div>
                <div className="row ">
                    <div className="col-12">
                        <Link to="/administrationdashboard/users" style={{fontSize:"32px",textDecoration:"none",color:"black"}}>Manage Users</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminDashboard;
