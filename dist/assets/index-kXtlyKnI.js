(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function l(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(e){if(e.ep)return;e.ep=!0;const i=l(e);fetch(e.href,i)}})();console.log("Ham2K Portable Logger - Web Edition starting...");async function a(){try{console.log("Ham2K PoLo Web Edition ready!"),s()}catch(r){console.error("Failed to initialize Ham2K PoLo:",r)}}function s(){const r=document.getElementById("app");r.innerHTML=`
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
  `}a();
//# sourceMappingURL=index-kXtlyKnI.js.map
