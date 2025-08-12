import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Heading } from '@twilio-paste/core/heading';
import { Paragraph } from '@twilio-paste/core/paragraph';
import { Text } from '@twilio-paste/core/text';
import { Column, Grid } from '@twilio-paste/core/grid';
import { Card } from '@twilio-paste/core/card';
import { Button } from '@twilio-paste/core/button';
import type { NextPage } from "next";
import Head from "next/head";
import { Box } from '@twilio-paste/core';
import { Alert } from "@twilio-paste/core/alert";
import { Stack } from '@twilio-paste/core/stack';
import { Spinner } from '@twilio-paste/core/spinner';
import { Breadcrumb, BreadcrumbItem } from '@twilio-paste/core/breadcrumb';
import { Anchor } from '@twilio-paste/core/anchor';

// TypeScript interface for NSS analytics data
interface ChannelMetrics {
  total_calls?: number;
  total_faxes?: number;
  total_referrals?: number;
  avg_speed_to_answer: string;
  total_handle_time: string;
  agent_utilization: string;
}

interface NSSAnalyticsData {
  // Channel-specific metrics
  voice?: ChannelMetrics;
  fax?: ChannelMetrics;
  web_referrals?: ChannelMetrics;
  
  // Legacy compatibility fields
  total_calls?: number;
  avg_speed_to_answer?: string;
  avg_handle_time?: string;
  total_handle_time?: string;
  first_contact_resolution?: string;
  agent_utilization?: string;
  abandon_rate?: string;
  
  date_range: {
    from: string;
    to: string;
  };
  calculated_at: string;
  data_source: string;
}

// Reusable metric row component
const MetricRow: React.FC<{
  title: string;
  emoji: string;
  data: ChannelMetrics | null;
  totalLabel: string;
  totalValue?: number;
}> = ({ title, emoji, data, totalLabel, totalValue }) => {
  if (!data) return null;

  const total = totalValue || data.total_calls || data.total_faxes || data.total_referrals || 0;

  return (
    <Box marginBottom="space60">
      <Box marginBottom="space40">
        <Heading as="h3" variant="heading40">
          {emoji} {title}
        </Heading>
        <Text as="p" color="colorTextWeak">
          Performance metrics for {title.toLowerCase()}
        </Text>
      </Box>
      
      <Grid gutter="space50">
        <Column span={3}>
          <Card padding="space60">
            <Box textAlign="center">
              <Box marginBottom="space30">
                <Text as="div" fontSize="fontSize70" fontWeight="fontWeightBold" color="colorText">
                  {total}
                </Text>
              </Box>
              <Box marginBottom="space20">
                <Heading as="h4" variant="heading50">
                  {totalLabel}
                </Heading>
              </Box>
              <Text as="p" color="colorTextWeak">
                Last 24 Hours
              </Text>
            </Box>
          </Card>
        </Column>
        
        <Column span={3}>
          <Card padding="space60">
            <Box textAlign="center">
              <Box marginBottom="space30">
                <Text as="div" fontSize="fontSize70" fontWeight="fontWeightBold" color="colorText">
                  {data.avg_speed_to_answer}
                </Text>
              </Box>
              <Box marginBottom="space20">
                <Heading as="h4" variant="heading50">
                  Avg Speed to Answer
                </Heading>
              </Box>
              <Text as="p" color="colorTextWeak">
                Queue Time (Min:Sec)
              </Text>
            </Box>
          </Card>
        </Column>
        
        <Column span={3}>
          <Card padding="space60">
            <Box textAlign="center">
              <Box marginBottom="space30">
                <Text as="div" fontSize="fontSize70" fontWeight="fontWeightBold" color="colorText">
                  {data.total_handle_time}
                </Text>
              </Box>
              <Box marginBottom="space20">
                <Heading as="h4" variant="heading50">
                  Total Handle Time
                </Heading>
              </Box>
              <Text as="p" color="colorTextWeak">
                Acceptance to Completion
              </Text>
            </Box>
          </Card>
        </Column>
        
        <Column span={3}>
          <Card padding="space60">
            <Box textAlign="center">
              <Box marginBottom="space30">
                <Text as="div" fontSize="fontSize70" fontWeight="fontWeightBold" color="colorText">
                  {data.agent_utilization}
                </Text>
              </Box>
              <Box marginBottom="space20">
                <Heading as="h4" variant="heading50">
                  Staff Efficiency
                </Heading>
              </Box>
              <Text as="p" color="colorTextWeak">
                Agent Utilization
              </Text>
            </Box>
          </Card>
        </Column>
      </Grid>
    </Box>
  );
};

const NSSAnalyticsDashboard: NextPage = () => {
  const [analyticsData, setAnalyticsData] = useState<NSSAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true); // Start with loading true for auto-load
  const [error, setError] = useState('');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchNSSAnalytics = useCallback(async () => {
    console.log('🚀 fetchNSSAnalytics called for NSS account');
    setLoading(true);
    setError('');
    try {
      console.log('📡 About to fetch /api/analytics for NSS');
      const response = await fetch('/api/analytics');
      console.log('📨 NSS Analytics response:', response.status, response.statusText);
      const data = await response.json();
      console.log('📄 NSS Analytics data:', data);
      
      if (data.success) {
        setAnalyticsData(data.data);
        setShowAnalytics(true);
        setLastUpdated(new Date());
        setError(''); // Clear any previous errors
        console.log('✅ NSS Analytics loaded successfully');
      } else {
        setError(data.error || 'Failed to fetch NSS analytics data');
        console.error('❌ NSS Analytics API error:', data.error);
      }
    } catch (err) {
      const error = err as Error;
      setError(`Error connecting to NSS analytics service: ${error.message}`);
      console.error('❌ NSS Analytics fetch error:', error);
    }
    setLoading(false);
  }, []);

  // Smart auto-refresh with Page Visibility API
  const startAutoRefresh = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    console.log('🔄 Starting auto-refresh (5 minute intervals)');
    intervalRef.current = setInterval(() => {
      // Only refresh if page is visible and analytics are shown
      if (!document.hidden && showAnalytics) {
        console.log('⏰ Auto-refreshing NSS analytics...');
        fetchNSSAnalytics();
      } else if (document.hidden) {
        console.log('⏸️ Skipping refresh - page is hidden');
      }
    }, 5 * 60 * 1000); // 5 minutes
  }, [showAnalytics, fetchNSSAnalytics]);

  const stopAutoRefresh = () => {
    if (intervalRef.current) {
      console.log('⏹️ Stopping auto-refresh');
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Auto-load analytics when page mounts
  useEffect(() => {
    fetchNSSAnalytics();
  }, []);

  // Set up auto-refresh and visibility handling
  useEffect(() => {
    if (showAnalytics) {
      startAutoRefresh();
    }

    // Handle page visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.log('📱 Page hidden - pausing auto-refresh');
      } else {
        console.log('👀 Page visible - resuming auto-refresh');
        // Refresh immediately when page becomes visible (but not too frequently)
        if (showAnalytics && lastUpdated) {
          const timeSinceUpdate = Date.now() - lastUpdated.getTime();
          if (timeSinceUpdate > 60000) { // Only refresh if > 1 minute since last update
            fetchNSSAnalytics();
          }
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup on unmount
    return () => {
      stopAutoRefresh();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [showAnalytics, lastUpdated, startAutoRefresh]);

  return (
    <>
      <Head>
        <title>NSS Analytics Dashboard - Connie Plus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Box as="main" padding="space70">
        {/* Logo Header */}
        <Box marginBottom="space60">
          <Anchor href="/">
            <img 
              src="/assets/connie-plus-logo.svg" 
              alt="Connie Platform Logo" 
              style={{ height: '40px', width: 'auto' }}
            />
          </Anchor>
        </Box>
        
        {/* Breadcrumb Navigation */}
        <Box marginBottom="space60">
          <Breadcrumb aria-label="breadcrumb">
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem href="/data-center">Data Center</BreadcrumbItem>
            <BreadcrumbItem>NSS Analytics</BreadcrumbItem>
          </Breadcrumb>
        </Box>
        
        <Box marginBottom="space50">
          <Heading as="h1" variant="heading10">
            NSS Analytics Dashboard
          </Heading>
          <Paragraph>
            Real-time contact center insights for Nevada Support Services (NSS).
            Data refreshes automatically every 5 minutes, or you can refresh manually using the button below.
          </Paragraph>
        </Box>

        <Card>
          <Box padding="space60">
            <Box marginBottom="space50">
              <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="space30">
                <Heading as="h2" variant="heading30">
                  📊 Contact Center Performance
                </Heading>
                {!loading && (
                  <Button 
                    variant="primary" 
                    onClick={fetchNSSAnalytics} 
                    loading={loading} 
                    disabled={loading}
                    size="small"
                  >
                    Refresh Data
                  </Button>
                )}
              </Box>
              <Text as="p" color="colorTextWeak">
                Key metrics from your NSS contact center operations
                {showAnalytics && lastUpdated && ` • Updated: ${lastUpdated.toLocaleTimeString()}`}
              </Text>
            </Box>
            
            {loading && (
              <Box 
                display="flex" 
                flexDirection="column" 
                alignItems="center" 
                justifyContent="center" 
                padding="space80"
                marginBottom="space50"
              >
                <Spinner decorative size="sizeIcon70" />
                <Text as="p" marginTop="space40" color="colorTextWeak" textAlign="center">
                  Loading NSS analytics data...
                </Text>
              </Box>
            )}
            
            {error && (
              <Box marginBottom="space50">
                <Alert variant="error">
                  <strong>Analytics Error:</strong> {error}
                </Alert>
              </Box>
            )}
            
            {showAnalytics && analyticsData && (
              <Box>
                {/* Voice Calls Row */}
                <MetricRow
                  title="Voice Calls"
                  emoji="📞"
                  data={analyticsData.voice || {
                    total_calls: analyticsData.total_calls || 0,
                    avg_speed_to_answer: analyticsData.avg_speed_to_answer || '--',
                    total_handle_time: analyticsData.total_handle_time || '--',
                    agent_utilization: analyticsData.agent_utilization || '--'
                  }}
                  totalLabel="Total Calls"
                />
                
                {/* Fax Row */}
                <MetricRow
                  title="Faxes"
                  emoji="📠"
                  data={analyticsData.fax || null}
                  totalLabel="Total Faxes"
                />
                
                {/* Web Referrals Row */}
                <MetricRow
                  title="Web Referrals"
                  emoji="🌐"
                  data={analyticsData.web_referrals || null}
                  totalLabel="Total Referrals"
                />
                
                <Box padding="space40" backgroundColor="colorBackgroundBody" borderRadius="borderRadius20">
                  <Stack orientation="vertical" spacing="space20">
                    <Text as="p" textAlign="center" color="colorTextWeak">
                      <strong>Data Source:</strong> {analyticsData.data_source}
                    </Text>
                    <Text as="p" textAlign="center" color="colorTextWeak">
                      <strong>Data Period:</strong> {analyticsData.date_range?.from} • <strong>Calculated:</strong> {new Date(analyticsData.calculated_at).toLocaleString()}
                    </Text>
                    <Text as="p" textAlign="center" color="colorTextWeak" fontSize="fontSize20">
                      Auto-refreshing every 5 minutes when page is visible
                    </Text>
                  </Stack>
                </Box>
              </Box>
            )}
            
            {!showAnalytics && !loading && (
              <Box padding="space60" textAlign="center" backgroundColor="colorBackgroundRowStriped" borderRadius="borderRadius20">
                <Text as="p" color="colorTextWeak">
                  Click the button above to load NSS contact center analytics
                </Text>
              </Box>
            )}
          </Box>
        </Card>
      </Box>
    </>
  );
};

export default NSSAnalyticsDashboard;