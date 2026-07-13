import { useState } from 'react';
import { Settings, Check, X, RefreshCw, Eye, Copy, ChevronRight } from 'lucide-react';
import { PlatformConfig, PLATFORM_NAMES } from '@/types';

const mockPlatforms: PlatformConfig[] = [
  { id: '1', user_id: '1', platform_name: 'taobao', api_key: '*******', api_secret: '*******', auth_data: {}, status: 'enabled', created_at: '2024-01-10', updated_at: '2024-01-20' },
  { id: '2', user_id: '1', platform_name: 'tmall', api_key: '*******', api_secret: '*******', auth_data: {}, status: 'enabled', created_at: '2024-01-10', updated_at: '2024-01-20' },
  { id: '3', user_id: '1', platform_name: 'jd', api_key: '', api_secret: '', auth_data: {}, status: 'disabled', created_at: '2024-01-08', updated_at: '2024-01-15' },
  { id: '4', user_id: '1', platform_name: 'douyin', api_key: '*******', api_secret: '*******', auth_data: {}, status: 'enabled', created_at: '2024-01-05', updated_at: '2024-01-19' },
  { id: '5', user_id: '1', platform_name: 'xiaohongshu', api_key: '', api_secret: '', auth_data: {}, status: 'disabled', created_at: '2024-01-03', updated_at: '2024-01-12' },
];

export const Platforms = () => {
  const [platforms, setPlatforms] = useState(mockPlatforms);
  const [showConfigModal, setShowConfigModal] = useState<string | null>(null);
  const [configData, setConfigData] = useState({ api_key: '', api_secret: '' });

  const handleConfig = (platform: PlatformConfig) => {
    setShowConfigModal(platform.id);
    setConfigData({ api_key: platform.api_key, api_secret: platform.api_secret });
  };

  const handleSaveConfig = () => {
    setPlatforms(platforms.map((p) => 
      p.id === showConfigModal 
        ? { ...p, api_key: configData.api_key, api_secret: configData.api_secret, status: 'enabled' }
        : p
    ));
    setShowConfigModal(null);
  };

  const handleTestConnection = (platformName: string) => {
    alert(`${PLATFORM_NAMES[platformName as keyof typeof PLATFORM_NAMES]}连接测试成功！`);
  };

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-dark">平台接入</h1>
        <p className="text-gray-500 mt-1">配置各电商平台API，实现数据同步</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {platforms.map((platform) => (
          <div
            key={platform.id}
            className={`card relative overflow-hidden transition-all duration-300 ${
              platform.status === 'enabled' ? 'border-success/30' : ''
            }`}
          >
            {platform.status === 'enabled' && (
              <div className="absolute top-0 right-0 w-24 h-24 bg-success/10 rounded-full -mr-12 -mt-12" />
            )}
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    platform.status === 'enabled' ? 'bg-success/10' : 'bg-gray-100'
                  }`}>
                    {platform.status === 'enabled' ? (
                      <Check className="w-6 h-6 text-success" />
                    ) : (
                      <X className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark">
                      {PLATFORM_NAMES[platform.platform_name as keyof typeof PLATFORM_NAMES]}
                    </h3>
                    <p className={`text-sm ${
                      platform.status === 'enabled' ? 'text-success' : 'text-gray-500'
                    }`}>
                      {platform.status === 'enabled' ? '已连接' : '未连接'}
                    </p>
                  </div>
                </div>
                {platform.status === 'enabled' && (
                  <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">API Key</span>
                  <div className="flex items-center gap-2">
                    <span className="text-dark">{platform.api_key || '未配置'}</span>
                    <button className="text-gray-400 hover:text-dark transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">API Secret</span>
                  <div className="flex items-center gap-2">
                    <span className="text-dark">{platform.api_secret || '未配置'}</span>
                    <button className="text-gray-400 hover:text-dark transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-6 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleConfig(platform)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span className="text-sm font-medium">配置</span>
                </button>
                {platform.status === 'enabled' && (
                  <>
                    <button
                      onClick={() => handleTestConnection(platform.platform_name)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span className="text-sm font-medium">测试</span>
                    </button>
                    <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showConfigModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md animate-slide-up">
            <h2 className="text-xl font-bold text-dark mb-4">配置平台</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-2">API Key</label>
                <div className="relative">
                  <input
                    type="text"
                    value={configData.api_key}
                    onChange={(e) => setConfigData({ ...configData, api_key: e.target.value })}
                    className="input-field"
                    placeholder="请输入API Key"
                  />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-dark">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-dark mb-2">API Secret</label>
                <div className="relative">
                  <input
                    type="password"
                    value={configData.api_secret}
                    onChange={(e) => setConfigData({ ...configData, api_secret: e.target.value })}
                    className="input-field"
                    placeholder="请输入API Secret"
                  />
                  <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-dark">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowConfigModal(null)} className="btn-secondary">取消</button>
              <button onClick={handleSaveConfig} className="btn-primary">保存配置</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};