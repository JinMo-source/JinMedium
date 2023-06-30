import WebSocket from "isomorphic-ws";

const createWebSocketConnection = () => {
  const webSocket = new WebSocket("ws://localhost:4000");

  webSocket.onopen = () => {
    // WebSocket 연결 성공 시 refreshToken을 전송합니다.
    const refreshToken = "your_refresh_token";
    webSocket.send(refreshToken);
  };

  webSocket.onmessage = (event: any) => {
    // 서버로부터 새로운 accessToken을 수신하고 처리하는 로직을 구현합니다.
    const newAccessToken = event.data;
    // Apollo Client의 캐시에 저장하거나 처리합니다.
  };

  webSocket.onerror = (error: any) => {
    // WebSocket 에러 처리 로직을 구현합니다.
  };

  webSocket.onclose = () => {
    // WebSocket 연결 종료 시의 로직을 구현합니다.
  };

  return webSocket;
};

export default createWebSocketConnection;
