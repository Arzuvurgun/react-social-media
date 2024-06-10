import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faTrashAlt, faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import "./profile.css";
import { getAllPosts } from "../../api/Posts";

const Profile = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      text: "Burası ilk gönderim",
      time: "1 saat önce",
      likes: 5,
      comments: []
    },
    {
      id: 2,
      text: "Burası ikinci gönderim",
      time: "2 saat önce",
      likes: 10,
      comments: []
    },
  ]);

  const fetchPosts = async () => {
    const response = await getAllPosts();
    if (response.status === 200) {
      setPosts(response.data);
    }
  };


  const handlePostDelete = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
  };

  
  return (
    <div className="container mt-5 profileHome">
      <div className="row">
        <div className="col-3 mt-5">
          <div className="card" style={{ width: "14rem" }}>
            <Link to="/profile"> 
              <div className="card-header">
                <img
                  src="https://picsum.photos/200/300"
                  alt="profile"
                  className="rounded-circle"
                  style={{ width: "70px", height: "70px", marginRight: "8vh" }}
                />
              </div>
            </Link>
            <div className="card-body mt-2">
              <p className="card-title header text-center">
                <a href="https://github.com/ranatunc" target="_blank" rel="noopener noreferrer" style={{ color: "#212529" }}>
                  Rana Tunç
                </a>
              </p>
              <div style={{ marginBottom: "10px", color: "#5f5f5f", fontSize: ".85rem" }}>
                Software Developer at Navlungo - Dijital Lojistik Platformu
              </div>
              <hr />
              <div className="card-text">
                <div>
                  <span className="float-left view" style={{ marginLeft: "-10px" }}>
                    Profilinizi kimler görüntüledi
                  </span>
                  <span className="float-right view" style={{ color: "#0a66c2" }}>
                    447
                  </span>
                </div>
                <div>
                  <span className="float-left view" style={{ marginLeft: "-10px" }}>
                    Yayınınız için görüntüleme
                  </span>
                  <span className="float-right view mt-1" style={{ color: "#0a66c2" }}>
                    150
                  </span>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <Link to="/" className="nav-link">
                <FontAwesomeIcon icon={faHome} />
                <span className="mb-4 ml-1">Ana Sayfa</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="col-6 mt-5">
          {posts.map((post) => (
            <div key={post.id} className="card mt-2">
              <div className="card-header d-flex align-items-center">
                <img src="https://picsum.photos/50/50" alt="profile" className="rounded-circle" style={{ width: "50px", height: "50px" }} />
                <div className="ml-2">
                  <h6 className="mb-0">Me</h6>
                  <p className="mb-0 text-muted">{post.time}</p>
                </div>
                <button className="btn btn-danger btn-sm ml-auto" onClick={() => handlePostDelete(post.id)}>
                  <FontAwesomeIcon icon={faTrashAlt} /> Sil
                </button>
              </div>
              <div className="card-body">
                <p>{post.text}</p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <div>
                  <FontAwesomeIcon icon={faThumbsUp} />
                  <span className="ml-2">{post.likes} beğenme</span>
                </div>
              </div>
              <div className="card-footer">
                <ul className="list-unstyled">
                  {post.comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;









