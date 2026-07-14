// src/Pages/Reports.jsx
import React from 'react';
import { Download, Share } from 'lucide-react';

export default function Reports() {
  // Chart configuration to match exactly
  const yAxisLabels = ['1200', '900', '600', '300', '0'];
  const xAxisLabels = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

  // Perfectly smooth bezier curve data points for the 6-month trend
  // Maps 0-1000 width to 0-300 height
  const chartPath = "M 0 200 C 100 200, 100 137.5, 200 137.5 C 300 137.5, 300 175, 400 175 C 500 175, 500 75, 600 75 C 700 75, 700 112.5, 800 112.5 C 900 112.5, 900 37.5, 1000 37.5";
  const fillPath = `${chartPath} L 1000 300 L 0 300 Z`;

  return (
    <div className="animate-fadeIn max-w-[1400px] mx-auto space-y-6">
      
      {/* Header section */}
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900">Reports</h2>
        <p className="text-sm text-gray-500 font-medium mt-1">
          Platform-wide analytics and impact reporting.
        </p>
      </div>

      {/* Main Chart Card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
        <h3 className="text-lg font-bold text-gray-900 mb-8">Donation Trends (6 months)</h3>
        
        {/* Chart Area */}
        <div className="relative h-80 w-full pl-10 pr-2 pb-12 pt-2">
          
          {/* Y-axis labels */}
          <div className="absolute left-0 top-2 bottom-12 w-8 flex flex-col justify-between text-xs text-gray-400 font-semibold text-right pr-2 select-none">
            {yAxisLabels.map((label, i) => (
              <span key={i} className="-translate-y-1/2">{label}</span>
            ))}
          </div>

          {/* Grid and SVG container */}
          <div className="relative w-full h-full">
            {/* Horizontal Dashed Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-0">
              {yAxisLabels.map((_, i) => (
                <div key={i} className="w-full border-t border-dashed border-gray-200/80"></div>
              ))}
            </div>

            {/* Custom SVG Spline Area Chart */}
            <svg 
              className="absolute inset-0 w-full h-full overflow-visible z-10" 
              viewBox="0 0 1000 300" 
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
                  <stop offset="80%" stopColor="#f97316" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Gradient Fill under the curve */}
              <path 
                d={fillPath} 
                fill="url(#orangeGradient)" 
              />
              
              {/* Main Smooth Line */}
              <path 
                d={chartPath} 
                fill="none" 
                stroke="#f97316" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
          </div>

          {/* X-axis labels */}
          <div className="absolute left-10 right-2 bottom-4 flex justify-between items-end text-[11px] text-gray-400 font-bold uppercase tracking-wider select-none">
            {xAxisLabels.map((label, i) => (
              <span key={i} className="w-8 text-center -translate-x-1/2" style={{ marginLeft: i === 0 ? '0' : '', left: `${(i / 5) * 100}%`, position: i > 0 ? 'absolute' : 'relative' }}>
                {label}
              </span>
            ))}
          </div>

          {/* Chart Legend */}
          <div className="absolute -bottom-2 left-0 right-0 flex justify-center gap-8 text-xs font-semibold select-none">
            <div className="flex items-center gap-2">
              <div className="flex items-center opacity-80">
                <div className="w-1.5 h-0.5 bg-[#1a9f3b]"></div>
                <div className="w-1.5 h-1.5 rounded-full border border-[#1a9f3b] bg-white"></div>
                <div className="w-1.5 h-0.5 bg-[#1a9f3b]"></div>
              </div>
              <span className="text-[#1a9f3b]">Food Donations</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center opacity-80">
                <div className="w-1.5 h-0.5 bg-[#f97316]"></div>
                <div className="w-1.5 h-1.5 rounded-full border border-[#f97316] bg-white"></div>
                <div className="w-1.5 h-0.5 bg-[#f97316]"></div>
              </div>
              <span className="text-[#f97316]">Item Donations</span>
            </div>
          </div>

        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-wrap items-center gap-4">
        <button className="flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-gray-200 bg-[#f4f7f4] hover:bg-[#e8ebe8] text-sm font-semibold text-gray-800 transition-colors shadow-sm">
          <Download size={16} className="text-gray-600" />
          Download PDF Report
        </button>
        
        <button className="flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-gray-200 bg-[#f4f7f4] hover:bg-[#e8ebe8] text-sm font-semibold text-gray-800 transition-colors shadow-sm">
          <Download size={16} className="text-gray-600" />
          Export CSV
        </button>
        
        <button className="flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-gray-200 bg-[#f4f7f4] hover:bg-[#e8ebe8] text-sm font-semibold text-gray-800 transition-colors shadow-sm">
          <Share size={16} className="text-gray-600" />
          Share Report
        </button>
      </div>

    </div>
  );
}