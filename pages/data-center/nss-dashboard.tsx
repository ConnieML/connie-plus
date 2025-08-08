import React, { useState } from 'react';
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

// TypeScript interface for NSS analytics data
interface NSSAnalyticsData {
  total_calls: number;
  avg_handle_time: string;
  first_contact_resolution: string;
  agent_utilization: string;
  abandon_rate: string;
  date_range: {
    from: string;
    to: string;
  };
  calculated_at: string;
  data_source: string;
}

const NSSAnalyticsDashboard: NextPage = () => {
  const [analyticsData, setAnalyticsData] = useState<NSSAnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAnalytics, setShowAnalytics] = useState(false);

  const fetchNSSAnalytics = async () => {
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
  };

  return (
    <>
      <Head>
        <title>NSS Analytics Dashboard - Connie Plus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Box as="main" padding="space70">
        <Box marginBottom="space50">
          <Heading as="h1" variant="heading10">
            NSS Analytics Dashboard
          </Heading>
          <Paragraph>
            Real-time contact center insights for Nevada Support Services (NSS).
            View key performance metrics, call volumes, and service quality data from your Twilio Flex workspace.
          </Paragraph>
        </Box>

        <Card>
          <Box padding="space60">
            <Box marginBottom="space50">
              <Heading as="h2" variant="heading30">
                📊 Contact Center Performance
              </Heading>
              <Text as="p" color="colorTextWeak">
                Key metrics from your NSS contact center operations
              </Text>
            </Box>
            
            <Box marginBottom="space40">
              <Button 
                variant="primary" 
                onClick={fetchNSSAnalytics} 
                loading={loading} 
                disabled={loading}
                size="default"
              >
                {loading ? 'Loading NSS Analytics...' : 'Load NSS Analytics Dashboard'}
              </Button>
            </Box>
            
            {error && (
              <Box marginBottom="space50">
                <Alert variant="error">
                  <strong>Analytics Error:</strong> {error}
                </Alert>
              </Box>
            )}
            
            {showAnalytics && analyticsData && (
              <Box>
                <Box marginBottom="space40">
                  <Heading as="h3" variant="heading40">
                    NSS Performance Metrics
                  </Heading>
                  <Text as="p" color="colorTextWeak">
                    Data from {analyticsData.date_range?.from} • Source: {analyticsData.data_source}
                  </Text>
                </Box>
                
                {/* NSS Analytics Cards Grid */}
                <Grid gutter="space50" marginBottom="space50">
                  <Column span={3}>
                    <Card padding="space60">
                      <Box textAlign="center">
                        <Box marginBottom="space30">
                          <Text as="div" fontSize="fontSize90" fontWeight="fontWeightBold" color="colorText">
                            {analyticsData.total_calls}
                          </Text>
                        </Box>
                        <Box marginBottom="space20">
                          <Heading as="h4" variant="heading50">
                            Total Calls
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
                          <Text as="div" fontSize="fontSize90" fontWeight="fontWeightBold" color="colorText">
                            {analyticsData.avg_handle_time}
                          </Text>
                        </Box>
                        <Box marginBottom="space20">
                          <Heading as="h4" variant="heading50">
                            Avg Handle Time
                          </Heading>
                        </Box>
                        <Text as="p" color="colorTextWeak">
                          Minutes:Seconds
                        </Text>
                      </Box>
                    </Card>
                  </Column>
                  
                  <Column span={3}>
                    <Card padding="space60">
                      <Box textAlign="center">
                        <Box marginBottom="space30">
                          <Text as="div" fontSize="fontSize90" fontWeight="fontWeightBold" color="colorText">
                            {analyticsData.first_contact_resolution}
                          </Text>
                        </Box>
                        <Box marginBottom="space20">
                          <Heading as="h4" variant="heading50">
                            Service Quality
                          </Heading>
                        </Box>
                        <Text as="p" color="colorTextWeak">
                          First Contact Resolution
                        </Text>
                      </Box>
                    </Card>
                  </Column>
                  
                  <Column span={3}>
                    <Card padding="space60">
                      <Box textAlign="center">
                        <Box marginBottom="space30">
                          <Text as="div" fontSize="fontSize90" fontWeight="fontWeightBold" color="colorText">
                            {analyticsData.agent_utilization}
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
                
                <Box padding="space40" backgroundColor="colorBackgroundBody" borderRadius="borderRadius20">
                  <Text as="p" textAlign="center" color="colorTextWeak">
                    <strong>Last Updated:</strong> {new Date(analyticsData.calculated_at).toLocaleString()} EST
                  </Text>
                  <Text as="p" textAlign="center" color="colorTextWeak" fontSize="fontSize20">
                    Dashboard refreshes automatically every 5 minutes when accessed from ConnieRTC
                  </Text>
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