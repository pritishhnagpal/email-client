import { useEffect } from "react";
import "./EmailDescription.css";

const _ = require("lodash");
const EmailDescription = ({ emailBody, emailInfo, setEmails, emails }) => {
  const { body } = emailBody;
  const profileImageUrl = `https://ui-avatars.com/api/?name=${emailInfo.from.name}&length=1&background=E54065&rounded=true&color=fff&size=50`;
  const markAsFavorite = ({ id, isFavorite }) => {
    isFavorite
      ? localStorage.setItem(`favoriteId-${id}`, true)
      : localStorage.removeItem(`favoriteId-${id}`);
    const currentEmailIdx = _.findIndex(emails, ["id", id]);
    const updatedEmail = emails.slice();
    updatedEmail[currentEmailIdx] = { ...emailInfo, isFavorite };
    setEmails(updatedEmail);
  };
  if (!emailInfo.isRead) {
    const currentEmailIdx = _.findIndex(emails, ["id", emailInfo.id]);
    const updatedEmail = emails.slice();
    updatedEmail[currentEmailIdx] = { ...emailInfo, isRead: true };
    localStorage.setItem(`readId-${emailInfo.id}`, true);
    setEmails(updatedEmail);
  }
  return (
    <>
      <div>
        <div className="imageContainer">
          <img src={profileImageUrl} />
        </div>
      </div>
      <div>
        <div>
          {emailInfo.from.name}
          {emailInfo.isFavorite ? (
            <button
              className="favoriteButton"
              onClick={() =>
                markAsFavorite({ id: emailInfo.id, isFavorite: false })
              }
            >
              {" "}
              Mark as default
            </button>
          ) : (
            <button
              className="favoriteButton"
              onClick={() =>
                markAsFavorite({ id: emailInfo.id, isFavorite: true })
              }
            >
              Mark as favorite
            </button>
          )}
        </div>
        <div>{new Date(emailInfo.date).toUTCString()}</div>
        <div dangerouslySetInnerHTML={{ __html: body }} />
      </div>
    </>
  );
};

export default EmailDescription;
