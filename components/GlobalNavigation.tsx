import React from 'react';
import { Box } from '@twilio-paste/core/box';
import { Button } from '@twilio-paste/core/button';
import { Stack } from '@twilio-paste/core/stack';
import { Text } from '@twilio-paste/core/text';
import { ProductSupportIcon } from '@twilio-paste/icons/cjs/ProductSupportIcon';
import { WarningIcon } from '@twilio-paste/icons/cjs/WarningIcon';
import { useRouter } from 'next/router';

export const GlobalNavigation: React.FC = () => {
  const router = useRouter();
  
  // Placeholder for future real-time support status
  const isSupportOnline = true;

  // Hide navigation buttons on support pages to avoid confusion
  const isOnSupportPage = router.pathname.startsWith('/support');
  if (isOnSupportPage) {
    return null;
  }

  const handleGetSupport = () => {
    router.push('/support/');
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
      columnGap="space40"
    >
      <Button 
        variant="secondary" 
        size="default"
        onClick={handleGetSupport}
      >
        <Stack orientation="horizontal" spacing="space20">
          <ProductSupportIcon decorative size="sizeIcon20" />
          <Text as="span" fontSize="fontSize30" fontWeight="fontWeightMedium">
            Get Support
          </Text>
          {isSupportOnline && (
            <Box 
              width="8px" 
              height="8px" 
              borderRadius="borderRadiusCircle"
              backgroundColor="colorBackgroundSuccess"
              title="Support team is online"
            />
          )}
        </Stack>
      </Button>
      <Button 
        variant="secondary" 
        size="default"
        onClick={handleReportBug}
      >
        <Stack orientation="horizontal" spacing="space20">
          <WarningIcon decorative size="sizeIcon20" color="colorTextWarningStrong" />
          <Text as="span" fontSize="fontSize30" fontWeight="fontWeightMedium">
            Report Bug
          </Text>
        </Stack>
      </Button>
    </Box>
  );
};