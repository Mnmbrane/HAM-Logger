mod utils;

use wasm_bindgen::prelude::*;

// Import the `console.log` function from the `web-sys` crate
#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

// Define a macro to provide `console.log!(..)`-like syntax
macro_rules! console_log {
    ( $( $t:tt )* ) => {
        log(&format!( $( $t )* ))
    }
}

// Ham2K PoLo Core functionality
#[wasm_bindgen]
pub struct Ham2KPoLo {
    // This will hold our ham radio application state
}

#[wasm_bindgen]
impl Ham2KPoLo {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Ham2KPoLo {
        utils::set_panic_hook();
        console_log!("Ham2K PoLo WASM core initialized!");
        
        Ham2KPoLo {}
    }
    
    #[wasm_bindgen]
    pub fn version(&self) -> String {
        "25.8.1 - Web Edition".to_string()
    }
    
    #[wasm_bindgen]
    pub fn validate_callsign(&self, callsign: &str) -> bool {
        // Basic callsign validation - will expand this
        !callsign.is_empty() && callsign.len() >= 3 && callsign.len() <= 8
    }
}

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;