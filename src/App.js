import {useEffect, useState} from 'react';
import {AuthContext} from './contexts/AuthContext';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import firebase, {auth,firestore,storage} from './firebase';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import AccountCreated from './components/AccountCreated';
import Home from './components/Home';
import Profile from './components/Profile';
import Talents from './components/Talents';
import Chats from './components/Chats';
import Room from './components/Room';

function App() {

const [user,setUser] = useState(null);
const [userData,setUserData] = useState(null);
const [userImage,setUserImage] = useState('');
const [profileColor,setProfileColor] = useState('white');

useEffect(() => {

  authState();
  getProfileColor();
},[]);

useEffect(() => {

  storeProfileColor();
},[profileColor]);

const authState = () => {

  auth.onAuthStateChanged( async (user) => {
    if (user)
    {
      setUser(user);
     await getUserData(user.uid);
    } 
    else
    {
      setUser(null);
      setUserData(null);
      setUserImage('');
    }
  });
}

const checkState = (fun) => {
      
  auth.onAuthStateChanged( async (user) => {
    if (user)
    {
      let UID = user.uid;

      setUser(user);
     await getUserData(UID);

     fun(false);
    } 
    else
    {
      setUser(null);
      setUserData(null)
      setUserImage('');

      fun(false);
    }
  });
}

const getUserData = async (userID,fun) => {

 await firestore.collection('Users').doc(userID).get()
  .then( async doc => {

    const storageRef = storage.ref('Profile/'+userID);

   await storageRef.getDownloadURL()
    .then(url => {console.log(url); setUserImage(url)})
    .catch(err => {console.log(err);});

    console.log(doc);
    setUserData(doc.data());

  })
  .catch(err => {console.log(err);});

}

const storeProfileColor = () => {

  localStorage.setItem('color',profileColor);
}

const getProfileColor = () => {

  let color = localStorage.getItem('color');

  setProfileColor(color);
}

console.log(userImage);
  return (
      <>
        <Router>
          <AuthContext.Provider value={{auth,firestore,storage,user,userData,userImage,authState,checkState,profileColor,setProfileColor}}>
            
          <Route path="/" component={Navbar} />
          <Switch>

          <Route exact path="/" component={Hero} />
          <Route exact path="/Register" component={Register} />
          <Route exact path="/Login" component={Login} />
          <Route exact path="/AccountCreated" component={AccountCreated} />
          <Route exact path="/Home" component={Home} />
          <Route exact path="/Profile" component={Profile} />
          <Route exact path="/Talents" component={Talents} />
          <Route exact path="/Chats" component={Chats} />
          <Route exact path="/Chats/:id" component={Room} />

          </Switch>

          </AuthContext.Provider>
        </Router>
      </>
  );
}

export default App;
