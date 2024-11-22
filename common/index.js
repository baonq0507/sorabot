module.exports = {
    sleep: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
    formatNumber: (number) => number.toLocaleString('vi-VN')
}