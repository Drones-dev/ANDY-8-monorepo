from __future__ import annotations

import hashlib
import hmac
from dataclasses import dataclass


@dataclass(frozen=True, slots=True)
class Identity:
    node_id: str
    public_fingerprint: str


def sign(message: bytes, key: bytes) -> str:
    return hmac.new(key, message, hashlib.sha256).hexdigest()


def verify(message: bytes, signature: str, key: bytes) -> bool:
    return hmac.compare_digest(sign(message, key), signature)
