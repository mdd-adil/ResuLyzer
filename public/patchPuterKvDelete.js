// This script will patch window.puter.kv to add a delete method if missing.
(function() {
  if (typeof window !== 'undefined' && window.puter && window.puter.kv) {
    if (typeof window.puter.kv.delete !== 'function') {
      window.puter.kv.delete = async function(key) {
        // Fallback: Remove from localStorage (or your storage solution)
        localStorage.removeItem(key);
        return true;
      };
      console.warn('window.puter.kv.delete was missing and has been polyfilled.');
    }
  }
})();
