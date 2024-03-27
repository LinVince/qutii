import {
  Box,
  Typography,
  InputLabel,
  MenuItem,
  Chip,
  Select,
  Stack,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  Button,
  Accordion,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useState } from 'react';

const QuestionsAndAnswer = () => {
  const [age, setAge] = useState('');

  const handleChange = event => {
    setAge(event.target.value);
  };

  return (
    <Box>
      <Box bgcolor="#EEF5F7" px="16px" py="15px">
        <Typography fontSize="14px" fontWeight="medium">
          2,399 questions and answers
        </Typography>
        <Stack
          bgcolor="#EEF5F7"
          direction="row"
          alignItems="center"
          spacing={3}
          mt={2}
          sx={{ maxWidth: '377px' }}
        >
          <Box width="100%">
            <FormControl fullWidth size="small" disabled>
              <InputLabel>By Relevance</InputLabel>
              <Select value={age} label="Age" onChange={handleChange}>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box width="100%">
            <Button
              sx={{
                width: '100%',
                color: '#146682',
                borderColor: '#146682',
              }}
              variant="outlined"
            >
              <FilterAltIcon fontSize="14px" style={{ marginRight: '2px' }} />
              Filter
            </Button>
          </Box>
        </Stack>
      </Box>

      <Box
        sx={{
          maxWidth: '392px',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          bgcolor: '#EEF5F7',
        }}
      >
        <Accordion
          sx={{
            w: '100%',
            borderTop: 0,
            borderBottom: 0,
            padding: 0,
          }}
          variant="unstyled"
        >
          <AccordionSummary
            sx={{ borderTop: 0, padding: 0, borderBottom: 0, px: '10px' }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Box>
              <Typography fontWeight="bold">
                What are the key objectives of the Paris Agreement?
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  color: '#146682',
                  marginTop: '5px',
                }}
              >
                <Typography fontSize={14} fontWeight="600">
                  3 January ‘24
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
            <Typography fontSize="14px">
              The Paris Agreement aims to limit global temperature increase to
              well below 2 degrees Celsius above pre-industrial levels, enhance
              global climate resilience, and foster sustainable development.
            </Typography>
            <Typography
              fontSize={12}
              mt={1}
              sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
              as="span"
            >
              Source:
              <Typography
                fontSize={12}
                ml={1}
                as="span"
                fontWeight="500"
                color="#146682"
              >
                https://www.example-research.com/climate...
              </Typography>{' '}
            </Typography>
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
              <Chip
                color="primary"
                label="Climate Resilience Measures"
                sx={{
                  borderRadius: 1,
                  color: '#146682',
                  bgcolor: '#e0f4ff',
                }}
              />
              <Chip
                color="primary"
                label="Sustainable Development"
                sx={{ borderRadius: 1, color: '#146682', bgcolor: '#e0f4ff' }}
              />
              <Chip
                color="primary"
                label="Global Temperature Limit"
                sx={{ borderRadius: 1, color: '#146682', bgcolor: '#e0f4ff' }}
              />
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            w: '100%',
            borderTop: 0,
            borderBottom: 0,
            padding: 0,
            // background: 'red',
          }}
          variant="unstyled"
        >
          <AccordionSummary
            sx={{ borderTop: 0, padding: 0, borderBottom: 0, px: '10px' }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Box>
              <Typography fontWeight="bold">
                How are countries held accountable for their climate commitments
                under the Paris Agreement?
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  color: '#146682',
                  marginTop: '5px',
                }}
              >
                <Typography fontSize={14} fontWeight="600">
                  3 January ‘24
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
            <Typography fontSize="14px">
              The Paris Agreement aims to limit global temperature increase to
              well below 2 degrees Celsius above pre-industrial levels, enhance
              global climate resilience, and foster sustainable development.
            </Typography>
            <Typography
              fontSize={12}
              mt={1}
              sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
              as="span"
            >
              Source:
              <Typography
                fontSize={12}
                ml={1}
                fontWeight="500"
                as="span"
                color="#146682"
              >
                https://www.example-research.com/climate...
              </Typography>{' '}
            </Typography>
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
              <Chip
                color="primary"
                label="Climate Resilience Measures"
                sx={{
                  borderRadius: 1,
                  color: '#146682',
                  bgcolor: '#e0f4ff',
                }}
              />
              <Chip
                color="primary"
                label="Sustainable Development"
                sx={{ borderRadius: 1, color: '#146682', bgcolor: '#e0f4ff' }}
              />
              <Chip
                color="primary"
                label="Global Temperature Limit"
                sx={{ borderRadius: 1, color: '#146682', bgcolor: '#e0f4ff' }}
              />
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{
            w: '100%',
            borderTop: 0,
            padding: 0,
            '.MuiAccordion-root:before': {
              // Targets the pseudo-element that might be adding a border in Material-UI
              display: 'none',
            },
            '.MuiAccordion-root:after': {
              // Targets the pseudo-element that might be adding a border in Material-UI
              display: 'none',
            },
          }}
          variant="unstyled"
        >
          <AccordionSummary
            sx={{ borderTop: 0, padding: 0, px: '10px' }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Box>
              <Typography fontWeight="bold">
                How are countries held accountable for their climate commitments
                under the Paris Agreement?
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  color: '#146682',
                  marginTop: '5px',
                }}
              >
                <Typography fontSize={14} fontWeight="600">
                  3 January ‘24
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
            <Typography fontSize="14px">
              The Paris Agreement aims to limit global temperature increase to
              well below 2 degrees Celsius above pre-industrial levels, enhance
              global climate resilience, and foster sustainable development.
            </Typography>
            <Typography
              fontSize={12}
              mt={1}
              sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
              as="span"
            >
              Source:
              <Typography
                fontSize={12}
                fontWeight="500"
                ml={1}
                as="span"
                color="#146682"
              >
                https://www.example-research.com/climate...
              </Typography>{' '}
            </Typography>
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
              <Chip
                color="primary"
                label="Climate Resilience Measures"
                sx={{
                  borderRadius: 1,
                  color: '#146682',
                  bgcolor: '#e0f4ff',
                }}
              />
              <Chip
                color="primary"
                label="Sustainable Development"
                sx={{ borderRadius: 1, color: '#146682', bgcolor: '#e0f4ff' }}
              />
              <Chip
                color="primary"
                label="Global Temperature Limit"
                sx={{ borderRadius: 1, color: '#146682', bgcolor: '#e0f4ff' }}
              />
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default QuestionsAndAnswer;
