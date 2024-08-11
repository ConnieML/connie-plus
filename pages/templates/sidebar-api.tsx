import React from 'react';
import { Heading } from '@twilio-paste/core/heading';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { Column, Grid } from '@twilio-paste/core/grid';
import { Card } from '@twilio-paste/core/card';
import { MediaObject, MediaBody, MediaFigure } from '@twilio-paste/core/media-object';
import { Anchor } from '@twilio-paste/core/anchor';
import { Button } from '@twilio-paste/core/button';
import { ProductMessagingIcon } from '@twilio-paste/icons/cjs/ProductMessagingIcon';
import { ProductVoiceIcon } from '@twilio-paste/icons/cjs/ProductVoiceIcon';
import { ProductChatIcon } from '@twilio-paste/icons/cjs/ProductChatIcon';
import { ProductFaxIcon } from '@twilio-paste/icons/cjs/ProductFaxIcon';
import { PinIcon } from '@twilio-paste/icons/cjs/PinIcon';
import { UnpinIcon } from '@twilio-paste/icons/cjs/UnpinIcon';
import type { NextPage } from "next";
import Head from "next/head";
import { Box } from '@twilio-paste/core';
import {
    Sidebar,
    SidebarHeader,
    SidebarHeaderLabel,
    SidebarHeaderIconButton,
    SidebarCollapseButton,
    SidebarBody,
    SidebarFooter,
    SidebarPushContentWrapper,
    SidebarOverlayContentWrapper,
  } from '@twilio-paste/core/sidebar';
// import { PrototypeAnchor } from '../components/site/PrototypeAnchor';

const SideModalExample: React.FC = () => {
    const [pushSidebarCollapsed, setPushSidebarCollapsed] = React.useState(false);
    const sidebarNavigationSkipLinkID = useUID();
    const topbarSkipLinkID = useUID();
    const mainContentSkipLinkID = useUID();
  
    return (
      <Box>
        {/* Can be placed anywhere - position fixed */}
        <Sidebar
          sidebarNavigationSkipLinkID={sidebarNavigationSkipLinkID}
          topbarSkipLinkID={topbarSkipLinkID}
          mainContentSkipLinkID={mainContentSkipLinkID}
          collapsed={pushSidebarCollapsed}
          variant="default"
        >
          <SidebarHeader>
            <SidebarHeaderIconButton as="a" href="/">
              <ProductFlexIcon size="sizeIcon20" decorative={false} title="Go to Flex product homepage" />
            </SidebarHeaderIconButton>
            <SidebarHeaderLabel>Twilio Flex</SidebarHeaderLabel>
          </SidebarHeader>
          <SidebarBody>
            <SidebarBetaBadge as="span">Beta</SidebarBetaBadge>
          </SidebarBody>
          <SidebarFooter>
            <SidebarCollapseButton
              onClick={() => setPushSidebarCollapsed(!pushSidebarCollapsed)}
              i18nCollapseLabel="Close sidebar"
              i18nExpandLabel="Open sidebar"
            />
          </SidebarFooter>
        </Sidebar>
  
        {/* Must wrap content area */}
        <SidebarPushContentWrapper collapsed={pushSidebarCollapsed} variant="default">
          <main id={mainContentSkipLinkID}>
            <Button variant="primary" onClick={() => setPushSidebarCollapsed(!pushSidebarCollapsed)}>
              Toggle Push Sidebar
            </Button>
          </main>
        </SidebarPushContentWrapper>
      </Box>
    );
  };
  export default SideModalExample


/* const Demos: NextPage = () => {
  return (
  <>
    
  </>
  );
};
export default Demos */