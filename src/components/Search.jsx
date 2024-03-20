import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
// import SearchIcon from '@mui/icons-material/Search';

export default function KnowledgeSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [topics, setTopics] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);

  useEffect(() => {
    fetch(
      'https://raw.githubusercontent.com/LinVince/knowledge_map/main/final_data%20II.csv',
    )
      .then(response => response.text())
      .then(data => {
        const parsedData = parseCSV(data);
        setTopics(parsedData);
        setFilteredTopics(parsedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    // Filter topics based on search query
    const filtered = topics.filter(topic =>
      topic.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    console.log('Filtered topics:', filtered);
    setFilteredTopics(filtered);
  }, [searchQuery, topics]);

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

const parseCSV = data => {
  // Split the data into lines
  const lines = data.split('\n');
  
  // Initialize an array to store the parsed topics
  const topics = [];

  // Iterate over each line and extract the topic
  lines.forEach(line => {
    // Split each line by comma to separate the columns
    const columns = line.split(',');
    
    // Assuming the topic is in the first column
    const topic = columns[0].trim(); // Trim to remove leading/trailing whitespace
    
    // Add the topic to the topics array
    if (topic) { // Ensure topic is not empty
      topics.push(topic);
    }
  });

  return topics;
};


  return (
    <div className="search">
      <Paper
        component="form"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          display: 'flex',
          alignItems: 'center',
          margin: '54px',
          width: '20%',
          height: 42,
          marginLeft: 20,
          zIndex: 1,
        }}
      >
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
            width: '100%',
            px: '10px',
            py: '5px',
          }}
          placeholder="Search Topics..."
          inputProps={{ 'aria-label': 'search google maps...' }}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          {/* <SearchIcon /> */}
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Select
          value={searchQuery}
          onChange={handleSearchChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem disabled value="">
            Topics
          </MenuItem>
          {filteredTopics.map(topic => (
            <MenuItem key={topic} value={topic}>
              {topic}
            </MenuItem>
          ))}
        </Select>
      </Paper>
    </div>
  );
}
