import React from 'react';

import { useRouter } from 'next/router';

import useHistoryProps from '@/hooks/useHistoryProps';

import MainAppLayout from '@/layouts/MainAppLayout';
import History from '@/templates/HistoryPage';

const HistoryPage = () => {
  const router = useRouter();
  const { categorizedData, loading, error } = useHistoryProps();

  // Redirect or handle the error state as needed
  if (error) {
    // For example, redirect to a different page or show an error message
    router.push('/error'); // Adjust this to your actual error handling route or logic
    return null;
  }

  return <History data={categorizedData} loading={loading} />;
};

HistoryPage.getLayout = function getLayout(page) {
  return <MainAppLayout>{page}</MainAppLayout>;
};

export default HistoryPage;
