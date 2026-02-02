import { useState } from 'react'
import { Upload as UploadIcon, FileText, Shield, Sparkles, Calendar, User } from 'lucide-react'

export function Upload() {
    const [file, setFile] = useState<File | null>(null)
    const [classification, setClassification] = useState('internal')
    const [scanning, setScanning] = useState(false)
    const [scanProgress, setScanProgress] = useState(0)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0]
        if (f) {
            setFile(f)
            setScanning(true)
            // Simulate DLP scan
            let progress = 0
            const interval = setInterval(() => {
                progress += 10
                setScanProgress(progress)
                if (progress >= 100) {
                    clearInterval(interval)
                    setScanning(false)
                }
            }, 200)
        }
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Tải lên tài liệu</h1>
                <p className="text-gray-500">Thêm tài liệu mới vào kho tri thức nội bộ với xác thực tự động.</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
                {/* Left: File upload */}
                <div className="space-y-6">
                    <div className="card">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-900">NGUỒN FILE</h3>
                            {file && <span className="text-sm text-primary-600">{1} File đã chọn</span>}
                        </div>

                        {file ? (
                            <div className="p-4 bg-gray-50 rounded-lg flex items-center gap-4">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                    <FileText className="text-red-500" size={24} />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{file.name}</p>
                                    <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(1)} MB • Vừa tải lên</p>
                                </div>
                            </div>
                        ) : (
                            <label className="block p-8 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-primary-300 transition-colors">
                                <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.docx,.pptx" />
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <UploadIcon className="text-primary-500" size={28} />
                                    </div>
                                    <p className="font-medium text-gray-900">Kéo thả file vào đây</p>
                                    <p className="text-sm text-gray-500">Hỗ trợ PDF, DOCX, PPTX</p>
                                </div>
                            </label>
                        )}
                    </div>

                    {/* DLP Scan */}
                    <div className="card">
                        <div className="flex items-center gap-3 mb-3">
                            <Shield className="text-primary-500" size={20} />
                            <h3 className="font-semibold text-gray-900">Quét bảo mật DLP</h3>
                            {!scanning && scanProgress === 100 && <span className="w-2 h-2 bg-green-500 rounded-full" />}
                        </div>

                        {scanning ? (
                            <>
                                <div className="flex items-center justify-between text-sm mb-2">
                                    <span className="text-gray-500">Đang quét nội dung...</span>
                                    <span className="text-primary-600">{scanProgress}%</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary-500 transition-all" style={{ width: `${scanProgress}%` }} />
                                </div>
                            </>
                        ) : scanProgress === 100 ? (
                            <div className="p-3 bg-green-50 rounded-lg">
                                <p className="text-green-700 font-medium flex items-center gap-2">
                                    ✓ Không phát hiện PII
                                </p>
                                <p className="text-sm text-green-600 mt-1">Số CMND/CCCD và thẻ tín dụng an toàn.</p>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">Tải file lên để bắt đầu quét bảo mật</p>
                        )}
                    </div>

                    {/* AI Suggestion */}
                    {file && (
                        <div className="bg-primary-500 text-white p-4 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles size={18} />
                                <span className="font-medium">Gợi ý từ AI</span>
                            </div>
                            <p className="text-sm text-primary-100">
                                Tài liệu này có vẻ là <strong>Kế hoạch Chiến lược</strong>. Tôi đã tự động gợi ý tag "Chiến lược" trong form.
                            </p>
                        </div>
                    )}
                </div>

                {/* Right: Metadata form */}
                <div className="card">
                    {/* Steps */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center gap-2">
                            <span className="w-6 h-6 bg-primary-500 text-white text-xs rounded-full flex items-center justify-center">1</span>
                            <span className="text-sm font-medium text-primary-600">Thông tin cố định</span>
                        </div>
                        <div className="h-px flex-1 bg-gray-200" />
                        <div className="flex items-center gap-2">
                            <span className="w-6 h-6 bg-gray-200 text-gray-500 text-xs rounded-full flex items-center justify-center">2</span>
                            <span className="text-sm text-gray-400">Tuân thủ</span>
                        </div>
                        <div className="h-px flex-1 bg-gray-200" />
                        <div className="flex items-center gap-2">
                            <span className="w-6 h-6 bg-gray-200 text-gray-500 text-xs rounded-full flex items-center justify-center">3</span>
                            <span className="text-sm text-gray-400">Phân loại</span>
                        </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Thông tin tài liệu</h3>
                    <p className="text-sm text-gray-500 mb-6">Vui lòng xác minh metadata cố định cho tài liệu này.</p>

                    <div className="space-y-5">
                        {/* Owner & Date */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Chủ sở hữu <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input type="text" placeholder="Nguyễn Văn A" className="input-field pl-10" />
                                </div>
                                <p className="text-xs text-gray-400 mt-1">Người chịu trách nhiệm duy trì tài liệu.</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Ngày đánh giá lại <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input type="date" className="input-field pl-10" />
                                </div>
                                <p className="text-xs text-gray-400 mt-1">Ngày cần xác nhận lại tính hợp lệ.</p>
                            </div>
                        </div>

                        {/* Version & Status */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1">Phiên bản hệ thống</label>
                                <p className="font-medium text-gray-900">v1.0 (Khởi tạo)</p>
                            </div>
                            <div>
                                <label className="block text-xs text-gray-500 uppercase tracking-wide mb-1">Trạng thái</label>
                                <span className="inline-flex items-center gap-1.5 text-yellow-600">
                                    <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                                    Nháp (Chưa xuất bản)
                                </span>
                            </div>
                        </div>

                        {/* Classification */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phân loại dữ liệu <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { key: 'public', label: 'Công khai', desc: 'An toàn để chia sẻ bên ngoài.' },
                                    { key: 'internal', label: 'Nội bộ', desc: 'Chỉ nhân viên truy cập.' },
                                    { key: 'confidential', label: 'Bí mật', desc: 'Chỉ lãnh đạo truy cập.' },
                                ].map((cls) => (
                                    <button
                                        key={cls.key}
                                        onClick={() => setClassification(cls.key)}
                                        className={`p-4 rounded-lg border-2 text-center transition-all ${classification === cls.key
                                                ? 'border-primary-500 bg-primary-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <p className="font-medium text-gray-900">{cls.label}</p>
                                        <p className="text-xs text-gray-500 mt-1">{cls.desc}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t">
                        <button className="text-gray-500 hover:text-gray-700">Hủy</button>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-red-500">⚠ Vui lòng điền Ngày đánh giá lại</span>
                            <button className="btn-primary">Xuất bản →</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
