import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './messagePage.css';
import MessageBox from './MessageBox';
import {getChatMessages} from '../../api/Message' // API çağrısı için fonksiyonu içe aktarın


// Ana Sayfa bileşeni
const MessagePage = () => {
    const [chatRooms, setChatRooms] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [isSearch, setIsSearch] = useState(false);
    const currentUser = 1; // Mevcut kullanıcı ID'sini buraya ekleyin
  
  
    const fetchChatMessage = async () => {
      const response = await getChatMessages();
      const chatRooms = response.data;
      setChatRooms(chatRooms);
    }
  
    useEffect(() => {
      // Profil verilerini almak için API çağrısı yapılacak
      fetchChatMessage();
    }, []);


  const getSenderName = (users) => {
      // filter user of chat and get not current user
      if (!users) return;
      const otherUsers = users.filter((item) => item.id != currentUser);
      return otherUsers.map(user => user.username);
  };

  const getSenderPhoto = (users) => {
      const otherUsers = users.filter((item) => item.id != currentUser);
      return otherUsers.map(user => user.profile_photo);
  };

  const handleChatSelect = (e, chatRoom) => {
      e.preventDefault();
      setSelectedChat(chatRoom);
    }

  
    const sendMessage = (e) => {
      e.preventDefault();
      // Mesaj göndermek için API çağrısı yapılacak
      // fetch(`/api/send-message`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ sender: senderId, receiver: receiverId, content: newMessage }),
      // })
      //   .then(response => response.json())
      //   .then(newMessage => {
      //     setMessages([...messages, newMessage]);
      //     setNewMessage('');
      //   });
    };
    return (
        <div className="message-page">
          {/* Sol kolon */}
          <div className="column-3">
            <h2>Mesajlar</h2>
            {/* Arama girişi */}
            <input type="text" placeholder="Mesaj ara..." className="search-input" />
    
            {/* Geçmiş mesajlar */}
            <div className="message-history">
              {/* Her bir geçmiş mesaj */}
              {
                chatRooms.map((chatRoom, index) => (
                  <div className="message-item" key={index} onClick={(e) => handleChatSelect(e, chatRoom)} style={{cursor: 'pointer'}}>
                    <div className="profile-picture">
                      <img src={getSenderPhoto(chatRoom.participants)} alt="" />
                    </div>
                    <div className="message-details">
                      <div className="sender-name">{getSenderName(chatRoom.participants)}</div>
                      <div className="last-message">Merhaba, nasılsınız?</div>
                      <div className="message-time">10:30</div>
                    </div>
                  </div>
                ))
              }
            </div>
            <button className="add-message-button" onClick={(e) => setIsSearch(true)}>+</button>
          </div>
    
          {/* Sağ kolon */}
          <div className="column-9">
            <MessageBox selectedChat={selectedChat} getSenderName={getSenderName} 
                        getSenderPhoto={getSenderPhoto} isSearch={isSearch} 
                        setIsSearch={setIsSearch} setSelectedChat={setSelectedChat}
                        setChatRooms={setChatRooms}/>
        
      </div>
    </div>
  );
}

export default MessagePage;
