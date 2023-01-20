import "./EmailList.css";

import { useEffect, useState } from "react";
import EmailOverview from "./EmailOverview";
import EmailDescription from "./EmailDescription";
import { getStoredData } from "../utils";
import { FAVOURITE_EMAILS, READ_EMAILS } from "../constants";

const _ = require("lodash");
const EmailList = ({ filters }) => {
  const [emails, setEmails] = useState([]);
  const [emailData, setEmailData] = useState({});
  const [page, setPage] = useState(1);

  const fetchEmails = async () => {
    try {
      const emailResponse = await fetch(
        `https://flipkart-email-mock.now.sh/?page=${page}`
      );
      const fetchedEmails = await emailResponse.json();
      const readEmails = getStoredData(READ_EMAILS);
      const favuoriteEmails = getStoredData(FAVOURITE_EMAILS);
      const emailList = fetchedEmails.list.map((email) => ({
        ...email,
        isRead: readEmails.includes(email.id),
        isFavourite: favuoriteEmails.includes(email.id),
        display: true,
      }));
      console.log("E", emailList);
      setEmails(emailList);
    } catch (e) {
      alert("Some Error Occured");
    }
  };

  console.log(emailData?.body);
  const avatar = `https://ui-avatars.com/api/?name=${emailData?.name}&length=1&background=E54065&rounded=true&color=fff&size=50`;

  useEffect(() => {
    fetchEmails();
  }, [page]);

  function addToFav(id) {
    const favEmails = getStoredData(FAVOURITE_EMAILS);
    const updatedFavEmails = [...favEmails, id];
    sessionStorage.setItem(FAVOURITE_EMAILS, JSON.stringify(updatedFavEmails));
    const emailsCopy = emails.slice();
    const index = emailsCopy.findIndex((email) => email.id === id);
    emailsCopy[index] = {
      ...emailsCopy[index],
      isFavourite: true,
    };
    setEmails(emailsCopy);
  }

  useEffect(() => {
    console.log("ft", filters);
    if (emails.length > 0) {
      let emailsCopy = [];
      if (filters.showFavourite) {
        emailsCopy = emails.map((email) => ({
          ...email,
          display: email.isFavourite,
        }));
      } else if (filters.showRead) {
        emailsCopy = emails.map((email) => ({
          ...email,
          display: email.isRead,
        }));
      } else if (filters.showUnread) {
        emailsCopy = emails.map((email) => ({
          ...email,
          display: !email.isRead,
        }));
      } else {
        emailsCopy = emails.map((email) => ({
          ...email,
          display: true,
        }));
      }
      setEmails(emailsCopy);
    }
  }, [filters]);

  return (
    <div className="emailList">
      <div className="emailOverview">
        {emails.length > 0
          ? emails.map((email) => {
              if (!email.display) return null;
              return (
                <EmailOverview
                  email={email}
                  setEmailData={setEmailData}
                  emails={emails}
                  setEmails={setEmails}
                  emailData={emailData}
                />
              );
            })
          : null}
        <div
          style={{
            display: "flex",
            fontSize: 24,
            cursor: "pointer",
          }}
        >
          <div
            onClick={() => setPage(1)}
            style={{ marginRight: 20, marginBottom: 40 }}
          >
            1
          </div>
          <div onClick={() => setPage(2)}>2</div>
        </div>
      </div>
      {emailData.body ? (
        <div className="emailBody">
          <header className="header">
            <div className="avatarContainer">
              <img src={avatar} alt="avatar" />
              <h1 className="name">{emailData.name}</h1>
            </div>
            <div className="favBtn" onClick={() => addToFav(emailData.id)}>
              Mark As favorite
            </div>
          </header>
          <div dangerouslySetInnerHTML={{ __html: emailData.body }} />
        </div>
      ) : null}
    </div>
  );
};

export default EmailList;
