import React from 'react';
import { FaUserTie, FaIdCard, FaCode, FaCalendarAlt, FaUsers, FaEnvelope, FaPhone, FaUniversity } from 'react-icons/fa';
import '../styles/RequestPortal.css'; 

const RequestPortal = () => {

    return (
        <div className="request-portal">
            {/* Header Section */}
            <header className="portal-header">
                <div className="container">
                    <h1>RequestHub Portal</h1>
                    <p>Streamlining your academic administrative needs</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="portal-main">
                <div className="container">
                    <section className="request-cards">
                        <div className="card">
                            <div className="card-icon">
                                <FaUserTie />
                            </div>
                            <h3>Internship Request</h3>
                            <p>Apply for internships and get approval from your department</p>
                            {/* <button className="btn">Request Now</button> */}
                        </div>

                        <div className="card">
                            <div className="card-icon">
                                <FaIdCard />
                            </div>
                            <h3>ID Card Request</h3>
                            <p>Request new or replacement ID cards for campus access</p>
                            {/* <button className="btn">Request Now</button> */}
                        </div>

                        <div className="card">
                            <div className="card-icon">
                                <FaCode />
                            </div>
                            <h3>Hackathon Request</h3>
                            <p>Register for hackathons and coding competitions</p>
                            {/* <button className="btn">Request Now</button> */}
                        </div>

                        <div className="card">
                            <div className="card-icon">
                                <FaCalendarAlt />
                            </div>
                            <h3>Leave Request</h3>
                            <p>Apply for leaves and get approval from your faculty</p>
                            {/* <button className="btn">Request Now</button> */}
                        </div>
                    </section>

                    <section className="portal-info">
                        <h2>How It Works</h2>
                        <div className="steps">
                            <div className="step">
                                <span>1</span>
                                <p>Select the request type you need</p>
                            </div>
                            <div className="step">
                                <span>2</span>
                                <p>Fill out the required information</p>
                            </div>
                            <div className="step">
                                <span>3</span>
                                <p>Submit your request for review</p>
                            </div>
                            <div className="step">
                                <span>4</span>
                                <p>Receive confirmation and updates</p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

        </div>
    );
};

export default RequestPortal;