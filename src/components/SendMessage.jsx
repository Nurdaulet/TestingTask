import React, { useState } from "react";

const SendMessage = ({ credentials, setMessages }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();

    const url = `${process.env.REACT_APP_GREEN_API_URL}/waInstance${credentials.idInstance}/sendMessage/${credentials.apiTokenInstance}`;

    const payload = {
      chatId: `${phoneNumber}@c.us`,
      message,
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "Вы", text: message, type: "outgoing" },
        ]);
        setMessage("");
      }
    } catch (error) {
      console.error("Ошибка отправки сообщения:", error);
    }
  };

  return (
    <form onSubmit={handleSendMessage}>
      <div>
        <label>Номер телефона:</label>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Введите номер телефона"
        />
      </div>
      <div>
        <label>Сообщение:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Введите текст сообщения"
        />
      </div>
      <button type="submit" disabled={!message}>
        Отправить
      </button>
    </form>
  );
};

export default SendMessage;
