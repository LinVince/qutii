import {
  Box,
  Typography,
  Chip,
  AccordionSummary,
  AccordionDetails,
  Accordion,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react';
import moment from 'moment';

interface QuestionSummaryProps {
  qa: {
    question: string;
    answer: string;
    sourceUrl: string;
    date: string;
  };
}

export const QuestionAccordion = ({ qa }: QuestionSummaryProps) => {
  const formattedDate = moment(qa.date).format('DD MMMM YY');
  const keywords = [
    'Climate Resilience Measures',
    'Sustainable Development',
    'Global Temperature Limit',
  ];

  return (
    <Accordion
      sx={{
        w: '100%',
        padding: '10px',
        "&.MuiAccordion-root::before": {
          backgroundColor: 'transparent'
        }
      }}
      variant="outlined"
    >
      <AccordionSummary
        sx={{ borderTop: 0, padding: 0, borderBottom: 0, px: '10px' }}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Box>
          <Typography fontWeight="bold">{qa.question}</Typography>
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              color: '#146682',
              marginTop: '5px',
            }}
          >
            <Typography fontSize={14} fontWeight="600">
              {formattedDate}
            </Typography>
            <Typography fontWeight="600"> &#x2022;</Typography>
            <Typography fontSize={14} fontWeight="600">
              TQ Score: 22
            </Typography>
            <Typography fontWeight="600">&#x2022;</Typography>
            <Typography fontSize={14} fontWeight="600">
              120 Views
            </Typography>
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 0, paddingX: 1 }}>
        <Typography fontSize="14px">{qa.answer}</Typography>
        <Typography mt={1} fontSize={12} display="inline-block">
          Source:
        </Typography>
        <a href={qa.sourceUrl} target="_blank">
          <Typography
            ml={1}
            fontSize={12}
            color="#146682"
            fontWeight="500"
            title={qa.sourceUrl}
            display="inline-block"
          >
            {qa.sourceUrl.length > 40
              ? `${qa.sourceUrl.substring(0, 40)}...`
              : qa.sourceUrl}
          </Typography>
        </a>
        <Typography mt={1} fontWeight="bold">
          Keywords
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            fontSize: '12px',
          }}
          mt={1}
        >
          {keywords.map((k: string) => (
            <Chip
              key={k}
              label={k}
              color="primary"
              sx={{
                borderRadius: 1,
                color: '#146682',
                bgcolor: '#e0f4ff',
              }}
            />
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
