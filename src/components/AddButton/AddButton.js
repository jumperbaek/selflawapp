import React from "react";
import styles from "./AddButton.module.css";

const AddButton = ({ onClick, text }) => {
    return (
        <div className={styles.add_button_outer}>
            <button className={styles.add_button} type="button" onClick={onClick}>
                {text}
            </button>
        </div>
    );
};

export default AddButton;
