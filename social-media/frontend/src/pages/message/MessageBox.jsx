// src/pages/message/MessageBox.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';// Stil dosyasını import etmek için
import './messageBox.css'; // Küçük harflerle yazdığımızdan emin olalım
import { sendMessage, searchUser, createChatRoom } from '../../api/Message';

const MessageBox = (props) => {
  const { selectedChat, getSenderName, getSenderPhoto, isSearch, setIsSearch, setSelectedChat, setChatRooms } = props;
  const [profiles, setProfiles] = useState([]);
  const [messages, setMessages] = useState([]);
  const [wSocket, setSocket] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchedUser, setSearchedUser] = useState([]);
  const currentUser = localStorage.getItem('user'); // Mevcut kullanıcı ID'sini buraya ekleyin
  const wsUrl = 'ws://localhost:8000/ws';

  const fetchChatMessage = async () => {
      // kullanıcı mesaj odası seçtiğinde mesajları almak için Websocket bağlantısı yapılacak
      // bu socket bağlantısı anlık olarak gelecek olan mesajları da gösterecektir.
      const socket = new WebSocket(`${wsUrl}/chat/${selectedChat.id}/`);

      setSocket(socket);

      socket.onopen = () => {
        socket.send(JSON.stringify({
          action: 'list',
          request_id: new Date().getTime(),
      }))};
      

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const action = data.action;
        const msg = data.data;
        if (action === 'list') {
          // eğer action list ise tüm mesaj verileri array olarak gelecektir
          // socket'ten gelen mesajları setMessages state'ine atayın
          setMessages(msg);
        }
        else if (action === 'create') {
          // eğer action create ise yeni bir mesaj gelmiş demektir
          // socket'ten gelen mesajı messages state'ine ekleyin
          setMessages((prevMessages) => [...prevMessages, msg]);
        }
      };

      socket.onclose = (error) => {
        console.log('Socket connection closed', error);
        // call fetchChatMessage function again to reconnect
        // setTimeout(() => {
        //   fetchChatMessage();
        // }, 5000);
      };
  };

  useEffect(() => {
    // Profil verilerini almak için API çağrısı yapılacak
    if (selectedChat) {
      if (wSocket) {
        wSocket.close();
      }
      fetchChatMessage();
    }
  }, [selectedChat]);


  const handleSubmit = async (e) => {
    ///
    e.preventDefault();
    if (!newMessage) {
      e.target.reset();
      return;
    }
    const response = await sendMessage(newMessage, selectedChat.id);
    e.target.reset( )
  };

  const handleChatCreate = async (e, userId) => {
    // yeni bir sohbet oluşturmak için API çağrısı yapılacak
    e.preventDefault();
    const response = await createChatRoom(currentUser.id, userId);
    if (response.request.status === 201) {
      setChatRooms((prevChatRooms) => [...prevChatRooms, response.data]);
      setSelectedChat(response.data);
    }
    else if (response.request.status === 406) {
      // Bu kullanıcılar arasında bir sohbet odasını oldugunu ve yeni bir sohbet odası oluşturulamayacağını belirtir.
      // Bu durumda mevcut sohbet odasını seçin
      if (wSocket) {
        wSocket.close();
      }
      setSelectedChat(response.response.data.chat_room);
    }
    setIsSearch(false);
  }

  const fetchSearch = async (username) => {
    // kullanıcı adına göre arama yapmak için API çağrısı yapılacak
    if (!username) {
      setSearchedUser([]);
      return;
    }
    const response = await searchUser(username);
    setSearchedUser(response.data.users);
  }






  return (

    <div className="container m-412">

    {
      isSearch && 

      <div className="new-box">
        <div className='new-message'>
          <div>
            <h3 style={{textAlign: 'center'}}>Yeni mesaj oluştur</h3>
            <button className="new-message-close" onClick={() => setIsSearch(false)}>X</button>
          </div>
          <input type="text" placeholder="Kullanıcı adı..." className="new-message-input" onChange={(e) => fetchSearch(e.target.value)}/>
          {
            searchedUser && searchedUser.map((user) => (
              <div key={user.id} className="new-message-user">
                <img src={`http://localhost:8000${user.profile_photo}`} alt="" className="new-message-user-pp" />
                <p>{user.username}</p>
                <button className="new-message-button" onClick={(e) => handleChatCreate(e, user.id)}>Mesaj</button>
              </div>
            ))
          }
        </div>
      </div>
    }


      {  selectedChat &&
      
       <div id="chat_box">
        <h1 style={{ color: 'rgb(150, 150, 150)', textTransform: 'uppercase', textAlign: 'center' }}>
          {getSenderName(selectedChat && selectedChat.participants)}
        </h1>

        <div className="message-box">
          {messages.map((message) => (
            <div key={message.id} className={message.user === currentUser.id ? 'message right' : 'message left'}>
              <div className={message.user === currentUser.id ? 'message-content bg-green' : 'message-content bg-blue'}>
                <p>{message.content}</p>
              </div>
            </div>
          ))}
        </div>
        

        <div className="message-form">
          <form onSubmit={(e) => handleSubmit(e)}>

            <div className="inputm">
              <input
                type="text"
                // value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Mesajınızı yazın..."
                className="messageinput"/>

              <div className="column-2">
                <button className="send-button" type="submit">
                  <FontAwesomeIcon icon={faPaperPlane} style={{ width: '24px', height: '24px', color: '#fff' }} />
                </button>
              </div>
            </div>
          </form>
        </div>
        </div>
      }
      </div>
    );
};

export default MessageBox;
