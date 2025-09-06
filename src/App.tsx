import React from 'react';

function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc', 
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          color: '#1f2937',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          TravelPlanner
        </h1>
        
        <div style={{
          backgroundColor: '#f9fafb',
          padding: '1.5rem',
          borderRadius: '8px',
          border: '1px solid #e5e7eb'
        }}>
          <h2 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '600', 
            color: '#374151',
            marginBottom: '0.5rem'
          }}>
            AI Travel Assistant
          </h2>
          <p style={{ 
            color: '#6b7280',
            fontSize: '1rem',
            lineHeight: '1.5'
          }}>
            Hello! I'm your travel planning assistant. Tell me where you want to go and I'll help you plan the perfect trip!
          </p>
          
          <div style={{ marginTop: '1rem' }}>
            <input 
              type="text" 
              placeholder="Ask me about destinations..."
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;