import React from 'react';
import { Box } from '@twilio-paste/core/box';
import { Text } from '@twilio-paste/core/text';
import { Button } from '@twilio-paste/core/button';

interface QuickActionButton {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
  statusIndicator?: React.ReactNode;
}

interface QuickActionsProps {
  actions: QuickActionButton[];
}

export const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
  return (
    <Box
      backgroundColor="colorBackgroundBody"
      borderStyle="solid"
      borderWidth="borderWidth10"
      borderColor="colorBorder"
      borderRadius="borderRadius30"
      padding="space60"
      marginBottom="space80"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      flexWrap={['wrap', 'wrap', 'nowrap']}
      rowGap="space50"
    >
      {/* Quick Actions Title */}
      <Box flexShrink={0}>
        <Text
          as="span"
          fontWeight="fontWeightBold"
          color="colorText"
          fontSize="fontSize40"
          textTransform="uppercase"
          letterSpacing="wider"
        >
          Quick Actions
        </Text>
      </Box>
      
      {/* Quick Actions Buttons */}
      <Box 
        display="flex" 
        columnGap="space40"
        rowGap="space30"
        flexWrap="wrap"
        justifyContent={['stretch', 'stretch', 'flex-end']}
        width={['100%', '100%', 'auto']}
      >
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant === 'primary' ? 'primary' : 'secondary'}
            size="default"
            onClick={action.onClick}
            as={action.href ? 'a' : 'button'}
            href={action.href}
            target={action.href?.startsWith('http') ? '_blank' : undefined}
            rel={action.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            <Box display="flex" alignItems="center" columnGap="space20">
              {action.statusIndicator}
              {action.icon}
              <Text as="span">{action.label}</Text>
            </Box>
          </Button>
        ))}
      </Box>
    </Box>
  );
};