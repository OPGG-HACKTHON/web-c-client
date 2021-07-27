const path = require('path');

module.exports = () => ({
  resolve: {
    extensions: [
      '*', '.js', '.jsx',
    ],
    alias: {
      '@': path.join(__dirname, './src/'),

      // hook 사용 시 활성화
      // 'react-dom': '@hot-loader/react-dom',
    },
  },
});
