import { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { Navigate } from "react-router-dom";

////======================================================================= time in number like 1,2...
function getTimeDifference(createdAt) {
  const currentTime = new Date();
  const messageTime = new Date(createdAt);
  const difference = currentTime - messageTime;

  return difference;
}
////======================================================================= time in text like hour ago

function formatTimeAgo(difference) {
  const seconds = Math.floor(difference / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return `${interval} yr ago`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `${interval} mon ago`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `${interval} d ago`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return `${interval} hr ago`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${interval} min ago`;
  }
  return `${Math.floor(seconds)} sec ago`;
}
//=================================================================================
const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated } = useContext(Context);
  // const navigateTo = useNavigate();

  useEffect(() => {
    const fetchMessage = async () => {
      await axios
        .get(
          `${import.meta.env.VITE_SERVER_API}/api/v1/message/get_all_messages`,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          setMessages(res.data.messages);
        })
        .catch((err) => {
          console.log("Error Occured while Fetching messages.", err);
        });
    };

    fetchMessage();
  }, []);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      {isAuthenticated && (
        <div className="page messages">
          <h1>MESSAGES</h1>
          <div className="banner">
            {messages && messages.length > 0
              ? messages
                  .slice() // Create a shallow copy to avoid mutating the original array
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((message) => {
                    //=============================================================================function call to calculate how long ago?
                    const difference = getTimeDifference(message.createdAt);
                    const timeAgo = formatTimeAgo(difference);
                    const isRecent = difference <= 3600000;
                    //=============================================================================

                    return (
                      <div className="card" key={message.id}>
                        <div className="details">
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <p>
                              Name :
                              <span>
                                {message.firstName} {message.lastName}
                              </span>
                            </p>
                            <code className={`${isRecent ? "recent" : ""}`}>
                              {timeAgo}
                            </code>
                          </div>
                          <p>
                            Email : <span>{message.email}</span>
                          </p>
                          <p>
                            Phone : <span>{message.phone}</span>
                          </p>
                          <p>
                            Message : <span>{message.message}</span>
                          </p>
                        </div>
                      </div>
                    );
                  })
              : "No message arrives."}
          </div>
        </div>
      )}
    </>
  );
};

export default Messages;
