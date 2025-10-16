import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 gap-8">
      <div className="glass-card text-center max-w-md">
        <Image
          className="mx-auto mb-4 dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={38}
        />
        <h1 className="text-3xl font-bold mb-4">Survey App</h1>
        <p className="text-lg text-gray-300 mb-6">
          설문조사와 통계, 채팅 데모를 위한 Next.js 앱입니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/survey">
            <div className="glass-button w-full sm:w-auto text-center">설문 시작</div>
          </Link>
          <Link href="/stats">
            <div className="glass-button w-full sm:w-auto text-center">통계 보기</div>
          </Link>
          <Link href="/agent">
            <div className="glass-button w-full sm:w-auto text-center">AI 에이전트</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
