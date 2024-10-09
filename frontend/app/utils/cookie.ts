import Cookies from "js-cookie";

export function getAuthTokenId(): string | undefined {
  return Cookies.get("tokenId");
}

export function setAuthTokenId(tokenId: string): string | undefined {
  return Cookies.set("tokenId", tokenId, { secure: true });
}

export function removeAuthTokenId(): void {
  return Cookies.remove("tokenId");
}
