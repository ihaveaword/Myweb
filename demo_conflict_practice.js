// 冲突解决练习文件
// 请按照以下步骤操作：

function calculateTotal(items) {
    let total = 0;
    for (let item of items) {
        total += item.price;
    }
    return total;
}


// 导出函数
module.exports = {
    calculateTotal
    // displayMessage 和 getUserName 已删除
};

// ========================================
// 手动操作指南：
// ========================================
//
// 现在这个文件有冲突标记，你需要：
//
// 【方式 1】完全保留同事的代码（放弃删除）：
//   1. 删除 <<<<<<< HEAD 这一行
//   2. 删除 ======= 这一行  
//   3. 删除 >>>>>>> refactor/cleanup-demo 这一行
//   4. 保留 displayMessage、getUserName、formatPrice 三个函数
//   5. 删除"你的分支 - 你删除了这些函数"这个注释
//
// 【方式 2】坚持删除（放弃同事的代码）：
//   1. 删除从 <<<<<<< HEAD 到 ======= 之间的所有内容（包括标记本身）
//   2. 删除 >>>>>>> refactor/cleanup-demo 这一行
//   3. 保留"你删除了这些函数"的注释（或删除它）
//
// 【方式 3】折中方案（部分保留）：
//   1. 删除所有冲突标记（<<<<<<<、=======、>>>>>>>）
//   2. 只保留你认为有用的函数（比如保留 displayMessage，删除其他）
//   3. 根据需要修改代码
//
// 完成编辑后：
//   git add demo_conflict_practice.js
//   git status  （查看状态，应该显示"All conflicts fixed"）
//   git commit -m "resolve conflict: [描述你的选择]"
//
