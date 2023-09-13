import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './SignIn.module.css';
import { loginUser } from '../../redux/slices/authSlice';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    
    const dispatch = useDispatch();
    
    const error = useSelector((state) => state.auth.error);
    
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(loginUser({ username, password }));
    };
  
    return (
      <main className={styles.signInContainer}>
        <section className={styles.signInContent}>
          <i className="fa fa-user-circle"></i>
          <h1>Sign In</h1>
          {error && <p className={styles.error}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className={styles.inputWrapper}>
              <label htmlFor="username">Username</label>
              <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className={styles.inputRemember}>
              <input type="checkbox" id="remember-me" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button className={styles.signInButton} type="submit">Sign In</button>
          </form>
        </section>
      </main>
    );
  };
  
  export default SignIn;