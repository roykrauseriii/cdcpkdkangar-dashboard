import React, { useState, useMemo, useRef } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { Activity, AlertTriangle, FileText, CheckCircle, Clock, MapPin, Filter, X, Database, Upload, Check, RefreshCw, Search } from 'lucide-react';

// --- Data Preparation based on the uploaded CSV snippets ---
const totalData = [
  { name: 'AVIAN INFLUENZA', abai: 3, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 3 },
  { name: 'CHIKUNGUNYA', abai: 1, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 1 },
  { name: 'COVID-19', abai: 0, belum: 0, daftarKes: 9, daftarNotifikasi: 0, total: 9 },
  { name: 'DENGUE/DHF', abai: 128, belum: 1, daftarKes: 0, daftarNotifikasi: 1, total: 130 },
  { name: 'DIPHTERIA', abai: 1, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 1 },
  { name: 'DYSENTRY', abai: 22, belum: 0, daftarKes: 4, daftarNotifikasi: 2, total: 28 },
  { name: 'FOOD POISONING', abai: 29, belum: 0, daftarKes: 140, daftarNotifikasi: 0, total: 169 },
  { name: 'GONORRHOEA', abai: 1, belum: 0, daftarKes: 9, daftarNotifikasi: 0, total: 10 },
  { name: 'HFMD', abai: 14, belum: 0, daftarKes: 156, daftarNotifikasi: 0, total: 170 },
  { name: 'HIV/AIDS', abai: 4, belum: 0, daftarKes: 0, daftarNotifikasi: 14, total: 18 },
  { name: 'LEPTOSPIROSIS', abai: 8, belum: 0, daftarKes: 11, daftarNotifikasi: 0, total: 19 },
  { name: 'MALARIA', abai: 1, belum: 0, daftarKes: 2, daftarNotifikasi: 0, total: 3 },
  { name: 'MEASLES', abai: 1, belum: 0, daftarKes: 0, daftarNotifikasi: 11, total: 12 },
  { name: 'MERS-COV', abai: 9, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 9 },
  { name: 'PERTUSSIS', abai: 5, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 5 },
  { name: 'RABIES', abai: 3, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 3 },
  { name: 'SYPHILIS', abai: 10, belum: 0, daftarKes: 6, daftarNotifikasi: 1, total: 17 },
  { name: 'TUBERCULOSIS', abai: 15, belum: 0, daftarKes: 2, daftarNotifikasi: 200, total: 217 },
  { name: 'TYPHOID/PARATYPHOID', abai: 1, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 1 },
  { name: 'VIRAL HEPATITIS', abai: 4, belum: 0, daftarKes: 5, daftarNotifikasi: 15, total: 24 },
];

const weeklyData = {
  '1': [
    { name: 'DENGUE/DHF', abai: 16, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 16 },
    { name: 'DIPHTERIA', abai: 1, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 1 },
    { name: 'DYSENTRY', abai: 4, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 4 },
    { name: 'FOOD POISONING', abai: 1, belum: 0, daftarKes: 3, daftarNotifikasi: 0, total: 4 },
    { name: 'HFMD', abai: 1, belum: 0, daftarKes: 22, daftarNotifikasi: 0, total: 23 },
    { name: 'HIV/AIDS', abai: 0, belum: 0, daftarKes: 0, daftarNotifikasi: 3, total: 3 },
    { name: 'LEPTOSPIROSIS', abai: 0, belum: 0, daftarKes: 3, daftarNotifikasi: 0, total: 3 },
    { name: 'MALARIA', abai: 0, belum: 0, daftarKes: 1, daftarNotifikasi: 0, total: 1 },
    { name: 'MEASLES', abai: 0, belum: 0, daftarKes: 0, daftarNotifikasi: 1, total: 1 },
    { name: 'MERS-COV', abai: 3, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 3 },
    { name: 'TUBERCULOSIS', abai: 1, belum: 0, daftarKes: 4, daftarNotifikasi: 0, total: 5 },
    { name: 'TYPHOID/PARATYPHOID', abai: 1, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 1 },
    { name: 'VIRAL HEPATITIS', abai: 0, belum: 0, daftarKes: 1, daftarNotifikasi: 0, total: 1 },
  ],
  '2': [
    { name: 'COVID-19', abai: 0, belum: 0, daftarKes: 1, daftarNotifikasi: 0, total: 1 },
    { name: 'DENGUE/DHF', abai: 12, belum: 0, daftarKes: 0, daftarNotifikasi: 1, total: 13 },
    { name: 'DYSENTRY', abai: 1, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 1 },
    { name: 'FOOD POISONING', abai: 5, belum: 0, daftarKes: 3, daftarNotifikasi: 0, total: 8 },
    { name: 'GONORRHOEA', abai: 0, belum: 0, daftarKes: 2, daftarNotifikasi: 0, total: 2 },
    { name: 'HFMD', abai: 1, belum: 0, daftarKes: 12, daftarNotifikasi: 0, total: 13 },
    { name: 'HIV/AIDS', abai: 0, belum: 0, daftarKes: 0, daftarNotifikasi: 3, total: 3 },
    { name: 'LEPTOSPIROSIS', abai: 2, belum: 0, daftarKes: 2, daftarNotifikasi: 0, total: 4 },
    { name: 'MEASLES', abai: 0, belum: 0, daftarKes: 0, daftarNotifikasi: 1, total: 1 },
    { name: 'MERS-COV', abai: 1, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 1 },
    { name: 'PERTUSSIS', abai: 1, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 1 },
    { name: 'SYPHILIS', abai: 1, belum: 0, daftarKes: 2, daftarNotifikasi: 0, total: 3 },
    { name: 'TUBERCULOSIS', abai: 5, belum: 0, daftarKes: 8, daftarNotifikasi: 0, total: 13 },
    { name: 'VIRAL HEPATITIS', abai: 0, belum: 0, daftarKes: 61, daftarNotifikasi: 0, total: 61 },
  ],
  '3': [
    { name: 'COVID-19', abai: 0, belum: 0, daftarKes: 3, daftarNotifikasi: 0, total: 3 },
    { name: 'DENGUE/DHF', abai: 17, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 17 },
    { name: 'DYSENTRY', abai: 2, belum: 0, daftarKes: 1, daftarNotifikasi: 0, total: 3 },
    { name: 'FOOD POISONING', abai: 0, belum: 0, daftarKes: 2, daftarNotifikasi: 0, total: 2 },
    { name: 'GONORRHOEA', abai: 0, belum: 0, daftarKes: 1, daftarNotifikasi: 0, total: 1 },
    { name: 'HFMD', abai: 1, belum: 0, daftarKes: 16, daftarNotifikasi: 0, total: 17 },
    { name: 'HIV/AIDS', abai: 0, belum: 0, daftarKes: 0, daftarNotifikasi: 1, total: 1 },
    { name: 'LEPTOSPIROSIS', abai: 1, belum: 0, daftarKes: 1, daftarNotifikasi: 0, total: 2 },
    { name: 'MALARIA', abai: 1, belum: 0, daftarKes: 1, daftarNotifikasi: 0, total: 2 },
    { name: 'MERS-COV', abai: 3, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 3 },
    { name: 'PERTUSSIS', abai: 2, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 2 },
    { name: 'RABIES', abai: 1, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 1 },
    { name: 'SYPHILIS', abai: 1, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 1 },
    { name: 'TUBERCULOSIS', abai: 24, belum: 0, daftarKes: 2, daftarNotifikasi: 0, total: 26 },
    { name: 'VIRAL HEPATITIS', abai: 0, belum: 0, daftarKes: 15, daftarNotifikasi: 1, total: 16 },
  ],
  '4': [
    { name: 'COVID-19', abai: 0, belum: 0, daftarKes: 1, daftarNotifikasi: 0, total: 1 },
    { name: 'DENGUE/DHF', abai: 9, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 9 },
    { name: 'DYSENTRY', abai: 4, belum: 0, daftarKes: 1, daftarNotifikasi: 0, total: 5 },
    { name: 'FOOD POISONING', abai: 3, belum: 0, daftarKes: 8, daftarNotifikasi: 0, total: 11 },
    { name: 'GONORRHOEA', abai: 0, belum: 0, daftarKes: 1, daftarNotifikasi: 0, total: 1 },
    { name: 'HFMD', abai: 2, belum: 0, daftarKes: 20, daftarNotifikasi: 0, total: 22 },
    { name: 'MEASLES', abai: 0, belum: 0, daftarKes: 0, daftarNotifikasi: 1, total: 1 },
    { name: 'MERS-COV', abai: 2, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 2 },
    { name: 'SYPHILIS', abai: 1, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 1 },
    { name: 'TUBERCULOSIS', abai: 23, belum: 0, daftarKes: 2, daftarNotifikasi: 0, total: 25 },
    { name: 'VIRAL HEPATITIS', abai: 0, belum: 0, daftarKes: 2, daftarNotifikasi: 0, total: 2 },
  ],
  '5': [
    { name: 'DENGUE/DHF', abai: 12, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 12 },
    { name: 'DYSENTRY', abai: 3, belum: 0, daftarKes: 1, daftarNotifikasi: 0, total: 4 },
    { name: 'FOOD POISONING', abai: 0, belum: 0, daftarKes: 7, daftarNotifikasi: 0, total: 7 },
    { name: 'GONORRHOEA', abai: 0, belum: 0, daftarKes: 2, daftarNotifikasi: 0, total: 2 },
    { name: 'HFMD', abai: 0, belum: 0, daftarKes: 14, daftarNotifikasi: 0, total: 14 },
    { name: 'HIV/AIDS', abai: 1, belum: 0, daftarKes: 0, daftarNotifikasi: 1, total: 2 },
    { name: 'LEPTOSPIROSIS', abai: 0, belum: 0, daftarKes: 2, daftarNotifikasi: 0, total: 2 },
    { name: 'MEASLES', abai: 1, belum: 0, daftarKes: 0, daftarNotifikasi: 4, total: 5 },
    { name: 'PERTUSSIS', abai: 1, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 1 },
    { name: 'SYPHILIS', abai: 0, belum: 0, daftarKes: 1, daftarNotifikasi: 0, total: 1 },
    { name: 'TUBERCULOSIS', abai: 20, belum: 0, daftarKes: 2, daftarNotifikasi: 0, total: 22 },
    { name: 'VIRAL HEPATITIS', abai: 1, belum: 0, daftarKes: 1, daftarNotifikasi: 0, total: 2 },
  ],
  '6': [
    { name: 'COVID-19', abai: 0, belum: 0, daftarKes: 2, daftarNotifikasi: 0, total: 2 },
    { name: 'DENGUE/DHF', abai: 17, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 17 },
    { name: 'DYSENTRY', abai: 3, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 3 },
    { name: 'FOOD POISONING', abai: 1, belum: 0, daftarKes: 5, daftarNotifikasi: 0, total: 6 },
    { name: 'GONORRHOEA', abai: 0, belum: 0, daftarKes: 1, daftarNotifikasi: 0, total: 1 },
    { name: 'HFMD', abai: 2, belum: 0, daftarKes: 12, daftarNotifikasi: 0, total: 14 },
    { name: 'HIV/AIDS', abai: 1, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 1 },
    { name: 'SYPHILIS', abai: 2, belum: 0, daftarKes: 1, daftarNotifikasi: 0, total: 3 },
    { name: 'TUBERCULOSIS', abai: 39, belum: 0, daftarKes: 9, daftarNotifikasi: 0, total: 48 },
    { name: 'VIRAL HEPATITIS', abai: 0, belum: 0, daftarKes: 0, daftarNotifikasi: 1, total: 1 },
  ],
  '7': [
    { name: 'AVIAN INFLUENZA', abai: 3, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 3 },
    { name: 'DENGUE/DHF', abai: 7, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 7 },
    { name: 'DYSENTRY', abai: 1, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 1 },
    { name: 'FOOD POISONING', abai: 2, belum: 0, daftarKes: 1, daftarNotifikasi: 0, total: 3 },
    { name: 'GONORRHOEA', abai: 0, belum: 0, daftarKes: 1, daftarNotifikasi: 0, total: 1 },
    { name: 'HFMD', abai: 1, belum: 0, daftarKes: 12, daftarNotifikasi: 0, total: 13 },
    { name: 'HIV/AIDS', abai: 0, belum: 0, daftarKes: 0, daftarNotifikasi: 2, total: 2 },
    { name: 'LEPTOSPIROSIS', abai: 1, belum: 0, daftarKes: 2, daftarNotifikasi: 0, total: 3 },
    { name: 'MEASLES', abai: 0, belum: 0, daftarKes: 0, daftarNotifikasi: 2, total: 2 },
    { name: 'SYPHILIS', abai: 4, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 4 },
    { name: 'TUBERCULOSIS', abai: 10, belum: 0, daftarKes: 3, daftarNotifikasi: 0, total: 13 },
    { name: 'VIRAL HEPATITIS', abai: 1, belum: 0, daftarKes: 0, daftarNotifikasi: 1, total: 2 },
  ],
  '8': [
    { name: 'COVID-19', abai: 0, belum: 0, daftarKes: 1, daftarNotifikasi: 0, total: 1 },
    { name: 'DENGUE/DHF', abai: 21, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 21 },
    { name: 'DYSENTRY', abai: 3, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 3 },
    { name: 'FOOD POISONING', abai: 11, belum: 0, daftarKes: 84, daftarNotifikasi: 0, total: 95 },
    { name: 'GONORRHOEA', abai: 1, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 1 },
    { name: 'HFMD', abai: 3, belum: 0, daftarKes: 21, daftarNotifikasi: 0, total: 24 },
    { name: 'HIV/AIDS', abai: 1, belum: 0, daftarKes: 0, daftarNotifikasi: 1, total: 2 },
    { name: 'LEPTOSPIROSIS', abai: 4, belum: 0, daftarKes: 1, daftarNotifikasi: 0, total: 5 },
    { name: 'MEASLES', abai: 0, belum: 0, daftarKes: 0, daftarNotifikasi: 1, total: 1 },
    { name: 'TUBERCULOSIS', abai: 19, belum: 0, daftarKes: 3, daftarNotifikasi: 2, total: 24 },
    { name: 'VIRAL HEPATITIS', abai: 1, belum: 0, daftarKes: 3, daftarNotifikasi: 1, total: 5 },
  ],
  '9': [
    { name: 'COVID-19', abai: 0, belum: 0, daftarKes: 1, daftarNotifikasi: 0, total: 1 },
    { name: 'DENGUE/DHF', abai: 9, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 9 },
    { name: 'DYSENTRY', abai: 1, belum: 0, daftarKes: 1, daftarNotifikasi: 0, total: 2 },
    { name: 'FOOD POISONING', abai: 6, belum: 0, daftarKes: 22, daftarNotifikasi: 0, total: 28 },
    { name: 'GONORRHOEA', abai: 0, belum: 0, daftarKes: 1, daftarNotifikasi: 0, total: 1 },
    { name: 'HFMD', abai: 3, belum: 0, daftarKes: 14, daftarNotifikasi: 0, total: 17 },
    { name: 'HIV/AIDS', abai: 0, belum: 0, daftarKes: 0, daftarNotifikasi: 1, total: 1 },
    { name: 'MEASLES', abai: 0, belum: 0, daftarKes: 0, daftarNotifikasi: 1, total: 1 },
    { name: 'PERTUSSIS', abai: 1, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 1 },
    { name: 'RABIES', abai: 2, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 2 },
    { name: 'SYPHILIS', abai: 1, belum: 0, daftarKes: 2, daftarNotifikasi: 0, total: 3 },
    { name: 'TUBERCULOSIS', abai: 19, belum: 0, daftarKes: 2, daftarNotifikasi: 10, total: 31 },
    { name: 'VIRAL HEPATITIS', abai: 0, belum: 0, daftarKes: 2, daftarNotifikasi: 1, total: 3 },
  ],
  '10': [
    { name: 'CHIKUNGUNYA', abai: 1, belum: 0, daftarKes: 0, daftarNotifikasi: 0, total: 1 },
    { name: 'DENGUE/DHF', abai: 7, belum: 1, daftarKes: 0, daftarNotifikasi: 0, total: 8 },
    { name: 'DYSENTRY', abai: 0, belum: 0, daftarKes: 0, daftarNotifikasi: 2, total: 2 },
    { name: 'FOOD POISONING', abai: 0, belum: 0, daftarKes: 5, daftarNotifikasi: 0, total: 5 },
    { name: 'HFMD', abai: 0, belum: 0, daftarKes: 13, daftarNotifikasi: 0, total: 13 },
    { name: 'HIV/AIDS', abai: 1, belum: 0, daftarKes: 0, daftarNotifikasi: 2, total: 3 },
    { name: 'SYPHILIS', abai: 0, belum: 0, daftarKes: 0, daftarNotifikasi: 1, total: 1 },
    { name: 'TUBERCULOSIS', abai: 1, belum: 0, daftarKes: 0, daftarNotifikasi: 19, total: 20 },
    { name: 'VIRAL HEPATITIS', abai: 0, belum: 0, daftarKes: 1, daftarNotifikasi: 1, total: 2 },
  ],
};

const STATUS_COLORS = {
  daftarKes: '#10b981', // Green
  daftarNotifikasi: '#3b82f6', // Blue
  belum: '#f59e0b', // Yellow
  abai: '#ef4444', // Red
};

// --- Filter Options ---
const EPID_WEEKS = ['All', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '51', '53'];
const SUB_DIAGNOSES = ['All', 'AIDS', 'CHIKUNGUNYA', 'COVID-19', 'DENGUE FEVER', 'DENGUE HAEMORRHAGIC FEVER', 'DIPHTERIA', 'DYSENTRY', 'FOOD POISONING', 'GONORRHOEA', 'HFMD', 'HIV', 'LEPTOSPIROSIS', 'MALARIA', 'MEASLES', 'MERS-COV', 'PERTUSSIS', 'RABIES', 'SYPHILIS', 'TUBERCULOSIS', 'TYPHOID/PARATYPHOID', 'VIRAL HEPATITIS'];
// We keep these mapping values exact to handle your CSV correctly
const SEBAB_BATAL = ['All', 'Duplikasi Notifikasi', 'Salah Diagnosa', 'Bukan Kes Notifikasi', 'Lain-lain'];

// --- Reusable Components ---

const Card = ({ children, className = '', ...props }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, className = '' }) => (
  <div className={`p-5 border-b border-slate-100 flex items-center justify-between ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children }) => (
  <h3 className="font-semibold text-slate-800 text-lg">{children}</h3>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-5 ${className}`}>
    {children}
  </div>
);

// --- Simple CSV Parser ---
// Handles commas inside quotes correctly
function parseCSVRow(str) {
  let result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (char === '"' && str[i + 1] === '"') {
      current += '"';
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

// --- Main Dashboard Component ---

export default function Dashboard() {
  const [filters, setFilters] = useState({
    subDiagnosis: 'All',
    epidMinggu: 'All',
    sebabBatal: 'All'
  });

  // State for raw CSV dataset
  const [rawSheet1Data, setRawSheet1Data] = useState([]);
  const [isCsvLoaded, setIsCsvLoaded] = useState(false);
  const fileInputRef = useRef(null);

  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // State for the drill-down modal connected to Sheet1
  const [drillDownData, setDrillDownData] = useState(null);

  // State for KPI drill-down modal (Diagnosis Breakdown)
  const [kpiDrillDown, setKpiDrillDown] = useState(null);

  // State for refresh animation
  const [isRefreshing, setIsRefreshing] = useState(false);

  // State to track which Abai Notifikasi row is showing its reason
  const [visibleReasonRow, setVisibleReasonRow] = useState(null);

  // File Upload Handler for Sheet1.csv
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target.result;
      const lines = text.split(/\r?\n/);
      if (lines.length < 2) return;

      const headers = parseCSVRow(lines[0]).map(h => h.trim());

      // Identify correct column indexes based on real Sheet1 headers
      // We keep the malay strings here because the CSV file headers will still be in Malay
      const diagIdx = headers.indexOf('Diagnosis');
      const nameIdx = headers.indexOf('Nama Pesakit');
      const statusIdx = headers.indexOf('Notifikasi Status');
      const facilityIdx = headers.indexOf('Kemudahan Kesihatan');
      const weekIdx = headers.indexOf('Epid Minggu (Tkh Notifikasi)');
      const notisIdx = headers.indexOf('Notifikasi no');
      const sebabBatalIdx = headers.indexOf('Sebab-sebab Batal/Abai');
      const kpIdx = headers.indexOf('No Pengenalan/No Dokumen Perjalanan Pesakit');

      const parsedData = [];
      // Start from 1 to skip header
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue; // skip empty lines
        const cols = parseCSVRow(lines[i]);

        parsedData.push({
          diagnosis: cols[diagIdx],
          namaPesakit: cols[nameIdx],
          notifikasiStatus: cols[statusIdx],
          kemudahanKesihatan: cols[facilityIdx],
          epidMingguInput: cols[weekIdx] ? cols[weekIdx].replace('.0', '') : '', // clean up '2.0' to '2'
          notifikasiNo: cols[notisIdx],
          sebabBatal: cols[sebabBatalIdx] || 'No information recorded',
          noKPPesakit: cols[kpIdx]
        });
      }

      setRawSheet1Data(parsedData);
      setIsCsvLoaded(true);
    };
    reader.readAsText(file);
  };

  // Aggregated calculations based on selected filters
  const currentData = useMemo(() => {
    let baseData = [];
    if (filters.epidMinggu === 'All') {
      baseData = totalData;
    } else {
      // Pull exactly the week the user selected
      baseData = weeklyData[filters.epidMinggu] || [];
    }

    return baseData.filter(row => {
      if (filters.subDiagnosis !== 'All') {
        const sub = filters.subDiagnosis;
        const name = row.name;
        if ((sub === 'AIDS' || sub === 'HIV') && name !== 'HIV/AIDS') return false;
        if ((sub === 'DENGUE FEVER' || sub === 'DENGUE HAEMORRHAGIC FEVER') && name !== 'DENGUE/DHF') return false;
        if (!['AIDS', 'HIV', 'DENGUE FEVER', 'DENGUE HAEMORRHAGIC FEVER'].includes(sub) && name !== sub) return false;
      }

      if (filters.sebabBatal !== 'All' && row.abai === 0) {
        return false;
      }
      return true;
    }).map(row => {
      if (filters.sebabBatal !== 'All') {
        return { ...row, daftarKes: 0, daftarNotifikasi: 0, belum: 0, total: row.abai };
      }
      return row;
    });
  }, [filters]);

  const summary = useMemo(() => {
    return currentData.reduce((acc, curr) => ({
      total: acc.total + curr.total,
      abai: acc.abai + curr.abai,
      belum: acc.belum + curr.belum,
      daftarKes: acc.daftarKes + curr.daftarKes,
      daftarNotifikasi: acc.daftarNotifikasi + curr.daftarNotifikasi,
    }), { total: 0, abai: 0, belum: 0, daftarKes: 0, daftarNotifikasi: 0 });
  }, [currentData]);

  const pieData = useMemo(() => {
    // We add rawName to help map the English UI selection back to the Malay CSV string later
    return [
      { name: 'Registered Cases', value: summary.daftarKes, rawName: 'Daftar Kes' },
      { name: 'Registered Notifications', value: summary.daftarNotifikasi, rawName: 'Daftar Notifikasi' },
      { name: 'Ignored Notifications', value: summary.abai, rawName: 'Abai Notifikasi' },
      { name: 'Pending Action', value: summary.belum, rawName: 'Belum Ambil Tindakan' },
    ].filter(d => d.value > 0);
  }, [summary]);

  const topDiseases = useMemo(() => {
    return [...currentData].sort((a, b) => b.total - a.total).slice(0, 10);
  }, [currentData]);

  // Handle KPI Card Click to show breakdown by diagnosis
  const handleKpiClick = (type, title) => {
    const details = [];
    currentData.forEach(row => {
      let count = 0;
      if (type === 'total') count = row.total;
      else if (type === 'daftar') count = row.daftarKes + row.daftarNotifikasi;
      else if (type === 'belum') count = row.belum;
      else if (type === 'abai') count = row.abai;

      if (count > 0) {
        details.push({ diagnosis: row.name, count });
      }
    });

    // Sort from highest to lowest
    details.sort((a, b) => b.count - a.count);

    setKpiDrillDown({
      type,
      title,
      details,
      totalCount: details.reduce((sum, item) => sum + item.count, 0)
    });
  };

  // Handle click on the Ring Chart (Pie Slice) to show raw data for that specific status
  const handleStatusRingClick = (entry) => {
    let matchedRecords = [];

    if (isCsvLoaded) {
      matchedRecords = rawSheet1Data.filter(record => {
        // Week match
        const isWeekMatch = filters.epidMinggu === 'All' ? true : record.epidMingguInput === filters.epidMinggu;

        // Status match (matching against the original CSV string)
        const isStatusMatch = record.notifikasiStatus === entry.rawName;

        // Sub Diagnosis Match
        let isDiagMatch = true;
        if (filters.subDiagnosis !== 'All') {
          const sub = filters.subDiagnosis;
          const recDiag = record.diagnosis ? record.diagnosis.toUpperCase() : '';
          if ((sub === 'AIDS' || sub === 'HIV') && !recDiag.includes('HIV') && !recDiag.includes('AIDS')) isDiagMatch = false;
          else if ((sub === 'DENGUE FEVER' || sub === 'DENGUE HAEMORRHAGIC FEVER') && !recDiag.includes('DENGUE')) isDiagMatch = false;
          else if (!['AIDS', 'HIV', 'DENGUE FEVER', 'DENGUE HAEMORRHAGIC FEVER'].includes(sub) && !recDiag.includes(sub.replace('/DHF', ''))) isDiagMatch = false;
        }

        return isWeekMatch && isStatusMatch && isDiagMatch;
      });
    }

    setVisibleReasonRow(null); // Reset reason visibility
    setDrillDownData({
      diagnosis: `${filters.subDiagnosis === 'All' ? 'All Diseases' : filters.subDiagnosis} (${entry.name})`,
      total: entry.value,
      week: filters.epidMinggu,
      records: matchedRecords,
      isLoaded: isCsvLoaded
    });
  };

  // Handle Patient Search
  const handlePatientSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    if (!isCsvLoaded) {
      setDrillDownData({
        diagnosis: `Search: "${searchQuery}"`,
        total: 0,
        week: 'All',
        records: [],
        isLoaded: false
      });
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const matchedRecords = rawSheet1Data.filter(record => {
      const nameMatch = record.namaPesakit && record.namaPesakit.toLowerCase().includes(query);
      const kpMatch = record.noKPPesakit && record.noKPPesakit.toLowerCase().includes(query);
      return nameMatch || kpMatch;
    });

    setVisibleReasonRow(null);
    setDrillDownData({
      diagnosis: `Search: "${searchQuery}"`,
      total: matchedRecords.length,
      week: 'All',
      records: matchedRecords,
      isLoaded: true
    });
  };

  // Handle Dashboard Refresh (Resets Filters and Search)
  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate a slight delay for visual feedback
    setTimeout(() => {
      setFilters({
        subDiagnosis: 'All',
        epidMinggu: 'All',
        sebabBatal: 'All'
      });
      setSearchQuery('');
      setIsRefreshing(false);
    }, 500);
  };

  // Query actual uploaded data
  const handleDrillDown = (row) => {
    let matchedRecords = [];

    if (isCsvLoaded) {
      // Filter the actual CSV data
      matchedRecords = rawSheet1Data.filter(record => {
        // Diagnosis match (Handling basic formatting differences)
        const isDiagMatch = record.diagnosis && record.diagnosis.toUpperCase().includes(row.name.replace('/DHF', '').replace('/AIDS', ''));

        // Week match
        const isWeekMatch = filters.epidMinggu === 'All' ? true : record.epidMingguInput === filters.epidMinggu;

        return isDiagMatch && isWeekMatch;
      });
    }

    setVisibleReasonRow(null); // Reset reason visibility
    setDrillDownData({
      diagnosis: row.name,
      total: row.total,
      week: filters.epidMinggu,
      records: matchedRecords,
      isLoaded: isCsvLoaded
    });
  };

  // Query actual uploaded data for Sub-KPI Drill Down (Filters by status)
  const handleSubKpiDrillDown = (diagnosis, count, kpiType) => {
    let matchedRecords = [];

    if (isCsvLoaded) {
      matchedRecords = rawSheet1Data.filter(record => {
        let isDiagMatch = true;
        // Check if searching for a specific diagnosis or 'All' (Grand Total clicked)
        if (diagnosis !== 'All') {
          isDiagMatch = record.diagnosis && record.diagnosis.toUpperCase().includes(diagnosis.replace('/DHF', '').replace('/AIDS', ''));
        } else if (filters.subDiagnosis !== 'All') {
          // If 'All' was clicked, we still need to respect global Sub Diagnosis filter if active
          const sub = filters.subDiagnosis;
          const recDiag = record.diagnosis ? record.diagnosis.toUpperCase() : '';
          if ((sub === 'AIDS' || sub === 'HIV') && !recDiag.includes('HIV') && !recDiag.includes('AIDS')) isDiagMatch = false;
          else if ((sub === 'DENGUE FEVER' || sub === 'DENGUE HAEMORRHAGIC FEVER') && !recDiag.includes('DENGUE')) isDiagMatch = false;
          else if (!['AIDS', 'HIV', 'DENGUE FEVER', 'DENGUE HAEMORRHAGIC FEVER'].includes(sub) && !recDiag.includes(sub.replace('/DHF', ''))) isDiagMatch = false;
        }

        const isWeekMatch = filters.epidMinggu === 'All' ? true : record.epidMingguInput === filters.epidMinggu;

        // Status match based on the KPI card clicked (Matches CSV native language)
        let isStatusMatch = true;
        if (kpiType === 'abai') isStatusMatch = record.notifikasiStatus === 'Abai Notifikasi';
        if (kpiType === 'belum') isStatusMatch = record.notifikasiStatus === 'Belum Ambil Tindakan';
        if (kpiType === 'daftar') isStatusMatch = record.notifikasiStatus === 'Daftar Kes' || record.notifikasiStatus === 'Daftar Notifikasi';

        return isDiagMatch && isWeekMatch && isStatusMatch;
      });
    }

    // Give a clearer title based on the filter
    let statusLabel = '';
    if (kpiType === 'abai') statusLabel = ' (Ignored Notifications)';
    if (kpiType === 'belum') statusLabel = ' (Pending Action)';
    if (kpiType === 'daftar') statusLabel = ' (Registered)';

    const diagLabel = diagnosis === 'All' ? (filters.subDiagnosis === 'All' ? 'All Diseases' : filters.subDiagnosis) : diagnosis;

    setVisibleReasonRow(null); // Reset reason visibility
    setDrillDownData({
      diagnosis: diagLabel + statusLabel,
      total: count,
      week: filters.epidMinggu,
      records: matchedRecords,
      isLoaded: isCsvLoaded
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-900">

      {/* Header Section */}
      <div className="flex flex-col mb-8 gap-4">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">DISEASE NOTIFICATION DATA BY EPID WEEK</h1>
            <p className="text-slate-500 mt-1 flex items-center gap-2">
              <MapPin size={16} /> Kangar District Health Office, Perlis |
              <span className="font-medium">
                {filters.epidMinggu === 'All' ? 'Overall Data' : `Epid Week ${filters.epidMinggu}`}
              </span>
            </p>
          </div>

          {/* Action Buttons Container */}
          <div className="flex flex-wrap items-center gap-3">

            {/* Search Box */}
            <form onSubmit={handlePatientSearch} className="flex items-center mr-2">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search Name / ID No..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-56 md:w-64"
                />
              </div>
              <button
                type="submit"
                className="ml-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </form>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              className="bg-white border border-slate-200 p-2.5 rounded-lg shadow-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Refresh Dashboard (Reset Filters)"
            >
              <RefreshCw size={20} className={isRefreshing ? "animate-spin text-blue-600" : ""} />
            </button>

            {/* Real Data Uploader */}
            <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-sm flex items-center gap-3">
              <div className={`p-2 rounded-full ${isCsvLoaded ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                {isCsvLoaded ? <Check size={20} /> : <Upload size={20} />}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  {isCsvLoaded ? 'Sheet1 Successfully Uploaded' : 'Actual Data Link (Sheet1)'}
                </p>
                {isCsvLoaded ? (
                  <p className="text-xs text-slate-500">{rawSheet1Data.length} patient records ready to be displayed.</p>
                ) : (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs text-blue-600 hover:underline font-medium"
                  >
                    Upload Sheet1.csv now
                  </button>
                )}
              </div>
              <input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <Card className="bg-white p-4 mt-2 border-slate-200 shadow-sm">
          <div className="flex items-center mb-4 border-b border-slate-100 pb-2">
            <Filter size={20} className="text-blue-600" title="Report Filters" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Filter 1: Sub Diagnosis */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sub Diagnosis</label>
              <select
                value={filters.subDiagnosis}
                onChange={(e) => setFilters({ ...filters, subDiagnosis: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors focus:outline-none cursor-pointer"
              >
                {SUB_DIAGNOSES.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

            {/* Filter 2: Epid Minggu */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Epid Week (Notification Date)</label>
              <select
                value={filters.epidMinggu}
                onChange={(e) => setFilters({ ...filters, epidMinggu: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors focus:outline-none cursor-pointer"
              >
                {EPID_WEEKS.map(opt => <option key={opt} value={opt}>{opt === 'All' ? '(All)' : `Week ${opt}`}</option>)}
              </select>
            </div>

            {/* Filter 3: Sebab Batal/Abai */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cancellation/Ignored Reasons</label>
              <select
                value={filters.sebabBatal}
                onChange={(e) => setFilters({ ...filters, sebabBatal: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-lg text-sm bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors focus:outline-none cursor-pointer"
              >
                {SEBAB_BATAL.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>

          </div>
        </Card>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card
          className="cursor-pointer hover:shadow-md hover:border-blue-300 transition-all hover:-translate-y-1"
          onClick={() => handleKpiClick('total', 'Total Notifications')}
          title="Click to view breakdown by diagnosis"
        >
          <CardContent className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Notifications</p>
              <h2 className="text-3xl font-bold text-slate-800">{summary.total}</h2>
            </div>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-md hover:border-emerald-300 transition-all hover:-translate-y-1"
          onClick={() => handleKpiClick('daftar', 'Registered (Cases/Notices)')}
          title="Click to view breakdown by diagnosis"
        >
          <CardContent className="flex items-center gap-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-lg">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Registered (Cases/Notices)</p>
              <h2 className="text-3xl font-bold text-slate-800">{summary.daftarKes + summary.daftarNotifikasi}</h2>
            </div>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-md hover:border-amber-300 transition-all hover:-translate-y-1"
          onClick={() => handleKpiClick('belum', 'Pending Action')}
          title="Click to view breakdown by diagnosis"
        >
          <CardContent className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-lg">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Pending Action</p>
              <h2 className="text-3xl font-bold text-slate-800">{summary.belum}</h2>
            </div>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-md hover:border-red-300 transition-all hover:-translate-y-1"
          onClick={() => handleKpiClick('abai', 'Ignored Notifications')}
          title="Click to view breakdown by diagnosis"
        >
          <CardContent className="flex items-center gap-4">
            <div className="p-3 bg-red-100 text-red-600 rounded-lg">
              <AlertTriangle size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Ignored Notifications</p>
              <h2 className="text-3xl font-bold text-slate-800">{summary.abai}</h2>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

        {/* Main Bar Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top Diseases</CardTitle>
          </CardHeader>
          <CardContent>
            {currentData.length > 0 ? (
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topDiseases} margin={{ top: 20, right: 30, left: 0, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#64748b' }}
                      angle={-45}
                      textAnchor="end"
                    />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <Tooltip
                      cursor={{ fill: '#f1f5f9' }}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }} />
                    <Bar dataKey="daftarKes" name="Registered Cases" stackId="a" fill={STATUS_COLORS.daftarKes} radius={[0, 0, 4, 4]} />
                    <Bar dataKey="daftarNotifikasi" name="Registered Notifications" stackId="a" fill={STATUS_COLORS.daftarNotifikasi} />
                    <Bar dataKey="belum" name="Pending Action" stackId="a" fill={STATUS_COLORS.belum} />
                    <Bar dataKey="abai" name="Ignored" stackId="a" fill={STATUS_COLORS.abai} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-80 w-full flex items-center justify-center text-slate-400 font-medium">
                No records found for this selection.
              </div>
            )}
          </CardContent>
        </Card>

        {/* Status Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Status</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            {pieData.length > 0 ? (
              <>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                        className="cursor-pointer hover:opacity-80 transition-opacity outline-none"
                        onClick={handleStatusRingClick}
                      >
                        {pieData.map((entry, index) => {
                          let color = STATUS_COLORS.daftarKes;
                          if (entry.rawName === 'Daftar Notifikasi') color = STATUS_COLORS.daftarNotifikasi;
                          if (entry.rawName === 'Belum Ambil Tindakan') color = STATUS_COLORS.belum;
                          if (entry.rawName === 'Abai Notifikasi') color = STATUS_COLORS.abai;
                          return (
                            <Cell
                              key={`cell-${index}`}
                              fill={color}
                              className="cursor-pointer outline-none"
                              title="Click to view patient records"
                            />
                          );
                        })}
                      </Pie>
                      <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                {/* Custom Legend for Pie - Now Clickable */}
                <div className="w-full grid grid-cols-2 gap-2 mt-4 text-xs text-slate-600">
                  {pieData.map((item, idx) => {
                    let color = STATUS_COLORS.daftarKes;
                    if (item.rawName === 'Daftar Notifikasi') color = STATUS_COLORS.daftarNotifikasi;
                    if (item.rawName === 'Belum Ambil Tindakan') color = STATUS_COLORS.belum;
                    if (item.rawName === 'Abai Notifikasi') color = STATUS_COLORS.abai;
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-1.5 rounded transition-colors"
                        onClick={() => handleStatusRingClick(item)}
                        title="Click to view patient list"
                      >
                        <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: color }}></span>
                        <span className="hover:underline font-medium">{item.name} ({item.value})</span>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="h-64 w-full flex items-center justify-center text-slate-400 font-medium">
                No records found for pie chart.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Data Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center">
            <FileText size={20} className="text-blue-600" title="Detailed Data Table" />
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          {currentData.length > 0 ? (
            <table className="w-full text-sm text-left text-slate-600">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-y border-slate-200">
                <tr>
                  <th scope="col" className="px-6 py-3">Diagnosis</th>
                  <th scope="col" className="px-6 py-3 text-center">Registered Cases</th>
                  <th scope="col" className="px-6 py-3 text-center">Registered Notifications</th>
                  <th scope="col" className="px-6 py-3 text-center">Pending Action</th>
                  <th scope="col" className="px-6 py-3 text-center">Ignored Notifications</th>
                  <th scope="col" className="px-6 py-3 text-center font-bold text-slate-800">Total</th>
                </tr>
              </thead>
              <tbody>
                {currentData.sort((a, b) => b.total - a.total).map((row, idx) => (
                  <tr key={idx} className="bg-white border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-6 py-3 font-medium text-slate-800 whitespace-nowrap">
                      {row.name}
                    </td>
                    <td className="px-6 py-3 text-center">
                      {row.daftarKes > 0 ? <span className="text-emerald-600 font-medium">{row.daftarKes}</span> : '-'}
                    </td>
                    <td className="px-6 py-3 text-center">
                      {row.daftarNotifikasi > 0 ? <span className="text-blue-600 font-medium">{row.daftarNotifikasi}</span> : '-'}
                    </td>
                    <td className="px-6 py-3 text-center">
                      {row.belum > 0 ? <span className="text-amber-500 font-medium bg-amber-50 px-2 py-1 rounded-full">{row.belum}</span> : '-'}
                    </td>
                    <td className="px-6 py-3 text-center">
                      {row.abai > 0 ? <span className="text-red-500 font-medium">{row.abai}</span> : '-'}
                    </td>
                    <td
                      className="px-6 py-3 text-center font-bold text-blue-600 cursor-pointer hover:underline hover:bg-blue-50 transition-colors"
                      onClick={() => handleDrillDown(row)}
                      title="Click to view actual data"
                    >
                      {row.total}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-slate-500 font-medium">
              Please change the 'Epid Week' selection as data for this week is not loaded in the demo.
            </div>
          )}
        </div>
      </Card>

      {/* Drill Down Modal / Sheet (Linked to REAL Sheet1 Logic) */}
      {drillDownData && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden">

            {/* Modal Header */}
            <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50">
              <div>
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <Database size={20} className={drillDownData.isLoaded ? "text-emerald-600" : "text-amber-600"} />
                  Raw Data Link: {drillDownData.diagnosis}
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  {drillDownData.week === 'All' ? 'Overall' : `Epid Week: ${drillDownData.week}`} | Expected Records: {drillDownData.total}
                </p>
              </div>
              <button
                onClick={() => setDrillDownData(null)}
                className="p-2 rounded-lg hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-0 overflow-auto bg-white flex-1 min-h-[300px]">

              {!drillDownData.isLoaded ? (
                // State: File not uploaded yet
                <div className="flex flex-col items-center justify-center h-full p-12 text-center">
                  <div className="bg-amber-100 p-4 rounded-full mb-4 text-amber-600">
                    <AlertTriangle size={48} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 mb-2">Actual Data Not Found</h4>
                  <p className="text-slate-600 max-w-md mb-6">
                    Because your <span className="font-semibold text-slate-800">Sheet1.csv</span> file is too large, please upload it directly into the system to retrieve the accurate patient records.
                  </p>
                  <button
                    onClick={() => {
                      setDrillDownData(null);
                      fileInputRef.current?.click();
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <Upload size={18} /> Upload Sheet1.csv File
                  </button>
                </div>
              ) : drillDownData.records.length === 0 ? (
                // State: File loaded but no matching records found
                <div className="flex flex-col items-center justify-center h-full p-12 text-center text-slate-500">
                  <p className="mb-2 font-medium">No matching records found in the uploaded file.</p>
                  <p className="text-xs">Please ensure the CSV format is correct and has the expected columns.</p>
                </div>
              ) : (
                // State: File loaded and records found
                <table className="w-full text-sm text-left text-slate-600">
                  <thead className="text-xs text-slate-500 uppercase bg-slate-100 sticky top-0 shadow-sm z-10">
                    <tr>
                      <th className="px-6 py-4">Notification No.</th>
                      <th className="px-6 py-4">Diagnosis</th>
                      <th className="px-6 py-4">Patient Name</th>
                      <th className="px-6 py-4">ID / Travel Document No.</th>
                      <th className="px-6 py-4">Notification Status</th>
                      <th className="px-6 py-4">Health Facility</th>
                      <th className="px-6 py-4 text-center">Week</th>
                    </tr>
                  </thead>
                  <tbody>
                    {drillDownData.records.map((rec, i) => (
                      <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="px-6 py-3 font-medium text-slate-800">{rec.notifikasiNo || '-'}</td>
                        <td className="px-6 py-3">{rec.diagnosis || '-'}</td>
                        <td className="px-6 py-3 font-medium text-slate-700">{rec.namaPesakit || '-'}</td>
                        <td className="px-6 py-3 font-mono text-xs text-slate-600">{rec.noKPPesakit || '-'}</td>
                        <td className="px-6 py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap inline-block
                              ${rec.notifikasiStatus === 'Daftar Kes' ? 'bg-emerald-100 text-emerald-700' :
                                rec.notifikasiStatus === 'Daftar Notifikasi' ? 'bg-blue-100 text-blue-700' :
                                  rec.notifikasiStatus === 'Belum Ambil Tindakan' ? 'bg-amber-100 text-amber-700' :
                                    rec.notifikasiStatus === 'Abai Notifikasi' ? 'bg-red-100 text-red-700 cursor-pointer hover:bg-red-200 transition-colors' :
                                      'bg-slate-100 text-slate-700'}
                            `}
                            onClick={() => {
                              if (rec.notifikasiStatus === 'Abai Notifikasi') {
                                setVisibleReasonRow(visibleReasonRow === i ? null : i);
                              }
                            }}
                            title={rec.notifikasiStatus === 'Abai Notifikasi' ? "Click to view reason" : ""}
                          >
                            {/* We display English UI labels while preserving the raw status CSS logic */}
                            {rec.notifikasiStatus === 'Daftar Kes' ? 'Registered Case' :
                              rec.notifikasiStatus === 'Daftar Notifikasi' ? 'Registered Notification' :
                                rec.notifikasiStatus === 'Belum Ambil Tindakan' ? 'Pending Action' :
                                  rec.notifikasiStatus === 'Abai Notifikasi' ? 'Ignored Notification' :
                                    (rec.notifikasiStatus || '-')}
                          </span>

                          {/* Inline pop-up for Sebab Batal/Abai */}
                          {visibleReasonRow === i && rec.notifikasiStatus === 'Abai Notifikasi' && (
                            <div className="mt-2 text-xs font-semibold text-red-700 bg-red-50 p-2 rounded border border-red-200 shadow-sm">
                              Cancellation Reason: {rec.sebabBatal}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-3 text-xs max-w-[250px] truncate" title={rec.kemudahanKesihatan}>
                          {rec.kemudahanKesihatan || '-'}
                        </td>
                        <td className="px-6 py-3 text-center">ME-{rec.epidMingguInput || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Modal Footer */}
            {drillDownData.isLoaded && (
              <div className="bg-slate-50 border-t border-slate-100 p-3 text-xs text-slate-500 flex justify-between items-center">
                <span>Direct link from file: <b>Sheet1.csv</b></span>
                <span>Total records displayed: <b>{drillDownData.records.length}</b></span>
              </div>
            )}

          </div>
        </div>
      )}

      {/* KPI Breakdown Modal */}
      {kpiDrillDown && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden">

            {/* Modal Header */}
            <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-slate-50">
              <div>
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <Activity size={20} className="text-blue-600" />
                  Breakdown: {kpiDrillDown.title}
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  {filters.epidMinggu === 'All' ? 'Overall Data' : `Epid Week: ${filters.epidMinggu}`} | Total: {kpiDrillDown.totalCount}
                </p>
              </div>
              <button
                onClick={() => setKpiDrillDown(null)}
                className="p-2 rounded-lg hover:bg-slate-200 text-slate-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-0 overflow-auto bg-white flex-1">
              <table className="w-full text-sm text-left text-slate-600">
                <thead className="text-xs text-slate-500 uppercase bg-slate-100 sticky top-0 shadow-sm z-10">
                  <tr>
                    <th className="px-6 py-4">No.</th>
                    <th className="px-6 py-4">Diagnosis</th>
                    <th className="px-6 py-4 text-center">Total Cases</th>
                  </tr>
                </thead>
                <tbody>
                  {kpiDrillDown.details.length > 0 ? (
                    <>
                      {kpiDrillDown.details.map((item, i) => (
                        <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="px-6 py-3 font-medium text-slate-500 w-12">{i + 1}</td>
                          <td className="px-6 py-3 font-medium text-slate-800 uppercase">{item.diagnosis}</td>
                          <td
                            className="px-6 py-3 text-center cursor-pointer group"
                            onClick={() => handleSubKpiDrillDown(item.diagnosis, item.count, kpiDrillDown.type)}
                            title="Click to view details from Sheet1"
                          >
                            <span className="font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full group-hover:bg-blue-100 group-hover:underline transition-all">
                              {item.count}
                            </span>
                          </td>
                        </tr>
                      ))}
                      <tr className="border-t-2 border-slate-200 bg-slate-50">
                        <td colSpan="2" className="px-6 py-4 font-bold text-slate-800 text-right uppercase">
                          Grand Total
                        </td>
                        <td
                          className="px-6 py-4 text-center cursor-pointer group"
                          onClick={() => handleSubKpiDrillDown('All', kpiDrillDown.totalCount, kpiDrillDown.type)}
                          title="Click to view ALL case details from Sheet1"
                        >
                          <span className="font-bold text-blue-600 bg-blue-100 px-4 py-1.5 rounded-full group-hover:bg-blue-200 group-hover:underline transition-all">
                            {kpiDrillDown.totalCount}
                          </span>
                        </td>
                      </tr>
                    </>
                  ) : (
                    <tr>
                      <td colSpan="3" className="px-6 py-8 text-center text-slate-500">
                        No records for this view.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}