module.exports = {
    FishingRod: [
        {
            name: 'Cần câu tre',
            price: 10000000,
            description: 'Cần câu tre, câu được cá suối và kênh, tỉ lệ câu được cá lớn hơn 50%',
            fish: [
                { name: 'Cá chép', price: Math.random() * 1000, chance: 50, emoji: '🐟' },
                { name: 'Cá chép vàng', price: Math.random() * 3000, chance: 50, emoji: '🐟' },
                { name: 'Cá mè', price: Math.random() * 5000, chance: 50, emoji: '🐟' },
                { name: 'Cá chuối', price: Math.random() * 5000, chance: 20, emoji: '🐟' },
                { name: 'Bịch rác', price: Math.random() * 2000, chance: 20, emoji: '🗑️' },
                { name: 'Chiếc giày', price: Math.random() * 4000, chance: 20, emoji: '👟' },
                { name: 'Cá chim', price: Math.random() * 4000, chance: 20, emoji: '🐟' },
            ],
            emoji: '🎣',
        },
        {
            name: 'Cần câu trúc',
            price: 50000000,
            description: 'Cần câu trúc, câu được cá sống ở dưới sông, tỉ lệ câu được cá lớn hơn 60%',
            fish: [
                { name: 'Cá chép', price: Math.random() * 1000, chance: 60, emoji: '🐟' },
                { name: 'Cá chép vàng', price: Math.random() * 3000, chance: 60, emoji: '🐟' },
                { name: 'Cá mè', price: Math.random() * 5000, chance: 60, emoji: '🐟' },
                { name: 'Cá chuối', price: Math.random() * 5000, chance: 60, emoji: '🐟' },
                { name: 'Bịch rác', price: Math.random() * 2000, chance: 20, emoji: '🗑️' },
                { name: 'Đôi giày', price: Math.random() * 4000, chance: 30, emoji: '👟' },
                { name: 'Cá chim', price: Math.random() * 8000, chance: 20, emoji: '🐟' },
            ],
            emoji: '💰',
        },
        {
        name: 'Cần câu vip',
        price: 100000000,
        description: 'Cần câu vip, câu được cá ở biển, tỉ lệ câu được cá lớn hơn 80%',
        fish: [
                { name: 'Cá ngừ', chance: 80, price: Math.random() * 1000, emoji: '🐟' },
                { name: 'Cá mập', chance: 80, price: Math.random() * 20000, emoji: '🐟' },
                { name: 'Mực', chance: 80, price: Math.random() * 10000, emoji: '🐟' },
                { name: 'Cá nhà táng', chance: 80, price: Math.random() * 10000, emoji: '🐟' },
                { name: 'Cá chim', chance: 80, price: Math.random() * 8000, emoji: '🐟' },
                { name: 'Cá chép', price: Math.random() * 1000, chance: 50, emoji: '🐟' },
                { name: 'Cá chép vàng', price: Math.random() * 3000, chance: 50, emoji: '🐟' },
                { name: 'Cá mè', price: Math.random() * 5000, chance: 50, emoji: '🐟' },
                { name: 'Cá chuối', price: Math.random() * 5000, chance: 50, emoji: '🐟' },
                { name: 'Bịch rác', price: Math.random() * 2000, chance: 20, emoji: '🗑️' },
                { name: 'Đôi giày', price: Math.random() * 4000, chance: 30, emoji: '👟' },
                { name: 'Cá chim', price: Math.random() * 8000, chance: 20, emoji: '🐟' },
                { name: 'Cá đuối', price: Math.random() * 10000, chance: 60, emoji: '🐟' },
            ],
            emoji: '👑',
        },
    ]
}

