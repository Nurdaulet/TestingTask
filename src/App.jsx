import React, { useState } from "react";
import AuthForm from "./components/AuthForm";
import Chat from "./components/Chat";

const App = () => {
  const [credentials, setCredentials] = useState(null);

  const handleAuth = (creds) => {
    setCredentials(creds);
    console.log("Авторизован:", creds);
  };

  return (
    <div className="App">
      {!credentials ? <AuthForm onAuth={handleAuth} /> : <Chat credentials={credentials} />}
    </div>
  );
};

export default App;
