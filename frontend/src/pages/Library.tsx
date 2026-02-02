import { useState } from 'react'
import { Search, Filter, FileText, FileSpreadsheet, Presentation } from 'lucide-react'

const documents = [
    { id: 1, title: 'Kế hoạch Marketing Q3 2023', type: 'PDF', version: '2.4', size: '1.2 MB', date: '24/10/2023', status: 'Hoạt động', classification: 'Nội bộ' },
    { id: 2, title: 'Hướng dẫn giọng điệu', type: 'DOCX', version: '1.0', size: '450 KB', date: '10/09/2023', status: 'Hoạt động', classification: 'Công khai' },
    { id: 3, title: 'Nháp - Chiến dịch mùa đông', type: 'PPTX', version: '0.8', size: '15 MB', date: '01/11/2023', status: 'Nháp', classification: 'Bí mật' },
    { id: 4, title: 'Phân tích đối thủ Q4', type: 'PDF', version: '1.0', size: '2.4 MB', date: '15/11/2023', status: 'Hoạt động', classification: 'Nội bộ' },
    { id: 5, title: 'Đề xuất ngân sách 2024', type: 'DOCX', version: '0.5', size: '890 KB', date: '02/12/2023', status: 'Nháp', classification: 'Bí mật' },
]

const departments = [
    { name: 'Marketing Tổng', count: 24 },
    { name: 'Tài liệu B2B', count: 12 },
    { name: 'Chiến lược MARCOM', count: 8 },
    { name: 'Truyền thông Nội bộ', count: 45 },
    { name: 'Hướng dẫn Thương hiệu', count: 3 },
]

const getFileIcon = (type: string) => {
    switch (type) {
        case 'PDF': return <FileText className="text-red-500" size={20} />
        case 'DOCX': return <FileText className="text-blue-500" size={20} />
        case 'PPTX': return <Presentation className="text-orange-500" size={20} />
        case 'XLSX': return <FileSpreadsheet className="text-green-500" size={20} />
        default: return <FileText className="text-gray-500" size={20} />
    }
}

const getStatusBadge = (status: string) => {
    const colors = status === 'Hoạt động' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
    return <span className={`text-xs px-2 py-1 rounded ${colors}`}>{status}</span>
}

const getClassBadge = (cls: string) => {
    const colors = cls === 'Công khai' ? 'bg-blue-100 text-blue-700' : cls === 'Nội bộ' ? 'bg-gray-100 text-gray-700' : 'bg-red-100 text-red-700'
    return <span className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${colors}`}>🔒 {cls}</span>
}

export function Library() {
    const [selected, setSelected] = useState<number[]>([])

    const toggleSelect = (id: number) => {
        setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
    }

    return (
        <div className="flex gap-6">
            {/* Sidebar */}
            <div className="w-56 flex-shrink-0">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Phòng ban</h3>
                <div className="space-y-1">
                    {departments.map((dept) => (
                        <button
                            key={dept.name}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 text-sm text-gray-700"
                        >
                            <span>{dept.name}</span>
                            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{dept.count}</span>
                        </button>
                    ))}
                </div>

                <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase font-medium">Dung lượng</p>
                    <div className="mt-2 h-2 bg-blue-200 rounded-full">
                        <div className="h-full w-3/4 bg-blue-500 rounded-full" />
                    </div>
                    <p className="text-sm text-gray-600 mt-2">75% của 10GB đã dùng</p>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1">
                <div className="card">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">Chọn nguồn tài liệu</h2>
                            <p className="text-sm text-gray-500">Chọn tài liệu từ Marketing Tổng để đưa vào ngữ cảnh chat AI.</p>
                        </div>
                    </div>

                    {/* Search & Filters */}
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Tìm theo tiêu đề, từ khóa, hoặc ID..."
                                className="input-field pl-10"
                            />
                        </div>
                        <select className="input-field w-auto">
                            <option>Tất cả loại</option>
                            <option>PDF</option>
                            <option>DOCX</option>
                            <option>PPTX</option>
                        </select>
                        <select className="input-field w-auto">
                            <option>Trạng thái: Tất cả</option>
                            <option>Hoạt động</option>
                            <option>Nháp</option>
                        </select>
                        <button className="btn-secondary flex items-center gap-2">
                            <Filter size={16} /> Thao tác hàng loạt
                        </button>
                    </div>

                    {/* Table */}
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-sm text-gray-500 border-b">
                                <th className="pb-3 w-8"><input type="checkbox" className="rounded" /></th>
                                <th className="pb-3">Tiêu đề</th>
                                <th className="pb-3">Loại</th>
                                <th className="pb-3">Ngày tải lên</th>
                                <th className="pb-3">Trạng thái</th>
                                <th className="pb-3">Phân loại</th>
                                <th className="pb-3 w-8"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {documents.map((doc) => (
                                <tr key={doc.id} className="border-b border-gray-50 hover:bg-gray-50">
                                    <td className="py-3">
                                        <input
                                            type="checkbox"
                                            checked={selected.includes(doc.id)}
                                            onChange={() => toggleSelect(doc.id)}
                                            className="rounded"
                                        />
                                    </td>
                                    <td className="py-3">
                                        <div className="flex items-center gap-3">
                                            {getFileIcon(doc.type)}
                                            <div>
                                                <p className="font-medium text-gray-900">{doc.title}</p>
                                                <p className="text-xs text-gray-500">Phiên bản {doc.version} • {doc.size}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-3 text-sm text-gray-600">{doc.type}</td>
                                    <td className="py-3 text-sm text-gray-600">{doc.date}</td>
                                    <td className="py-3">{getStatusBadge(doc.status)}</td>
                                    <td className="py-3">{getClassBadge(doc.classification)}</td>
                                    <td className="py-3 text-gray-400">⋮</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <p className="text-sm text-gray-500 mt-4">Hiển thị 1 đến 5 của 24 kết quả</p>
                </div>

                {/* Bottom action bar */}
                {selected.length > 0 && (
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-dark-900 text-white px-6 py-3 rounded-xl shadow-xl flex items-center gap-4">
                        <span className="text-sm">{selected.length} tài liệu đã chọn</span>
                        <button className="text-sm text-gray-400 hover:text-white">Bỏ chọn</button>
                        <button className="btn-primary">Bắt đầu Chat</button>
                    </div>
                )}
            </div>
        </div>
    )
}
