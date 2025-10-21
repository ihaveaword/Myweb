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
    console.log('Message: ' + msg);
}

function getUserName() {
    return 'Guest';
}

// 导出函数
module.exports = {
    calculateTotal,
    displayMessage,
    getUserName
};
