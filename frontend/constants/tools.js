import { renderToolData } from '@/utils/ToolUtils';

const TOOLS_ID = {
  GEMINI_DYNAMO: '1',
  GEMINI_QUIZIFY: '0',
};

const ToolCardHandlers = {
  [TOOLS_ID.GEMINI_QUIZIFY]: (item) =>
    renderToolData(TOOLS_ID.GEMINI_QUIZIFY, item),
  [TOOLS_ID.GEMINI_DYNAMO]: (item) =>
    renderToolData(TOOLS_ID.GEMINI_DYNAMO, item),
  default: () => renderToolData(null, {}),
};

export { TOOLS_ID, ToolCardHandlers };
