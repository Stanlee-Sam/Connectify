import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/authContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './login.css'; 

const LoginPage = () => {
    const { login, currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate("/");
        }
    }, [currentUser, navigate]);

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required')
    });

    return (
        <section className="login-section">
            <div className="card">
                <div className="login-section-left">
                    <h1>Hello there!</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam velit quidem commodi atque nemo minus alias tempora doloremque voluptate sint mollitia repellat, harum iure amet, suscipit dolore eum. Expedita, quod!
                    </p>
                    <span>Don't have an account?</span>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </div>
                <div className="login-section-right">
                    <h1>Login</h1>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { setSubmitting, setErrors }) => {
                            try {
                                await login(values);
                                console.log("Login successful");
                            } catch (error) {
                                setErrors({ email: 'Login failed' }); 
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
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
                                <button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Logging in...' : 'Login'}
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;
