import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { 
  Box, 
  Heading, 
  Grid, 
  Column,
  Card,
  Paragraph,
  Button,
  Spinner,
  Alert
} from '@twilio-paste/core';
import { Stack } from '@twilio-paste/core/stack';
import { Badge } from '@twilio-paste/core/badge';

// Types for our analytics data
interface DailyMetrics {
  total_calls: number;
  avg_handle_time: string;
  abandon_rate: string;
  first_contact_resolution: string;
  agent_utilization: string;
  date_range: {
    from: string;
    to: string;
  };
  generated_at: string;
}

// Dashboard response interface - may be used for API typing later
// interface DashboardResponse {
//   success: boolean;
//   clientId: string;
//   data: DailyMetrics;
//   timestamp: string;
//   cached: boolean;
// }

// Simple metric card component
const MetricCard: React.FC<{
  title: string;
  value: string | number;
  subtitle?: string;
  variant?: 'primary' | 'success' | 'warning' | 'error';
}> = ({ title, value, subtitle, variant = 'primary' }) => {
  const getBadgeVariant = (): "success" | "warning" | "error" | "neutral" => {
    switch (variant) {
      case 'success': return 'success';
      case 'warning': return 'warning'; 
      case 'error': return 'error';
      default: return 'neutral';
    }
  };

  return (
    <Card>
      <Stack orientation="vertical" spacing="space30">
        <Heading as="h3" variant="heading40">{title}</Heading>
        <Box>
          <Heading as="div" variant="heading10">
            {value}
          </Heading>
        </Box>
        {subtitle && (
          <Badge as="span" variant={getBadgeVariant()}>
            {subtitle}
          </Badge>
        )}
      </Stack>
    </Card>
  );
};

const ConnieDashboard: NextPage = () => {
  const [metrics, setMetrics] = useState<DailyMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  // Fetch data from our analytics API
  const fetchMetrics = async () => {
    try {
      setLoading(true);
      setError(null);

      // TODO: Get real Okta token from auth context
      const response = await fetch('https://connie-data-intelligence-5761-dev.twil.io/functions/insights/dashboard-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-token' // TODO: Replace with real token
        },
        body: JSON.stringify({
          clientId: 'devsandbox',
          metricType: 'daily'
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const responseText = await response.text();
      console.log('Raw response:', responseText);
      let data = JSON.parse(responseText);
      
      // Check if we need to parse again (double-encoded JSON)
      if (typeof data === 'string') {
        console.log('Double-encoded JSON detected, parsing again...');
        data = JSON.parse(data);
      }
      
      // TODO: REMOVE DEBUG LOGGING - Added by CTO for CORS troubleshooting (Aug 5, 2025)
      console.log('API Response:', data);
      console.log('Data keys:', Object.keys(data));
      console.log('Data.data:', data['data']);
      console.log('Data.timestamp:', data['timestamp']);
      // END DEBUG LOGGING
      
      // Use bracket notation to access properties
      setMetrics(data['data']);
      setLastUpdated(data['timestamp']);
      console.log('✅ Dashboard data loaded successfully');
      console.log('Metrics state after set:', data['data']);

    } catch (err) {
      console.error('Dashboard fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load metrics');
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchMetrics();
  }, []);

  return (
    <>
      <Head>
        <title>Connie Analytics Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Box as="main" padding="space70">
        <Stack orientation="vertical" spacing="space50">
          
          {/* Header */}
          <Box>
            <Heading as="h1" variant="heading10">
              Analytics Dashboard
            </Heading>
            <Paragraph>
              Real-time insights from your Connie contact center powered by Twilio Flex.
            </Paragraph>
            {lastUpdated && (
              <Paragraph>
                <small>Last updated: {new Date(lastUpdated).toLocaleString()}</small>
              </Paragraph>
            )}
          </Box>

          {/* Refresh Button */}
          <Box>
            <Button 
              variant="primary" 
              onClick={fetchMetrics}
              loading={loading}
            >
              Refresh Data
            </Button>
          </Box>

          {/* Error State */}
          {error && (
            <Alert variant="error">
              <strong>Unable to load dashboard data:</strong> {error}
            </Alert>
          )}

          {/* Loading State */}
          {loading && !metrics && (
            <Box display="flex" justifyContent="center" padding="space100">
              <Spinner decorative={false} title="Loading dashboard data..." size="sizeIcon80" />
            </Box>
          )}

          {/* Metrics Grid */}
          {metrics && (
            <Grid gutter="space40">
              <Column span={3}>
                <MetricCard
                  title="Total Calls"
                  value={metrics.total_calls}
                  subtitle="Yesterday"
                  variant="primary"
                />
              </Column>
              
              <Column span={3}>
                <MetricCard
                  title="Avg Handle Time"
                  value={metrics.avg_handle_time}
                  subtitle="Minutes:Seconds"
                  variant="primary"
                />
              </Column>
              
              <Column span={3}>
                <MetricCard
                  title="Service Quality"
                  value={metrics.first_contact_resolution}
                  subtitle="First Contact Resolution"
                  variant="success"
                />
              </Column>
              
              <Column span={3}>
                <MetricCard
                  title="Agent Utilization"
                  value={metrics.agent_utilization}
                  subtitle="Staff Efficiency"
                  variant="primary"
                />
              </Column>
            </Grid>
          )}

          {/* Data Source Info */}
          <Alert variant="neutral">
            <strong>Data Source:</strong> This dashboard displays mock data from the Connie Analytics API. 
            Real Twilio Insights integration coming soon.
          </Alert>

        </Stack>
      </Box>
    </>
  );
};

export default ConnieDashboard;