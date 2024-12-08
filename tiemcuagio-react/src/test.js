const axios = require('axios');

    const access_token = "610457514b7a923007a7dddef826021d9daff4bb";
    const config = {
        headers: {"Authorization": `Token ${access_token}`}
    }
    const fetchData = async () => {
        const { data } = await axios.get('/api/products/1/');
        console.log(data)
        return data;

    };
    
    console.log(fetchData())
