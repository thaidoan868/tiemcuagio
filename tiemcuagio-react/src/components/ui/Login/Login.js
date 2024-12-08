import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faLock, faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { postData } from "../../../fuctions"

import WaitingSpin from "../WaitingSpin/WaitingSpin"
import styles from "./Login.module.css"


export default function Login(props) {
    const url = "/api/auth/";
    const [showLoginForm, setShowLoginForm] = useState(false);
    const { data, mutate:login, isSuccess, isError, isPending} = useMutation({
        mutationKey: [url],
        mutationFn: (data) => postData(url, data, false) 
    });

    function handleOnsubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        login(formData);
    }

    if (isSuccess) {
        localStorage.setItem("accessToken", data.token);
        window.location.reload();
    }

    return <div className={styles.login}>
        <div className={styles.loginButton}>
            <button onClick={() => setShowLoginForm(true)}>Đăng nhập</button>
        </div>
        { showLoginForm && 
            <div 
                className={styles.loginDisplay}
                onClick={() => setShowLoginForm(false)}
            >
                <div 
                    className={styles.loginContainer}
                    onClick={e => e.stopPropagation()}
                >
                    <button 
                        className={styles.close}
                        onClick={() => setShowLoginForm(false)}
                    >
                            <FontAwesomeIcon icon={faXmark}/>
                    </button>
                    <h1>Đăng nhập</h1>
                    {isPending
                        ? <div className={styles.loading}>
                            <WaitingSpin backgroundColor="white" color="#2659f3"/>
                        </div>
                        : <form onSubmit={handleOnsubmit}>
                            <div>
                                <label htmlFor="username">
                                    <FontAwesomeIcon icon={faUser}/>
                                </label>
                                <input 
                                    id="username" 
                                    type="text" 
                                    placeholder="Tên đăng nhập"
                                    name="username"
                                />
                                </div>
                                <div>
                                    <label htmlFor="password">
                                        <FontAwesomeIcon icon={faLock}/>
                                    </label>
                                    <input 
                                        id="password" 
                                        type="password" 
                                        placeholder="Mật khẩu"
                                        name="password"
                                    />
                                </div>
                                <p className={styles.forgetPass}>Quên mật khẩu ?</p>
                                <button>Đăng nhập</button>
                                {
                                    isError &&
                                        <p className={styles.isError}>
                                            <span><FontAwesomeIcon icon={faCircleXmark}/></span>
                                            &nbsp; Đăng nhập không thành công!
                                    </p>
                            }
                            {
                                isSuccess && 
                                    <p className={styles.isSuccess}>
                                        <span><FontAwesomeIcon icon={faCircleCheck}/></span>
                                        &nbsp; Đăng nhập thành công!
                                    </p>
                            }
                            <p className={styles.signUp}>Chưa có tài khoản? &nbsp;<span>Đăng ký</span></p>
                        </form> 
                    }
                </div>

        </div> }
    </div>
}
