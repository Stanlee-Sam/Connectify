import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './signup.css'; 

const Register = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate(); 

    const validationSchema = Yup.object({
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        username: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Required')
    });

    return (
        <section className="signup-section">
            <div className="register-card">
                <div className="signup-section-left">
                    <h1>Connectify</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed aliquid
                        illo numquam corrupti quam officia facilis ullam, vitae officiis
                        dignissimos esse fugiat reiciendis optio aperiam rerum amet
                        laboriosam, voluptatem iusto.
                    </p>
                    <span>Do you have an account?</span>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
                <div className="signup-section-right">
                    <h1>Register</h1>
                    <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            username: '',
                            email: '',
                            password: '',
                            confirmPassword: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            try {
                                await axios.post("/api/auth/signup", values);
                                
                                navigate('/login');
                            } catch (err) {
                                if (err.response) {
                                    setError(err.response.data.message || 'An error occurred.');
                                } else {
                                    setError('An unexpected error occurred. Please try again.');
                                }
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <Field
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    className="form-field"
                                />
                                <ErrorMessage name="firstName" component="div" className="error-message" />
                                <Field
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    className="form-field"
                                />
                                <ErrorMessage name="lastName" component="div" className="error-message" />
                                <Field
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    className="form-field"
                                />
                                <ErrorMessage name="username" component="div" className="error-message" />
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="form-field"
                                />
                                <ErrorMessage name="email" component="div" className="error-message" />
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="form-field"
                                />
                                <ErrorMessage name="password" component="div" className="error-message" />
                                <Field
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    className="form-field"
                                />
                                <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                                {error && <p className="error-message">{error}</p>}
                                <button type="submit" disabled={isSubmitting}>
                                    Register
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </section>
    );
};

export default Register;
