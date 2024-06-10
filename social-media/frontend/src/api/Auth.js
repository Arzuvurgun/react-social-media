import axios from "axios";
const backendUrl = 'http://134.122.94.66:8000'//'http://localhost:8000'; // Bu URL, API'nin çalıştığı URL'dir
const token = localStorage.getItem('token'); // Bu token, kullanıcının giriş yapmış olduğu token'dir


const loginAPI = async (email, password) => {
    const api = new Promise((resolve, reject) => {
     axios({
        method: 'post',
        url: `${backendUrl}/auth/login/`,
        data: {
          email: email,
          password: password
        }
      }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      })
    });

    try{
        const response = await api;
        return response;
    }
    catch (error){
        return error;
    };

};

const RegisterAPI = async (email, password, rePassword, name, surname, phone) => {
    const api = new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: `${backendUrl}/auth/register/`,
            data: {
            email: email,
            password: password,
            password2: rePassword,
            first_name: name,
            last_name: surname,
            phone_number: phone
            }
        }).then((response) => {
            resolve(response);
        }).catch((error) => {
            reject(error);
        });
    
    });


    try{
        const response = await api;
        return response;
    }
    catch (error){
        return error;
    };
}

const getUserProfile = async () => {
    // kullanıcı profili almak için API çağrısı yapılacak
    const api = new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `${backendUrl}/me/profile/`,
            headers: {
                Authorization: token,
            }
        })
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        });
        
    });
    
    
    try{
        const response = await api;
        return response;
    }
    catch (error){
        return error;
    };
}

const getUser = async () => {
    // kullanıcı profili almak için API çağrısı yapılacak
    const api = new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `${backendUrl}/me/user/`,
            headers: {
                Authorization: token,
            }
        })
        .then((response) => {
            resolve(response);
        })
        .catch((error) => {
            reject(error);
        });
        
    });
    
    
    try{
        const response = await api;
        return response;
    }
    catch (error){
        return error;
    };
}


export {getUserProfile, getUser, loginAPI, RegisterAPI};