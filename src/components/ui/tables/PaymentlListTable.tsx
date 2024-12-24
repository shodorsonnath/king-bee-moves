import { useState } from "react"
import { Table, Select, Input, DatePicker, Button, Modal } from "antd"
import { SearchOutlined } from "@ant-design/icons"
import dayjs from "dayjs"
import { ArrowDown, ArrowUp, Filter, Truck } from "lucide-react"
import paymentTrack from "@/assets/payment-truck.png"
import paymentMoney from "@/assets/paymentmoney.png"
import Image from "next/image"

const { RangePicker } = DatePicker

interface Transaction {
    key: string
    id: string
    clientName: string
    clientNumber: string
    amount: number
    date: string
    status: "Completed" | "Ongoing"
    email?: string
}

const transactions: Transaction[] = [
    {
        key: "1",
        id: "INV-HT2501",
        clientName: "Alice Johnson",
        clientNumber: "555-444-5555",
        amount: 1500,
        date: "2024-08-05",
        status: "Completed",
        email: "alice.johnson@example.com",
    },
    {
        key: "2",
        id: "INV-HT2502",
        clientName: "Bob Smith",
        clientNumber: "555-444-5555",
        amount: 2500,
        date: "2024-08-06",
        status: "Ongoing",
        email: "bob.smith@example.com",
    },
]

export default function PaymentListTable() {
    const [activeTab, setActiveTab] = useState<"Completed" | "Ongoing">("Completed")
    const [searchText, setSearchText] = useState("")
    const [dateRange, setDateRange] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null] | null>(null)
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)  // Updated state name

    const showDetails = (transaction: Transaction) => {
        setSelectedTransaction(transaction)
        setIsModalOpen(true)  // Set modal open state
    }

    const closeModal = () => {
        setIsModalOpen(false)  // Close modal
        setSelectedTransaction(null)
    }

    const columns = [
        {
            title: "Invoice ID",
            dataIndex: "id",
            key: "id",
            sorter: (a: Transaction, b: Transaction) => a.id.localeCompare(b.id),
        },
        {
            title: "Client Name",
            dataIndex: "clientName",
            key: "clientName",
            sorter: (a: Transaction, b: Transaction) => a.clientName.localeCompare(b.clientName),
        },
        {
            title: "Client Number",
            dataIndex: "clientNumber",
            key: "clientNumber",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            render: (amount: number) => `$${amount.toLocaleString()}`,
            sorter: (a: Transaction, b: Transaction) => a.amount - b.amount,
        },
        {
            title: "Due Date",
            dataIndex: "date",
            key: "date",
            render: (date: string) => new Date(date).toLocaleDateString(),
            sorter: (a: Transaction, b: Transaction) => new Date(a.date).getTime() - new Date(b.date).getTime(),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => (
                <Button
                    type={status === "Completed" ? "primary" : "default"}
                    style={{
                        backgroundColor: status === "Completed" ? "#001F54" : "#fff",
                        color: status === "Completed" ? "#FFFFFF" : "#000",
                    }}
                >
                    {status}
                </Button>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: unknown, transaction: Transaction) => (
                <Button type="link" onClick={() => showDetails(transaction)}>
                    View Details
                </Button>
            )
        },
    ]

    const filteredData = transactions.filter((transaction) => {
        const matchesSearch =
            transaction.id.toLowerCase().includes(searchText.toLowerCase()) ||
            transaction.clientName.toLowerCase().includes(searchText.toLowerCase()) ||
            transaction.clientNumber.includes(searchText)

        const matchesStatus = transaction.status === activeTab

        const matchesDate = !dateRange || !dateRange[0] || !dateRange[1] || (
            dayjs(transaction.date).isAfter(dateRange[0]) &&
            dayjs(transaction.date).isBefore(dateRange[1])
        )

        return matchesSearch && matchesStatus && matchesDate
    })

    return (
        <div className="p-6">
            <div className="mb-6 flex flex-wrap gap-4">
                <Input
                    placeholder="Search invoice, client/Driver ID"
                    prefix={<SearchOutlined className="text-gray-400" />}
                    style={{ width: 250 }}
                    onChange={(e) => setSearchText(e.target.value)}
                />

                <RangePicker
                    onChange={(dates) => setDateRange(dates)}
                    style={{ width: 300 }}
                />
                <Select
                    defaultValue="Completed"
                    style={{ width: 300 }}
                    onChange={(value) => setActiveTab(value as "Completed" | "Ongoing")}
                    options={[{
                        value: "Completed", label: (
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <Filter className="w-4 mr-2 text-gray-500" />
                                <span className="text-gray-600">Completed Transactions</span>
                            </div>
                        ),
                    },
                    {
                        value: "Ongoing", label: (
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <Filter className="w-4 mr-2 text-gray-500" />
                                <span className="text-gray-700">Ongoing Transactions</span>
                            </div>
                        ),
                    }]}
                />

            </div>

            <Table
                columns={columns}
                dataSource={filteredData}
                pagination={{
                    total: filteredData.length,
                    pageSize: 10,
                    showTotal: (total) => `Total ${total} items`,
                }}
                scroll={{ x: true }}
            />

            {selectedTransaction && (
                <Modal
                    open={isModalOpen}
                    onCancel={closeModal}
                    footer={[
                        <Button  key="close" onClick={closeModal}>
                            Close
                        </Button>,
                    ]}
                    width={800}
                >
                    <div>
                        <div className="mx-auto p-4">
                            <div className="grid gap-6 md:grid-cols-2">
                                {/* Trip Details Section */}
                                <div className="border-r pr-5 border-gray-200">
                                    <p className="text-lg font-bold mb-6">
                                        {`Trip - ${selectedTransaction.id}`}
                                    </p>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-gray-100 p-2 rounded-md">
                                                <Truck className="w-6 h-6 lg:w-10 lg:h-10" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-base lg:text-lg">Box Trucks (Light)</h3>
                                            </div>
                                        </div>
                                        <div className="border"></div>

                                        <div>
                                            <h3 className="font-medium text-base lg:text-lg">Box Trucks (Light)</h3>
                                        </div>

                                        <div className="space-y-3">
                                            <div>
                                                <div className="text-sm text-gray-500">
                                                    12 December, 06 AM
                                                </div>
                                                <div className="mt-5 space-y-4">
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                                                            <ArrowUp strokeWidth={3} className="w-4 text-white" />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-base">Caltrain Station</div>
                                                            <div className="text-sm text-muted-foreground">San Francisco, California, USA</div>
                                                        </div>
                                                    </div>
                                                    <div className="border border-[#9CA3AF] rotate-90 relative z-1 opacity-30 right-7 w-20"></div>
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-1">
                                                            <ArrowDown strokeWidth={3} className="w-4 text-white" />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-base">California Science Center</div>
                                                            <div className="text-sm text-muted-foreground">Los Angeles, California, USA</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="border border-gray-100"></div>

                                            <div className="flex flex-col gap-3">
                                                <span className="border border-gray-400 px-3 py-1 w-fit rounded-full text-sm text-gray-600 mt-4">
                                                    Home Shifting / Office Shifting
                                                </span>
                                                <span className="bg-gray-100 px-4 py-2 w-fit rounded-md text-sm flex items-center gap-2">
                                                    <Image src={paymentTrack} alt="Truck" width={20} height={20}></Image>
                                                    Up Down Trip
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between pt-4">
                                                <div className="font-medium flex text-lg items-center gap-3">
                                                <Image src={paymentMoney} alt="Truck" width={20} height={20}></Image>
                                                    Price
                                                </div>
                                                <div className="text-xl font-bold">$1500</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                              
                                {/* Payment Details Section */}
                                <div>
                                    <p className="text-lg font-bold mb-5">
                                        Payment Details
                                    </p>
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-base font-semibold mb-3">Payment method</h3>
                                            <div className="flex items-center gap-2 p-3 border rounded-lg bg-gray-100">
                                                <input type="radio" checked readOnly className="w-4 h-4" />
                                                <span>Visa</span>
                                                <span className="ml-auto text-blue-600 font-bold">VISA</span>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <h3 className="text-base font-medium">Account Details</h3>
                                            <div className="space-y-2 text-base text-gray-600">
                                                <div>
                                                    <div className="text-sm text-muted-foreground">Email : smithalex@gmail.com</div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-muted-foreground">Name on Card : Alex Smith</div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-muted-foreground">Card Number : 2157895655</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    )
}
