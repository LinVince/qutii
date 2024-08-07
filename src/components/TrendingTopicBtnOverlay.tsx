import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

type TopicType = {
  nodelabel: string;
  [key: string]: string | number;
};

type SubTopicType = {
  topics: TopicType[];
  changeViewState: (topic: TopicType) => void;
};

export default function TrendingTopicBtnOverlay({
  topics,
  changeViewState,
}: SubTopicType) {
  return (
    <Stack
      spacing={2}
      direction="row"
      sx={{ overflow: 'scroll' }}
    >
      {topics.map((topic, index) => {
        return (
          <Button
            variant="contained"
            className="knowledgeTag"
            key={index}
            onClick={() => changeViewState(topic)}
            sx={{ minWidth: 'max-content' }}
          >
            {topic.nodelabel}
          </Button>
        );
      })}
    </Stack>
  );
}
