import axios from "axios"



const accessToken = localStorage.getItem('accessToken');

let config = accessToken 
    		? { 
    			headers: {
    				"Authorization": `Token ${accessToken}`,
    				
    			},
    			withCredentials:false,
    		}
   		:{
    			withCredentials:false,
   		};
function convertUrl(url) {
	// return `https://namvuong.org/django${url}`
	return `http://localhost/django${url}`
}

const fetchData = async (url, rawUrl=false) => {
    url = rawUrl ? url : convertUrl(url);

    return await axios.get(url, config).then(
                    res => res.data
    );
}; 


const postData = async (url, data, rawUrl=true) => {
    url = rawUrl ? url : convertUrl(url);
    return await axios.post(url, data, config).then(
                    res => res.data
    );
}


const patchData = async (url, data, rawUrl=true) => {
    url = rawUrl ? url : convertUrl(url);
    return await axios.patch(url, data, config).then(
                    res => res.data
    );
}

const deleteData = async (url) => {
    return await axios.delete(url, config).then(
                    res => res.data
    );
}


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function logout() {
    localStorage.removeItem("accessToken");
    window.location = "/";
}

export function isLogin() {
    if (localStorage.getItem("accessToken") !== null)  {
        return true
    }
    return false
}

export {numberWithCommas, fetchData, postData, patchData, deleteData};
