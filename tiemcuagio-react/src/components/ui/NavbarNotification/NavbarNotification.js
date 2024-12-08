import { Notification } from "../../../components/ui/Notification/Notification"
import { faBell } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import styles from "./NavbarNotification.module.css"
import { fetchData, postData } from "../../../fuctions";


export default function NavbarNotification(props) {
    const unread = props.unread;

    const [showNotification, setShowNotification] = useState(false);
    const url = "/api/user/notifications/"
    const { data: notifications } = useQuery({
        queryKey: [url],
        queryFn: () => fetchData(url),
    });
    const { mutate:editNotifications} = useMutation({
        mutationKey: [url, "editNotification"],
        mutationFn: (data) => postData(url, data, false)
    });

    function handleOnClick() {
        if (showNotification === false) {
            const data = {
                ids: getNotificationIds()
            };
            editNotifications(data);
        }
        setShowNotification(!showNotification);
    }

    function getNotificationIds() {
        if (notifications) {
            return notifications.map(notification => notification.id)
        }
    } 

    return <div className={styles.navbarNotification}>
            <button onClick={handleOnClick}>
                <Notification 
                    icon={faBell} 
                    number={unread} 
                    color="#f5a300"
                />
            </button>
            { showNotification &&
            <div 
                className={styles.displayNotificationContainer}
                onClick={e => setShowNotification(false)}
            >
                <div 
                    className={styles.displayNotification}
                    onClick={e => e.stopPropagation()}
                >
                    <h1>Thông báo</h1>
                    { notifications &&
                        notifications.map((notification, i)=>
                            <div 
                                className={styles.notification} key={i}>
                                <p 
                                    className={notification.read ? "" : styles.unread}
                                    key={i}
                                >
                                    {notification.message}
                                    <br/>
                                </p>
                                <p className={styles.date}> {notification.date} </p>
                            </div>
                        )
                    }
                </div>
            </div>
            }
    </div>
}