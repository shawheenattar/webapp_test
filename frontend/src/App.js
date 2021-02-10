import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Camera, { IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import Webcam from "react-webcam";
import axios from 'axios';

class App extends React.Component {
  state = {
    loginStatus: 0,
    recognizedUsers: "NA",
    imgSrc: null,
  }

  setWebcamRef = webcam => {
    this.webcam = webcam;
  };

  setUsernameRef = name => {
    this.username = name;
  }

  setRecognizedUsers = (length, users) => {
    if (users.length > 0) {
      this.setState({
        ...this.state,
        recognizedUsers: users,
        loginStatus: length
      })
    } else {
      this.setState({
        ...this.state,
        recognizedUsers: "NA",
        loginStatus: length
      })
    }
  }

  setImgSrc = (img) => {
    if (img) {
      this.setState({
        imgSrc: img
      })
    }
  }

  handleTakePhoto = async (dataUri) => {
    console.log(dataUri);
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_URL}/face`, { uri: "cool" } 
    );

    var usernames = "";
      for (var i = 0; i < data.users.length; i++) {
        usernames += data.users[i] + ", ";
      }
      this.setRecognizedUsers(data.users.length, usernames.slice(0, -2));
  }

  // handleTakePhoto(dataUri) {
  //   console.log(dataUri);
  //   fetch(`${process.env.REACT_APP_API_URL}/face`, {
  //     method: "put",
  //     headers: {"Content-type": "application/json"},
  //     body: JSON.stringify({
  //       uri: dataUri
  //     })
  //   }).then(res => res.json()).then(data => {
  //     var usernames = "";
  //     for (var i = 0; i < data.users.length; i++) {
  //       usernames += data.users[i] + ", ";
  //     }
  //     this.setRecognizedUsers(data.users.length, usernames.slice(0, -2));
  //     // this.setImgSrc(data.users);
  //   }).catch(function() {
  //     console.log("failed connection");
  //   });
  // }

  handleCapture() {
    const imageSrc = this.webcamRef.getScreenshot();
    this.setImgSrc(imageSrc);
  }

  // capture = () => {
  //   const imageSrc = this.webcam.getScreenshot();
  //   const username = this.username.value;
  //   this.handleTakePhoto(imageSrc);
  //   // this.setImgSrc(imageSrc);
  // };

  render() {
    return (
      <div className="App">
        <header className="App-header">
    
          <p>Current number of recognized users: {this.state.loginStatus}.</p>
          <p>Current recognized usernames: {this.state.recognizedUsers}.</p>


          <Camera
            onTakePhoto = { (dataUri) => { this.handleTakePhoto(dataUri); } }
            imageType = {IMAGE_TYPES.JPG}
            />

          {/* <Webcam
            audio={false}
            ref={this.setWebcamRef}
            screenshotFormat="image/jpeg"
          />
          <input type="text" name="username"/>
          <button onClick={this.capture}>Capture photo</button>
          {this.state.imgSrc && (
            <img
              src={this.state.imgSrc}
            />
          )} */}

        </header>
      </div>
    );
  }
  
}


// https://www.npmjs.com/package/react-webcam



export default App;

// import React, { Component } from 'react';
// import axios from 'axios';
// import './App.css';

// class App extends Component {
//   state = {
//     topics: ["Loading..."],
//     question: "",
//     answer: ""
//   }

//   componentDidMount() {
//     this.fetchTopics()

//   }

//   fetchTopics = async () => {
//     const { data } = await axios.get(
//       `${process.env.REACT_APP_API_URL}/get_topics`,
//     );
//     const { topics } = data;
//     this.setState({topics})
//   }

//   handleChange = (event) => {
//     this.setState({question: event.target.value});
//   }

//   handleSubmit = (event) => {
//     this.fetchAnswer();
//     event.preventDefault();
//   }

//   fetchAnswer = async () => {
//     const { question } = this.state;
//     const { data } = await axios.post(
//       `${process.env.REACT_APP_API_URL}/submit_question`, { question }
//     );
//     const { answer } = data;
//     this.setState({answer})
//   }

//   render() {
//     const { topics, question, answer } = this.state;
//     return (
//       <div className="App">
//         <header className="App-header">
//         <h1>List of topics to ask a question on</h1>
//         <ul>
//           {topics.map(topic => (<li key={topic}>{topic}</li>))}
//         </ul>
//           <form onSubmit={this.handleSubmit}>
//           <label>
//             Question:
//             <input type="text" value={question} onChange={this.handleChange} />
//           </label>
//           <input type="submit" value="Submit" />
//         </form>
//         <h1>Answer: {answer}</h1>
//         </header>
//       </div>
//     );
//   }
// }

// export default App;
