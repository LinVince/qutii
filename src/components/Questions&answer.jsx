import { useEffect } from 'react';
import {
  Box,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  FormControl,
  Button,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useState } from 'react';
import { getDataSet } from '../services/getDataset';
import { QuestionAccordion } from './QuestionAccordion';

const QuestionsAndAnswer = ({ subtopic }) => {
  const [subtopicQA, setSubtopicQA] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const dataSet = await getDataSet(subtopic);
      setSubtopicQA(dataSet);
    }
    fetchData();
  }, [subtopic]);

  const [age, setAge] = useState('');

  const handleChange = event => {
    setAge(event.target.value);
  };

  return (
    <Box>
      <Box bgcolor="#EEF5F7" px="16px" py="15px">
        <Typography fontSize="14px" fontWeight="medium">
          {subtopicQA.length > 99 ? '100+' : subtopicQA.length} question
          {subtopicQA.length > 1 ? 's' : ''} and answer
          {subtopicQA.length > 1 ? 's' : ''}
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
          // maxWidth: '392px',
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          bgcolor: '#EEF5F7',
        }}
      >
        {subtopicQA.map(qa => {
          return <QuestionAccordion qa={qa} key={qa.id} />;
        })}
      </Box>
    </Box>
  );
};

export default QuestionsAndAnswer;
