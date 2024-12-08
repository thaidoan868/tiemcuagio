import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons"
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

import { fetchData, patchData, postData } from "../../../fuctions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import AvatarInput from "../../../components/ui/AvatarInput/AvatarInput";

import styles from "./UpdateAccount.module.css"


export default function UpdateAccount(props) {
    const url = "/api/user/retrieve_update/";
    const { data:user, refetch } = useQuery({
        queryKey: [url, "getaccounttt"],
        queryFn: () => fetchData(url)
    });
    const { mutate:updateAccount, isSuccess, reset } = useMutation({
        mutationKey: [url],
        mutationFn: (data) => patchData(url, data, false)
    });

    function handleOnSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        updateAccount(formData);
    }

    // if (isSuccess)  {
    //     refetch();
    //     reset();
    // }

    if (user) {
    const avatarImage= user.avatar;
    const full_name = user.full_name;
    const phone_number = user.phone_number;
    const address = user.address;

    return <div className={styles.updateAccount}>
        <h1>THÔNG TIN TÀI KHOẢN</h1>
        <form onSubmit={handleOnSubmit}>
            <div className={styles.avatar}>
                <AvatarInput image={avatarImage}/>
            </div>
            <div>
                <label htmlFor="accountFullName"> Họ và tên: </label>
                <input 
                    type="text" 
                    id="accountFullName" 
                    name="full_name"
                    placeholder="Đinh Tiên Hoàng"
                    defaultValue={full_name}
                />
            </div>
            <div>
                <label htmlFor="accountPhoneNumber">Số điện thoại:</label>
                <input 
                    type="text" 
                    id="accountPhoneNumber" 
                    name="phone_number"
                    placeholder="0968-666-888"
                    defaultValue={phone_number}
                />
            </div>
            <div>
                <label htmlFor="accountAddress">Địa chỉ:</label>
                <input 
                    type="text" 
                    id="accountAddress" 
                    name="address"
                    placeholder="68 đường Trần Hưng Đạo, phường Tiên Nữ..."
                    defaultValue={address}
                />
            </div>
            {
                isSuccess && <p className={styles.success}>
                    <FontAwesomeIcon icon={faCircleCheck}/>
                    {" "}Cập nhật thành công
                </p>
            }
            <button>Cập nhật thông tin</button>
        </form>
    </div>
    }
}