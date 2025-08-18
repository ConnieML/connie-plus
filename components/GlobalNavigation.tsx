import React from 'react';
import { Box } from '@twilio-paste/core/box';
import { Button } from '@twilio-paste/core/button';
import { useRouter } from 'next/router';

export const GlobalNavigation: React.FC = () => {
  const router = useRouter();

  const handleGetSupport = () => {
    router.push('/support/get-help');
  };

  const handleReportBug = () => {
    router.push('/support/report-bug');
  };

  return (
    <Box
      position="fixed"
      top="space40"
      right="space40"
      zIndex="zIndex90"
      display="flex"
      columnGap="space30"
    >
      <Button 
        variant="primary" 
        size="small"
        onClick={handleGetSupport}
      >
        Get Support
      </Button>
      <Button 
        variant="destructive" 
        size="small"
        onClick={handleReportBug}
      >
        Report a Bug
      </Button>
    </Box>
  );
};