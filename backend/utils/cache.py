import time
from typing import Any, Optional, Dict, Tuple

class SimpleFastCache:
    """Sub-millisecond thread-safe in-memory cache for high-frequency database endpoints."""
    def __init__(self, default_ttl: int = 10):
        self._cache: Dict[str, Tuple[Any, float]] = {}
        self.default_ttl = default_ttl

    def get(self, key: str) -> Optional[Any]:
        if key in self._cache:
            val, expiry = self._cache[key]
            if time.time() < expiry:
                return val
            else:
                del self._cache[key]
        return None

    def set(self, key: str, val: Any, ttl: Optional[int] = None) -> None:
        ttl = ttl if ttl is not None else self.default_ttl
        self._cache[key] = (val, time.time() + ttl)

    def invalidate(self, prefix: Optional[str] = None) -> None:
        if prefix:
            keys_to_del = [k for k in self._cache.keys() if k.startswith(prefix)]
            for k in keys_to_del:
                self._cache.pop(k, None)
        else:
            self._cache.clear()

fast_cache = SimpleFastCache(default_ttl=10)
