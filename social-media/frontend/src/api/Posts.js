import axios from "axios";
const backendUrl = 'http://localhost:8000'; // Bu URL, API'nin çalıştığı URL'dir
const token = 'Token c736a3f5973bbc6be7eb46c2e23959b71231378b'//localStorage.getItem('token'); // Bu token, kullanıcının giriş yapmış olduğu token'dir
const user = '1'; //localStorage.getItem('user'); // Bu user, kullanıcının giriş yapmış olduğu kullanıcıdır


const createPost = async (post_image, owner) => {
    // kullanıcı profili almak için API çağrısı yapılacak
    const api = new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: `${backendUrl}/post/`,
            headers: {
                Authorization: token,
            },
            data: {
                post_media: post_image,
                owner: owner,
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


const getAllPosts = async () => {
    const api = new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `${backendUrl}/posts/`,
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

const getPostWithId = async (id) => {
    const api = new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `${backendUrl}/posts/${id}/`,
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


const likePost = async (id) => {
    // id si verilen postu beğenmek için API çağrısı yapılacak
    const api = new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: `${backendUrl}/like/`,
            headers: {
                Authorization: token,
            },
            data: {
                post: id,
                comment: "",
                user: user
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

const getPostLikes = async (id) => {
    // id si verilen postun beğenilerini almak için API çağrısı yapılacak
    const api = new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: `${backendUrl}/posts/${id}/likes/`,
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

const disLikePost = async (postId) => {
    // id si verilen postu beğenmek için API çağrısı yapılacak
    console.log('dislike post', postId)

    const getLike = await getPostLikes(postId);
    const likeId = getLike.data[0].id;

    const api = new Promise((resolve, reject) => {
        axios({
            method: 'delete',
            url: `${backendUrl}/like/${likeId}/`,
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

export {createPost, getPostWithId, getAllPosts, likePost, disLikePost};