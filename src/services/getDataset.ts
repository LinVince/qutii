// services/getDataset.js

export const getDataSet = async (subtopicId) => {
  return await fetchAPIData(subtopicId);
};

const fetchAPIData = async (subtopicId) => {
  const API_URL = `https://elb.qutii.org:443/library/subtopicQnAs/${subtopicId}`;

  try {
    console.log(`Fetching data from: ${API_URL}`);
    const response = await fetch(API_URL, {
      headers: { 'accept': '*/*' },
    });
    if (!response.ok) throw new Error('Response was not ok');

    const result = await response.json();
    console.log('API Response:', result);

    if (result.code !== 201) throw new Error('API response code was not 201');

    const mappedData = result.data.map((d) => ({
      id: d.articleid, // Using articleid as the id for uniqueness
      subtopicId: d.qnasubtopicid,
      question: d.question,
      answer: d.answer,
      sourceUrl: d.articlesourceurl,
      keyword: d.keyword,
      // Add other fields if needed
    }));

    console.log('Mapped Data:', mappedData);
    return mappedData;
  } catch (error) {
    console.error('There was an error accessing the API data', error);
    return [];
  }
};
