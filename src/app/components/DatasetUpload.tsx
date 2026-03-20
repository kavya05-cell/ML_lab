import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Database, CheckCircle, AlertCircle } from 'lucide-react';
import { Card } from './ui/card';

interface DatasetUploadProps {
  selectedDataset: string | null;
  onDatasetSelect: (dataset: string) => void;
}

const PRELOADED_DATASETS = [
  {
    name: 'Iris',
    rows: 150,
    columns: 5,
    target: 'species',
    description: 'Classic flower classification dataset'
  },
  {
    name: 'Wine',
    rows: 178,
    columns: 14,
    target: 'wine_type',
    description: 'Wine quality classification'
  },
  {
    name: 'Breast Cancer',
    rows: 569,
    columns: 31,
    target: 'diagnosis',
    description: 'Medical diagnosis classification'
  }
];

export function DatasetUpload({ selectedDataset, onDatasetSelect }: DatasetUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const uploadFile = async (file: File) => {
    setUploading(true);
    setUploadStatus('idle');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:8000/dataset/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setUploadStatus('success');
        onDatasetSelect(file.name);
      } else {
        setUploadStatus('error');
      }
    } catch (error) {
      setUploadStatus('error');
    } finally {
      setUploading(false);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      uploadFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/json': ['.json']
    },
    multiple: false
  });

  return (
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-xl p-5">
      <h3 className="mb-4 font-semibold text-white">Dataset</h3>
      
      {/* Drag & Drop Area */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 mb-4 text-center cursor-pointer transition-all ${
          isDragActive 
            ? 'border-violet-500 bg-violet-500/10' 
            : uploading
            ? 'border-blue-500 bg-blue-500/10'
            : uploadStatus === 'success'
            ? 'border-green-500 bg-green-500/10'
            : uploadStatus === 'error'
            ? 'border-red-500 bg-red-500/10'
            : 'border-slate-700 hover:border-violet-500/50 hover:bg-slate-800/50'
        }`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
            <p className="text-sm text-blue-400">Uploading...</p>
          </div>
        ) : uploadStatus === 'success' ? (
          <div className="flex flex-col items-center">
            <CheckCircle className="w-8 h-8 text-green-400 mb-2" />
            <p className="text-sm text-green-400">Upload successful!</p>
          </div>
        ) : uploadStatus === 'error' ? (
          <div className="flex flex-col items-center">
            <AlertCircle className="w-8 h-8 text-red-400 mb-2" />
            <p className="text-sm text-red-400">Upload failed</p>
          </div>
        ) : (
          <>
            <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
            {isDragActive ? (
              <p className="text-sm text-violet-400">Drop your dataset here...</p>
            ) : (
              <>
                <p className="text-sm text-slate-300 mb-1">Drag & drop your dataset</p>
                <p className="text-xs text-slate-500">or click to browse (CSV or JSON)</p>
              </>
            )}
          </>
        )}
      </div>

      {/* Preloaded Datasets */}
      <div className="mb-4">
        <p className="text-xs text-slate-400 mb-3">Or choose a preloaded dataset:</p>
        <div className="grid grid-cols-1 gap-2">
          {PRELOADED_DATASETS.map((dataset) => (
            <button
              key={dataset.name}
              onClick={() => onDatasetSelect(dataset.name)}
              className={`p-3 rounded-lg border text-left transition-all ${
                selectedDataset === dataset.name
                  ? 'border-violet-500 bg-violet-500/10'
                  : 'border-slate-700/50 hover:border-violet-500/50 hover:bg-slate-800/30'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Database className="w-4 h-4 text-violet-400" />
                    <span className="text-sm font-medium text-slate-200">{dataset.name}</span>
                  </div>
                  <p className="text-xs text-slate-500">{dataset.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Dataset Summary */}
      {selectedDataset && (
        <div className="mt-4 p-3 bg-slate-800/30 rounded-lg border border-slate-700/30">
          <p className="text-xs mb-2 text-slate-400">Dataset Summary</p>
          {PRELOADED_DATASETS.find(d => d.name === selectedDataset) && (
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <p className="text-slate-500">Rows</p>
                <p className="text-slate-200 font-medium">
                  {PRELOADED_DATASETS.find(d => d.name === selectedDataset)?.rows}
                </p>
              </div>
              <div>
                <p className="text-slate-500">Columns</p>
                <p className="text-slate-200 font-medium">
                  {PRELOADED_DATASETS.find(d => d.name === selectedDataset)?.columns}
                </p>
              </div>
              <div>
                <p className="text-slate-500">Target</p>
                <p className="text-slate-200 font-medium">
                  {PRELOADED_DATASETS.find(d => d.name === selectedDataset)?.target}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}