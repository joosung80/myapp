import submissions from '../data/submissions.json';
import Link from 'next/link';

interface Submission {
  name: string;
  phone: string;
  companyEmail: string;
  company: string;
  title: string;
  companySize: string;
}

const data: Submission[] = submissions as Submission[];

export default function Stats() {
  const sizes = ['1-10', '11-50', '51-200', '201+'];
  const counts = sizes.map(size => ({
    size,
    count: data.filter(sub => sub.companySize === size).length,
  }));

  const maxCount = Math.max(...counts.map(c => c.count));
  const total = data.length;

  // TODO: 실제 배포 시, n8n webhook에서 데이터를 받아 submissions.json을 업데이트하거나, 클라우드 스토리지(예: Vercel KV, Supabase) 사용 고려. 정적 사이트이므로 빌드 시 데이터 고정됨.

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 gap-8">
      <div className="glass-card w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">설문 통계</h1>
        <p className="text-center mb-6">총 제출 수: {total}</p>
        
        <div className="bar-chart">
          {counts.map(({ size, count }) => (
            <div key={size} className="flex flex-col items-center">
              <div 
                className="bar"
                style={{ 
                  width: `${(count / maxCount) * 100}%`, 
                  height: `${(count / maxCount) * 100}px`,
                  minWidth: '20px'
                }}
              >
                {count}
              </div>
              <span className="mt-2 text-sm text-gray-300">{size} 명</span>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link href="/survey">
            <div className="glass-button inline-block">새 설문 시작</div>
          </Link>
          <a href="/" className="ml-4 text-gray-300 hover:text-accent-color">홈으로</a>
        </div>
      </div>
    </div>
  );
}

