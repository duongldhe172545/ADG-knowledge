import { useState } from 'react'
import { Send, Paperclip, Mic, FileText, Sparkles, Copy, ThumbsUp, Share2 } from 'lucide-react'

const sources = [
    { id: 1, name: 'Báo cáo Marketing Q3.pdf', size: '2.4 MB', time: '2 giờ trước', active: true },
    { id: 2, name: 'Hướng dẫn thương hiệu 2024.d...', size: '850 KB', time: 'hôm qua', active: true },
    { id: 3, name: 'Phân tích đối thủ.txt', size: '12 KB', time: '3 ngày trước', active: false },
    { id: 4, name: 'Dự báo ngân sách Q4.xlsx', size: '450 KB', time: '1 tuần trước', active: false },
]

const suggestedQueries = [
    'Tóm tắt chiến lược B2B',
    'Liệt kê đối thủ chính',
    'Soạn email từ nội dung này'
]

export function Chat() {
    const [message, setMessage] = useState('')

    return (
        <div className="flex h-[calc(100vh-8rem)] bg-dark-900 -m-6 rounded-xl overflow-hidden">
            {/* Sources sidebar */}
            <div className="w-64 bg-dark-800 border-r border-dark-700 flex flex-col">
                <div className="p-4 border-b border-dark-700">
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-white">Nguồn tài liệu</h3>
                        <span className="text-xs bg-primary-500 text-white px-2 py-0.5 rounded-full">
                            {sources.filter(s => s.active).length} Đang dùng
                        </span>
                    </div>
                </div>

                <button className="mx-4 mt-4 py-2.5 border border-dashed border-dark-600 rounded-lg text-gray-400 hover:text-white hover:border-dark-500 transition-colors flex items-center justify-center gap-2">
                    <span className="text-lg">+</span> Thêm nguồn
                </button>

                <div className="flex-1 p-4 space-y-2 overflow-auto">
                    {sources.map((src) => (
                        <div
                            key={src.id}
                            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${src.active ? 'bg-primary-500/10 border border-primary-500/30' : 'hover:bg-dark-700'
                                }`}
                        >
                            <input type="checkbox" checked={src.active} readOnly className="rounded" />
                            <FileText className={src.active ? 'text-primary-400' : 'text-gray-500'} size={20} />
                            <div className="flex-1 min-w-0">
                                <p className={`text-sm truncate ${src.active ? 'text-white' : 'text-gray-400'}`}>{src.name}</p>
                                <p className="text-xs text-gray-500">{src.size} • Thêm {src.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat area */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-dark-700 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-400">Ngữ cảnh hiện tại:</span>
                        <span className="bg-dark-700 text-white text-sm px-3 py-1 rounded-lg">Marketing B2B</span>
                    </div>
                    <button className="text-sm text-gray-400 hover:text-white">Xem lịch sử</button>
                </div>

                {/* Messages */}
                <div className="flex-1 p-6 overflow-auto space-y-6">
                    {/* User message */}
                    <div className="flex justify-end">
                        <div className="bg-dark-700 text-white px-4 py-3 rounded-2xl rounded-tr-sm max-w-lg">
                            Các điểm chính từ báo cáo Q3 về xu hướng tăng trưởng B2B là gì?
                        </div>
                    </div>

                    {/* AI response */}
                    <div className="flex gap-3">
                        <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Sparkles size={16} className="text-white" />
                        </div>
                        <div className="flex-1 space-y-4">
                            <div className="text-gray-300">
                                <p className="font-medium text-white mb-2">Trợ lý Notebook</p>
                                <p>
                                    Dựa trên <span className="text-primary-400">Báo cáo Marketing Q3</span>, tăng trưởng B2B đã có sự ổn định tích cực ở mức <strong>15% so với cùng kỳ năm trước</strong>. Đây là cải thiện đáng kể so với mức tăng trưởng phẳng của quý trước.
                                </p>
                                <p className="mt-3">
                                    Động lực chính được xác định là chiến dịch email nhắm mục tiêu mới ra mắt cuối tháng 8. <span className="bg-primary-500/20 text-primary-300 px-1 rounded">1</span>
                                </p>
                                <p className="mt-3">
                                    Tuy nhiên, cần lưu ý rằng tỷ lệ rời bỏ doanh nghiệp tăng nhẹ 2.3%, chủ yếu do ma sát trong quá trình onboarding với bản cập nhật dashboard mới. <span className="bg-primary-500/20 text-primary-300 px-1 rounded">2</span>
                                </p>
                            </div>

                            {/* Citation */}
                            <div className="bg-primary-500/10 border-l-2 border-primary-500 px-4 py-3 rounded-r-lg">
                                <p className="text-primary-300 italic">"Tỷ lệ rời bỏ doanh nghiệp vẫn là KPI quan trọng cần theo dõi trong Q4."</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    <span className="text-primary-400 font-medium">TRÍCH DẪN</span> Báo cáo Marketing Q3.pdf • Trang 15
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                                <button className="btn-secondary text-sm py-1.5 flex items-center gap-1">
                                    <Copy size={14} /> Sao chép
                                </button>
                                <button className="btn-secondary text-sm py-1.5 flex items-center gap-1">
                                    <ThumbsUp size={14} /> Hữu ích
                                </button>
                                <button className="btn-secondary text-sm py-1.5 flex items-center gap-1">
                                    <Share2 size={14} /> Chia sẻ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Suggested queries */}
                <div className="px-6 flex gap-2">
                    {suggestedQueries.map((q) => (
                        <button key={q} className="text-sm px-4 py-2 rounded-full border border-dark-600 text-gray-300 hover:bg-dark-700 transition-colors">
                            {q === suggestedQueries[0] && <Sparkles size={14} className="inline mr-1 text-primary-400" />}
                            {q}
                        </button>
                    ))}
                </div>

                {/* Input */}
                <div className="p-4">
                    <div className="relative">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Đặt câu hỏi về các nguồn tài liệu của bạn..."
                            className="w-full bg-dark-700 text-white placeholder-gray-500 px-4 py-4 pr-24 rounded-xl border border-dark-600 focus:border-primary-500 outline-none"
                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                            <button className="p-2 text-gray-500 hover:text-gray-300">
                                <Paperclip size={20} />
                            </button>
                            <button className="p-2 text-gray-500 hover:text-gray-300">
                                <Mic size={20} />
                            </button>
                            <button className="bg-primary-500 hover:bg-primary-600 text-white p-2 rounded-lg">
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 text-center mt-2">AI có thể mắc lỗi. Hãy kiểm tra lại thông tin quan trọng từ nguồn.</p>
                </div>
            </div>
        </div>
    )
}
