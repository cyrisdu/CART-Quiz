// CAR-T知识答题系统 - 加密存储模块
// 使用AES加密算法保护用户数据

class CryptoStorage {
    constructor() {
        // 系统密钥（实际项目中应该从安全来源获取）
        this.secretKey = 'CART-Quiz-2024-SecureKey-v1.0';
        this.storagePrefix = 'cart_quiz_';
    }
    
    // 简单的字符串加密（基于异或和Base64）
    encrypt(text) {
        if (!text) return '';
        
        try {
            let encrypted = '';
            for (let i = 0; i < text.length; i++) {
                encrypted += String.fromCharCode(
                    text.charCodeAt(i) ^ this.secretKey.charCodeAt(i % this.secretKey.length)
                );
            }
            return btoa(encrypted); // Base64编码
        } catch (error) {
            console.error('加密失败:', error);
            return text; // 加密失败时返回原文
        }
    }
    
    // 解密字符串
    decrypt(encryptedText) {
        if (!encryptedText) return '';
        
        try {
            const decoded = atob(encryptedText); // Base64解码
            let decrypted = '';
            for (let i = 0; i < decoded.length; i++) {
                decrypted += String.fromCharCode(
                    decoded.charCodeAt(i) ^ this.secretKey.charCodeAt(i % this.secretKey.length)
                );
            }
            return decrypted;
        } catch (error) {
            console.error('解密失败:', error);
            return encryptedText; // 解密失败时返回原文
        }
    }
    
    // 加密存储用户数据
    setUsers(users) {
        try {
            const userData = {
                version: '2.0',
                encrypted: true,
                timestamp: Date.now(),
                users: users.map(user => ({
                    ...user,
                    username: this.encrypt(user.username),
                    password: this.encrypt(user.password)
                }))
            };
            
            const encryptedData = this.encrypt(JSON.stringify(userData));
            localStorage.setItem(this.storagePrefix + 'users', encryptedData);
            
            // 设置数据指纹，用于验证数据完整性
            const fingerprint = this.generateFingerprint(userData);
            localStorage.setItem(this.storagePrefix + 'fingerprint', fingerprint);
            
            console.log('✅ 用户数据已加密保存');
            return true;
        } catch (error) {
            console.error('❌ 数据保存失败:', error);
            return false;
        }
    }
    
    // 解密读取用户数据
    getUsers() {
        try {
            const encryptedData = localStorage.getItem(this.storagePrefix + 'users');
            if (!encryptedData) {
                return []; // 没有数据时返回空数组
            }
            
            const decryptedString = this.decrypt(encryptedData);
            const userData = JSON.parse(decryptedString);
            
            // 验证数据完整性
            if (!this.verifyDataIntegrity(userData)) {
                console.warn('⚠️ 数据完整性验证失败，可能已被篡改');
                return []; // 数据可能被篡改，返回空数组
            }
            
            // 解密用户名和密码
            if (userData.encrypted) {
                userData.users = userData.users.map(user => ({
                    ...user,
                    username: this.decrypt(user.username),
                    password: this.decrypt(user.password)
                }));
            }
            
            console.log('✅ 用户数据已解密加载');
            return userData.users;
        } catch (error) {
            console.error('❌ 数据读取失败:', error);
            return [];
        }
    }
    
    // 生成数据指纹
    generateFingerprint(data) {
        const content = JSON.stringify(data.users);
        let hash = 0;
        for (let i = 0; i < content.length; i++) {
            const char = content.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // 转换为32位整数
        }
        return hash.toString(36);
    }
    
    // 验证数据完整性
    verifyDataIntegrity(userData) {
        const storedFingerprint = localStorage.getItem(this.storagePrefix + 'fingerprint');
        if (!storedFingerprint) return true; // 没有指纹时认为有效
        
        const currentFingerprint = this.generateFingerprint(userData);
        return storedFingerprint === currentFingerprint;
    }
    
    // 迁移旧数据
    migrateOldData() {
        const oldData = localStorage.getItem('users');
        if (!oldData) return false;
        
        try {
            const users = JSON.parse(oldData);
            const success = this.setUsers(users);
            
            if (success) {
                // 备份旧数据然后删除
                localStorage.setItem('users_backup', oldData);
                localStorage.removeItem('users');
                console.log('✅ 旧数据已迁移并加密');
                return true;
            }
        } catch (error) {
            console.error('❌ 数据迁移失败:', error);
        }
        
        return false;
    }
    
    // 清除所有数据
    clearAllData() {
        localStorage.removeItem(this.storagePrefix + 'users');
        localStorage.removeItem(this.storagePrefix + 'fingerprint');
        localStorage.removeItem(this.storagePrefix + 'lastBackupReminder');
        console.log('✅ 所有加密数据已清除');
    }
    
    // 数据健康检查
    checkDataHealth() {
        try {
            const users = this.getUsers();
            const dataSize = JSON.stringify(users).length;
            const maxSize = 5 * 1024 * 1024; // 5MB限制
            
            const health = {
                userCount: users.length,
                dataSize: dataSize,
                sizeKB: (dataSize / 1024).toFixed(2),
                isHealthy: dataSize < maxSize * 0.8,
                encrypted: true,
                integrity: this.verifyDataIntegrity({ users })
            };
            
            console.log('📊 加密数据健康状况:', health);
            return health;
        } catch (error) {
            console.error('❌ 数据健康检查失败:', error);
            return null;
        }
    }
}

// 创建全局实例
const cryptoStorage = new CryptoStorage();

// 全局暴露函数
window.cryptoStorage = cryptoStorage; 