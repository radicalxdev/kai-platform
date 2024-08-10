import { useState } from 'react';

import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';

import ORDER from '@/constants/sortingOrder';

import ToolsSessionHistoryCard from '../ToolsSessionHistoryCard';

import styles from './styles';

import {
  getCategorizedData,
  handleSort,
  initializeToolSessionData,
} from '@/utils/ToolsSessionHistoryUtils';

/**
 * Component for rendering a listing of history cards in a grid layout.
 *
 * @param {Object} props - Object containing the following properties:
 *  @param {Array} props.data - Array of data objects for each history card
 *
 * @return {JSX.Element} Rendered history listing component
 */
const ToolsSessionHistoryListing = (props) => {
  const { data, setAlertState } = props;

  const { thisWeek, thisMonth, thisYear, beyondThisYear } =
    getCategorizedData(data);
  const [order, setOrder] = useState(ORDER.DESC);

  const thisWeekSortedData = handleSort(order, thisWeek);
  const thisMonthSortedData = handleSort(order, thisMonth);
  const thisYearSortedData = handleSort(order, thisYear);
  const beyondThisYearSortedData = handleSort(order, beyondThisYear);

  const renderSection = (title, sectionData) =>
    sectionData.length > 0 && (
      <Grid {...styles.mainSectionProps}>
        <Typography {...styles.sectionHeaderProps}>
          {title} ({sectionData.length})
        </Typography>
        <Grid container spacing={3}>
          {sectionData.map((toolSessionCardData, index) => {
            const toolSessionCardInstance =
              initializeToolSessionData(toolSessionCardData);
            return (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <ToolsSessionHistoryCard
                  cardInstance={toolSessionCardInstance}
                  setAlertState={setAlertState}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    );

  const renderDropDownMenu = () => (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <FormControl {...styles.formProps}>
        <InputLabel {...styles.labelProps}>Sort by</InputLabel>
        <Select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          {...styles.selectOptionsProps}
        >
          <MenuItem value={ORDER.DESC}>Descending</MenuItem>
          <MenuItem value={ORDER.ASC}>Ascending</MenuItem>
        </Select>
      </FormControl>
    </div>
  );

  const renderSectionsInOrder = () => {
    if (order === ORDER.ASC) {
      return (
        <>
          {renderSection('Beyond This Year', beyondThisYearSortedData)}
          {renderSection('This Year', thisYearSortedData)}
          {renderSection('This Month', thisMonthSortedData)}
          {renderSection('This Week', thisWeekSortedData)}
        </>
      );
    }
    return (
      <>
        {renderSection('This Week', thisWeekSortedData)}
        {renderSection('This Month', thisMonthSortedData)}
        {renderSection('This Year', thisYearSortedData)}
        {renderSection('Beyond This Year', beyondThisYearSortedData)}
      </>
    );
  };

  return (
    <Grid {...styles.mainGridProps}>
      {renderDropDownMenu()}
      {renderSectionsInOrder()}
    </Grid>
  );
};

export default ToolsSessionHistoryListing;
