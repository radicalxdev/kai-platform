import { useEffect } from 'react';

import { Grid, useTheme } from '@mui/material';

import { useRouter } from 'next/router';

import { useDispatch, useSelector } from 'react-redux';

import AccordionInputGroupItem from '@/components/AccordionInputGroupItem';
import GradientOutlinedButton from '@/components/GradientOutlinedButton';

import ArrowBack from '@/assets/svg/purple-arrow-back.svg';

import ROUTES from '@/constants/routes';

import { TOOLS_ID } from '@/constants/tools';

import FlashCardList from './FlashCardList';
import MultipleChoiceResponse from './MultipleChoiceResponse';
import styles from './styles';
import ToolForm from './ToolForm';

import { resetCommunicator, setFormOpen } from '@/redux/slices/toolsSlice';

const ToolPage = (props) => {
  const { toolDoc } = props;
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();

  const { response, formOpen } = useSelector((state) => state.tools);

  const { id } = toolDoc;

  useEffect(() => {
    return () => {
      dispatch(resetCommunicator());
    };
  }, []);

  const handleRoute = () => router.push(ROUTES.HOME);

  const renderBackButton = () => {
    return (
      <Grid {...styles.backButtonGridProps}>
        <GradientOutlinedButton
          bgcolor={theme.palette.Background.white2}
          icon={<ArrowBack />}
          textColor={theme.palette.Greyscale[500]}
          iconPlacement="left"
          onHoverTextColor={theme.palette.Background.white2}
          clickHandler={handleRoute}
          text="Back"
          {...styles.outlinedButtonProps}
        />
      </Grid>
    );
  };

  const renderForm = () => {
    return (
      <Grid {...styles.formGridProps}>
        <AccordionInputGroupItem
          title={toolDoc?.name}
          description={toolDoc?.description}
          extraAccordionDetailsProps={{ px: 10 }}
          response={response}
          open={formOpen}
          toggleOpen={() => dispatch(setFormOpen(!formOpen))}
        >
          <ToolForm inputs={toolDoc?.inputs} id={toolDoc?.id} />
        </AccordionInputGroupItem>
      </Grid>
    );
  };

  const renderResponse = () => {
    switch (id) {
      case TOOLS_ID.GEMINI_DYNAMO:
        return <FlashCardList />;
      case TOOLS_ID.GEMINI_QUIZIFY:
        return <MultipleChoiceResponse />;
      default:
        return null;
    }
  };

  return (
    <Grid {...styles.mainGridProps}>
      {renderBackButton()}
      {renderForm()}
      {!formOpen && response && renderResponse()}
    </Grid>
  );
};
export default ToolPage;
