import ChatUI from '../components/ChatUI';
import Link from 'next/link';

export default function Agent() {
  return (
    <div>
      <div className="glass-card p-4 mb-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">AI 에이전트</h1>
        <Link href="/" className="text-gray-300 hover:text-accent-color">홈으로</Link>
      </div>
      <ChatUI />
    </div>
  );
}

// TODO: ChatUI 컴포넌트에 실제 AI 백엔드 통합 (예: API 호출 또는 WebSocket 연결)

