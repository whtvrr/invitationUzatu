'use client'

import { useState, useEffect } from 'react';

interface Submission {
  submittedAt: string;
  language: string;
  name: string;
  attendance: string;
  guestsCount: number;
  guestNames: string;
  phone: string;
  ip: string;
  userAgent: string;
}

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (isOpen) {
      const token = sessionStorage.getItem('admin_token');
      if (token) {
        setIsAuthenticated(true);
        loadSubmissions(token);
      }
    }
  }, [isOpen]);

  const authenticate = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/submissions', {
        headers: { 'x-admin-token': password }
      });

      if (response.ok) {
        sessionStorage.setItem('admin_token', password);
        setIsAuthenticated(true);
        loadSubmissions(password);
      } else {
        alert('Неверный пароль');
      }
    } catch (error) {
      console.error('Auth error:', error);
      alert('Ошибка аутентификации');
    } finally {
      setLoading(false);
    }
  };

  const loadSubmissions = async (token?: string) => {
    setLoading(true);
    try {
      const adminToken = token || sessionStorage.getItem('admin_token');
      const response = await fetch('/api/submissions', {
        headers: { 'x-admin-token': adminToken || '' }
      });

      if (response.ok) {
        const data = await response.json();
        setSubmissions(data.submissions || []);
      } else {
        setIsAuthenticated(false);
        sessionStorage.removeItem('admin_token');
      }
    } catch (error) {
      console.error('Load error:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = () => {
    const headers = ['Дата', 'Имя', 'Посещение', 'Гостей', 'Имена гостей', 'Язык', 'Телефон'];
    const csvContent = [
      headers.join(','),
      ...filteredSubmissions.map(sub => [
        new Date(sub.submittedAt).toLocaleString(),
        sub.name,
        sub.attendance === 'come' ? 'Приду' : sub.attendance === 'with' ? 'С гостями' : 'Не смогу',
        sub.guestsCount,
        `"${sub.guestNames}"`,
        sub.language === 'kk' ? 'Казахский' : 'Русский',
        sub.phone
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `samal-wedding-rsvp-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredSubmissions = submissions
    .filter(sub => filter === 'all' || sub.attendance === filter)
    .filter(sub => !search || sub.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());

  const stats = {
    total: submissions.length,
    coming: submissions.filter(s => s.attendance === 'come').length,
    withGuests: submissions.filter(s => s.attendance === 'with').length,
    totalGuests: submissions.reduce((sum, s) => sum + (s.guestsCount || 0), 0),
    notComing: submissions.filter(s => s.attendance === 'no').length,
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative w-full max-w-5xl max-h-[80vh] bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold">Админ-панель RSVP</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {!isAuthenticated ? (
          <div className="p-8 text-center">
            <h3 className="text-lg font-medium mb-4">Введите пароль администратора</h3>
            <div className="max-w-sm mx-auto space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyDown={(e) => e.key === 'Enter' && authenticate()}
              />
              <button
                onClick={authenticate}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Проверка...' : 'Войти'}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
            {/* Stats */}
            <div className="grid grid-cols-5 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                <div className="text-sm text-gray-600">Всего заявок</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-green-600">{stats.coming}</div>
                <div className="text-sm text-gray-600">Придут</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-yellow-600">{stats.withGuests}</div>
                <div className="text-sm text-gray-600">С гостями</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-600">{stats.totalGuests}</div>
                <div className="text-sm text-gray-600">Всего гостей</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-red-600">{stats.notComing}</div>
                <div className="text-sm text-gray-600">Не смогут</div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-4 mb-6">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="border rounded-lg px-3 py-2"
              >
                <option value="all">Все</option>
                <option value="come">Придут</option>
                <option value="with">С гостями</option>
                <option value="no">Не смогут</option>
              </select>

              <input
                type="text"
                placeholder="Поиск по имени"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border rounded-lg px-3 py-2 flex-1 max-w-xs"
              />

              <button
                onClick={() => loadSubmissions()}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                Обновить
              </button>

              <button
                onClick={exportCSV}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                Экспорт CSV
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-2 text-left">Дата</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Имя</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Посещение</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Гостей</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Имена гостей</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Язык</th>
                    <th className="border border-gray-200 px-4 py-2 text-left">Телефон</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubmissions.map((sub, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2 text-sm">
                        {new Date(sub.submittedAt).toLocaleString()}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 font-medium">
                        {sub.name}
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          sub.attendance === 'come' ? 'bg-green-100 text-green-800' :
                          sub.attendance === 'with' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {sub.attendance === 'come' ? 'Приду' :
                           sub.attendance === 'with' ? 'С гостями' : 'Не смогу'}
                        </span>
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-center">
                        {sub.guestsCount || 0}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">
                        {sub.guestNames}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">
                        {sub.language === 'kk' ? 'Қазақша' : 'Русский'}
                      </td>
                      <td className="border border-gray-200 px-4 py-2 text-sm">
                        {sub.phone}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredSubmissions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                {loading ? 'Загрузка...' : 'Нет данных'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}