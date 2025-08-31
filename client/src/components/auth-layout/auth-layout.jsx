import Logo from "../ui/logo/logo";
import styles from "./auth-layout.module.css";

const AuthLayout = ({ title, subtitle, imageSrc, children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <Logo />
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        {children}
      </div>
      <img className={styles.image} src={imageSrc} alt="" />
    </div>
  );
};

export default AuthLayout;
