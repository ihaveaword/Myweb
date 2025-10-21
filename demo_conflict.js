// 演示冲突解决的文件
// 这个文件用于学习如何处理 Git 合并冲突

function calculateTotal(items) {
    let total = 0;
    for (let item of items) {
        total += item.price;
    }
    return total;
}

// 你删除了 displayMessage 和 getUserName 函数，认为它们不需要了

// 导出函数
module.exports = {
    calculateTotal,
    displayMessage,
    getUserName
};
