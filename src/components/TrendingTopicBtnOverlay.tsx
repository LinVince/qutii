import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

type TopicType = {
  text: string;
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
      paddingLeft={2}
      spacing={2}
      direction="row"
      sx={{ overflow: 'hidden' }}
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
            {topic.text}
          </Button>
        );
      })}
    </Stack>
  );
}
