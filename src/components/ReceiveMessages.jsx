import React, { useEffect } from "react";

const ReceiveMessages = ({ credentials, setMessages }) => {
  const fetchMessages = async () => {
    if (!credentials.idInstance || !credentials.apiTokenInstance) return;

    const receiveUrl = `${process.env.REACT_APP_GREEN_API_URL}/waInstance${credentials.idInstance}/receiveNotification/${credentials.apiTokenInstance}`;

    try {
      const res = await fetch(receiveUrl, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        console.error("Ошибка получения сообщений:", res.statusText);
        setTimeout(fetchMessages, 3000); // Retry in 3 seconds if failed
        return;
      }
      
      const data = await res.json();
      if (!data || !data.body || !data.body.messageData) {
        setTimeout(fetchMessages, 5000); // Check again in 5 second
        return;
      }

      const sender = data.body.senderData.chatId.replace("@c.us", "");
      const messageText = data.body.messageData.textMessageData?.textMessage || "Нет текста";

      // Update messages state
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender, text: messageText, type: "incoming" },
      ]);

      // Delete notification to prevent duplicate processing
      await deleteNotification(data.receiptId);

      // Fetch next message immediately
      fetchMessages();
    } catch (error) {
      console.error("Ошибка получения сообщений:", error);
      setTimeout(fetchMessages, 3000); // Retry in 3 seconds on error
    }
  };

  const deleteNotification = async (receiptId) => {
    const deleteUrl = `${process.env.REACT_APP_GREEN_API_URL}/waInstance${credentials.idInstance}/deleteNotification/${credentials.apiTokenInstance}/${receiptId}`;

    try {
      await fetch(deleteUrl, { method: "DELETE" });
    } catch (error) {
      console.error("Ошибка удаления уведомления:", error);
    }
  };

  useEffect(() => {
    fetchMessages(); // Start polling when component mounts
  }, [credentials]); // Restart if credentials change

  return null; // No need to show "Загрузка сообщений..."
};

export default ReceiveMessages;
