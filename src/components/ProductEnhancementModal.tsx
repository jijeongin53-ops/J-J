'use client';

import React from 'react';
import { ProductEnhancementSolution } from '@/lib/types';
import { X, Sparkles, TrendingUp, AlertCircle, CheckCircle2, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface ProductEnhancementModalProps {
  solution: ProductEnhancementSolution | null;
  onClose: () => void;
}

export function ProductEnhancementModal({ solution, onClose }: ProductEnhancementModalProps) {
  if (!solution) return null;

  const priorityColors = {
    High: 'bg-rose-100 text-rose-800 border-rose-200',
    Medium: 'bg-amber-100 text-amber-800 border-amber-200',
    Low: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-wellness-100 overflow-hidden flex flex-col animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-wellness-100 bg-sand-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-wellness-800 text-gold-300 flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-gold-600">
                AI Product Enhancement Intelligence
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-wellness-950">
                {solution.productName}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-wellness-200 hover:bg-wellness-100 text-wellness-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-7">
          
          {/* Executive Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-wellness-50/80 border border-wellness-100">
              <span className="text-[11px] text-wellness-600 font-semibold uppercase tracking-wider block">
                Total Feedback Analyzed
              </span>
              <div className="text-2xl font-bold font-serif text-wellness-900 mt-1">
                {solution.totalFeedbacks} Responses
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-wellness-50/80 border border-wellness-100">
              <span className="text-[11px] text-wellness-600 font-semibold uppercase tracking-wider block">
                Average Rating
              </span>
              <div className="text-2xl font-bold font-serif text-wellness-900 mt-1 flex items-center gap-1.5">
                <span>{solution.averageRating}</span>
                <span className="text-xs text-wellness-500 font-sans font-normal">/ 5.0</span>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-wellness-50/80 border border-wellness-100">
              <span className="text-[11px] text-wellness-600 font-semibold uppercase tracking-wider block">
                Net Promoter Score
              </span>
              <div className="text-2xl font-bold font-serif text-wellness-900 mt-1 text-gold-600">
                +{solution.npsScore}
              </div>
            </div>
          </div>

          {/* AI Strategic Synthesis */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-wellness-900 to-wellness-800 text-white shadow-sm">
            <div className="flex items-center gap-2 text-gold-300 text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4" />
              Strategic Executive Summary
            </div>
            <p className="text-xs sm:text-sm text-wellness-100 leading-relaxed">
              {solution.aiSummary}
            </p>
          </div>

          {/* Strengths & Weaknesses Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-100/80">
              <h4 className="flex items-center gap-2 font-bold text-sm text-emerald-900 mb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Validated Core Strengths
              </h4>
              <ul className="space-y-2">
                {solution.strengths.map((str, idx) => (
                  <li key={idx} className="text-xs text-emerald-950 flex items-start gap-2 leading-relaxed">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/40 border border-amber-100/80">
              <h4 className="flex items-center gap-2 font-bold text-sm text-amber-900 mb-3">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                Identified Pain Points &amp; VOC
              </h4>
              <ul className="space-y-2">
                {solution.weaknesses.map((weak, idx) => (
                  <li key={idx} className="text-xs text-amber-950 flex items-start gap-2 leading-relaxed">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{weak}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Actionable Enhancement Roadmap */}
          <div>
            <h4 className="font-serif text-lg font-bold text-wellness-950 mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-gold-600" />
              Actionable Product Enhancement Roadmap
            </h4>

            <div className="space-y-3.5">
              {solution.enhancementRoadmap.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-sand-50/70 border border-wellness-100 hover:border-wellness-300 transition-all space-y-2.5"
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-wellness-800 text-white font-semibold text-[11px] tracking-wide">
                        {item.area}
                      </span>
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${priorityColors[item.priority]}`}>
                        {item.priority} Priority
                      </span>
                    </div>

                    <span className="text-[11px] font-semibold text-wellness-600 flex items-center gap-1">
                      <ArrowUpRight className="w-3.5 h-3.5 text-gold-600" />
                      {item.expectedImpact}
                    </span>
                  </div>

                  <div className="text-xs text-neutral-600">
                    <strong className="text-neutral-800">Issue: </strong>
                    {item.issueIdentified}
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-wellness-100 text-xs sm:text-sm font-medium text-wellness-900">
                    <strong className="text-wellness-700">Proposal: </strong>
                    {item.solutionProposal}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 sm:px-8 py-4 bg-sand-50 border-t border-wellness-100 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-wellness-800 hover:bg-wellness-900 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm"
          >
            Close Intelligence View
          </button>
        </div>
      </div>
    </div>
  );
}
