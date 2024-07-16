import { ToolCardHandlers, TOOLS_ID } from '@/constants/tools';

/**
 * Renders tool data based on the toolId and item provided from tool constants.
 *
 * @param {string} toolId - The ID of the tool to render data for.
 * @param {object} item - The item containing tool data and outputs.
 * @return {object} An object containing the rendered tool data.
 */
const renderToolData = (props) => {
  const { toolId, item } = props;
  switch (toolId) {
    case TOOLS_ID.GEMINI_QUIZIFY: {
      const topicInput = item.tool_data[0].inputs.find(
        (input) => input.name === 'topic'
      );
      const title = topicInput ? topicInput.value : 'N/A';
      const multipleChoiceList = item.outputs?.data?.data;
      const backgroundImgURL =
        'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Quizify.png?alt=media&token=d1255f27-b1a1-444e-b96a-4a3ac559237d';
      const logo =
        'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/QuizifyLogo.png?alt=media&token=9bf1d066-fba4-4063-9640-ef732e237d31';

      return {
        title,
        backgroundImgURL,
        logo,
        multipleChoiceList,
      };
    }
    case TOOLS_ID.GEMINI_DYNAMO: {
      const youtubeUrlInput = item.tool_data[0].inputs.find(
        (input) => input.name === 'youtube_url'
      );
      const dynamoTitle = youtubeUrlInput ? youtubeUrlInput.value : 'N/A';
      const flashCards = item.outputs?.data?.data;
      const dynamoBackgroundImgURL =
        'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/Dynamo.png?alt=media&token=db14183f-a294-49b2-a9de-0818b007c080';
      const dynamoLogo =
        'https://firebasestorage.googleapis.com/v0/b/kai-ai-f63c8.appspot.com/o/YoutubeLogo.png?alt=media&token=2809083f-f816-41b6-8f86-80582b3da188';

      return {
        title: dynamoTitle,
        backgroundImgURL: dynamoBackgroundImgURL,
        logo: dynamoLogo,
        flashCards,
      };
    }
    default:
      return {
        title: 'Default Title',
        backgroundImgURL: null,
        logo: null,
        multipleChoiceList: null,
        flashCards: null,
      };
  }
};

/**
 * Retrieves and processes tool card data based on the provided item using predefined ToolCard Handlers.
 *
 * @param {Object} item - The item containing tool data.
 * @returns {Object} Processed tool card data.
 */
const getToolCardData = (item) => {
  const toolId = item.tool_data?.[0]?.tool_id;
  const handler = ToolCardHandlers[toolId] || ToolCardHandlers.default;
  return handler(item);
};

export { renderToolData, getToolCardData };
