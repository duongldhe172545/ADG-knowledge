import { FileText, AlertTriangle, MessageSquare, Sparkles } from 'lucide-react'

const stats = [
    { label: 'Tổng tài liệu', value: '12,450', change: '+5% tuần này', icon: FileText, color: 'bg-blue-50 text-blue-600' },
    { label: 'Tài liệu hoạt động', value: '8,302', change: '+12% tuần này', icon: FileText, color: 'bg-green-50 text-green-600' },
    { label: 'Cảnh báo Metadata', value: '14', change: 'Cần xử lý', icon: AlertTriangle, color: 'bg-orange-50 text-orange-600', alert: true },
    { label: 'Lượt hỏi AI', value: '1,205', change: '+18% tuần này', icon: MessageSquare, color: 'bg-purple-50 text-purple-600' },
]

const goldenAnswers = [
    { question: 'Chiến lược Q4 D2Com', snippet: 'Chiến lược tập trung vào 3 trụ cột: Giữ chân, Thu hút, và...', dept: 'D2Com' },
    { question: 'Logic giá B2B Tier 3', snippet: 'Giá Tier 3 áp dụng cho đơn hàng trên 5000 sản phẩm...', dept: 'B2B' },
    { question: 'Chính sách đổi trả S2B2C 2024', snippet: 'Đổi trả được xử lý trong 14 ngày kể từ khi nhận hàng...', dept: 'S2B2C' },
    { question: 'Hướng dẫn giọng điệu thương hiệu v2', snippet: 'Giọng điệu cần chuyên nghiệp nhưng gần gũi, tránh thuật ngữ..."', dept: 'MARCOM' },
]

const alerts = [
    { title: '5 tài liệu thiếu tags', desc: 'Các file trong D2Com Repository do User #492 tải lên thiếu metadata bắt buộc.', type: 'warning' },
    { title: 'Xung đột tuân thủ', desc: 'Cập nhật chính sách "GDPR-2024" xung đột với B2B Asset #402.', type: 'error' },
]

export function Dashboard() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Tổng quan Dashboard</h1>
                    <p className="text-gray-500">Trạng thái hệ sinh thái Marketing ADG</p>
                </div>
                <span className="text-sm text-gray-400">Cập nhật: Vừa xong</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="stat-card">
                        <div>
                            <p className="text-sm text-gray-500">{stat.label}</p>
                            <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                            <p className={`text-sm mt-1 ${stat.alert ? 'text-orange-600' : 'text-green-600'}`}>
                                ↗ {stat.change}
                            </p>
                        </div>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-2 gap-6">
                {/* Critical Alerts */}
                <div className="card">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                            <span className="w-2 h-2 bg-orange-500 rounded-full" />
                            Cảnh báo quan trọng
                        </h2>
                        <button className="text-sm text-primary-600 hover:text-primary-700">Xem tất cả</button>
                    </div>
                    <div className="space-y-4">
                        {alerts.map((alert, i) => (
                            <div key={i} className={`p-4 rounded-lg ${alert.type === 'error' ? 'bg-red-50' : 'bg-orange-50'}`}>
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className={alert.type === 'error' ? 'text-red-500' : 'text-orange-500'} size={20} />
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900">{alert.title}</p>
                                        <p className="text-sm text-gray-600 mt-1">{alert.desc}</p>
                                        <button className="text-sm text-primary-600 hover:text-primary-700 mt-2">
                                            {alert.type === 'error' ? 'Giải quyết xung đột →' : 'Xem ngay →'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Golden Answers */}
                <div className="card">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                            Golden Answers gần đây
                            <span className="bg-primary-100 text-primary-600 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Sparkles size={12} /> AI tạo
                            </span>
                        </h2>
                        <button className="text-sm text-primary-600 hover:text-primary-700">Xem kho</button>
                    </div>
                    <div className="space-y-3">
                        {goldenAnswers.map((ga, i) => (
                            <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900">{ga.question}</p>
                                    <p className="text-sm text-gray-500 truncate">{ga.snippet}</p>
                                </div>
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded ml-4">{ga.dept}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
