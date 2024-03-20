import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#app');

const UserInfoModal = ({ isOpen, onRequestClose, onSave }) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isbuttonDisabled, setIsButtonDisabled] = useState(true);
  const [buttonColor, setButtonColor] = useState(' #9ab4bd ');
  const [showThankYou, setShowThankYou] = useState(false);
  const [formComplete, setFormComplete] = useState(false);

  useEffect(() => {
    // Initialize modal form
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    // Disable save button when page first renders
    setIsButtonDisabled(true);
  }, []);

  useEffect(() => {
    // Enable save button when fields are filled
    setIsButtonDisabled(!(email && firstName && lastName));
    setButtonColor(email && firstName && lastName ? '#034459' : '#9ab4bd');
  }, [email, firstName, lastName]);

  const handleSave = e => {
    e.preventDefault();
    onSave({ email, firstName, lastName });
    setSubmitted(true);
    setIsButtonDisabled(true);
    setButtonColor('#9ab4bd');
    setShowThankYou(true);
    setFormComplete(true);
    setTimeout(() => {
      setFirstName('');
      setLastName('');
      setEmail('');
      onRequestClose();
    }, 5000);
  };
  // const handleSave = async (e) => {
  //   // Prevent refresh on form submit
  //   e.preventDefault();
  //   // Validate and save user information
  //   if (email && firstName && lastName) {
  //     try {
  //       const response = await fetch("http://18.133.159.120:8080/user/signup/", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ email, firstName, lastName }),
  //       });

  //       if (response.ok) {
  //         onSave({ email, firstName, lastName });
  //         setSubmitted(true);
  //         setIsButtonDisabled(true);
  //         setButtonColor("#9ab4bd");
  //         setShowThankYou(true);
  //         setFormComplete(true);
  //         // Close the modal after 5 seconds
  //         setTimeout(() => {
  //           setFirstName("");
  //           setLastName("");
  //           setEmail("");
  //           onRequestClose();
  //         }, 5000);
  //       } else {
  //         console.error("Error:", response.statusText);
  //       }
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   } else {
  //     alert("Please fill in all the fields");
  //   }
  // };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        if (formComplete) {
          setShowThankYou(false);
          onRequestClose();
        }
      }}
      contentLabel="User Information Modal"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 2,
        },
        content: {
          inset: '50px',
          marginRight: '12%',
          marginLeft: '10%',
          border: '1px solid black',
          overflow: 'scroll',
        },
      }}
    >
      <button
        onClick={onRequestClose}
        className="close-button"
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          cursor: 'pointer',
          zIndex: 1,
          border: 'none',
          background: 'transparent',
          fontSize: '30px',
          color: 'black',
        }}
      >
        &#10005;
      </button>
      <div className="main-container">
        <div>
          <img
            className="bulb"
            src="bulb.jpeg"
            alt="Image of lightbulb puzzle"
            style={{ width: 600, marginLeft: '60px' }}
          />
        </div>

        <div>
          <div className="text-box">
            <h2>
              Welcome to
              <br />
              QuTii Truth Library
            </h2>
            Navigate a map of trustworthy Environmental Knowledge
            <br />
            <br />
            Explore cited Q&A extracted from scientific research and other
            eligible sources covering key topics aligned with the 17 SDGs.
            <br />
            <br /> Join the TiiQu Network supporting reliable knowledge sharing
            and critical thinking.Whether you're an independent researcher,
            learner, or decision-maker, you can now contribute and access
            truthful information at your fingertips!
            <br />
            <br /> With QuTii, uncover similarities, contradictions, and
            correlations, while gauging the credibility of information.
            <br />
            <br /> Sign up with your name and email to learn more and get
            started!
          </div>
          <form onSubmit={handleSave}>
            <div className="form-group">
              <div className="name-input">
                <label htmlFor="firstName">First Name: </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  disabled={submitted}
                  style={{ marginRight: '10px' }}
                />
                <label htmlFor="surname">Surname: </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  disabled={submitted}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                style={{ width: '300px' }}
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={submitted}
              />
            </div>
            <button
              className={`save-button ${submitted ? 'submitted' : ''}`}
              type="submit"
              disabled={isbuttonDisabled || submitted}
              style={{
                backgroundColor: buttonColor,
                cursor: isbuttonDisabled ? 'default' : 'pointer',
              }}
            >
              Join Now!
            </button>
            {showThankYou && (
              <div className="thank-you-message">
                &#x263A; Thank you for joining! We will contact you soon.
              </div>
            )}
          </form>
          <div className="donate-text">
            Your participation matters! Support up by donating on TiiQu's
            donation page
          </div>
          <button className="donate-button">&#x263A; Support Us</button>
        </div>
      </div>
    </Modal>
  );
};

export default UserInfoModal;
