import { useEffect, useState } from 'react'
import './App.css'
import Input from './components/input'
import OnScreenKeyboard from './components/OnScreenKeyboard'

function App() {
  const [username, setUsername] = useState({first: '',second: ''});
  const [password, setPassword] = useState({first: '',second: ''});
  const [encryption, setEncryption] = useState(true);
  const [focusedItem, setFocusItem] = useState('txtusername');
  const [isVisible, setIsVisible] = useState(true);

  const print = (text) => {
    if(focusedItem === "txtusername"){
      setUsername({first: text.first,second: text.second});
    }else if(focusedItem === "txtpassword"){
      setPassword({first: text.first,second: text.second});
    }
  }
  const cursorLeft = () => {console.log("cursorLeft app method")}
  const cursorRight = () => {console.log("cursorRight app method")}
  const confirm = () => {
    if(focusedItem === "txtusername"){
      setFocusItem("txtpassword");
    }else if(focusedItem === "txtpassword"){
      toggleKeyboard();
    }
  }
  const erase = () => {console.log("erase app method")}
  const clear = () => {console.log("clear app method")}
  const toggleKeyboard = () => {
    setIsVisible(!isVisible);
  }

  const handleInputClick = (id,data) => {
    setFocusItem(id);
    if(id === "toggle"){
      setEncryption(!encryption);
    }
  }
  // handle keyboard keys
  useEffect(() => {
    let newtext = username.first+username.second;
    const handleKeyDown = (evt) => {
      // check if keyboard is visible
      if(isVisible){
        toggleKeyboard();
      }
      switch(evt.keyCode){
        case 8: //backspace
          newtext = newtext.substr(0, newtext.length - 1);;
          print({first: newtext, second: ''});  
        break;
        case 13: //backspace
          console.log("enter");
        break;
        default: 
          newtext = newtext + evt.key;
          print({first: newtext, second: ''});   
        break;
      }
    };
  
    document.addEventListener('keydown', handleKeyDown);
  
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <h1>Login Page</h1>
      <div className="card">
        <Input type="text" id="txtusername" click={handleInputClick} value={username} focus={focusedItem}/>
        <Input type="password" id="txtpassword" encryption={encryption} click={handleInputClick} value={password} focus={focusedItem}/>
        <button>Sign in</button>
        <OnScreenKeyboard visibility={isVisible} methods={{
          print: print,
          confirm: confirm,
          cursorLeft: cursorLeft ,
          cursorRight: cursorRight,
          erase: erase,
          clear: clear,
          toggleKeyboard: toggleKeyboard
        }}/>
      </div>
    </>
  )
}

export default App
