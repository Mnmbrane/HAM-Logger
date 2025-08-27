// Ham2K Portable Logger - Web Edition
// Main entry point

console.log('Ham2K Portable Logger - Web Edition starting...')

// Load WASM module when ready
async function init() {
  try {
    // TODO: Load WASM module here
    // const wasm = await import('./pkg/ham2k_polo_wasm.js')
    // await wasm.default()
    
    console.log('Ham2K PoLo Web Edition ready!')
    
    // Initialize the web app
    initializeApp()
  } catch (err) {
    console.error('Failed to initialize Ham2K PoLo:', err)
  }
}

function initializeApp() {
  const app = document.getElementById('app')
  app.innerHTML = `
    <div style="font-family: system-ui, sans-serif; padding: 2rem; max-width: 800px; margin: 0 auto;">
      <h1>🏔️ Ham2K Portable Logger</h1>
      <h2>Web Edition</h2>
      <p>Amateur radio contact logging application - transitioning from React Native to Rust+WASM</p>
      
      <div style="background: #f0f0f0; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
        <h3>🚧 Work in Progress</h3>
        <p>This is the web version being refactored from the original React Native mobile app.</p>
        <ul>
          <li>✅ Removed React Native dependencies</li>
          <li>✅ Cleaned up mobile platform code</li>
          <li>⏳ Building Rust+WASM core</li>
          <li>⏳ Creating web UI</li>
          <li>⏳ Porting ham radio features</li>
        </ul>
      </div>
      
      <div style="background: #e8f4f8; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
        <h3>📻 Ham Radio Features (Planned)</h3>
        <ul>
          <li>QSO Logging</li>
          <li>ADIF Import/Export</li>
          <li>POTA/SOTA Support</li>
          <li>Callsign Lookups</li>
          <li>Grid Square Calculations</li>
          <li>Contest Logging</li>
        </ul>
      </div>
    </div>
  `
}

// Start the application
init()