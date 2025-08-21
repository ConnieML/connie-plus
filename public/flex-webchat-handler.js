/**
 * Flex WebChat Handler
 * This script should be loaded in the parent Flex window to handle WebChat initialization
 * via postMessage from the Enhanced CRM Container iframe.
 */

(function() {
  console.log('Flex WebChat Handler loaded');
  
  let webChatInitialized = false;
  
  // Load Twilio WebChat script
  function loadWebChatScript() {
    if (document.querySelector('script[src*="webchat.min.js"]')) {
      console.log('WebChat script already loaded');
      return Promise.resolve();
    }
    
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://media.twiliocdn.com/sdk/js/webchat-v3/releases/3.3.0/webchat.min.js';
      script.integrity = 'sha256-ydLLXnNrb26iFUvKAHsYt9atwfzz0LNcgBmo0NmD5Uk=';
      script.crossOrigin = 'anonymous';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
      console.log('Loading WebChat script...');
    });
  }
  
  // Initialize WebChat with customer data
  function initializeWebChat(deploymentKey, customerData) {
    if (webChatInitialized) {
      console.log('WebChat already initialized');
      return;
    }
    
    if (typeof window.Twilio === 'undefined') {
      console.error('Twilio WebChat not loaded');
      return;
    }
    
    const appConfig = {
      deploymentKey: deploymentKey,
      preEngagementConfig: {
        description: 'Please provide your details to start chatting',
        fields: [
          { 
            label: 'Name', 
            type: 'text', 
            required: true,
            value: customerData.name // Pre-fill with data from iframe
          },
          { 
            label: 'Email', 
            type: 'email', 
            required: true,
            value: customerData.email // Pre-fill with data from iframe
          },
          { 
            label: 'Team', 
            type: 'hidden', 
            value: 'support' 
          }
        ]
      }
    };
    
    try {
      window.Twilio.initWebchat(appConfig);
      webChatInitialized = true;
      console.log('WebChat initialized with customer data:', customerData);
      
      // Auto-expand WebChat after initialization
      setTimeout(() => {
        if (window.Twilio && window.Twilio.webchat && window.Twilio.webchat.expand) {
          window.Twilio.webchat.expand();
          console.log('WebChat expanded');
        }
      }, 1000);
      
    } catch (error) {
      console.error('Failed to initialize WebChat:', error);
    }
  }
  
  // Listen for messages from iframe
  window.addEventListener('message', async function(event) {
    // Security: In production, check event.origin
    // For now, accepting all origins for testing
    
    if (event.data && event.data.type === 'START_WEBCHAT') {
      console.log('Received WebChat request from iframe:', event.data);
      
      const { customerData, deploymentKey } = event.data;
      
      if (!customerData || !customerData.name || !customerData.email) {
        console.error('Invalid customer data received');
        return;
      }
      
      try {
        // Load WebChat script if not already loaded
        await loadWebChatScript();
        
        // Initialize WebChat with customer data
        initializeWebChat(deploymentKey, customerData);
        
      } catch (error) {
        console.error('Error handling WebChat request:', error);
      }
    }
  });
  
  console.log('WebChat message listener registered');
})();