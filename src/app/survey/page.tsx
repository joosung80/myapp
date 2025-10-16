'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface FormData {
  name: string;
  phone: string;
  companyEmail: string;
  company: string;
  title: string;
  companySize: string;
}

export default function Survey() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    companyEmail: '',
    company: '',
    title: '',
    companySize: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL) {
      setError('Webhook URL이 설정되지 않았습니다. .env.local에 NEXT_PUBLIC_N8N_WEBHOOK_URL을 추가하세요.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // TODO: 실제 n8n 워크플로우에서 데이터를 처리한 후 submissions.json 업데이트 (정적 사이트이므로 별도 스크립트나 서버리스 필요)
        router.push('/stats');
      } else {
        throw new Error('Webhook 요청 실패');
      }
    } catch {
      setError('제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const companySizes = ['1-10', '11-50', '51-200', '201+'];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">설문조사</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="이름"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="전화번호"
            value={formData.phone}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="email"
            name="companyEmail"
            placeholder="회사 이메일"
            value={formData.companyEmail}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="text"
            name="company"
            placeholder="회사명"
            value={formData.company}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="text"
            name="title"
            placeholder="직함"
            value={formData.title}
            onChange={handleChange}
            className="input-field"
            required
          />
          <select
            name="companySize"
            value={formData.companySize}
            onChange={handleChange}
            className="input-field"
            required
          >
            <option value="">회사 규모 선택</option>
            {companySizes.map(size => (
              <option key={size} value={size}>{size} 명</option>
            ))}
          </select>
          {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="glass-button w-full"
          >
            {loading ? <div className="loading-indicator mx-auto"></div> : '제출'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link href="/" className="text-gray-300 hover:text-accent-color">홈으로</Link>
        </div>
      </div>
    </div>
  );
}

