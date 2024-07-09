import React from 'react';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DOMPurify from 'dompurify';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const leftBarWidth = 86;

const style = {
  top: '0',
  left: leftBarWidth,
  width: `calc(100vw-${leftBarWidth}px)`,
  height: '100vh',
  bgcolor: '#f4fbff',
  boxShadow: 24,
  p: 4,
  color: 'black',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

interface FAQ {
  question: string;
  answer: string;
}

interface FAQModalProps {
  open: boolean;
  handleClose: () => void;
}

const faqData: FAQ[] = [
  {
    question: 'How can I navigate the map of knowledge on QuTii?',
    answer:
      'To navigate the QuTii knowledge map, zoom in and out and browse around. Topics are color-coded: green for environmental, yellow for social, and purple for governance subjects. Click on a topic to see relevant Q&A from verified sources in the sidebar. You can also screen and rank content based on perspective, trustworthiness, relevance, and other criteria.',
  },
  {
    question: 'What type of sources does QuTii rely on?',
    answer:
      'QuTii continuously expands its knowledge partners base. Initially, the library includes peer-reviewed scientific research, case studies, and papers from OA publishers, NGOs, Research Hubs and Public Agencies, followed by specialized press.',
  },
  {
    question: 'How does the topic base expand?',
    answer:
      'Starting with Environmental, Social, and Governance sustainability topics, the library will progressively expand to cover all areas where truth is essential. Gold Partners and top users can vote on topic prioritization.',
  },
  {
    question:
      'How can I join and contribute to the democratization of knowledge?',
    answer:
      "You can contribute by donating to the project, becoming a knowledge partner, sponsoring our crowdfunding campaign, or referring others to expand our network. <br /> We're uniting a forward-thinking community that values credible knowledge for informed decision-making and shaping future leaders. Choose your role https://tiiqu.com/support and become an essential part of the network to make knowledge distribution fair and objective",
  },
  {
    question:
      'As an independent researcher, how can I contribute knowledge to the library?',
    answer:
      "Currently, there 's no direct ingestion of knowledge to the QuTii Library, but we're testing verification mechanisms for future implementation. <br /> However, if you use the pdf2qa converter for Q&A generations and flag 'non-copyrighted content', the system will store the Q&As generated from your text for potential future inclusion in the library. This will depend on multiple verification checks and the relevancy of the content, should any Q&A extracted from your research be published, it will duly refer the source.",
  },
  {
    question:
      'QuTii uses a fidelity-first approach to ensure information credibility:',
    answer:
      '1. Information is automatically retrieved from publishers and assigned a trustworthiness score based on their verification processes. </p> 2. Information is continuously cross-referenced to determine the degree of agreement among sources. </p> 3. At a later stage, eligible users can express their agreement or disagreement. This dynamic, socio-technical approach provides a real-time score indicating how credible an information is. This score helps users gather reliable sources.',
  },
];

const FAQModal: React.FC<FAQModalProps> = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="faq-modal-title"
      aria-describedby="faq-modal-description"
    >
      <Box sx={style}>
        <IconButton
          sx={{ position: 'absolute', top: 8, right: 8 }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          marginRight={60}
          id="faq-modal-title"
          variant="h3"
          component="h2"
          fontFamily={'Raleway, sans-serif'}
          fontWeight={600}
        >
          FAQs
        </Typography>
        {faqData.map((faq, index) => (
          <Accordion
            key={index}
            sx={{
              bgcolor: 'white',
              color: 'black',
              m: 1,
              maxWidth: '600px',
            }}
          >
            <AccordionSummary
              expandIcon={<AddIcon sx={{ color: 'black' }} />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography fontFamily={'Raleway'} fontSize={18}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                fontFamily={'Raleway'}
                fontSize={15}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(faq.answer),
                }}
              />
            </AccordionDetails>
          </Accordion>
        ))}
        <br />
        <Typography fontSize={18} sx={{ textAlign: 'center' }}>
          Still have questions?
          <Typography fontSize={14}>
            If you cannot find an answer in our FAQ, you can always{' '}
            <a href="mailto:administrator@qutii.org" target="blank">
              contact us
            </a>{' '}
            we will answer you shortly!
          </Typography>
        </Typography>
      </Box>
    </Modal>
  );
};

export default FAQModal;
