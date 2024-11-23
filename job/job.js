
module.exports = {
    job: [
        {
            name: 'Bác sĩ',
            time: 10,
            task: [
                {
                    task: {
                        name: 'Khám bệnh',
                        descriptions: [
                            'Tuy khách hàng có phản hổi không tốt nhưng không sao. vì bạn xứng đáng',
                            'Bạn vừa chọc đít bệnh nhân, dơ quá bạn ơi!',
                            'Bệnh nhân phản hồi, bạn ăn cứt mũi trong lúc khám bệnh',
                            'Bệnh nhân phản hồi, bạn đánh đập bệnh nhân',
                            'Bệnh nhân rất hài lòng với bạn'
                        ]

                    },
                    reward: 5000
                },
                {
                    task: {
                        name: 'Kê đơn thuốc',
                        descriptions: [
                            'Đơn thuốc bạn kê không hợp lý, bệnh nhân phản hồi',
                        ]
                    },
                    reward: 3000
                },
                {
                    task: {
                        name: 'Phẫu thuật',
                        descriptions: [
                            'Bệnh nhân phản hồi, bạn đánh đập bệnh nhân',
                            'Bệnh nhân phản hồi, bạn ăn cứt mũi trong lúc phẫu thuật',
                            'Bệnh nhân rất hài lòng với bạn'
                        ]
                    },
                    reward: 10000
                },
                {
                    task: {
                        name: 'Tư vấn sức khỏe',
                        descriptions: [
                            'Tư vấn không hợp lý, bệnh nhân phản hồi',
                            'Tư vấn như cc',
                            'Tư vấn rất hợp lý, bạn đúng là 1 bác sĩ tai hại'
                        ]
                    },
                    reward: 2000
                },
                {
                    task: {
                        name: 'Tiêm vaccine',
                        descriptions: [
                            'Bệnh nhân phản hồi, bạn đánh đập bệnh nhân',
                            'Bệnh nhân phản hồi, bạn ăn cứt mũi trong lúc tiêm vaccine',
                            'Bệnh nhân rất hài lòng với bạn',
                            'Bạn đa tiêm nhầm vaccine của chó cho bệnh nhân'
                        ]
                    },
                    reward: 1500
                }
            ],
            emoji: '👨‍⚕️',
            description: 'Bác sĩ là một nghề nghiệp đòi hỏi sự chính xác và tập trung cao, nhưng cũng mang lại nhiều cơ hội thăng tiến và lương cao.'
        },
        {
            name: 'Giáo viên',
            time: 10,
            task: [
                {
                    task: {
                        name: 'Dạy học',
                        descriptions: [
                            'Bạn dạy học không hợp lý, học sinh phản hồi',
                            'Bạn dạy học như cc',
                            'Bạn dạy học rất hợp lý, học sinh rất hài lòng'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    task: {
                        name: 'Chấm điểm',
                        descriptions: [
                            'Điểm bạn chấm không hợp lý, học sinh phản hồi',
                            'Điểm bạn chấm hợp lý, học sinh rất hài lòng',
                            'Bạn chấm điểm học sinh như cc'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
            ],
            emoji: '👨‍🏫',
            description: 'Giáo viên là một nghề nghiệp đòi hỏi sự kiên nhẫn và tập trung cao, nhưng cũng mang lại nhiều cơ hội thăng tiến và lương cao.'
        },
        {
            name: 'Kỹ sư phần mềm',
            time: 10,
            task: [
                {
                    task: {
                        name: 'Viết code',
                        descriptions: [
                            'Code bạn viết không hợp lý, bị phản hồi',
                            'Code bạn viết như cc',
                            'Code bạn viết rất hợp lý, bạn đúng là 1 kỹ sư phần mềm tai hại'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    task: {
                        name: 'Kiểm tra code',
                        descriptions: [
                            'Code bạn kiểm tra không hợp lý, bị phản hồi',
                            'Code bạn kiểm tra như cc',
                            'Code bạn kiểm tra rất hợp lý, bạn đúng là 1 kỹ sư phần mềm tai hại'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
            ],
            emoji: '👨‍💻',
            description: 'Kỹ sư phần mềm là một nghề nghiệp đòi hỏi sự sáng tạo và tập trung cao, nhưng cũng mang lại nhiều cơ hội thăng tiến và lương cao.'
        },
        {
            name: 'Đầu bếp',
            time: 10,
            task: [
                {
                    task: {
                        name: 'Nấu ăn',
                        descriptions: [
                            'Bạn nấu ăn không hợp lý, bị phản hồi',
                            'Bạn nấu ăn như cc',
                            'Bạn nấu ăn rất hợp lý, khách hàng rất hài lòng',
                            'Bạn nấu ăn ngon quá bạn ơi!',
                            'Bạn nấu ăn ngon quá bạn ơi!',
                            'Bạn nấu ăn ngon quá bạn ơi!'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    task: {
                        name: 'Chế biến thức ăn',
                        descriptions: [
                            'Thức ăn bạn chế biến không hợp lý, bị phản hồi',
                            'Thức ăn bạn chế biến như cc',
                            'Thức ăn bạn chế biến rất hợp lý, khách hàng rất hài lòng',
                            'Thức ăn bạn chế biến ngon quá bạn ơi!',
                            'Thức ăn bạn chế biến ngon quá bạn ơi!',
                            'Thức ăn bạn chế biến ngon quá bạn ơi!'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    task: {
                        name: 'Phục vụ khách hàng',
                        descriptions: [
                            'Khách hàng phản hồi, bạn đánh đập khách hàng',
                            'Khách hàng phản hồi, bạn ăn cứt mũi trong lúc phục vụ khách hàng',
                            'Khách hàng rất hài lòng với bạn',
                            'Bạn đa phục vụ khách hàng nhầm thức ăn của chó cho khách hàng'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
            ],
            emoji: '👨‍🍳',
            description: 'Đầu bếp là một nghề nghiệp đòi hỏi sự sáng tạo và tập trung cao, nhưng cũng mang lại nhiều cơ hội thăng tiến và lương cao.'
        },
        {
            name: 'Thợ sửa xe',
            time: 10,
            task: [
                {
                    task: {
                        name: 'Sửa xe',
                        descriptions: [
                            'Xe bạn sửa không hợp lý, bị phản hồi',
                            'Xe bạn sửa như cc',
                            'Xe bạn sửa rất hợp lý, khách hàng rất hài lòng',
                            'Xe bạn sửa ngon quá bạn ơi!',
                            'Xe bạn sửa ngon quá bạn ơi!',
                            'Xe bạn sửa ngon quá bạn ơi!'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    task: {
                        name: 'Bảo dưỡng xe',
                        descriptions: [
                            'Xe bạn bảo dưỡng không hợp lý, bị phản hồi',
                            'Xe bạn bảo dưỡng như cc',
                            'Xe bạn bảo dưỡng rất hợp lý, khách hàng rất hài lòng',
                            'Xe bạn bảo dưỡng ngon quá bạn ơi!',
                            'Xe bạn bảo dưỡng ngon quá bạn ơi!',
                            'Xe bạn bảo dưỡng ngon quá bạn ơi!'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    task: {
                        name: 'Bảo trì xe',
                        descriptions: [
                            'Xe bạn bảo trì không hợp lý, bị phản hồi',
                            'Xe bạn bảo trì như cc',
                            'Xe bạn bảo trì rất hợp lý, khách hàng rất hài lòng',
                            'Xe bạn bảo trì ngon quá bạn ơi!',
                            'Xe bạn bảo trì ngon quá bạn ơi!',
                            'Xe bạn bảo trì ngon quá bạn ơi!'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
            ],
            emoji: '👨‍🔧',
            description: 'Thợ sửa xe là một nghề nghiệp đòi hỏi sự kiên nhẫn và tập trung cao, nhưng cũng mang lại nhiều cơ hội thăng tiến và lương cao.'
        },
        {
            name: 'Nhân viên văn phòng',
            time: 10,
            task: [
                {
                    task: {
                        name: 'Nhập liệu',
                        descriptions: [
                            'Bạn nhập liệu không hợp lý, bị phản hồi',
                            'Bạn nhập liệu như cc',
                            'Bạn nhập liệu rất hợp lý, bạn đúng là 1 nhân viên văn phòng tai hại',
                            'Bạn nhập liệu hợp lý, bạn đúng là 1 nhân viên văn phòng tai hại',
                            'Bạn nhập liệu ngon quá bạn ơi!',
                            'Bạn nhập liệu ngon quá bạn ơi!',
                            'Bạn nhập liệu ngon quá bạn ơi!'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    task: {
                        name: 'Sửa máy in',
                        descriptions: [
                            'Máy in bạn sửa không hợp lý, bị phản hồi',
                            'Máy in bạn sửa như cc',
                            'Máy in bạn sửa rất hợp lý, bạn đúng là 1 nhân viên văn phòng tai hại',
                            'Máy in bạn sửa ngon quá bạn ơi!',
                            'Máy in bạn sửa ngon quá bạn ơi!',
                            'Máy in bạn sửa ngon quá bạn ơi!'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
            ],
            emoji: '👨‍💼',
            description: 'Nhân viên văn phòng là một nghề nghiệp đòi hỏi sự chính xác và tập trung cao, nhưng cũng mang lại nhiều cơ hội thăng tiến và lương cao.'
        },
        {
            name: 'Thợ điện',
            time: 10,
            task: [
                {
                    task: {
                        name: 'Sửa điện',
                        descriptions: [
                            'Bạn sửa điện không hợp lý, bị phản hồi',
                            'Bạn sửa điện như cc',
                            'Bạn sửa điện rất hợp lý, bạn đúng là 1 thợ điện tai hại',
                            'Bạn sửa điện ngon quá bạn ơi!',
                            'Bạn sửa điện ngon quá bạn ơi!',
                            'Bạn sửa điện ngon quá bạn ơi!'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    task: {
                        name: 'Bảo trì điện',
                        descriptions: [
                            'Bạn bảo trì điện không hợp lý, bị phản hồi',
                            'Bạn bảo trì điện như cc',
                            'Bạn bảo trì điện rất hợp lý, bạn đúng là 1 thợ điện tai hại',
                            'Bạn bảo trì điện ngon quá bạn ơi!',
                            'Bạn bảo trì điện ngon quá bạn ơi!',
                            'Bạn bảo trì điện ngon quá bạn ơi!'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    task: {
                        name: 'Lắp đặt điện',
                        descriptions: [
                            'Bạn lắp đặt điện không hợp lý, bị phản hồi',
                            'Bạn lắp đặt điện như cc',
                            'Bạn lắp đặt điện rất hợp lý, bạn đúng là 1 thợ điện tai hại',
                            'Bạn lắp đặt điện ngon quá bạn ơi!',
                            'Bạn lắp đặt điện ngon quá bạn ơi!',
                            'Bạn lắp đặt điện ngon quá bạn ơi!'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    task: {
                        name: 'Kiểm tra điện',
                        descriptions: [
                            'Bạn kiểm tra điện không hợp lý, bị phản hồi',
                            'Bạn kiểm tra điện như cc',
                            'Bạn kiểm tra điện rất hợp lý, bạn đúng là 1 thợ điện tai hại',
                            'Bạn kiểm tra điện ngon quá bạn ơi!',
                            'Bạn kiểm tra điện ngon quá bạn ơi!',
                            'Bạn kiểm tra điện ngon quá bạn ơi!'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                }
            ],
            emoji: '⚡',
            description: 'Thợ điện là một nghề nghiệp đòi hỏi sự kiên nhẫn và tập trung cao, nhưng cũng mang lại nhiều cơ hội thăng tiến và lương cao.'
        },
        {
            name: 'Thợ xây dựng',
            time: 10,
            task: [
                {
                    task: {
                        name: 'Xây dựng',
                        descriptions: [
                            'Bạn xây dựng không hợp lý, bị phản hồi',
                            'Bạn xây dựng như cc',
                            'Bạn xây dựng rất hợp lý, bạn đúng là 1 thợ xây dựng tai hại',
                            'Bạn xây dựng ngon quá bạn ơi!',
                            'Bạn xây dựng ngon quá bạn ơi!',
                            'Bạn xây dựng ngon quá bạn ơi!'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    task: {
                        name: 'Bảo trì nhà',
                        descriptions: [
                            'Bạn bảo trì nhà không hợp lý, bị phản hồi',
                            'Bạn bảo trì nhà như cc',
                            'Bạn bảo trì nhà rất hợp lý, bạn đúng là 1 thợ xây dựng tai hại',
                            'Bạn bảo trì nhà ngon quá bạn ơi!',
                            'Bạn bảo trì nhà ngon quá bạn ơi!',
                            'Bạn bảo trì nhà ngon quá bạn ơi!'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    task: {
                        name: 'Lắp đặt nhà',
                        descriptions: [
                            'Bạn lắp đặt nhà không hợp lý, bị phản hồi',
                            'Bạn lắp đặt nhà như cc',
                            'Bạn lắp đặt nhà rất hợp lý, bạn đúng là 1 thợ xây dựng tai hại',
                            'Bạn lắp đặt nhà ngon quá bạn ơi!',
                            'Bạn lắp đặt nhà ngon quá bạn ơi!',
                            'Bạn lắp đặt nhà ngon quá bạn ơi!'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
            ],
            emoji: '👷‍♂️',
            description: 'Thợ xây dựng là một nghề nghiệp đòi hỏi sự kiên nhẫn và tập trung cao, nhưng cũng mang lại nhiều cơ hội thăng tiến và lương cao.'
        },
        {
            name: 'Nhân viên bán hàng',
            time: 10,
            task: [
                {
                    task: {
                        name: 'Bán hàng',
                        descriptions: [
                            'Bạn bán hàng không hợp lý, bị phản hồi',
                            'Bạn bán hàng như cc',
                            'Bạn bán hàng rất hợp lý, bạn đúng là 1 nhân viên bán hàng tai hại',
                            'Bạn bán hàng ngon quá bạn ơi!',
                            'Bạn bán hàng ngon quá bạn ơi!',
                            'Bạn bán hàng ngon quá bạn ơi!'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    task: {
                        name: 'Chăm sóc khách hàng',
                        descriptions: [
                            'Bạn chăm sóc khách hàng không hợp lý, bị phản hồi',
                            'Bạn chăm sóc khách hàng như cc',
                            'Bạn chăm sóc khách hàng rất hợp lý, bạn đúng là 1 nhân viên bán hàng tai hại',
                            'Bạn chăm sóc khách hàng ngon quá bạn ơi!',
                            'Bạn chăm sóc khách hàng ngon quá bạn ơi!',
                            'Bạn chăm sóc khách hàng ngon quá bạn ơi!'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    task: {
                        name: 'Tư vấn sản phẩm',
                        descriptions: [
                            'Bạn tư vấn sản phẩm không hợp lý, bị phản hồi',
                            'Bạn tư vấn sản phẩm như cc',
                            'Bạn tư vấn sản phẩm rất hợp lý, bạn đúng là 1 nhân viên bán hàng tai hại',
                            'Bạn tư vấn sản phẩm ngon quá bạn ơi!',
                            'Bạn tư vấn sản phẩm ngon quá bạn ơi!',
                            'Bạn tư vấn sản phẩm ngon quá bạn ơi!'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
            ],
            emoji: '👨‍💼',
            description: 'Nhân viên bán hàng là một nghề nghiệp đòi hỏi sự chính xác và tập trung cao, nhưng cũng mang lại nhiều cơ hội thăng tiến và lương cao.'
        },
        {
            name: 'Tài xế',
            time: 10,
            task: [
                {
                    task: {
                        name: 'Chở khách',
                        descriptions: [
                            'Bạn chở khách không hợp lý, bị phản hồi',
                            'Bạn chở khách như cc',
                            'Bạn chở khách rất hợp lý, bạn đúng là 1 tài xế tai hại',
                            'Bạn chở khách ngon quá bạn ơi!',
                            'Bạn chở khách ngon quá bạn ơi!',
                            'Bạn chở khách ngon quá bạn ơi!'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    task: {
                        name: 'Chở hàng',
                        descriptions: [
                            'Bạn chở hàng không hợp lý, bị phản hồi',
                            'Bạn chở hàng như cc',
                            'Bạn chở hàng rất hợp lý, bạn đúng là 1 tài xế tai hại',
                            'Bạn chở hàng ngon quá bạn ơi!',
                            'Bạn chở hàng ngon quá bạn ơi!',
                            'Bạn chở hàng ngon quá bạn ơi!'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    task: {
                        name: 'Bảo trì xe',
                        descriptions: [
                            'Bạn bảo trì xe không hợp lý, bị phản hồi',
                            'Bạn bảo trì xe như cc',
                            'Bạn bảo trì xe rất hợp lý, bạn đúng là 1 tài xế tai hại',
                            'Bạn bảo trì xe ngon quá bạn ơi!',
                            'Bạn bảo trì xe ngon quá bạn ơi!',
                            'Bạn bảo trì xe ngon quá bạn ơi!'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
            ],
            emoji: '🚗',
            description: 'Tài xế là một nghề nghiệp đòi hỏi sự kiên nhẫn và tập trung cao, nhưng cũng mang lại nhiều cơ hội thăng tiến và lương cao.'
        },
        {
            name: 'Nhà thiết kế',
            time: 10,
            task: [
                {
                    task: {
                        name: 'Thiết kế',
                        descriptions: [
                            'Bạn thiết kế không hợp lý, bị phản hồi',
                            'Bạn thiết kế như cc',
                            'Bạn thiết kế rất hợp lý, bạn đúng là 1 nhà thiết kế tai hại',
                            'Bạn thiết kế ngon quá bạn ơi!',
                            'Bạn thiết kế ngon quá bạn ơi!',
                            'Bạn thiết kế ngon quá bạn ơi!'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    task: {
                        name: 'Kiểm tra thiết kế',
                        descriptions: [
                            'Bạn kiểm tra thiết kế không hợp lý, bị phản hồi',
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
            ],
            emoji: '👨‍🎨',
            description: 'Nhà thiết kế là một nghề nghiệp đòi hỏi sự sáng tạo và tập trung cao, nhưng cũng mang lại nhiều cơ hội thăng tiến và lương cao.'

        },
        {
            name: 'Kế toán',
            time: 10,
            task: [
                {
                    task: {
                        name: 'Tính toán',
                        descriptions: [
                            'Bạn tính toán không hợp lý, bị phản hồi',
                            'Bạn tính toán như cc',
                            'Bạn tính toán rất hợp lý, bạn đúng là 1 kế toán tai hại',
                            'Bạn tính toán ngon quá bạn ơi!',
                            'Bạn tính toán ngon quá bạn ơi!',
                            'Bạn tính toán ngon quá bạn ơi!',
                            'Bạn tính toán kiểu này có ngày đi tò'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    task: {
                        name: 'Kiểm tra số liệu',
                        descriptions: [
                            'Bạn kiểm tra số liệu không hợp lý, bị phản hồi',
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    task: {
                        name: 'Lập báo cáo',
                        descriptions: [
                            'Bạn lập báo cáo không hợp lý, bị phản hồi',
                            'Bạn lập báo cáo như cc',
                            'Bạn lập báo cáo rất hợp lý, bạn đúng là 1 kế toán tai hại',
                            'Bạn lập báo cáo ngon quá bạn ơi!',
                            'Bạn lập báo cáo ngon quá bạn ơi!',
                            'Bạn lập báo cáo ngon quá bạn ơi!'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
            ],
            emoji: '👨‍💼',
            description: 'Kế toán là một nghề nghiệp đòi hỏi sự chính xác và tập trung cao, nhưng cũng mang lại nhiều cơ hội thăng tiến và lương cao.'
        },
        {
            name: 'Luật sư',
            time: 10,
            task: [
                {
                    task: {
                        name: 'Tư vấn pháp lý',
                        descriptions: [
                            'Bạn tư vấn pháp lý không hợp lý, bị phản hồi',
                            'Bạn tư vấn pháp lý như cc',
                            'Bạn tư vấn pháp lý rất hợp lý, bạn đúng là 1 luật sư tai hại',
                            'Bạn tư vấn pháp lý ngon quá bạn ơi!',
                            'Bạn tư vấn pháp lý ngon quá bạn ơi!',
                            'Bạn tư vấn pháp lý ngon quá bạn ơi!'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    task: {
                        name: 'Lập luận pháp lý',
                        descriptions: [
                            'Bạn lập luận pháp lý không hợp lý, bị phản hồi',
                            'Bạn lập luận pháp lý như cc',
                            'Bạn lập luận pháp lý rất hợp lý, bạn đúng là 1 luật sư tai hại',
                            'Bạn lập luận pháp lý ngon quá bạn ơi!',
                            'Bạn lập luận pháp lý ngon quá bạn ơi!',
                            'Bạn lập luận pháp lý ngon quá bạn ơi!'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
            ],
            emoji: '👨‍⚖️',
            description: 'Luật sư là một nghề nghiệp đòi hỏi sự kiên nhẫn và tập trung cao, nhưng cũng mang lại nhiều cơ hội thăng tiến và lương cao.'
        },
        {
            name: 'Nhà báo',
            time: 10,
            task: [
                {
                    task: {
                        name: 'Viết bài',
                        descriptions: [
                            'Bạn viết bài không hợp lý, bị phản hồi',
                            'Bạn viết bài như cc',
                            'Bạn viết bài rất hợp lý, bạn đúng là 1 nhà báo tai hại',
                            'Bạn viết bài ngon quá bạn ơi!',
                            'Bạn viết bài ngon quá bạn ơi!',
                            'Bạn viết bài ngon quá bạn ơi!'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    task: {
                        name: 'Chỉnh sửa bài',
                        descriptions: [
                            'Bạn chỉnh sửa bài không hợp lý, bị phản hồi',
                            'Bạn chỉnh sửa bài như cc',
                            'Bạn chỉnh sửa bài rất hợp lý, bạn đúng là 1 nhà báo tai hại',
                            'Bạn chỉnh sửa bài ngon quá bạn ơi!',
                            'Bạn chỉnh sửa bài ngon quá bạn ơi!',
                            'Bạn chỉnh sửa bài ngon quá bạn ơi!'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
            ],
            emoji: '📰',
            description: 'Nhà báo là một nghề nghiệp đòi hỏi sự sáng tạo và tập trung cao, nhưng cũng mang lại nhiều cơ hội thăng tiến và lương cao.'
        },
        {
            name: 'Nhiếp ảnh gia',
            time: 10,
            task: [
                {
                    task: {
                        name: 'Chụp ảnh',
                        descriptions: [
                            'Bạn chụp ảnh không hợp lý, bị phản hồi',
                            'Bạn chụp ảnh như cc',
                            'Bạn chụp ảnh rất hợp lý, bạn đúng là 1 nhiếp ảnh gia tai hại',
                            'Bạn chụp ảnh ngon quá bạn ơi!',
                            'Bạn chụp ảnh ngon quá bạn ơi!',
                            'Bạn chụp ảnh ngon quá bạn ơi!'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    name: 'Chỉnh sửa ảnh',
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
            ],
            emoji: '📸',
            description: 'Nhiếp ảnh gia là một nghề nghiệp đòi hỏi sự sáng tạo và tập trung cao, nhưng cũng mang lại nhiều cơ hội thăng tiến và lương cao.'
        },
        {
            name: 'Thợ may',
            time: 10,
            task: [
                {
                    task: {
                        name: 'May áo',
                        descriptions: [
                            'Bạn may áo không hợp lý, bị phản hồi',
                            'Bạn may áo như cc',
                            'Bạn may áo rất hợp lý, bạn đúng là 1 thợ may tai hại',
                            'Bạn may áo ngon quá bạn ơi!',
                            'Bạn may áo ngon quá bạn ơi!',
                            'Bạn may áo ngon quá bạn ơi!'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    task: {
                        name: 'May quần',
                        descriptions: [
                            'Bạn may quần không hợp lý, bị phản hồi',
                            'Bạn may quần như cc',
                            'Bạn may quần rất hợp lý, bạn đúng là 1 thợ may tai hại',
                            'Bạn may quần ngon quá bạn ơi!',
                            'Bạn may quần ngon quá bạn ơi!',
                            'Bạn may quần ngon quá bạn ơi!'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    task: {
                        name: 'May vá',
                        descriptions: [
                            'Bạn may vá không hợp lý, bị phản hồi',
                            'Bạn may vá như cc',
                            'Bạn may vá rất hợp lý, bạn đúng là 1 thợ may tai hại',
                            'Bạn may vá ngon quá bạn ơi!',
                            'Bạn may vá ngon quá bạn ơi!',
                            'Bạn may vá ngon quá bạn ơi!'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
            ],
            emoji: '👨‍🔧',
            description: 'Thợ may là một nghề nghiệp đòi hỏi sự kiên nhẫn và tập trung cao, nhưng cũng mang lại nhiều cơ hội thăng tiến và lương cao.'
        },
        {
            name: 'Thợ làm tóc',
            time: 10,
            task: [
                {
                    task: {
                        name: 'Làm tóc',
                        descriptions: [
                            'Bạn làm tóc không hợp lý, bị phản hồi',
                            'Bạn làm tóc như cc',
                            'Bạn làm tóc rất hợp lý, bạn đúng là 1 thợ làm tóc tai hại',
                            'Bạn làm tóc ngon quá bạn ơi!',
                            'Bạn làm tóc ngon quá bạn ơi!',
                            'Bạn làm tóc ngon quá bạn ơi!'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    task: {
                        name: 'Chỉnh sửa tóc',
                        descriptions: [
                            'Bạn chỉnh sửa tóc không hợp lý, bị phản hồi',
                            'Bạn chỉnh sửa tóc như cc',
                            'Bạn chỉnh sửa tóc rất hợp lý, bạn đúng là 1 thợ làm tóc tai hại',
                            'Bạn chỉnh sửa tóc ngon quá bạn ơi!',
                            'Bạn chỉnh sửa tóc ngon quá bạn ơi!',
                            'Bạn chỉnh sửa tóc ngon quá bạn ơi!'
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
            ],
            emoji: '👨‍💇',
            description: 'Thợ làm tóc là một nghề nghiệp đòi hỏi sự kiên nhẫn và tập trung cao, nhưng cũng mang lại nhiều cơ hội thăng tiến và lương cao.'
        },
        {
            name: 'Nông dân',
            time: 10,
            task: [
                {
                    task: {
                        name: 'Trồng trọt',
                        descriptions: [
                            'Bạn trồng trọt không hợp lý, bị phản hồi',
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    task: {
                        name: 'Thu hoạch',
                        descriptions: [
                            'Bạn thu hoạch không hợp lý, bị phản hồi',
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    task: {
                        name: 'Chăm sóc cây trồng',
                        descriptions: [
                            'Bạn chăm sóc cây trồng không hợp lý, bị phản hồi',
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    task: {
                        name: 'Bảo vệ cây trồng',
                        descriptions: [
                            'Bạn bảo vệ cây trồng không hợp lý, bị phản hồi',
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
            ],
            emoji: '👨‍🌾',
            description: 'Nông dân là một nghề nghiệp đòi hỏi sự kiên nhẫn và tập trung cao, nhưng cũng mang lại nhiều cơ hội thăng tiến và lương cao.'
        },
        {
            name: 'Thủy thủ',
            time: 10,
            task: [
                {
                    task: {
                        name: 'Chở hàng',
                        descriptions: [
                            'Bạn chở hàng không hợp lý, bị phản hồi',
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    task: {
                        name: 'Bảo vệ tàu',
                        descriptions: [
                            'Bạn bảo vệ tàu không hợp lý, bị phản hồi',
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    task: {
                        name: 'Lắp đặt tàu',
                        descriptions: [
                            'Bạn lắp đặt tàu không hợp lý, bị phản hồi',
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    task: {
                        name: 'Kiểm tra tàu',
                        descriptions: [
                            'Bạn kiểm tra tàu không hợp lý, bị phản hồi',
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
            ],
            emoji: '⚓',
            description: 'Thủy thủ là một nghề nghiệp đòi hỏi sự kiên nhẫn và tập trung cao, nhưng cũng mang lại nhiều cơ hội thăng tiến và lương cao.'
        },
        {
            name: 'Câu cá',
            time: 10,
            task: [
                {
                    task: {
                        name: 'Câu cá',
                        descriptions: [
                            'Bạn câu cá không hợp lý, bị phản hồi',
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    task: {
                        name: 'Chỉnh sửa cây cầu',
                        descriptions: [
                            'Bạn chỉnh sửa cây cầu không hợp lý, bị phản hồi',
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    task: {
                        name: 'Bảo vệ cây cầu',
                        descriptions: [
                            'Bạn bảo vệ cây cầu không hợp lý, bị phản hồi',
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
            ],
            emoji: '🎣',
            description: 'Câu cá là một nghề nghiệp đòi hỏi sự kiên nhẫn và tập trung cao, nhưng cũng mang lại nhiều cơ hội thăng tiến và lương cao.'
        },
        {
            name: 'Streamer',
            time: 10,
            task: [
                {
                    task: {
                        name: 'Stream',
                        descriptions: [
                            'Bạn stream không hợp lý, bị phản hồi',
                        ]
                    },
                    reward: Math.floor(Math.random() * 50001) + 50000
                },
                {
                    task: {
                        name: 'Chỉnh sửa video',
                        descriptions: [
                            'Bạn chỉnh sửa video không hợp lý, bị phản hồi',
                        ]
                    },
                    reward: Math.floor(Math.random() * 50001) + 50000
                },
                {
                    task: {
                        name: 'Tạo nội dung',
                        descriptions: [
                            'Bạn tạo nội dung không hợp lý, bị phản hồi',
                        ]
                    },
                    reward: Math.floor(Math.random() * 50001) + 50000
                },
                {
                    task: {
                        name: 'Chăm sóc viewer',
                        descriptions: [
                            'Bạn chăm sóc viewer không hợp lý, bị phản hồi',
                        ]
                    },
                    reward: Math.floor(Math.random() * 50001) + 50000
                },

            ],
            emoji: '👨‍💻',
            description: 'Streamer là một nghề nghiệp đòi hỏi sự sáng tạo và tập trung cao, nhưng cũng mang lại nhiều cơ hội thăng tiến và lương cao.'
        },
        {
            name: 'Công nhân',
            time: 10,
            task: [
                {
                    task: {
                        name: 'Xây dựng',
                        descriptions: [
                            'Bạn xây dựng không hợp lý, bị phản hồi',
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    task: {
                        name: 'Bảo vệ công trình',
                        descriptions: [
                            'Bạn bảo vệ công trình không hợp lý, bị phản hồi',
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    task: {
                        name: 'Lắp đặt công trình',
                        descriptions: [
                            'Bạn lắp đặt công trình không hợp lý, bị phản hồi',
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    task: {
                        name: 'Kiểm tra công trình',
                        descriptions: [
                            'Bạn kiểm tra công trình không hợp lý, bị phản hồi',
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
            ],
            emoji: '👷‍♀️',
            description: 'Công nhân là một nghề nghiệp đòi hỏi sự kiên nhẫn và tập trung cao, nhưng cũng mang lại nhiều cơ hội thăng tiến và lương cao.'
        },
        {
            name: 'Làm vợ',
            time: 10,
            task: [
                {
                    task: {
                        name: 'Làm vợ',
                        descriptions: [
                            'Bạn làm vợ không hợp lý, bị phản hồi',
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    task: {
                        name: 'Chăm sóc chồng',
                        descriptions: [
                            'Bạn chăm sóc chồng không hợp lý, bị phản hồi',
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
                {
                    task: {
                        name: 'Chăm sóc con',
                        descriptions: [
                            'Bạn chăm sóc con không hợp lý, bị phản hồi',
                        ]
                    },
                    reward: Math.floor(Math.random() * 7001) + 3000
                },
            ],
            emoji: '👩‍❤️‍👨',
            description: 'Làm vợ là một nghề nghiệp đòi hỏi sự kiên nhẫn và tập trung cao, nhưng cũng mang lại nhiều cơ hội thăng tiến và lương cao.'
        }
    ]
}
