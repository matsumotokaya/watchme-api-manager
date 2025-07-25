import { useState } from 'react'
import Button from '../../../components/common/Button'
import FetchPendingFilesButton from '../../../components/common/FetchPendingFilesButton'
import AudioFilesService from '../../../services/AudioFilesService'

export default function BehaviorFeaturesForm({ onSubmit, loading, disabled }) {
  const [filePaths, setFilePaths] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // ファイルパスを配列に変換（改行で分割し、空白を除去）
    const pathsArray = filePaths
      .split('\n')
      .map(path => path.trim())
      .filter(path => path.length > 0)
    
    if (pathsArray.length === 0) {
      alert('少なくとも1つのファイルパスを入力してください')
      return
    }
    
    onSubmit(pathsArray)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="filePaths" className="block text-sm font-medium text-gray-700">
            ファイルパス
          </label>
          <FetchPendingFilesButton
            onFetch={setFilePaths}
            fetchFunction={() => AudioFilesService.getPendingBehaviorFiles()}
            disabled={disabled}
            loading={loading}
          />
        </div>
        <textarea
          id="filePaths"
          value={filePaths}
          onChange={(e) => setFilePaths(e.target.value)}
          placeholder="例: files/d067d407-cf73-4174-a9c1-d91fb60d64d0/2025-07-21/00-30/audio.wav"
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          disabled={disabled || loading}
        />
        <p className="mt-1 text-xs text-gray-500">
          複数のファイルパスを改行で区切って入力できます。不要なパスは削除できます。
        </p>
        <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-xs text-blue-800">
            <span className="font-medium">ℹ️ SED音響イベント検出について：</span>
            音声データから行動パターン（歩く、話す、音楽など）を検出・分類します。
            処理時間は音声の長さや複雑さによって変動します。
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          loading={loading}
          disabled={disabled}
        >
          🎯 行動特徴抽出開始
        </Button>
      </div>
    </form>
  )
}