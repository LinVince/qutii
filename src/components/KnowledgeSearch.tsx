import React, { useState, useEffect, ReactNode } from 'react';
import {Paper, Box, AutocompleteRenderInputParams} from '@mui/material';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
// import SearchIcon from '@mui/icons-material/Search';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import CustomSearch from './CustomSearch';


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


  return <CustomSearch />;
}