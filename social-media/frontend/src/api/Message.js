import axios from "axios";
const backendUrl = 'http://localhost:8000'; // Bu URL, API'nin çalıştığı URL'dir
const token = localStorage.getItem('token'); // Bu token, kullanıcının giriş yapmış olduğu token'dir

const getChatMessages = async () => {
    // kullanıcı mesaj sayfasına girdiğinde tüm mesajları almak için API çağrısı yapılacak
    const api = new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `${backendUrl}/chat/`,
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
};

const createChatRoom = async (currentUserId, receiverId) => {
    // kullanıcı mesaj sayfasına girdiğinde tüm mesajları almak için API çağrısı yapılacak
    const api = new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: `${backendUrl}/chat/`,
            headers: {
                Authorization: token,
            },
            data: {
                participants: [currentUserId, receiverId],
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

const sendMessage = async (message, roomId) => {
    // kullanıcı mesaj gönderdiğinde API çağrısı yapılacak
    const api = new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: `${backendUrl}/messages/`,
            headers: {
                Authorization: token,
            },
            data: {
                content: message,
                room: roomId,
                user: 1, // Mevcut kullanıcı ID'sini buraya ekleyin
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

const searchUser = async (search) => {
   // kullanıcı mesaj sayfasına girdiğinde tüm mesajları almak için API çağrısı yapılacak
   const api = new Promise((resolve, reject) => {
    axios({
        method: 'get',
        url: `${backendUrl}/search/${search}/`,
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

export { getChatMessages, sendMessage, searchUser, createChatRoom};