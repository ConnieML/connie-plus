import React from 'react';
import { Box } from '@twilio-paste/core/box';
import { Text } from '@twilio-paste/core/text';
import { Anchor } from '@twilio-paste/core/anchor';

interface EnterpriseCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  status?: 'ua-testing' | 'staging' | 'development';
  version?: string;
  type?: string;
  docsLink?: string;
}

export const EnterpriseCard: React.FC<EnterpriseCardProps> = ({
  icon,
  title,
  description,
  href,
  status = 'ua-testing',
  version = '1.0.0',
  type = 'Portal',
  docsLink
}) => {
  // Status badge colors - using Twilio Paste color tokens with proper types
  const statusColors = {
    'ua-testing': { bg: 'colorBackgroundSuccess' as const, text: 'colorTextInverse' as const },
    staging: { bg: 'colorBackgroundPrimary' as const, text: 'colorTextInverse' as const },
    development: { bg: 'colorBackgroundStrong' as const, text: 'colorTextInverse' as const }
  };
  
  // Display text for status badge
  const statusDisplay = {
    'ua-testing': 'UA TESTING',
    staging: 'STAGING',
    development: 'DEVELOPMENT'
  };

  return (
    <Box
      backgroundColor="colorBackgroundBody"
      borderStyle="solid"
      borderWidth="borderWidth10"
      borderColor="colorBorder"
      borderRadius="borderRadius30"
      padding="space70"
      display="flex"
      flexDirection="column"
      height="100%"
      position="relative"
      transition="all 0.2s ease"
      _hover={{
        boxShadow: 'shadowHigh',
        transform: 'translateY(-2px)',
        borderColor: 'colorBorderPrimary'
      }}
      style={{
        cursor: 'pointer',
        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.10)'
      }}
    >
      {/* Card Header */}
      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
        marginBottom="space50"
      >
        {/* Icon Container */}
        <Box
          width="40px"
          height="40px"
          backgroundColor="colorBackgroundPrimaryWeakest"
          borderRadius="borderRadius30"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
        >
          {icon}
        </Box>
        
        {/* Status Badge */}
        <Box
          display="inline-flex"
          alignItems="center"
          paddingX="space40"
          paddingY="space20"
          borderRadius="borderRadius20"
          backgroundColor={statusColors[status].bg}
        >
          <Text
            as="span"
            fontSize="fontSize10"
            fontWeight="fontWeightBold"
            color={statusColors[status].text}
            textTransform="uppercase"
            letterSpacing="wider"
          >
            {statusDisplay[status]}
          </Text>
        </Box>
      </Box>
      
      {/* Card Content */}
      <Box flexGrow={1} display="flex" flexDirection="column">
        {/* Title */}
        <Box marginBottom="space30">
          <Anchor href={href}>
            <Text as="h3" fontSize="fontSize50" fontWeight="fontWeightBold" color="colorText">
              {title}
            </Text>
          </Anchor>
        </Box>
        
        {/* Description */}
        <Text as="p" color="colorTextWeak" fontSize="fontSize30" marginBottom="space50">
          {description}
        </Text>
        
        {/* Docs Link */}
        {docsLink && (
          <Box marginBottom="space40">
            <Anchor href={docsLink} showExternal>
              docs
            </Anchor>
          </Box>
        )}
      </Box>
      
      {/* Card Metadata */}
      <Box
        display="flex"
        flexWrap="wrap"
        columnGap="space50"
        rowGap="space20"
        paddingTop="space50"
        marginTop="auto"
        borderTopStyle="solid"
        borderTopWidth="borderWidth10"
        borderTopColor="colorBorder"
      >
        <Box display="flex" alignItems="center" columnGap="space20">
          <Text 
            as="span" 
            fontWeight="fontWeightSemibold" 
            fontSize="fontSize20" 
            color="colorTextWeak" 
            textTransform="uppercase" 
            letterSpacing="wider"
          >
            Version
          </Text>
          <Text as="span" fontSize="fontSize20" color="colorText">
            {version}
          </Text>
        </Box>
        
        <Box display="flex" alignItems="center" columnGap="space20">
          <Text 
            as="span" 
            fontWeight="fontWeightSemibold" 
            fontSize="fontSize20" 
            color="colorTextWeak" 
            textTransform="uppercase" 
            letterSpacing="wider"
          >
            Type
          </Text>
          <Text as="span" fontSize="fontSize20" color="colorText">
            {type}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};