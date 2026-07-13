import { useState } from 'react';
import { Save, Upload, Bell, Database, Shield, Palette, Globe } from 'lucide-react';

export const Settings = () => {
  const [brandName, setBrandName] = useState('陇渭本草');
  const [brandLogo, setBrandLogo] = useState('');
  const [themeColor, setThemeColor] = useState('#1A472A');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [autoBackup, setAutoBackup] = useState(true);
  const [backupInterval, setBackupInterval] = useState('daily');

  const handleSave = () => {
    alert('设置已保存！');
  };

  const handleBackup = () => {
    alert('数据备份成功！');
  };

  return (
    <div className="p-8 space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-dark">系统设置</h1>
        <p className="text-gray-500 mt-1">配置平台参数，管理系统选项</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Palette className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-dark">品牌配置</h2>
                <p className="text-sm text-gray-500">设置品牌信息和主题</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark mb-2">品牌名称</label>
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-dark mb-2">品牌Logo</label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300">
                    {brandLogo ? (
                      <img src={brandLogo} alt="Logo" className="w-full h-full object-contain" />
                    ) : (
                      <Upload className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <button className="btn-secondary flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      上传Logo
                    </button>
                    <p className="text-xs text-gray-500 mt-2">支持 PNG、JPG 格式</p>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-dark mb-2">主题颜色</label>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    value={themeColor}
                    onChange={(e) => setThemeColor(e.target.value)}
                    className="w-12 h-10 rounded-lg cursor-pointer border-none"
                  />
                  <input
                    type="text"
                    value={themeColor}
                    onChange={(e) => setThemeColor(e.target.value)}
                    className="input-field w-40"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-info" />
              </div>
              <div>
                <h2 className="font-semibold text-dark">通知设置</h2>
                <p className="text-sm text-gray-500">配置通知方式和提醒</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-dark">邮件通知</p>
                  <p className="text-sm text-gray-500">接收系统通知和预警邮件</p>
                </div>
                <button
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    emailNotifications ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      emailNotifications ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-dark">短信通知</p>
                  <p className="text-sm text-gray-500">接收重要预警和提醒短信</p>
                </div>
                <button
                  onClick={() => setSmsNotifications(!smsNotifications)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    smsNotifications ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      smsNotifications ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-success" />
              </div>
              <div>
                <h2 className="font-semibold text-dark">数据备份</h2>
                <p className="text-sm text-gray-500">配置自动备份和手动备份</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-dark">自动备份</p>
                  <p className="text-sm text-gray-500">定期自动备份数据</p>
                </div>
                <button
                  onClick={() => setAutoBackup(!autoBackup)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    autoBackup ? 'bg-primary' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      autoBackup ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-dark mb-2">备份频率</label>
                <select
                  value={backupInterval}
                  onChange={(e) => setBackupInterval(e.target.value)}
                  disabled={!autoBackup}
                  className={`input-field ${!autoBackup ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <option value="hourly">每小时</option>
                  <option value="daily">每天</option>
                  <option value="weekly">每周</option>
                  <option value="monthly">每月</option>
                </select>
              </div>
              
              <button onClick={handleBackup} className="btn-secondary flex items-center gap-2">
                <Database className="w-4 h-4" />
                手动备份
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-danger/10 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-danger" />
              </div>
              <div>
                <h2 className="font-semibold text-dark">安全设置</h2>
                <p className="text-sm text-gray-500">管理账号安全</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <p className="font-medium text-dark">修改密码</p>
                <p className="text-sm text-gray-500">更新您的登录密码</p>
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <p className="font-medium text-dark">两步验证</p>
                <p className="text-sm text-gray-500">增强账号安全性</p>
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <p className="font-medium text-dark">登录记录</p>
                <p className="text-sm text-gray-500">查看账号登录历史</p>
              </button>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h2 className="font-semibold text-dark">系统信息</h2>
                <p className="text-sm text-gray-500">平台版本和状态</p>
              </div>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">版本号</span>
                <span className="text-dark font-medium">v1.0.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">更新日期</span>
                <span className="text-dark font-medium">2024-01-20</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">运行状态</span>
                <span className="text-success font-medium flex items-center gap-1">
                  <span className="w-2 h-2 bg-success rounded-full" />
                  正常运行
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} className="btn-primary flex items-center gap-2">
          <Save className="w-4 h-4" />
          保存设置
        </button>
      </div>
    </div>
  );
};