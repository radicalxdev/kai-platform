export const transformToolData = (topic, response, createdAt, tool_id) => {
  const transformedDate = new Date(
    createdAt.seconds * 1000
  ).toLocaleDateString();

  // Common fields for the transformed data
  const baseTransformedData = {
    toolId: tool_id,
    response,
    creationDate: transformedDate,
  };

  const num_tool_id = parseInt(tool_id, 10);

  switch (num_tool_id) {
    case 0: {
      // MCQ
      // Extract the topic for MCQ

      const title = `Multiple Choice Assessment - ${topic}`;
      const content = `Multiple Choice Questions taken from ${topic}`;

      return {
        ...baseTransformedData,
        title,
        content,
        backgroundImageUrl:
          'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Quizify.png?alt=media&token=d1255f27-b1a1-444e-b96a-4a3ac559237d', // Replace with the actual URL for MCQ image
        logo: 'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/QuizifyLogo.png?alt=media&token=9bf1d066-fba4-4063-9640-ef732e237d31',
      };
    }

    case 1: {
      // FlashCard
      // Example transformation for FlashCard
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

      const title = `Flashcards on ${primaryConcept} and More`;
      const content = `Includes concepts like ${notableConcepts}`;

      return {
        ...baseTransformedData,
        title, // No truncation here
        content, // No truncation here
        backgroundImageUrl:
          'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Dynamo.png?alt=media&token=db14183f-a294-49b2-a9de-0818b007c080', // Replace with the actual URL for FlashCard image
        logo: 'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/YoutubeLogo.png?alt=media&token=2809083f-f816-41b6-8f86-80582b3da188',
      };
    }

    default: {
      return {
        ...baseTransformedData,
        title: 'Unknown Tool Usage',
        content: 'This tool usage is not defined.',
        backgroundImageUrl:
          'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Dynamo.png?alt=media&token=db14183f-a294-49b2-a9de-0818b007c080', // Replace with a default image URL
        logo: 'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/YoutubeLogo.png?alt=media&token=2809083f-f816-41b6-8f86-80582b3da188',
      };
    }
  }
};
