import moment from 'moment';

import { TOOLS } from '@/constants/tools';

export const exportToCSV = (data, panelData) => {
  const escapeCSVField = (field) =>
    typeof field === 'string' ? `"${field.replace(/"/g, '""')}"` : field;

  let headers;
  let rows;

  if (data?.toolId === '0') {
    headers = [
      'Question',
      'Option A',
      'Option B',
      'Option C',
      'Option D',
      'Correct Answer',
      'Explanation',
    ];
    rows = panelData.map((item) => [
      escapeCSVField(item.question),
      escapeCSVField(item.choices[0]?.value || ''),
      escapeCSVField(item.choices[1]?.value || ''),
      escapeCSVField(item.choices[2]?.value || ''),
      escapeCSVField(item.choices[3]?.value || ''),
      escapeCSVField(item.answer),
      escapeCSVField(item.explanation || ''),
    ]);
  } else {
    headers = ['Concept', 'Definition'];
    rows = panelData.map((item) => [
      escapeCSVField(item.concept),
      escapeCSVField(item.definition),
    ]);
  }

  const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join(
    '\n'
  );
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${data?.title.replace(/\s+/g, '_').toLowerCase()}.csv`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

export const copyToClipboard = (data, panelData) => {
  const label =
    data?.toolId === '0' ? 'Questions and Options' : 'Concepts and Definitions';
  const textToCopy = `
    Title: ${data?.title || 'Default Title'}
    
    Content: ${data?.content || 'Default Content'}
    
    ${label}:
    ${panelData
      .map((item, i) =>
        data?.toolId === '0'
          ? `${i + 1}. ${item.question}\n${item.choices
              ?.map((choice) => `   ${choice.key}. ${choice.value}`)
              .join('\n')}`
          : `${i + 1}. ${item.concept} - ${item.definition}`
      )
      .join('\n\n')}
    `;

  navigator.clipboard.writeText(textToCopy);
};

/**
 * Prepares data for the tool history card component based on the tool ID
 *
 * @param {Object} param0 - An object containing topic, response, createdAt, and tool_id.
 * @returns {Object} - Transformed tool data including toolId, response, creationDate, title, content, backgroundImageUrl, and logo.
 */
export const transformToolData = ({
  topic,
  response,
  createdAt,
  tool_id,
  description,
}) => {
  const transformedDate = moment(createdAt.seconds * 1000)
    .toDate()
    .toLocaleDateString();

  let title = '';
  let content = '';
  let backgroundImageUrl = '';
  let logo = '';

  switch (tool_id) {
    case TOOLS.FLASHCARDS: {
      const concepts = response?.map((item) => item.concept) || [];
      const primaryConcept = concepts[0] || 'Various Concepts';

      let notableConcepts = '';
      if (concepts.length > 1) {
        notableConcepts =
          concepts.slice(0, 1).join(', ') +
          (concepts.length > 2 ? ', and ' : ' and ') +
          concepts[concepts.length - 1];
      } else {
        notableConcepts = primaryConcept;
      }

      title = `Flashcards on ${primaryConcept} and More`;
      content = description || `Includes concepts like ${notableConcepts}`; // if description is a prop in the future
      backgroundImageUrl =
        'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Dynamo.png?alt=media&token=db14183f-a294-49b2-a9de-0818b007c080';
      logo =
        'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/YoutubeLogo.png?alt=media&token=2809083f-f816-41b6-8f86-80582b3da188';
      break;
    }
    case TOOLS.MCQ: {
      title = `Multiple Choice Assessment - ${topic}`;
      content = description || `Multiple Choice Questions taken from ${topic}`; // if description is a prop in the future
      backgroundImageUrl =
        'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Quizify.png?alt=media&token=d1255f27-b1a1-444e-b96a-4a3ac559237d';
      logo =
        'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/QuizifyLogo.png?alt=media&token=9bf1d066-fba4-4063-9640-ef732e237d31';
      break;
    }
    default: {
      title = 'Unknown Tool Usage';
      content = 'This tool usage is not defined.';
      backgroundImageUrl =
        'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Dynamo.png?alt=media&token=db14183f-a294-49b2-a9de-0818b007c080';
      logo =
        'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/YoutubeLogo.png?alt=media&token=2809083f-f816-41b6-8f86-80582b3da188';
      break;
    }
  }

  return {
    toolId: tool_id,
    response,
    creationDate: transformedDate,
    title,
    content,
    backgroundImageUrl,
    logo,
  };
};
