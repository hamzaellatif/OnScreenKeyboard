import { useEffect, useState } from 'react'
import './App.css'
import Input from './components/Input'
import OnScreenKeyboard from './components/OnScreenKeyboard'

function App() {
  const [username, setUsername] = useState({first: '',second: ''});
  const [password, setPassword] = useState({first: '',second: ''});
  const [encryption, setEncryption] = useState(true);
  const [focusedItem, setFocusItem] = useState('txtusername');

  const print = (text) => {
    if(focusedItem === "txtusername"){
      setUsername({ ...username, ...text });
    }else if(focusedItem === "txtpassword"){
      setPassword({ ...password, ...text });
    }
  }

  const getInputText = (id) => {
    if(id === "txtusername"){
      return username;
    }else if(id === "txtpassword"){
      return password;
    }

    return null;
  }
  const confirm = () => {
    if(focusedItem === "txtusername"){
      setFocusItem("txtpassword");
    }else if(focusedItem === "txtpassword"){
      toggleKeyboard();
    }
  }

  const handleInputClick = (id,data) => {
    setFocusItem(id);
    if(id === "toggle"){
      setEncryption(!encryption);
    }
  }

  return (
    <>
      <h1>Login Page</h1>
      <div className="card">
        <Input 
          type="text" 
          id="txtusername" 
          click={handleInputClick} 
          value={username} 
          focus={focusedItem} 
          tabIndex={1}
        />
        <Input 
          type="password" 
          id="txtpassword" 
          encryption={encryption} 
          click={handleInputClick} 
          value={password} 
          focus={focusedItem} 
          tabIndex={2}
        />
        <button tabIndex={3}>Sign in</button>
        <OnScreenKeyboard 
          input={focusedItem} 
          methods={{
            print: print,
            confirm: confirm,
            getInputText: getInputText
          }}
        />
      </div>
    </>
  )
}

export default App
