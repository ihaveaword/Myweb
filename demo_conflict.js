// 演示冲突解决的文件
// 这个文件用于学习如何处理 Git 合并冲突

function calculateTotal(items) {
    let total = 0;
    for (let item of items) {
        total += item.price;
    }
    return total;
}

function displayMessage(msg) {
    // 同事添加了时间戳功能
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] Message: ${msg}`);
}

function getUserName() {
    // 同事改进了用户名功能
    const name = localStorage.getItem('username') || 'Guest';
    return name;
}

function formatPrice(price) {
    // 同事添加了新功能：格式化价格
    return `¥${price.toFixed(2)}`;
}

// 导出函数
module.exports = {
    calculateTotal,
    displayMessage,
    getUserName
};
