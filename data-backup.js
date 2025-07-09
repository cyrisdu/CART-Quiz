// CAR-T知识答题系统 - 数据备份与恢复功能
// 解决localStorage数据丢失问题

// 数据导出功能
function exportUserData() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const exportData = {
        exportDate: new Date().toISOString(),
        version: '1.0',
        appName: 'CAR-T知识答题系统',
        users: users
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(dataBlob);
    downloadLink.download = `cart-quiz-backup-${getCurrentDate()}.json`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    showMessage('数据备份已下载，请妥善保存！', 'success');
    console.log('✅ 用户数据已导出');
}

// 数据导入功能
function importUserData(file) {
    if (!file) {
        showMessage('请选择要导入的备份文件', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importData = JSON.parse(e.target.result);
            
            // 验证数据格式
            if (!importData.users || !Array.isArray(importData.users)) {
                throw new Error('备份文件格式不正确');
            }
            
            // 检查版本兼容性
            if (importData.version && importData.version !== '1.0') {
                console.warn('备份文件版本可能不兼容，将尝试导入');
            }
            
            // 确认导入
            if (confirm(`即将导入${importData.users.length}个用户的数据，这将覆盖现有用户信息。确定要继续吗？`)) {
                localStorage.setItem('users', JSON.stringify(importData.users));
                showMessage('数据导入成功！页面将重新加载', 'success');
                
                setTimeout(() => {
                    location.reload();
                }, 2000);
            }
        } catch (error) {
            showMessage('备份文件格式错误或已损坏', 'error');
            console.error('数据导入失败:', error);
        }
    };
    
    reader.readAsText(file);
}

// 自动备份提醒
function checkAutoBackup() {
    const lastBackup = localStorage.getItem('lastBackupReminder');
    const daysSinceLastReminder = lastBackup ? 
        Math.floor((Date.now() - parseInt(lastBackup)) / (1000 * 60 * 60 * 24)) : 999;
    
    // 每7天提醒一次备份
    if (daysSinceLastReminder >= 7) {
        setTimeout(() => {
            if (confirm('为了防止数据丢失，建议您定期备份用户数据。是否现在备份？\n\n备份文件会下载到您的电脑，请妥善保存。')) {
                exportUserData();
            }
            localStorage.setItem('lastBackupReminder', Date.now().toString());
        }, 5000); // 延迟5秒显示，避免干扰用户登录体验
    }
}

// 检查数据健康状况
function checkDataHealth() {
    try {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const dataSize = JSON.stringify(users).length;
        const maxSize = 5 * 1024 * 1024; // 5MB限制
        
        if (dataSize > maxSize * 0.8) {
            console.warn('⚠️ 用户数据接近存储限制，建议清理历史记录或备份数据');
            showMessage('数据量较大，建议备份后清理历史记录', 'warning');
        }
        
        console.log(`📊 数据统计：用户数量 ${users.length}，数据大小 ${(dataSize/1024).toFixed(2)}KB`);
        return { userCount: users.length, dataSize: dataSize };
    } catch (error) {
        console.error('❌ 数据健康检查失败:', error);
        return null;
    }
}

// 清理历史记录（保留最近的记录）
function cleanupHistory(maxRecordsPerUser = 10) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    let cleaned = false;
    
    users.forEach(user => {
        if (user.history && user.history.length > maxRecordsPerUser) {
            // 保留最新的记录
            user.history = user.history.slice(-maxRecordsPerUser);
            cleaned = true;
        }
    });
    
    if (cleaned) {
        localStorage.setItem('users', JSON.stringify(users));
        console.log(`✅ 已清理历史记录，每用户保留最近${maxRecordsPerUser}条记录`);
        showMessage(`历史记录已清理，每用户保留最近${maxRecordsPerUser}条记录`, 'success');
    } else {
        console.log('无需清理历史记录');
    }
}

// 数据迁移助手
function migrateData() {
    console.log('🔄 开始数据迁移检查...');
    
    // 检查是否需要迁移
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.length === 0) {
        console.log('无数据需要迁移');
        return;
    }
    
    // 提示用户备份
    if (confirm('检测到用户数据，为确保数据安全，建议先备份数据。是否立即备份？')) {
        exportUserData();
    }
}

// 在页面加载时执行检查
document.addEventListener('DOMContentLoaded', function() {
    // 延迟执行，避免影响主要功能加载
    setTimeout(() => {
        checkDataHealth();
        checkAutoBackup();
    }, 2000);
});

// 全局暴露函数供控制台使用
window.exportUserData = exportUserData;
window.importUserData = importUserData;
window.checkDataHealth = checkDataHealth;
window.cleanupHistory = cleanupHistory;
window.migrateData = migrateData; 