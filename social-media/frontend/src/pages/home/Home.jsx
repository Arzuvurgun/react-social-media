import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import {
  faHome,
  faUserFriends,
  faBriefcase,
  faCommentDots,
  faBell,
  faSignOutAlt,
  faEdit,
  faCamera,
  faVideo,
  faTrashAlt,
  faPaperPlane
} from "@fortawesome/free-solid-svg-icons";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./home.css";
import Profile from "../profile/Profile";
import pamukkaleUniversityImage from "../../assets/headline.jpg";
import { useEffect } from "react";
import { getAllPosts, likePost, disLikePost, getPostWithId } from "../../api/Posts";
import profilePhoto from '../../assets/png-clipart-pamukkale-university-pamukkale-universitesi-school-higher-education-school-blue-text-thumbnail.png';
import like from '../../assets/like.svg';
import likeFilled from '../../assets/like_fill.svg';
import commentIcon from '../../assets/comment.svg';


const currentUser = localStorage.getItem("user");
const Home = () => {
  const [postText, setPostText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [posts, setPosts] = useState([]);
  const [activePage, setActivePage] = useState("home");
  

  const handleShare = (type) => {
    console.log("Paylaş tıklandı:", type);
    handleFileSelection();
  };

  const handlePostTextChange = (e) => {
    setPostText(e.target.value);
  };

  const handlePostSubmit = () => {
    if (postText.trim() !== "") {
      const newPost = {
        name: "Me",
        profileImg: "https://picsum.photos/50/50",
        text: postText,
        time: "Just now",
        postImg: "",
        likes: 0,
      };
      setPosts([newPost, ...posts]);
      setPostText("");
    }
  };

  const handlePostDelete = (index) => {
    const updatedPosts = posts.filter((post, i) => i !== index);
    setPosts(updatedPosts);
  };

  const handleFileSelection = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.onchange = () => {
      console.log("Dosya seçildi:", fileInput.files[0]);
    };
    fileInput.click();
  };

  const fetchPosts = async () => {
    // API'den postları çek
    const response = await getAllPosts();
    if (response.status === 200) {
      setPosts(response.data);
      console.log(response.data);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);


  const handleHomeClick = () => {
    setActivePage("home");
  };

  const navigate = useNavigate();

  const handleProfil = () => {
    navigate("/profile");
  };
  
  const handleMessagesClick = () => {
    navigate("/messagePage");
  };


 
  
  return (
    <div className="home">
      <div className="fixed-top bg-white">
        <div className="container">
          <nav className="navbar navbar-expand-lg   navbarbg ">
            <button
              className="navbar-brand"
              style={{
                marginLeft: "100px",
                cursor: "pointer",
                color: "#212529",
                backgroundColor: "#ffffff",
                border: "0px solid #ced4da",
                borderRadius: "5px",
                padding: "5px 10px",
                fontWeight: "bold",
              }}
              onClick={handleHomeClick}
            >
              <i
                className="fab fa-linkedin fa-lg"
                style={{ color: "#0a66c2", fontSize: "2.4rem" }}
              ></i>
            </button>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            ></button>
            <form className="form-inline"  >
              <input
                className="form-control searche"
                type="search"
                placeholder="     Arama Yap"
                aria-label="Search"
                style={{marginLeft:"-50px"}}
              />
            </form>
            <div className="collapse navbar-collapse justify-content-center " style={{ paddingTop:"15px;",height:"15px"}}>
              <ul className="navbar-nav ml-auto">
                <NavItem icon={faHome} onClick={handleHomeClick} />
                <NavItem icon={faUserFriends} />
                <NavItem icon={faBriefcase} />
                <NavItem icon={faCommentDots} onClick={handleMessagesClick} />
                <NavItem icon={faBell} />
                <li className="nav-item dropdown  text-center" >
                  <button
                    className="nav-link"
                    id="navbarDropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    style={{marginLeft:"500px"}}
                  >
                    <img
                      src="https://picsum.photos/200/300"
                      alt="profile"
                      style={{
                        width: "25px",
                        height: "25px",
                        borderRadius: "50%",
                        marginTop: "2px",
                      }}
                    />
                    <div
                      className="menutext"
                      style={{
                        fontWeight: "bold",
                        fontSize: "13px",
                        marginTop: "-3px",
                      }}
                    >
                      Ben
                    </div>
                  </button>
                </li>
                <NavItem icon={faSignOutAlt} text="Çıkış" />
              </ul>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Container */}
      <div className="container mt-5">
        <div className="row"  style={{ backgroundColor:"#f3f2ef" ,}}>
          {/* Left Panel */}
          <div className="col-3 mt-5">
            <ProfileCard onClick={handleProfil} />
          </div>

          {/* Middle Panel */}
          <div className="col-6 mt-5">
            {activePage === "home" && (
              <>
                <CreatePostCard
                  postText={postText}
                  isFocused={isFocused}
                  setIsFocused={setIsFocused}
                  onPostTextChange={handlePostTextChange}
                  onShare={handleShare}
                  onSubmit={handlePostSubmit}
                  onFileSelection={handleFileSelection}
                />
                {posts.map((post, index) => (
                  <PostCard
                    key={index}
                    index={index}
                    postId={post.id}
                    name={post.owner.username}
                    profileImg={post.profileImg ? post.profileImg : profilePhoto}
                    text={post.post_text}
                    time={post.time}
                    postImg={post.post_media}
                    likes={post.likes}
                    onDelete={() => handlePostDelete(index)}
                  />
                ))}
              </>
            )}
            {activePage === "profile" && <Profile />}
          </div>
        </div>
      </div>
    </div>
  );
};

const handleComment = (e, postId) => {
  // Yorum yapılacak post id'si alınacak
  console.log("Yorum yapılacak post id:", postId);
};

const handleLike = async (e, postId) => {
  // Beğenilecek post id'si alınacak
  const response = await getPostWithId(postId);
  const isLiked = isPostLiked(response.data.likes);
  

  console.log("Beğenilecek post id:", postId, isLiked);
  if (isLiked) {
    const response = await disLikePost(postId);
    if (response.request.status === 204) {
      e.target.src = like;
      e.target.nextSibling.childNodes[0].textContent = parseInt(e.target.nextSibling.childNodes[0].textContent) - 1;
    };
  }
  else {
    const response = await likePost(postId);
    if (response.request.status === 201) {
      e.target.src = likeFilled;
      e.target.nextSibling.childNodes[0].textContent = parseInt(e.target.nextSibling.childNodes[0].textContent) + 1;
    }
    console.log(response, 'Like response');
  }
};

const isPostLiked = (likes) => {
  // Postun beğenilip beğenilmediğini kontrol et
  if (!currentUser) {
    return false;
  }

  return likes.includes(currentUser.id);
};

const NavItem = ({ icon, text, onClick }) => (
  <li className="nav-item active text-center ml-3 home">
    <button className="nav-link" href="#" onClick={onClick}>
      <FontAwesomeIcon icon={icon} size="lg" />
      {text && <div className="menutext">{text}</div>}
    </button>
  </li>
);

const ProfileCard = ({ onClick }) => (
  <div className="card home" style={{ width: "14rem" }}>
    <div
      className="card-header"
      style={{
        backgroundImage:
          "url(https://p4.wallpaperbetter.com/wallpaper/374/891/830/rainbow-color-soft-gradation-wallpaper-preview.jpg)",
        height: "70px",
      }}
    >
      <img
        src="https://picsum.photos/200/300"
        className="profil"
        alt="profile"
        style={{ width: "70px", height: "70px", marginRight: "8vh" }}
      />
    </div>
    <div className="card-body mt-2">
      <p className="card-title header text-center">
      <button
        onClick={onClick}
        style={{
          color: "#212529", // Yazı rengi
          backgroundColor: "#ffffff", // Arka plan rengi
          border: "0px solid #ced4da", // Kenarlık rengi ve kalınlığı
          borderRadius: "5px", // Kenar yuvarlaklığı
          padding: "5px 10px", // İç boşluklar
          cursor: "pointer", // İmleç türü
          fontWeight: "bold", // Yazı kalınlığı
        }}
      >
        av
      </button>

      </p>
      <div style={{ marginBottom: "10px", color: "#5f5f5f", fontSize: ".85rem" }}>
        Software Developer at Navlungo - Dijital Lojistik Platformu
      </div>
      <hr />
      <div className="card-pauimg">
        <div>
        <div className="card-text">
          <div>
          </div>
        </div>

        </div>
      </div>
    </div>
    <div className="card-footer d-flex align-items-center">
  <i className="fas fa-bookmark"></i>
  <img src={pamukkaleUniversityImage} alt="Pamukkale University" style={{ marginRight: "5px" }} />
  <span style={{fontSize:"smaller",color:"black"}}>Pau Social Media</span>
</div>
  </div>
);




const CreatePostCard = ({ postText, isFocused, setIsFocused, onPostTextChange, onShare, onSubmit, onFileSelection }) => (
  <div className="card mt-2 home">
    <div className="card-body">
      <div className="d-flex align-items-start">
        <img
          src="https://picsum.photos/50/50"
          alt="profile"
          className="rounded-circle"
          style={{ width: "50px", height: "50px", marginTop: "5px" }}
        />
        <div className="ml-3" style={{ flexGrow: 1 ,paddingTop:"15px" }}>
          <input
            type="text"
            className={`form-control ${isFocused ? "border-primary" : ""}`}
            style={{ borderRadius: "20px", borderColor: "gray", marginBottom: "10px",marginLeft:"5px"}}
            placeholder="Bir gönderi başlatın"
            value={postText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={onPostTextChange}
          />
          <div className="iconss d-flex justify-content-between">
            <PostOption icon={faEdit} text="Gönderi" onClick={() => { onShare("text"); onFileSelection(); }} color="#0073b1" backgroundColor="white" />
            <PostOption icon={faCamera} text="Fotoğraf" onClick={() => { onShare("photo"); onFileSelection(); }} color="#33a8ff" backgroundColor="white" />
            <PostOption icon={faVideo} text="Video" onClick={() => { onShare("video"); onFileSelection(); }} color="#00a400" backgroundColor="white"/>
          </div>
        </div>
        <button className="btn send-button ml-3" onClick={onSubmit} style={{ marginTop: "15px" }}>
          <FontAwesomeIcon icon={faPaperPlane} style={{ width: '24px', height: '24px', color: '#007bff' }} />
        </button>
      </div>
    </div>
  </div>
);


const PostOption = ({ icon, text, onClick, color }) => (
  <div className="d-flex align-items-center home" onClick={onClick} style={{ cursor: "pointer" }}>
    <FontAwesomeIcon icon={icon} size="lg" color={color} />
    <span className="ml-2" style={{ fontSize: "13px", fontWeight: "bold", color: "#5f5f5f" , backgroundColor:"white"}}>
      {text}
    </span>
  </div>
);


// güncellendi
const PostCard = ({ name, postId, profileImg, text, time, postImg, likes, onDelete }) => (
  <div className="card mt-4 home">
    <div className="card-header d-flex align-items-center justify-content-between">
      <img src={profileImg} alt="profile" className="rounded-circle" style={{ width: "42px", height: "42px" }} />
      <div className="ms-3">
        <h6 className="mb-0">{name}</h6>
        <p className="mb-0 text-muted">{time}</p>
      </div>
      <button className="btn btn-outline-danger btn-sm w-100;" onClick={onDelete}>
        <FontAwesomeIcon icon={faTrashAlt} /> Sil
      </button>
    </div>
    <div className="card-body">
      {postImg && <img src={postImg} alt="post" className="w-100" />}
    </div>
    <div className="card-footer ">
      <div className="actions d-flex gap-4">
        <div>
          <img src={isPostLiked(likes) ? likeFilled : like} 
               alt="like" className="ms-2" style={{width: '24px'}}
               onClick={(e) => handleLike(e, postId, isPostLiked(likes))}/>
          <span style={{fontSize: '12px'}} className="ml-2">
            <span>{likes.length}</span> Beğenme</span>
        </div>
        <div onClick={(e) => handleComment(e, postId)}>
          <img key={"comment"} src={commentIcon} alt="comment" className="ms-2" style={{width: '24px'}}/>
          <span style={{fontSize: '12px'}}>Yorum Yap</span>
        </div>
      </div>
      <p>{text}</p>
    </div>
  </div>
);

export default Home;