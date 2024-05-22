import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Box, Hidden, Button } from '@mui/material'
import TextInput from '../components/TextInput';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CommentsDisabledOutlined } from '@mui/icons-material';

Modal.setAppElement('#app');

const UserInfoModal = ({ isOpen, onRequestClose, onSave }) => {
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isbuttonDisabled, setIsButtonDisabled] = useState(true);
  const [buttonColor, setButtonColor] = useState(' #9ab4bd ');
  const [showThankYou, setShowThankYou] = useState(false);
  const [formComplete, setFormComplete] = useState(false);
  const [isPending, setIsPending] = useState('false')
  const [errors, setErrors] = useState({});
  useEffect(() => {
    // Disable save button when page first renders
    setIsButtonDisabled(true);
  }, []);

  useEffect(() => {
    // Enable save button when fields are filled
    if(validateForm){
        setIsButtonDisabled(!(firstname && lastname && email))
        }
        setButtonColor(email && firstname && lastname ? '#034459' : '#9ab4bd');
  }, [email, firstname, lastname]); 

  const handleSave = async (e) => {
    // Prevent refresh on form submit
    e.preventDefault();
    const formData = {
          email , 
          firstname , 
          lastname
    }
    const validationErrors = validateForm(formData);
    // Validate and save user information
    if (Object.keys(validationErrors).length === 0)  {
      try { 
          setIsPending(true) 
          console.log("Log formData ===> ",formData);
          const URL =`http://graphviz-network-lb-ff6880c917e535f1.elb.eu-west-2.amazonaws.com:8080/user/signup?email=${email}&firstname=${firstname}&lastname=${lastname}`
          const response = await fetch(URL , {
            method: "POST",
            headers: {
              "access-control-allow-origin" : "*",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }).then (()=>{
            setShowThankYou(true);
            console.log( "FormData : new user added")
            setIsPending(false)}  
          );
          if (response.ok && isPending) {  
            setShowThankYou(true);
            setFormComplete(true);
            onSave({ email, firstname, lastname });
            setSubmitted(true);
            setIsButtonDisabled(true);
            setButtonColor("#9ab4bd");
        } else {
          console.error("Error:", response.statusText);  
        }
      } catch (error) {
        console.error("Error:", error);
      }
       // Close the modal after 5 seconds
       setTimeout(() => {
        setFirstname("");
        setLastname("");
        setEmail("");
        onRequestClose();
    }, 3000);  
      } else {
        setErrors(validationErrors);
        alert("Please fill in all the fields correctly"); 
      }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.firstname.trim()) {
      errors.firstname = 'First name is required';
    }
    if (!data.lastname.trim()) {
      errors.lastname = 'Last name is required';
    }
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Invalid email address';
    }
    return errors;
  };

  const theme = useTheme();
  const isExtraLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.only('md'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.only('sm'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.only('xs'));
  const isLargeScreenDown = useMediaQuery(theme.breakpoints.down('lg'));

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
            zIndex: 3000,
          },
          content: {
            overflow: 'none',
            overflowY: 'scroll',
            inset: isExtraLargeScreen ? 70 : 0,
            margin: isLargeScreenDown ? 30 : 0
          },
        }}
    >
      <Box className="modal-content">
        <button
        onClick={onRequestClose}
        className="close-button"
        style={{
          position: 'absolute',
          top: '10px',
          right: '0px',
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
        <Box sx={{display: 'flex', color: '#2E2C34', position: 'relative'}}>
            <Hidden mdDown>
              <Box sx={{mr: '20px'}}>
                <img
                  src="bulb.jpeg"
                  alt="lightbulb puzzle"
                  style={{
                    width: isExtraLargeScreen ? '500px' : 
                    isLargeScreen ? '400px' : 
                    isMediumScreen ? '300px' : 
                    isSmallScreen ? '200px' : '100px'
                  }}
                />
              </Box>
          </Hidden>
            <Box className="flow-p">
              <Box>
                <span style={{fontWeight: 600, fontSize: '32px'}}>
                  Welcome to
                  <br />
                  QuTii Truth Library
                </span>
                <Hidden mdUp>
                <Box sx={{width: '100%'}}>
                  <img
                    src="bulb.jpeg"
                    alt="lightbulb puzzle"
                    width='100%'
                    style={{maxWidth: '100%'}}
                  />
                </Box>
            </Hidden>
            <Box sx={{mt: '20px'}}>
                  Navigate a map of trustworthy Environmental Knowledge
                  <br />
                  <br />
                  Explore cited Q&A extracted from scientific research and other
                  eligible sources covering key topics aligned with the 17 SDGs.
                  <br />
                  <br /> Join the TiiQu Network supporting reliable knowledge sharing
                  and critical thinking.Whether you&apos;re an independent researcher,
                  learner, or decision-maker, you can now contribute and access
                  truthful information at your fingertips!
                  <br />
                  <br /> With QuTii, uncover similarities, contradictions, and
                  correlations, while gauging the credibility of information.
                  <br />
                  <br /> Sign up with your name and email to learn more and get
                  started!
            </Box>
            </Box>
              <form onSubmit={handleSave}>
                <div>
                  <Box sx={{mt:3}}>
                    <Box sx={{display: 'flex'}}>
                      <TextInput fullWidth={false} id="firstname" label="First name" sx={{my: 2, pr: 1, width: '50%'}} 
                  value={firstname}
                  onChange={e => setFirstname(e.target.value)}
                  disabled={submitted} />
                  {errors.firstname && <div>{errors.firstname}</div>}
                      <TextInput fullWidth={false} id="lastname" label="Last name" sx={{my: 2, width: '50%'}} 
                  value={lastname}
                  onChange={e => setLastname(e.target.value)}
                  disabled={submitted} />
                  {errors.lastname && <div>{errors.lastname}</div>}
                    </Box>
                    <TextInput id="email" label="Email address" sx={{my: 2}} 
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      disabled={submitted} />
                    {(!showThankYou &&(errors.email))? <div>{errors.email}</div>  : null}
                  </Box>
                </div>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2}}>
                  <Button type='submit' className={`save-button ${submitted ? 'submitted' : ''}`} disabled={isbuttonDisabled || submitted}
                  style={{
                    backgroundColor: buttonColor,
                    cursor: isbuttonDisabled ? 'default' : 'pointer',
                  }} variant="contained" sx={{px: 8, py: 1.5, width: '100%', ':focus': {outline: "none"}}}>Join Now</Button>
                </Box>
                {showThankYou && (
                <div className="thank-you-message">
                    &#x263A; Thank you for joining! We will contact you soon.
                </div>
                )}
              </form>
              <Box sx={{mt: '30px'}}>
                Your participation matters! Support up by donating on TiiQu&apos;s
                donation page
              </Box>
              <button>&#x263A; Support Us</button>
            </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default UserInfoModal;
