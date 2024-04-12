export const getDataSet = async (subtopic: string) => {
  return await fetchAirtableData(subtopic);
};

const fetchAirtableData = async (subtopic: string) => {
  const AIRTABLE_BASE_ID = 'appmtEJyQCfbxlKcs';
  const AIRTABLE_TABLE_NAME = 'tbleP06rvmi7Lqj8Y';
  //@todo - this should be at the env var
  const API_KEY =
    'pat4bG1GF0MkVHNyT.c3bcc119ccd62614b90e24677e649a560f99f72b21380477728b770e10536a2f';

  const pageSize = `&pageSize=${100}`;
  const offset = `&offset=${''}`; // 'itreTnBzgkZH3e7Qd/recEsvuI4VM2nr59W'
  const view = `&view=${'Grid view'}`;
  const filter = `&filterByFormula={subtopicName}="${subtopic}"`;
  const fields =
    '&fields[]=id&fields[]=topicName&fields[]=subtopicName&fields[]=question&fields[]=answer&fields[]=sourceUrl&fields[]=date';

  let options = `${pageSize}${offset}${view}${fields}${filter}`;

  const AIRTABLE_API_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}?${options}`;

  try {
    const response = await fetch(AIRTABLE_API_URL, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
    if (!response.ok) throw new Error('Response was not ok');

    const data = await response.json();
    // const offset = data.offset

    const mappedData = data.records.map((d: any) => {
      return {
        idAirtable: d.id,
        id: d.fields.id,
        ...d.fields,
      };
    });

    return mappedData;
  } catch (error) {
    console.error('There was an error accessing the Airtable data', error);
    return [];
  }
};
