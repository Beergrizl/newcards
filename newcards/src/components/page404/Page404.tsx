import React from "react";
import styles from './Page404.module.css'

export const Page404: React.FC = () => {
    return (
        <div className={styles.body404}>
            <div className={styles.container}>
                <h2 className={styles.h2404}>404</h2>
                <h3 className={styles.h3404}>Oops, nothing here...</h3>
                <p className={styles.p404}>Please Check the URL</p>
            </div>
        </div>
    )
}