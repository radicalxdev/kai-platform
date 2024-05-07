import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { firestore } from '@/redux/store';

import useQuestMap from '@/hooks/useQuestMap';

import MainAppLayout from '@/layouts/MainAppLayout';
import PaymentPageSkeleton from '@/components/PaymentPageSkeleton';
import ChallengeInfoPage from '@/templates/ChallengeInfoPage';

import fetchDetails from '@/services/challenges/fetchDetails';

import ROUTES from '@/constants/routes';
import CHALLENGES from '@/constants/challenges';

/**
 * Renders the Mission Individaul Page component, which displays information about a mission and allows the user to purchase it.
 *
 * @return {JSX.Element} The Payment Page component.
 */
const MissionIndividualPage = () => {
  const router = useRouter();

  const [missionDetails, setMissionDetails] = useState({
    data: null,
    loading: true,
  });

  const {
    enrolledQuest,
    isLoading,
    challengeId,
    isPreEnroll,
    challengeDoc,
    ...challengeMapProps
  } = useQuestMap(CHALLENGES.MISSION);

  useEffect(() => {
    if (challengeId) {
      const fetchMissionDetails = async () => {
        const details = await fetchDetails(firestore, challengeId);

        setMissionDetails({
          data: details,
          loading: false,
        });
      };

      fetchMissionDetails();
    }
  }, [isLoading]);

  if (isLoading || missionDetails.loading || !challengeDoc) {
    if (!challengeDoc && !isLoading) router.push(ROUTES.HOME);
    return <PaymentPageSkeleton />;
  }

  return (
    <ChallengeInfoPage
      challengeDoc={challengeDoc}
      enrolledChallenge={enrolledQuest}
      challengeDetails={missionDetails}
      isPreEnroll={isPreEnroll}
      isMission
      {...challengeMapProps}
    />
  );
};

MissionIndividualPage.getLayout = function getLayout(page) {
  return <MainAppLayout backButtonUrl={ROUTES.HOME}>{page}</MainAppLayout>;
};

export default MissionIndividualPage;