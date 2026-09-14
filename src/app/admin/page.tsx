'use client';

import React, { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';
import { GoogleSheetsService, DEFAULT_SPREADSHEET_URL } from '@/lib/sheets';
import { EnhancementEngine } from '@/lib/enhancementEngine';
import { WellnessProduct, FeedbackSubmission, ProductEnhancementSolution } from '@/lib/types';
import { ProductEnhancementModal } from '@/components/ProductEnhancementModal';
import { AddProductModal } from '@/components/AddProductModal';
import {
  BarChart3,
  Sparkles,
  TrendingUp,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Star,
  Users,
  MessageSquare,
  SlidersHorizontal,
  Layers,
  ArrowUpRight,
  Database,
  CheckCircle2,
  Plus,
  Trash2,
  Lock,
  KeyRound,
  LogOut,
} from 'lucide-react';

const ADMIN_PASSWORD_INITIAL = '0000';

export default function AdminPage() {
  const { t, getLocalizedText } = useI18n();

  // 관리자 인증 상태 (초기 비밀번호: 0000)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  const [products, setProducts] = useState<WellnessProduct[]>([]);
  const [feedbacks, setFeedbacks] = useState<FeedbackSubmission[]>([]);
  const [activeTab, setActiveTab] = useState<'enhancement' | 'overview' | 'feedbacks' | 'settings'>('enhancement');
  const [selectedSolution, setSelectedSolution] = useState<ProductEnhancementSolution | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  // 구글 시트 웹훅 설정
  const [webhookUrl, setWebhookUrl] = useState('');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  useEffect(() => {
    // 세션 인증 확인
    const authed = sessionStorage.getItem('jnj_admin_authenticated');
    if (authed === 'true') {
      setIsAuthenticated(true);
      loadAllData();
      setWebhookUrl(GoogleSheetsService.getWebhookUrl());
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD_INITIAL) {
      setIsAuthenticated(true);
      sessionStorage.setItem('jnj_admin_authenticated', 'true');
      setAuthError(null);
      loadAllData();
      setWebhookUrl(GoogleSheetsService.getWebhookUrl());
    } else {
      setAuthError('비밀번호가 올바르지 않습니다. 다시 입력해주세요.');
      setPasswordInput('');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('jnj_admin_authenticated');
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  const loadAllData = async () => {
    setLoading(true);
    const [pList, fList] = await Promise.all([
      GoogleSheetsService.fetchProducts(),
      GoogleSheetsService.fetchFeedbacks(),
    ]);
    setProducts(pList);
    setFeedbacks(fList);
    setLoading(false);
  };

  const handleSync = async () => {
    setIsSyncing(true);
    await loadAllData();
    setIsSyncing(false);
  };

  const handleDeleteProduct = async (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this product?')) {
      await GoogleSheetsService.deleteProduct(productId);
      await loadAllData();
    }
  };

  const handleSaveWebhook = (e: React.FormEvent) => {
    e.preventDefault();
    GoogleSheetsService.setWebhookUrl(webhookUrl);
    setSaveStatus('Google Apps Script URL has been saved!');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  // 핵심 지표 계산
  const totalSubmissions = feedbacks.length;
  const avgSatisfaction =
    totalSubmissions > 0
      ? (feedbacks.reduce((acc, f) => acc + f.overallRating, 0) / totalSubmissions).toFixed(1)
      : '5.0';

  const promoters = feedbacks.filter((f) => (f.npsScore ?? 10) >= 9).length;
  const detractors = feedbacks.filter((f) => (f.npsScore ?? 10) <= 6).length;
  const npsScore = totalSubmissions > 0 ? Math.round(((promoters - detractors) / totalSubmissions) * 100) : 100;

  // 1. 관리자 암호 입력 락 화면
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-wellness-100 shadow-luxury space-y-6 text-center animate-slide-up">
          <div className="w-16 h-16 rounded-3xl bg-wellness-800 text-gold-300 flex items-center justify-center mx-auto shadow-sm">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-gold-600">
              Security Access
            </span>
            <h2 className="font-serif text-2xl font-bold text-wellness-950 mt-1">
              관리 &amp; 분석 센터 인증
            </h2>
            <p className="text-xs text-wellness-600 mt-2">
              관리자 접근을 위해 암호를 입력해 주세요. (초기 암호: <span className="font-mono font-bold text-wellness-900">0000</span>)
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="text-xs font-semibold text-wellness-800 block mb-1.5">
                관리자 비밀번호
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  autoFocus
                  maxLength={10}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="암호를 입력하세요"
                  className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-wellness-200 text-sm tracking-widest text-wellness-900 bg-sand-50/50 focus:outline-none focus:border-wellness-700 focus:ring-2 focus:ring-wellness-500/20"
                />
                <KeyRound className="w-4 h-4 text-wellness-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-medium">
                ⚠️ {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-wellness-800 hover:bg-wellness-900 text-gold-200 text-sm font-bold shadow-md transition-all active:scale-[0.98]"
            >
              관리자 센터 입장하기
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. 인증 완료 후 관리자 대시보드 본문
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 animate-fade-in">
      
      {/* 1. Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-wellness-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-wellness-800 text-gold-300 text-xs font-bold uppercase tracking-wider">
              Admin &amp; Product Intelligence
            </span>
            <span className="flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Connected
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-wellness-950 mt-2">
            {t.admin.title}
          </h1>
          <p className="text-xs sm:text-sm text-wellness-600 mt-1">
            {t.admin.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Add Product Button */}
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-wellness-800 hover:bg-wellness-900 text-gold-200 text-xs sm:text-sm font-semibold transition-all shadow-md active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>

          <button
            type="button"
            onClick={handleSync}
            disabled={isSyncing}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-wellness-200 hover:bg-wellness-50 text-wellness-800 text-xs sm:text-sm font-semibold transition-all shadow-sm active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 text-wellness-700 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? t.admin.syncing : t.admin.syncSheets}</span>
          </button>

          <a
            href={DEFAULT_SPREADSHEET_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sand-100 hover:bg-sand-200 text-wellness-900 text-xs sm:text-sm font-semibold transition-all shadow-sm active:scale-95 border border-wellness-200"
          >
            <span>{t.admin.openSheet}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            className="p-2.5 rounded-xl bg-white border border-wellness-200 text-neutral-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            title="로그아웃"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="flex border-b border-wellness-200 space-x-2 sm:space-x-8 overflow-x-auto pb-px">
        <button
          onClick={() => setActiveTab('enhancement')}
          className={`py-3 px-3 sm:px-1 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'enhancement'
              ? 'border-wellness-800 text-wellness-950 font-bold'
              : 'border-transparent text-wellness-600 hover:text-wellness-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-gold-500" />
          <span>{t.admin.productsTab} ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('overview')}
          className={`py-3 px-3 sm:px-1 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'overview'
              ? 'border-wellness-800 text-wellness-950 font-bold'
              : 'border-transparent text-wellness-600 hover:text-wellness-900'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>{t.admin.overviewTab}</span>
        </button>

        <button
          onClick={() => setActiveTab('feedbacks')}
          className={`py-3 px-3 sm:px-1 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'feedbacks'
              ? 'border-wellness-800 text-wellness-950 font-bold'
              : 'border-transparent text-wellness-600 hover:text-wellness-900'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>{t.admin.feedbacksTab} ({feedbacks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`py-3 px-3 sm:px-1 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'settings'
              ? 'border-wellness-800 text-wellness-950 font-bold'
              : 'border-transparent text-wellness-600 hover:text-wellness-900'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>{t.admin.settingsTab}</span>
        </button>
      </div>

      {/* 3. TAB CONTENT */}

      {/* TAB 1: PRODUCT ENHANCEMENT & MANAGEMENT HUB */}
      {activeTab === 'enhancement' && (
        <div className="space-y-6 animate-fade-in">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-wellness-900 to-wellness-800 text-white shadow-luxury flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-gold-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                {t.admin.enhancementTitle}
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Live Products &amp; AI Optimization Hub
              </h2>
              <p className="text-xs sm:text-sm text-wellness-200 leading-relaxed">
                {t.admin.enhancementSubtitle}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="px-6 py-3 rounded-2xl bg-gold-400 hover:bg-gold-500 text-wellness-950 text-xs sm:text-sm font-bold shadow-lg transition-all flex items-center gap-2 flex-shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Register Product</span>
            </button>
          </div>

          {products.length === 0 ? (
            <div className="p-16 text-center bg-white rounded-3xl border border-wellness-100 max-w-lg mx-auto space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-wellness-50 text-wellness-800 flex items-center justify-center mx-auto">
                <Plus className="w-8 h-8 text-wellness-600" />
              </div>
              <h3 className="font-serif text-xl font-bold text-wellness-950">No Products Registered Yet</h3>
              <p className="text-xs text-wellness-600">
                Click below to register your first J&amp;J Solutions wellness product or add rows in your Google Sheet.
              </p>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="px-6 py-3 rounded-2xl bg-wellness-800 hover:bg-wellness-900 text-gold-200 text-xs sm:text-sm font-semibold shadow-md transition-all inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Your First Product</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((prod) => {
                const sol = EnhancementEngine.analyzeAndGenerateEnhancement(prod.id, prod, feedbacks);
                return (
                  <div
                    key={prod.id}
                    className="bg-white rounded-3xl p-6 border border-wellness-100 shadow-card flex flex-col justify-between hover:border-wellness-300 hover:shadow-luxury transition-all"
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-sand-100 text-wellness-800 text-[10px] font-bold uppercase tracking-wider">
                          {getLocalizedText(prod.category)}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-gold-600 flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 fill-gold-400" />
                            {sol.averageRating}
                          </span>
                          <button
                            type="button"
                            onClick={(e) => handleDeleteProduct(prod.id, e)}
                            className="p-1 rounded-lg hover:bg-rose-50 text-neutral-400 hover:text-rose-600 transition-colors"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <h3 className="font-serif text-lg font-bold text-wellness-950 leading-snug">
                        {getLocalizedText(prod.name)}
                      </h3>

                      <p className="text-xs text-wellness-600 line-clamp-2">
                        {getLocalizedText(prod.tagline)}
                      </p>

                      <div className="p-3.5 rounded-2xl bg-sand-50 border border-wellness-100/80 text-xs text-wellness-700 leading-relaxed line-clamp-3">
                        {sol.aiSummary}
                      </div>

                      <div className="space-y-2 pt-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-wellness-500 block">
                          Top Enhancement Focus
                        </span>
                        {sol.enhancementRoadmap.slice(0, 2).map((r, i) => (
                          <div key={i} className="text-xs text-wellness-900 flex items-start gap-1.5 leading-snug">
                            <span className="text-gold-600 font-bold">→</span>
                            <span><strong>{r.area}:</strong> {r.solutionProposal}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-wellness-100">
                      <button
                        type="button"
                        onClick={() => setSelectedSolution(sol)}
                        className="w-full py-3 rounded-xl bg-wellness-800 hover:bg-wellness-900 text-gold-200 text-xs font-semibold tracking-wide transition-all shadow-sm flex items-center justify-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>View Enhancement Solution</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: OVERVIEW & ANALYTICS */}
      {activeTab === 'overview' && (
        <div className="space-y-8 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-wellness-100 shadow-card flex items-center justify-between">
              <div>
                <span className="text-xs text-wellness-600 font-semibold uppercase tracking-wider block">
                  {t.admin.totalResponses}
                </span>
                <div className="text-3xl font-bold font-serif text-wellness-950 mt-1">
                  {totalSubmissions}
                </div>
                <div className="text-[11px] text-emerald-600 font-medium mt-1">
                  Live synced with Google Sheets
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-wellness-50 text-wellness-700 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-wellness-100 shadow-card flex items-center justify-between">
              <div>
                <span className="text-xs text-wellness-600 font-semibold uppercase tracking-wider block">
                  {t.admin.avgSatisfaction}
                </span>
                <div className="text-3xl font-bold font-serif text-wellness-950 mt-1 flex items-center gap-1.5">
                  <span>{avgSatisfaction}</span>
                  <span className="text-sm font-normal text-wellness-500">/ 5.0</span>
                </div>
                <div className="text-[11px] text-emerald-600 font-medium mt-1">
                  Customer Experience Score
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gold-50 text-gold-600 flex items-center justify-center">
                <Star className="w-6 h-6 fill-gold-400" />
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-wellness-100 shadow-card flex items-center justify-between">
              <div>
                <span className="text-xs text-wellness-600 font-semibold uppercase tracking-wider block">
                  {t.admin.npsScore}
                </span>
                <div className="text-3xl font-bold font-serif text-gold-600 mt-1">
                  +{npsScore}
                </div>
                <div className="text-[11px] text-wellness-600 font-medium mt-1">
                  Net Promoter Score
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-wellness-800 text-gold-300 flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: FEEDBACK RAW DATA */}
      {activeTab === 'feedbacks' && (
        <div className="bg-white rounded-3xl border border-wellness-100 shadow-card overflow-hidden animate-fade-in">
          <div className="p-6 border-b border-wellness-100 flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-wellness-950">
              Live Customer Submissions ({feedbacks.length})
            </h3>
            <span className="text-xs text-wellness-600">
              Auto-synced with Google Sheets `Responses` tab
            </span>
          </div>

          {feedbacks.length === 0 ? (
            <div className="p-12 text-center text-xs text-wellness-600">
              No customer feedback received yet. Submissions from the survey page will appear here automatically.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-wellness-900">
                <thead className="bg-sand-50 text-[11px] uppercase font-bold text-wellness-600 border-b border-wellness-100">
                  <tr>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Rating</th>
                    <th className="py-3 px-4">NPS</th>
                    <th className="py-3 px-4">Demographics</th>
                    <th className="py-3 px-4">Customer Comment &amp; Voice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-wellness-100/60">
                  {feedbacks.map((fb, idx) => (
                    <tr key={fb.id || idx} className="hover:bg-wellness-50/40 transition-colors">
                      <td className="py-3 px-4 whitespace-nowrap text-wellness-500 font-mono text-[11px]">
                        {fb.timestamp || '2026-09-14'}
                      </td>
                      <td className="py-3 px-4 font-semibold text-wellness-950 whitespace-nowrap">
                        {fb.productName}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1 font-bold text-wellness-800">
                          <span>{fb.overallRating}</span>
                          <Star className="w-3.5 h-3.5 fill-gold-400 text-gold-500" />
                        </div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-md bg-wellness-100 text-wellness-800 font-bold">
                          {fb.npsScore ?? 10}/10
                        </span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-wellness-600">
                        <div>{fb.userProfile?.nationality || 'Global User'}</div>
                        <div className="text-[10px] text-wellness-400">{fb.userProfile?.ageGroup} | {fb.language.toUpperCase()}</div>
                      </td>
                      <td className="py-3 px-4 max-w-md text-wellness-800 leading-relaxed">
                        {fb.comment || <span className="text-neutral-400 italic">No text comment</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: GOOGLE SHEETS CONFIG & SETUP */}
      {activeTab === 'settings' && (
        <div className="max-w-3xl space-y-6 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-wellness-100 shadow-card space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-wellness-800 text-gold-300 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-wellness-950">
                  Google Sheets Backend Integration
                </h3>
                <p className="text-xs text-wellness-600">
                  Link your Google Spreadsheet as the live headless database &amp; CMS
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-sand-50 border border-wellness-200/60 space-y-2 text-xs text-wellness-800">
              <div className="font-bold text-wellness-950">Active Spreadsheet:</div>
              <a
                href={DEFAULT_SPREADSHEET_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-wellness-700 hover:text-wellness-950 underline font-mono text-[11px] block break-all"
              >
                {DEFAULT_SPREADSHEET_URL}
              </a>
            </div>

            <form onSubmit={handleSaveWebhook} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-wellness-900 block mb-1">
                  Google Apps Script (GAS) Webhook URL
                </label>
                <input
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://script.google.com/macros/s/.../exec"
                  className="w-full p-3.5 rounded-xl border border-wellness-200 text-xs font-mono text-wellness-900 bg-sand-50/50 focus:outline-none focus:border-wellness-700"
                />
              </div>

              {saveStatus && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {saveStatus}
                </div>
              )}

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-wellness-800 hover:bg-wellness-900 text-gold-200 text-xs sm:text-sm font-semibold transition-all shadow-sm"
              >
                Save Configuration
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal for Registering New Products */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onProductAdded={loadAllData}
      />

      {/* Modal for Product Enhancement Solution Details */}
      <ProductEnhancementModal
        solution={selectedSolution}
        onClose={() => setSelectedSolution(null)}
      />

    </div>
  );
}
