import React from 'react';
import { env } from '../utils/env';

// Development-only component to check environment variables
const EnvironmentChecker: React.FC = () => {
  if (env.isProd) return null; // Don't show in production

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      right: '10px',
      background: '#f0f0f0',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      fontFamily: 'monospace',
      maxWidth: '300px',
      zIndex: 9999,
      border: '1px solid #ccc'
    }}>
      <h4 style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>Environment Check</h4>
      <div>
        <strong>Sanity:</strong> {env.sanity.projectId} / {env.sanity.dataset}
      </div>
      <div>
        <strong>Contact:</strong> {env.contact.phone}
      </div>
      <div>
        <strong>Business:</strong> {env.business.currency} {env.business.depositAmount}
      </div>
      <div>
        <strong>App URL:</strong> {env.app.url}
      </div>
    </div>
  );
};

export default EnvironmentChecker;
