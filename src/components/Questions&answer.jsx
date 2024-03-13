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
      <Box bgcolor="#EEF5F7" p="10px">
        <Typography>2,399 questions and answers</Typography>
        <Stack
          direction="row"
          alignItems="center"
          spacing={3}
          mt={1}
          sx={{ maxWidth: '377px' }}
        >
          <Box width="100%">
            <FormControl fullWidth size="small">
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
              <FilterAltIcon /> Filter
            </Button>
          </Box>
        </Stack>
      </Box>

      <Box sx={{ maxWidth: '392px' }} px="10px">
        <Accordion
          sx={{
            w: '100%',
            borderTop: 0,
            padding: 0,
          }}
          variant="unstyled"
        >
          <AccordionSummary
            sx={{ borderTop: 0, padding: 0 }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Box>
              <Typography>
                What are the key objectives of the Paris Agreement?
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Typography color="#dae5e1" fontSize={14}>
                  3 January ‘24
                </Typography>
                <Typography color="#dae5e1"> &#x2022;</Typography>
                <Typography color="#dae5e1" fontSize={14}>
                  TQ Score: 22
                </Typography>
                <Typography color="#dae5e1">&#x2022;</Typography>
                <Typography color="#dae5e1" fontSize={14}>
                  120 Views
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            <Typography>
              The Paris Agreement aims to limit global temperature increase to
              well below 2 degrees Celsius above pre-industrial levels, enhance
              global climate resilience, and foster sustainable development.
            </Typography>
            <Typography
              fontSize={14}
              mt={1}
              sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
            >
              Source:
              <Typography fontSize={14} ml={1}>
                https://www.example-research.com/climate...{' '}
              </Typography>{' '}
            </Typography>
            <Typography mt={1}>Keywords</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }} mt={1}>
              <Chip
                color="primary"
                label="Climate Resilience Measures"
                sx={{ borderRadius: 1, color: '#146682', bgcolor: '#e0f4ff' }}
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
          }}
          variant="unstyled"
        >
          <AccordionSummary
            sx={{ borderTop: 0, padding: 0 }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Box>
              <Typography>
                How are countries held accountable for their climate commitments
                under the Paris Agreement?
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Typography color="#dae5e1" fontSize={14}>
                  3 January ‘24
                </Typography>
                <Typography color="#dae5e1"> &#x2022;</Typography>
                <Typography color="#dae5e1" fontSize={14}>
                  TQ Score: 22
                </Typography>
                <Typography color="#dae5e1">&#x2022;</Typography>
                <Typography color="#dae5e1" fontSize={14}>
                  120 Views
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            <Typography>
              The Paris Agreement aims to limit global temperature increase to
              well below 2 degrees Celsius above pre-industrial levels, enhance
              global climate resilience, and foster sustainable development.
            </Typography>
            <Typography
              fontSize={14}
              mt={1}
              sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
            >
              Source:
              <Typography fontSize={14} ml={1}>
                https://www.example-research.com/climate...{' '}
              </Typography>{' '}
            </Typography>
            <Typography mt={1}>Keywords</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }} mt={1}>
              <Chip
                color="primary"
                label="Climate Resilience Measures"
                sx={{ borderRadius: 1, color: '#146682', bgcolor: '#e0f4ff' }}
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
          }}
          variant="unstyled"
        >
          <AccordionSummary
            sx={{ borderTop: 0, padding: 0 }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Box>
              <Typography>
                What are the key objectives of the Paris Agreement?
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Typography color="#dae5e1" fontSize={14}>
                  3 January ‘24
                </Typography>
                <Typography color="#dae5e1"> &#x2022;</Typography>
                <Typography color="#dae5e1" fontSize={14}>
                  TQ Score: 22
                </Typography>
                <Typography color="#dae5e1">&#x2022;</Typography>
                <Typography color="#dae5e1" fontSize={14}>
                  120 Views
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            <Typography>
              The Paris Agreement aims to limit global temperature increase to
              well below 2 degrees Celsius above pre-industrial levels, enhance
              global climate resilience, and foster sustainable development.
            </Typography>
            <Typography
              fontSize={14}
              mt={1}
              sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
            >
              Source:
              <Typography fontSize={14} ml={1}>
                https://www.example-research.com/climate...{' '}
              </Typography>{' '}
            </Typography>
            <Typography mt={1}>Keywords</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }} mt={1}>
              <Chip
                color="primary"
                label="Climate Resilience Measures"
                sx={{ borderRadius: 1, color: '#146682', bgcolor: '#e0f4ff' }}
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
          }}
          variant="unstyled"
        >
          <AccordionSummary
            sx={{ borderTop: 0, padding: 0 }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Box>
              <Typography>
                How are countries held accountable for their climate commitments
                under the Paris Agreement?
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Typography color="#dae5e1" fontSize={14}>
                  3 January ‘24
                </Typography>
                <Typography color="#dae5e1"> &#x2022;</Typography>
                <Typography color="#dae5e1" fontSize={14}>
                  TQ Score: 22
                </Typography>
                <Typography color="#dae5e1">&#x2022;</Typography>
                <Typography color="#dae5e1" fontSize={14}>
                  120 Views
                </Typography>
              </Box>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 0 }}>
            <Typography>
              The Paris Agreement aims to limit global temperature increase to
              well below 2 degrees Celsius above pre-industrial levels, enhance
              global climate resilience, and foster sustainable development.
            </Typography>
            <Typography
              fontSize={14}
              mt={1}
              sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
            >
              Source:
              <Typography fontSize={14} ml={1}>
                https://www.example-research.com/climate...{' '}
              </Typography>{' '}
            </Typography>
            <Typography mt={1}>Keywords</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }} mt={1}>
              <Chip
                color="primary"
                label="Climate Resilience Measures"
                sx={{ borderRadius: 1, color: '#146682', bgcolor: '#e0f4ff' }}
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
