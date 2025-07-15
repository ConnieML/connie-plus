// pages/channels.tsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/auth';
import { Box } from '@twilio-paste/core/box';
import { Heading } from '@twilio-paste/core/heading';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { Card } from '@twilio-paste/core/card';
import { Button } from '@twilio-paste/core/button';
import { Anchor } from '@twilio-paste/core/anchor';
import { Alert } from '@twilio-paste/core/alert';
import { Spinner } from '@twilio-paste/core/spinner';
import { Text } from '@twilio-paste/core/text';
import { Table, THead, TBody, Tr, Th, Td } from '@twilio-paste/core/table';
import { Separator } from '@twilio-paste/core/separator';
import { MediaObject, MediaFigure, MediaBody } from '@twilio-paste/core/media-object';
import { ProductVoiceIcon } from '@twilio-paste/icons/cjs/ProductVoiceIcon';
import { ProductMessagingIcon } from '@twilio-paste/icons/cjs/ProductMessagingIcon';
import { EmailIcon } from '@twilio-paste/icons/cjs/EmailIcon';
import { ProductInternetOfThingsIcon } from '@twilio-paste/icons/cjs/ProductInternetOfThingsIcon';
import { SocialIcon } from '@twilio-paste/icons/cjs/SocialIcon';
import { RefreshIcon } from '@twilio-paste/icons/cjs/RefreshIcon';
import type { NextPage } from 'next';
import Head from 'next/head';
import type { Channel } from './api/channels';

interface ChannelGroup {
  type: string;
  title: string;
  icon: React.ComponentType<any>;
  channels: Channel[];
}

const ChannelManager: NextPage = () => {
  const { isAuthenticated, user, loading } = useAuth();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [channelsLoading, setChannelsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user has required role
  const hasAccess = () => {
    if (!user || !user.groups) return false;
    const userGroups = user.groups.map(group => group.toLowerCase());
    return userGroups.some(group => group.includes('admin') || group.includes('supervisor'));
  };

  // Fetch channel data
  const fetchChannels = async () => {
    try {
      setChannelsLoading(true);
      setError(null);
      
      const response = await fetch('/api/channels');
      const data = await response.json();
      
      if (data.success) {
        setChannels(data.channels);
      } else {
        setError(data.error || 'Failed to fetch channels');
      }
    } catch (err) {
      setError('Network error while fetching channels');
      console.error('Channel fetch error:', err);
    } finally {
      setChannelsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && hasAccess()) {
      fetchChannels();
    }
  }, [isAuthenticated, user]);

  // Group channels by type
  const groupChannels = (): ChannelGroup[] => {
    const groups: ChannelGroup[] = [
      {
        type: 'voice',
        title: 'Voice Channels',
        icon: ProductVoiceIcon,
        channels: channels.filter(ch => ch.type === 'voice')
      },
      {
        type: 'messaging', 
        title: 'Messaging Channels',
        icon: ProductMessagingIcon,
        channels: channels.filter(ch => ch.type === 'messaging')
      },
      {
        type: 'email',
        title: 'Email Channels', 
        icon: EmailIcon,
        channels: channels.filter(ch => ch.type === 'email')
      },
      {
        type: 'web',
        title: 'Web Channels',
        icon: ProductInternetOfThingsIcon,
        channels: channels.filter(ch => ch.type === 'web')
      },
      {
        type: 'social',
        title: 'Social Channels',
        icon: SocialIcon,
        channels: channels.filter(ch => ch.type === 'social')
      }
    ];
    
    // Only return groups that have channels
    return groups.filter(group => group.channels.length > 0);
  };


  // Loading state
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" padding="space70">
        <Box textAlign="center">
          <Spinner decorative={false} title="Loading..." size="sizeIcon40" />
          <Paragraph>Loading channel manager...</Paragraph>
        </Box>
      </Box>
    );
  }

  // Access denied
  if (!hasAccess()) {
    return (
      <Box padding="space70">
        <Head>
          <title>Access Denied - Channel Manager</title>
        </Head>
        
        <Box textAlign="center" maxWidth="600px" marginX="auto">
          <Alert variant="warning">
            <Heading as="h2" variant="heading30">Access Restricted</Heading>
            <Paragraph>
              You do not have permission to access the Channel Manager. This page is only available to 
              Administrators and Supervisors.
            </Paragraph>
            <Box marginTop="space50">
              <Anchor href="/">← Return to Home</Anchor>
            </Box>
          </Alert>
        </Box>
      </Box>
    );
  }

  return (
    <Box padding="space70">
      <Head>
        <title>Channel Manager - Connie Plus</title>
      </Head>

      {/* Header */}
      <Box marginBottom="space70">
        <MediaObject verticalAlign="center">
          <MediaBody>
            <Heading as="h1" variant="heading10">
              Channel Manager
            </Heading>
            <Paragraph>
              Manage and monitor all active Flex communication channels
            </Paragraph>
          </MediaBody>
          <MediaFigure align="end">
            <Button 
              variant="secondary" 
              size="small"
              onClick={fetchChannels}
              loading={channelsLoading}
            >
              <RefreshIcon decorative />
              Refresh
            </Button>
          </MediaFigure>
        </MediaObject>
      </Box>

      {/* Error Alert */}
      {error && (
        <Box marginBottom="space60">
          <Alert variant="error">
            <Heading as="h3" variant="heading40">Error Loading Channels</Heading>
            <Paragraph>{error}</Paragraph>
            <Button variant="link" onClick={fetchChannels}>
              Try Again
            </Button>
          </Alert>
        </Box>
      )}

      {/* Loading State */}
      {channelsLoading && !error && (
        <Box textAlign="center" padding="space100">
          <Spinner decorative={false} title="Loading channels..." size="sizeIcon40" />
          <Paragraph>Loading channel data...</Paragraph>
        </Box>
      )}

      {/* Channel Groups */}
      {!channelsLoading && !error && (
        <Box>
          {groupChannels().map((group, index) => (
            <Box key={group.type} marginBottom="space80">
              {/* Group Header */}
              <Box marginBottom="space50">
                <MediaObject verticalAlign="center">
                  <MediaFigure spacing="space40">
                    <group.icon decorative size="sizeIcon40" />
                  </MediaFigure>
                  <MediaBody>
                    <Heading as="h2" variant="heading20">
                      {group.title}
                    </Heading>
                    <Paragraph>
                      <small>{group.channels.length} active channel{group.channels.length !== 1 ? 's' : ''}</small>
                    </Paragraph>
                  </MediaBody>
                </MediaObject>
              </Box>

              {/* Channel Table */}
              <Card>
                <Table>
                  <THead>
                    <Tr>
                      <Th>Name</Th>
                      <Th>Address/Number</Th>
                      <Th>Capabilities</Th>
                      <Th>Status</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </THead>
                  <TBody>
                    {group.channels.map((channel) => (
                      <Tr key={channel.sid}>
                        <Td>
                          <Box>
                            <Text as="p" fontWeight="fontWeightSemibold">
                              {channel.friendlyName}
                            </Text>
                            <Text as="p" fontSize="fontSize20" color="colorTextWeak">
                              {channel.sid}
                            </Text>
                          </Box>
                        </Td>
                        <Td>
                          <Text as="p" fontFamily="fontFamilyCode">
                            {channel.phoneNumber || channel.address || 'N/A'}
                          </Text>
                        </Td>
                        <Td>
                          <Text as="p">
                            {channel.capabilities.map(cap => cap === 'voice' ? 'Voice' : cap === 'messaging' ? 'SMS' : cap === 'email' ? 'Email' : cap).join(', ')}
                          </Text>
                        </Td>
                        <Td>
                          <Text as="p" color={channel.status === 'active' ? 'colorTextSuccess' : 'colorTextError'}>
                            {channel.status}
                          </Text>
                        </Td>
                        <Td>
                          <Button variant="link" size="small">
                            Details
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                  </TBody>
                </Table>
              </Card>

              {/* Separator between groups */}
              {index < groupChannels().length - 1 && (
                <Separator orientation="horizontal" verticalSpacing="space70" />
              )}
            </Box>
          ))}

          {/* No channels message */}
          {groupChannels().length === 0 && (
            <Box textAlign="center" padding="space100">
              <Paragraph>No active channels found.</Paragraph>
              <Button variant="link" onClick={fetchChannels}>
                Refresh
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ChannelManager;