import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export default function QuestionsAnswers(){
    return(
       <div style={{width:"406px"}}>
       <p>2399  questions and answers
       </p>
       <Stack direction="row" spacing={3} className='stack'>
        <Button textTransform="none" style={{width:"150px"}}>By Relevance</Button>
   
      <Button variant="outlined" textTransform="none"> <FilterAltIcon /> Filters</Button>
     
    </Stack>

    <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography> <h3>What are the key objectives of the Paris Agreement?</h3></Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Button variant="contained" size="small" className="knowledgeTag">Climate Resilience Measures</Button> 
        <Button variant="contained" size="small" className="knowledgeTag">Sustainable Development</Button>
        </AccordionDetails>
      </Accordion>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography><h3>
          How are countries held accountable for their climate commitments under the Paris Agreement?
            </h3></Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Button variant="contained" size="small" className="knowledgeTag">Climate change</Button> 
        <Button variant="contained" size="small" className="knowledgeTag">Compliance</Button> 
        </AccordionDetails>
      </Accordion>
       </div>
    )
}