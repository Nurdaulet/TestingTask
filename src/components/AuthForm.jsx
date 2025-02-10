import React, { useState } from "react";

const AuthForm = ({ onAuth }) => {
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (idInstance && apiTokenInstance) {
      onAuth({ idInstance, apiTokenInstance });
    } else {
      alert("Пожалуйста, заполните оба поля!");
    }
  };

  return (
    <div className="auth-form">
      <h2>Авторизация</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID Instance:</label>
          <input
            type="text"
            value={idInstance}
            onChange={(e) => setIdInstance(e.target.value)}
            placeholder="Введите ID Instance"
          />
        </div>
        <div>
          <label>API Token:</label>
          <input
            type="text"
            value={apiTokenInstance}
            onChange={(e) => setApiTokenInstance(e.target.value)}
            placeholder="Введите API Token"
          />
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default AuthForm;
