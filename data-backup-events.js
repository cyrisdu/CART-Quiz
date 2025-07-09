// 数据备份功能的事件监听器
// 这个文件处理数据导入导出按钮的点击事件

document.addEventListener('DOMContentLoaded', function() {
    // 等待DOM完全加载后再绑定事件
    setTimeout(() => {
        bindDataManagementEvents();
    }, 100);
});

function bindDataManagementEvents() {
    // 数据导出按钮
    const exportBtn = document.getElementById('exportData');
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            console.log('导出数据按钮被点击');
            exportUserData();
        });
    }
    
    // 数据导入文件选择
    const importFile = document.getElementById('importFile');
    if (importFile) {
        importFile.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                console.log('选择了文件:', file.name);
                importUserData(file);
                e.target.value = ''; // 清空文件选择，允许重新选择同一文件
            }
        });
    }
    
    console.log('✅ 数据管理事件已绑定');
} 