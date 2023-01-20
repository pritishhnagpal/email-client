import { READ_EMAILS } from "../constants";
import { getStoredData } from "../utils";
import "./EmailOverview.css";

function EmailOverview({ email, setEmailData, emails, setEmails, emailData }) {
  const { date, id, from, isFavourite, isRead, short_description, subject } =
    email;
  const { email: userEmail, name } = from;
  const avatar = `https://ui-avatars.com/api/?name=${name}&length=1&background=E54065&rounded=true&color=fff&size=50`;
  console.log("ee", email);
  // ${
  //   emailData.id == email.id ? "highlightedDiv" : undefined
  // }
  async function openEmail() {
    const response = await fetch(
      `https://flipkart-email-mock.vercel.app/?id=${id}`
    );
    const data = await response.json();
    setEmailData({ ...data, name, date });

    const readEmails = getStoredData(READ_EMAILS);
    const updatedReadEmails = [...readEmails, id];
    sessionStorage.setItem(READ_EMAILS, JSON.stringify(updatedReadEmails));
    const emailsCopy = emails.slice();
    const index = emailsCopy.findIndex((email) => email.id === id);
    emailsCopy[index] = {
      ...emailsCopy[index],
      isRead: true,
    };
    setEmails(emailsCopy);
  }

  return (
    <div
      className={`emailContainer  ${isRead ? "readDiv" : ""}`}
      onClick={openEmail}
      style={{ width: emailData.body ? "30vw" : "" }}
    >
      <div className="imageContainer">
        <img src={avatar} alt="avatar" />
      </div>
      <div className="contentContainer">
        <div>
          <div>
            From:{" "}
            <strong>
              {name} &lt;{userEmail}&gt;
            </strong>
          </div>
          <div>
            Subject: <strong>{subject}</strong>
          </div>
        </div>
        <div>{short_description}</div>
        <div className="dateAndFavoriteDiv">
          <div>{new Date(date).toUTCString()}</div>
          {isFavourite ? <div className="favoriteText"> Favorite </div> : ""}
        </div>
      </div>
    </div>
  );
}

export default EmailOverview;
